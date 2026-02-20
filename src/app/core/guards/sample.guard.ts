/**
 * Place your route guard files in this folder.
 *
 * Guards control access to routes by implementing logic that determines
 * whether a user can navigate to or away from a route.
 *
 * Examples:
 *   - auth.guard.ts    → restrict routes to authenticated users
 *   - role.guard.ts    → restrict routes based on user roles
 *   - unsaved.guard.ts → prevent navigation with unsaved changes
 *
 * Usage:
 *   export const authGuard: CanActivateFn = (route, state) => {
 *     const authService = inject(AuthService);
 *     return authService.isAuthenticated() ? true : inject(Router).createUrlTree(['/login']);
 *   };
 *
 * You can safely delete this file once you've added your own.
 */
