/**
 * Validators for allowing only specific file MIME types or extensions.
 * Use this for file input controls with upload restrictions.
 */
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

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

const resolveExtension = (fileName: string): string => {
  const dotIndex = fileName.lastIndexOf('.');
  return dotIndex < 0 ? '' : fileName.slice(dotIndex).toLowerCase();
};

/**
 * Validates uploaded file types against allowed MIME types and extensions.
 */
export const fileTypeValidator = (
  allowedTypes: readonly string[],
  errorKey = 'fileType'
): ValidatorFn => {
  const normalizedAllowedTypes = allowedTypes.map((type) => type.toLowerCase());

  return (control: AbstractControl): ValidationErrors | null => {
    if (normalizedAllowedTypes.length === 0) {
      return null;
    }

    const files = toFileArray(control.value);

    if (files.length === 0) {
      return null;
    }

    const invalidFile = files.find((file) => {
      const mimeType = file.type.toLowerCase();
      const extension = resolveExtension(file.name);
      const mimeMatches = normalizedAllowedTypes.includes(mimeType);
      const extensionMatches = normalizedAllowedTypes.includes(extension);

      return !mimeMatches && !extensionMatches;
    });

    return invalidFile
      ? {
          [errorKey]: {
            allowedTypes: normalizedAllowedTypes,
            fileName: invalidFile.name,
            fileType: invalidFile.type,
          },
        }
      : null;
  };
};
