/**
 * Validators that reject leading, trailing, or all-whitespace text values.
 * Use on fields where clean, non-empty text is required.
 */
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Disallows leading, trailing, or all-whitespace string values.
 */
export const noWhitespaceValidator = (errorKey = 'whitespace'): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (typeof value !== 'string' || value.length === 0) {
      return null;
    }

    const trimmedValue = value.trim();
    const hasLeadingOrTrailingWhitespace = trimmedValue !== value;
    const isOnlyWhitespace = trimmedValue.length === 0;

    return hasLeadingOrTrailingWhitespace || isOnlyWhitespace ? { [errorKey]: true } : null;
  };
};
