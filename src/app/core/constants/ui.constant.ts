/**
 * Shared UI tokens for breakpoints, z-index layers, and animation durations.
 * Use these constants to keep responsive and layering behavior consistent.
 */
export const UI_BREAKPOINTS = {
  XS: 0,
  SM: 576,
  MD: 768,
  LG: 992,
  XL: 1200,
  XXL: 1400,
} as const;

export const UI_Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  OFFCANVAS_BACKDROP: 1040,
  OFFCANVAS: 1045,
  MODAL_BACKDROP: 1050,
  MODAL: 1055,
  TOOLTIP: 1080,
  TOAST: 1100,
} as const;

export const UI_ANIMATION_DURATION_MS = {
  FAST: 150,
  NORMAL: 250,
  SLOW: 400,
} as const;
