/**
 * Place your custom form validator files in this folder.
 *
 * Validators provide reusable validation logic for reactive forms
 * and template-driven forms beyond Angular's built-in validators.
 *
 * Examples:
 *   - match.validator.ts       → confirm password matches password
 *   - no-whitespace.validator.ts → disallow leading/trailing whitespace
 *   - unique-email.validator.ts  → async validator to check email availability
 *
 * Usage:
 *   export function matchValidator(controlName: string, matchingControlName: string): ValidatorFn {
 *     return (group: AbstractControl): ValidationErrors | null => {
 *       const control = group.get(controlName);
 *       const matchingControl = group.get(matchingControlName);
 *       if (control?.value !== matchingControl?.value) {
 *         matchingControl?.setErrors({ match: true });
 *         return { match: true };
 *       }
 *       return null;
 *     };
 *   }
 *
 * In components:
 *   this.form = this.fb.group({
 *     password: ['', Validators.required],
 *     confirmPassword: ['', Validators.required],
 *   }, { validators: matchValidator('password', 'confirmPassword') });
 *
 * You can safely delete this file once you've added your own.
 */
