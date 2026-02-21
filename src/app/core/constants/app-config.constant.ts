/**
 * Global app defaults for pagination, debounce timing, date format, and upload limits.
 * Keep only fixed values here; put logic in services, pipes, or utilities.
 */
export const APP_CONFIG = {
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
  },
  INPUT: {
    DEFAULT_DEBOUNCE_MS: 300,
  },
  FORMAT: {
    DATE: 'yyyy-MM-dd',
  },
  UPLOAD: {
    MAX_SIZE_MB: 10,
  },
} as const;
