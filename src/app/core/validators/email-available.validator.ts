/**
 * Async validators for checking email availability through an API callback.
 * Use this as an AsyncValidatorFn in reactive form controls.
 */
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { REGEX_PATTERNS } from '../constants';

export type EmailAvailabilityCheck = (email: string) => Observable<boolean>;

/**
 * Async validator that checks whether an email is available through an API-backed check function.
 */
export const emailAvailableValidator = (
  checkEmailAvailability: EmailAvailabilityCheck,
  debounceMs = 300,
  errorKey = 'emailTaken'
): AsyncValidatorFn => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const value = control.value;

    if (typeof value !== 'string' || value.length === 0) {
      return of(null);
    }

    if (!REGEX_PATTERNS.EMAIL.test(value)) {
      return of(null);
    }

    return timer(debounceMs).pipe(
      switchMap(() => checkEmailAvailability(value)),
      map((isAvailable) => (isAvailable ? null : { [errorKey]: true })),
      catchError(() => of({ emailAvailabilityCheckFailed: true }))
    );
  };
};
