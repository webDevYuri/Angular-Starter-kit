/**
 * Place your custom directive files in this folder.
 *
 * Directives add custom behavior to DOM elements without
 * creating full components. Use them for reusable UI logic.
 *
 * Examples:
 *   - click-outside.directive.ts → detect clicks outside an element (dropdowns, modals)
 *   - auto-focus.directive.ts    → automatically focus an input on render
 *   - permission.directive.ts    → show/hide elements based on user permissions
 *   - debounce-click.directive.ts → prevent rapid double-clicks on buttons
 *
 * Usage:
 *   @Directive({ selector: '[appClickOutside]', standalone: true })
 *   export class ClickOutsideDirective {
 *     appClickOutside = output<void>();
 *
 *     @HostListener('document:click', ['$event.target'])
 *     onClick(target: HTMLElement): void {
 *       const inside = this.elementRef.nativeElement.contains(target);
 *       if (!inside) {
 *         this.appClickOutside.emit();
 *       }
 *     }
 *
 *     constructor(private elementRef: ElementRef) {}
 *   }
 *
 * In templates:
 *   <div (appClickOutside)="closeDropdown()">...</div>
 *
 * You can safely delete this file once you've added your own.
 */
