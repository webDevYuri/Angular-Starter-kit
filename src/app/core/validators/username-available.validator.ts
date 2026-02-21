/**
 * Async validators for checking username availability through an API callback.
 * Use this as an AsyncValidatorFn in reactive form controls.
 */
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { REGEX_PATTERNS } from '../constants';

export type UsernameAvailabilityCheck = (username: string) => Observable<boolean>;

/**
 * Async validator that checks whether a username is available through an API-backed check function.
 */
export const usernameAvailableValidator = (
  checkUsernameAvailability: UsernameAvailabilityCheck,
  debounceMs = 300,
  errorKey = 'usernameTaken'
): AsyncValidatorFn => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const value = control.value;

    if (typeof value !== 'string' || value.length === 0) {
      return of(null);
    }

    if (!REGEX_PATTERNS.USERNAME.test(value)) {
      return of(null);
    }

    return timer(debounceMs).pipe(
      switchMap(() => checkUsernameAvailability(value)),
      map((isAvailable) => (isAvailable ? null : { [errorKey]: true })),
      catchError(() => of({ usernameAvailabilityCheckFailed: true }))
    );
  };
};
