/**
 * Place your utility/helper files in this folder.
 *
 * Utils are pure functions with no side effects — they take input,
 * return output, and don't depend on Angular services or state.
 *
 * Examples:
 *   - date.util.ts    → format dates, calculate differences, parse strings
 *   - string.util.ts  → capitalize, slugify, truncate, mask sensitive data
 *   - array.util.ts   → group by key, remove duplicates, sort helpers
 *   - file.util.ts    → file size formatting, extension extraction
 *
 * Usage:
 *   export function formatFileSize(bytes: number): string {
 *     if (bytes === 0) return '0 B';
 *     const units = ['B', 'KB', 'MB', 'GB'];
 *     const i = Math.floor(Math.log(bytes) / Math.log(1024));
 *     return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + units[i];
 *   }
 *
 * You can safely delete this file once you've added your own.
 */
