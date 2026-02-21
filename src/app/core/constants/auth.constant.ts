/**
 * Authentication constants for token keys and authorization header metadata.
 * Used by auth services and HTTP interceptors.
 */
export const AUTH_CONFIG = {
  TOKENS: {
    ACCESS_TOKEN_KEY: 'access_token',
    REFRESH_TOKEN_KEY: 'refresh_token',
  },
  HEADER: {
    AUTH_HEADER_NAME: 'Authorization',
    TOKEN_TYPE: 'Bearer',
  },
} as const;
