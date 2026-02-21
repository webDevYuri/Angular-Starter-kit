/**
 * Validators for local phone numbers based on the selected country format.
 * Use with a country selector and local-number input pair.
 */
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { PHONE_FORMATS_BY_COUNTRY } from '../data/phone-formats.data';

const normalizePhoneLocal = (value: string): string => value.replace(/[^\d]/g, '');

/**
 * Validates a local phone number against the selected country's phone rules.
 */
export const phoneLocalByCountryValidator = (
  countryControlName = 'phoneCountry',
  errorKey = 'phoneByCountry'
): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const rawValue = control.value;

    if (typeof rawValue !== 'string' || rawValue.length === 0) {
      return null;
    }

    const parent = control.parent;
    const countryCode = parent?.get(countryControlName)?.value;

    if (typeof countryCode !== 'string' || countryCode.length === 0) {
      return null;
    }

    const format = PHONE_FORMATS_BY_COUNTRY[countryCode];

    if (!format) {
      return {
        [errorKey]: {
          countryCode,
          message: 'Unsupported country phone format.',
        },
      };
    }

    const normalizedValue = normalizePhoneLocal(rawValue);
    if (format.LOCAL_NUMBER_REGEX.test(normalizedValue)) {
      return null;
    }

    return {
      [errorKey]: {
        countryCode: format.COUNTRY_CODE,
        countryName: format.COUNTRY_NAME,
        dialCode: format.DIAL_CODE,
        example: format.EXAMPLE,
        formatHint: format.LOCAL_FORMAT_HINT,
      },
    };
  };
};
