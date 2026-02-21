/**
 * Route path constants grouped by public, auth, and protected sections.
 * Use these values in route config and navigation to avoid hardcoded paths.
 */
export const ROUTE_PATHS = {
  PUBLIC: {
    HOME: '',
    ABOUT: 'about',
    CONTACT: 'contact',
  },
  AUTH: {
    LOGIN: 'auth/login',
    REGISTER: 'auth/register',
    FORGOT_PASSWORD: 'auth/forgot-password',
  },
  PROTECTED: {
    DASHBOARD: 'dashboard',
    DASHBOARD_OVERVIEW: 'dashboard/overview',
  },
} as const;
