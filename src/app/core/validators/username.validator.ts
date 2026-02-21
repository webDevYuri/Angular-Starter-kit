/**
 * Validators for username format and character rules.
 * Uses shared regex policy from core constants.
 */
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { REGEX_PATTERNS } from '../constants';

/**
 * Validates usernames against the project username format constraints.
 */
export const usernameValidator = (errorKey = 'usernameFormat'): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (typeof value !== 'string' || value.length === 0) {
      return null;
    }

    return REGEX_PATTERNS.USERNAME.test(value) ? null : { [errorKey]: true };
  };
};
