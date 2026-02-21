/**
 * Validators for first-name, last-name, and full-name format checks.
 * Uses shared regex patterns from core constants.
 */
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { REGEX_PATTERNS } from '../constants';

const NAME_PATTERNS = {
  FIRST_NAME: REGEX_PATTERNS.FIRST_NAME,
  LAST_NAME: REGEX_PATTERNS.LAST_NAME,
  FULL_NAME: REGEX_PATTERNS.FULL_NAME,
} as const;

export type NamePatternType = keyof typeof NAME_PATTERNS;

/**
 * Validates a name value using first-name, last-name, or full-name regex patterns.
 */
export const nameFormatValidator = (
  patternType: NamePatternType = 'FULL_NAME',
  errorKey = 'nameFormat'
): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (typeof value !== 'string' || value.length === 0) {
      return null;
    }

    const pattern = NAME_PATTERNS[patternType];

    return pattern.test(value) ? null : { [errorKey]: { patternType } };
  };
};
