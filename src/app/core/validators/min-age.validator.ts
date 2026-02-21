/**
 * Validators for enforcing a minimum age from a birth-date value.
 * Useful for signup, profile, and compliance-related forms.
 */
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const parseDateValue = (value: unknown): Date | null => {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    const parsedDate = new Date(value);
    return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
  }

  return null;
};

const calculateAge = (birthDate: Date, now: Date): number => {
  let age = now.getFullYear() - birthDate.getFullYear();
  const monthDelta = now.getMonth() - birthDate.getMonth();
  const hasNotHadBirthdayThisYear =
    monthDelta < 0 || (monthDelta === 0 && now.getDate() < birthDate.getDate());

  if (hasNotHadBirthdayThisYear) {
    age -= 1;
  }

  return age;
};

/**
 * Validates that a date-of-birth control meets a minimum age requirement.
 */
export const minAgeValidator = (
  minimumAge = 18,
  errorKey = 'minAge'
): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value === null || value === undefined || value === '') {
      return null;
    }

    const birthDate = parseDateValue(value);

    if (!birthDate) {
      return { invalidDate: true };
    }

    const actualAge = calculateAge(birthDate, new Date());

    return actualAge >= minimumAge
      ? null
      : { [errorKey]: { minimumAge, actualAge } };
  };
};
