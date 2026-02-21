/**
 * Shared query parameter keys and sort values for list/search API requests.
 * Use these keys when building HttpParams to avoid typos.
 */
export const QUERY_PARAMS = {
  PAGINATION: {
    PAGE: 'page',
    LIMIT: 'limit',
  },
  SEARCH: {
    TERM: 'search',
  },
  SORT: {
    BY: 'sortBy',
    ORDER: 'sortOrder',
  },
  FILTER: {
    STATUS: 'status',
    DATE_FROM: 'dateFrom',
    DATE_TO: 'dateTo',
  },
} as const;

export const SORT_ORDERS = {
  ASC: 'asc',
  DESC: 'desc',
} as const;
