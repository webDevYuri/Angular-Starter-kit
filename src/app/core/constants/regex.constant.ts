/**
 * Reusable regex patterns for validating common form inputs.
 * Keep matching patterns here; keep formatting/transformation logic in pipes or services.
 */
export const REGEX_PATTERNS = {
  EMAIL: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
  PHONE_INTERNATIONAL: /^\+[1-9]\d{7,14}$/,
  STRONG_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])(?!.*\s).{8,64}$/,
  FIRST_NAME: /^(?=.{2,50}$)[A-Za-z]+(?:[ '-][A-Za-z]+)*$/,
  LAST_NAME: /^(?=.{2,50}$)[A-Za-z]+(?:[ '-][A-Za-z]+)*$/,
  FULL_NAME: /^(?=.{2,100}$)[A-Za-z]+(?:[ '-][A-Za-z]+)+$/,
  USERNAME: /^(?=.{4,32}$)[A-Za-z0-9](?:[A-Za-z0-9._-]*[A-Za-z0-9])$/,
  OTP_6_DIGITS: /^\d{6}$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
} as const;
