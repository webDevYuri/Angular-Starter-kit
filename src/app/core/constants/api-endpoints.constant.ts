/**
 * Central API endpoint path templates grouped by domain modules.
 * Use these paths in services/data sources to avoid hardcoded endpoint strings.
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH_TOKEN: '/auth/refresh-token',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  USERS: {
    LIST: '/users',
    CREATE: '/users',
    DETAILS: '/users/:userId',
    UPDATE: '/users/:userId',
    DELETE: '/users/:userId',
    PROFILE: '/users/me',
  },
} as const;
