/**
 * Validators for enforcing upload file size limits.
 * Default limit is read from APP_CONFIG, but can be overridden per use case.
 */
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { APP_CONFIG } from '../constants';

const toFileArray = (value: unknown): File[] => {
  if (typeof File === 'undefined') {
    return [];
  }

  if (value instanceof File) {
    return [value];
  }

  if (typeof FileList !== 'undefined' && value instanceof FileList) {
    return Array.from(value);
  }

  if (Array.isArray(value)) {
    return value.filter((item): item is File => item instanceof File);
  }

  return [];
};

/**
 * Validates uploaded file size against a configurable maximum.
 */
export const fileSizeValidator = (
  maxSizeMb = APP_CONFIG.UPLOAD.MAX_SIZE_MB,
  errorKey = 'fileSize'
): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const files = toFileArray(control.value);

    if (files.length === 0) {
      return null;
    }

    const maxSizeBytes = maxSizeMb * 1024 * 1024;
    const invalidFile = files.find((file) => file.size > maxSizeBytes);

    return invalidFile
      ? {
          [errorKey]: {
            maxSizeMb,
            fileName: invalidFile.name,
            fileSizeBytes: invalidFile.size,
          },
        }
      : null;
  };
};
