/**
 * Validators for enforcing the project's strong password policy.
 * Uses shared regex policy from core constants.
 */
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { REGEX_PATTERNS } from '../constants';

/**
 * Validates a password against the project's strong password regex rule.
 */
export const strongPasswordValidator = (errorKey = 'strongPassword'): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (typeof value !== 'string' || value.length === 0) {
      return null;
    }

    return REGEX_PATTERNS.STRONG_PASSWORD.test(value) ? null : { [errorKey]: true };
  };
};
