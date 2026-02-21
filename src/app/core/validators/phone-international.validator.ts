/**
 * Validators for international phone numbers (E.164-style format).
 * Uses shared regex policy from core constants.
 */
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { REGEX_PATTERNS } from '../constants';

/**
 * Validates international phone numbers using E.164-style formatting.
 */
export const phoneInternationalValidator = (errorKey = 'phoneInternational'): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (typeof value !== 'string' || value.length === 0) {
      return null;
    }

    return REGEX_PATTERNS.PHONE_INTERNATIONAL.test(value) ? null : { [errorKey]: true };
  };
};
