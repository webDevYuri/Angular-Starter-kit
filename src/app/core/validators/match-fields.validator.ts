/**
 * Group validators for ensuring two controls have matching values.
 * Common use: password and confirm password fields.
 */
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validates that two controls in the same form group have matching values.
 */
export const matchFieldsValidator = (
  sourceControlName: string,
  targetControlName: string,
  errorKey = 'fieldsMismatch'
): ValidatorFn => {
  return (group: AbstractControl): ValidationErrors | null => {
    const sourceControl = group.get(sourceControlName);
    const targetControl = group.get(targetControlName);

    if (!sourceControl || !targetControl) {
      return null;
    }

    const sourceValue = sourceControl.value;
    const targetValue = targetControl.value;

    if (
      sourceValue === null ||
      sourceValue === undefined ||
      targetValue === null ||
      targetValue === undefined ||
      targetValue === ''
    ) {
      return null;
    }

    return sourceValue === targetValue
      ? null
      : { [errorKey]: { sourceControlName, targetControlName } };
  };
};
