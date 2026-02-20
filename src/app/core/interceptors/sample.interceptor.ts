/**
 * Place your HTTP interceptor files in this folder.
 *
 * Interceptors allow you to inspect and transform HTTP requests
 * and responses globally before they reach your services or components.
 *
 * Examples:
 *   - auth.interceptor.ts    → attach JWT/Bearer tokens to outgoing requests
 *   - error.interceptor.ts   → handle HTTP errors globally (401, 403, 500, etc.)
 *   - loading.interceptor.ts → show/hide a loading spinner during requests
 *
 * Usage:
 *   export const authInterceptor: HttpInterceptorFn = (req, next) => {
 *     const token = inject(AuthService).getToken();
 *     const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;
 *     return next(authReq);
 *   };
 *
 * Register interceptors in app.config.ts:
 *   provideHttpClient(withInterceptors([authInterceptor]))
 *
 * You can safely delete this file once you've added your own.
 */
