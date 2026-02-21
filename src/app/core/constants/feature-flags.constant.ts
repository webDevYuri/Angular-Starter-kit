/**
 * Feature flags used to enable or disable app features safely.
 * Use these flags for controlled rollout without changing core business logic.
 */
export const FEATURE_FLAGS = {
  AUTH: {
    ENABLE_SIGN_UP: true,
    ENABLE_REMEMBER_ME: true,
    ENABLE_FORGOT_PASSWORD: true,
  },
  DASHBOARD: {
    ENABLE_NOTIFICATIONS_PANEL: true,
    ENABLE_EXPORT_CSV: false,
  },
  SYSTEM: {
    ENABLE_MAINTENANCE_BANNER: false,
    ENABLE_USAGE_ANALYTICS: false,
  },
} as const;
