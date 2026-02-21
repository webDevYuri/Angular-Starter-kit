/**
 * Group validators that ensure a start date is not later than an end date.
 * Returns error keys only; UI messages should be handled in components/forms.
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

/**
 * Validates that a start date is not later than an end date.
 */
export const dateRangeValidator = (
  startControlName = 'startDate',
  endControlName = 'endDate',
  errorKey = 'dateRange'
): ValidatorFn => {
  return (group: AbstractControl): ValidationErrors | null => {
    const startControl = group.get(startControlName);
    const endControl = group.get(endControlName);

    if (!startControl || !endControl) {
      return null;
    }

    const rawStart = startControl.value;
    const rawEnd = endControl.value;

    if (
      rawStart === null ||
      rawStart === undefined ||
      rawStart === '' ||
      rawEnd === null ||
      rawEnd === undefined ||
      rawEnd === ''
    ) {
      return null;
    }

    const startDate = parseDateValue(rawStart);
    const endDate = parseDateValue(rawEnd);

    if (!startDate || !endDate) {
      return null;
    }

    return startDate <= endDate
      ? null
      : { [errorKey]: { startControlName, endControlName } };
  };
};
