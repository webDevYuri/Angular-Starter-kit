/**
 * API transport defaults like base URL, version, timeout, and headers.
 * Use this in HTTP setup; keep environment-specific values in environment files.
 */
export const API_CONFIG = {
  BASE_URL: 'https://api.acmeplatform.com',
  VERSION: 'v1',
  REQUEST_TIMEOUT_MS: 20000,
  DEFAULT_HEADERS: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Client-Platform': 'web',
  },
} as const;
