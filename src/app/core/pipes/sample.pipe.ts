/**
 * Place your custom pipe files in this folder.
 *
 * Pipes transform displayed values in templates. Use them to format
 * dates, currencies, text, or any data transformation needed in your views.
 *
 * Examples:
 *   - truncate.pipe.ts     → shorten long text with ellipsis
 *   - time-ago.pipe.ts     → display relative time (e.g., "3 hours ago")
 *   - safe-html.pipe.ts    → safely render HTML content
 *   - phone.pipe.ts        → format phone numbers
 *
 * Usage:
 *   @Pipe({ name: 'truncate', standalone: true })
 *   export class TruncatePipe implements PipeTransform {
 *     transform(value: string, limit: number = 50): string {
 *       return value.length > limit ? value.substring(0, limit) + '...' : value;
 *     }
 *   }
 *
 * In templates:
 *   {{ longText | truncate:100 }}
 *
 * You can safely delete this file once you've added your own.
 */
