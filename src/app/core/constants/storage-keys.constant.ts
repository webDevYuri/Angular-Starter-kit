/**
 * Namespaced storage keys for user data, auth flags, and app preferences.
 * Keep only key names here; keep storage read/write logic in services.
 */
export const STORAGE_KEYS = {
  USER: {
    INFO: 'starter_kit.user.info',
  },
  PREFERENCES: {
    THEME: 'starter_kit.preferences.theme',
  },
  AUTH: {
    REMEMBER_ME_FLAG: 'starter_kit.auth.remember_me',
  },
} as const;
