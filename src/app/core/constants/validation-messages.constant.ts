/**
 * Default message resolvers for Angular validation error keys.
 * Validators return error objects; these resolvers convert them into user-friendly text.
 */
export type ValidationMessageResolver = (errorValue: unknown) => string;

const getNumber = (source: unknown, key: string): number | null => {
  if (!source || typeof source !== 'object') {
    return null;
  }

  const value = (source as Record<string, unknown>)[key];
  return typeof value === 'number' ? value : null;
};

const getStringArray = (source: unknown, key: string): string[] => {
  if (!source || typeof source !== 'object') {
    return [];
  }

  const value = (source as Record<string, unknown>)[key];
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === 'string');
};

const getString = (source: unknown, key: string): string | null => {
  if (!source || typeof source !== 'object') {
    return null;
  }

  const value = (source as Record<string, unknown>)[key];
  return typeof value === 'string' ? value : null;
};

export const VALIDATION_MESSAGES = {
  required: () => 'This field is required.',
  requiredTrue: () => 'This field must be checked.',
  email: () => 'Enter a valid email address.',
  minlength: (errorValue: unknown) => {
    const requiredLength = getNumber(errorValue, 'requiredLength');
    return requiredLength === null
      ? 'Value is too short.'
      : `Enter at least ${requiredLength} characters.`;
  },
  maxlength: (errorValue: unknown) => {
    const requiredLength = getNumber(errorValue, 'requiredLength');
    return requiredLength === null
      ? 'Value is too long.'
      : `Enter no more than ${requiredLength} characters.`;
  },
  min: (errorValue: unknown) => {
    const min = getNumber(errorValue, 'min');
    return min === null ? 'Value is below the allowed minimum.' : `Value must be at least ${min}.`;
  },
  max: (errorValue: unknown) => {
    const max = getNumber(errorValue, 'max');
    return max === null ? 'Value exceeds the allowed maximum.' : `Value must be ${max} or below.`;
  },
  pattern: () => 'The value format is invalid.',
  fieldsMismatch: () => 'Values do not match.',
  strongPassword: () => 'Use 8+ chars with uppercase, lowercase, number, and special character.',
  nameFormat: () => 'Enter a valid name format.',
  phoneInternational: () => 'Enter a valid international phone number (example: +15551234567).',
  phoneByCountry: (errorValue: unknown) => {
    const countryName = getString(errorValue, 'countryName');
    const example = getString(errorValue, 'example');
    const formatHint = getString(errorValue, 'formatHint');

    if (countryName && example) {
      return `Enter a valid ${countryName} number. Example: ${example}.`;
    }

    if (formatHint) {
      return formatHint;
    }

    return 'Enter a valid phone number for the selected country.';
  },
  usernameFormat: () => 'Use 4-32 chars with letters/numbers and optional . _ -.',
  whitespace: () => 'Leading or trailing spaces are not allowed.',
  dateRange: () => 'Start date cannot be later than end date.',
  minAge: (errorValue: unknown) => {
    const minimumAge = getNumber(errorValue, 'minimumAge');
    return minimumAge === null
      ? 'Minimum age requirement is not met.'
      : `Minimum age requirement is ${minimumAge}.`;
  },
  invalidDate: () => 'Enter a valid date.',
  fileSize: (errorValue: unknown) => {
    const maxSizeMb = getNumber(errorValue, 'maxSizeMb');
    const fileName = getString(errorValue, 'fileName');

    if (maxSizeMb === null && !fileName) {
      return 'File size is too large.';
    }

    if (maxSizeMb === null) {
      return `File "${fileName}" is too large.`;
    }

    if (!fileName) {
      return `File exceeds the ${maxSizeMb} MB limit.`;
    }

    return `File "${fileName}" exceeds the ${maxSizeMb} MB limit.`;
  },
  fileType: (errorValue: unknown) => {
    const fileName = getString(errorValue, 'fileName');
    const allowedTypes = getStringArray(errorValue, 'allowedTypes');

    if (!fileName && allowedTypes.length === 0) {
      return 'File type is not allowed.';
    }

    if (!fileName) {
      return `Allowed types: ${allowedTypes.join(', ')}.`;
    }

    if (allowedTypes.length === 0) {
      return `File "${fileName}" type is not allowed.`;
    }

    return `File "${fileName}" type is not allowed. Allowed types: ${allowedTypes.join(', ')}.`;
  },
  emailTaken: () => 'This email is already in use.',
  usernameTaken: () => 'This username is already in use.',
  emailAvailabilityCheckFailed: () => 'Could not verify email availability right now.',
  usernameAvailabilityCheckFailed: () => 'Could not verify username availability right now.',
} as const satisfies Record<string, ValidationMessageResolver>;
