import { Component, ElementRef, HostListener, Input, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PHONE_FORMATS_DATA, PhoneFormatData } from '../../core/data/phone-formats.data';

@Component({
  selector: 'app-phone-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './phone-input.html',
  styleUrl: './phone-input.css'
})
export class PhoneInputComponent {
  private readonly hostElement = inject(ElementRef<HTMLElement>);

  @ViewChild('countryTriggerButton') countryTriggerButton?: ElementRef<HTMLButtonElement>;
  @ViewChild('countrySearchInput') countrySearchInput?: ElementRef<HTMLInputElement>;

  @Input({ required: true }) formGroup!: FormGroup;
  @Input() countryControlName = 'phoneCountry';
  @Input() localControlName = 'phoneLocal';
  @Input() label = 'Phone Number';
  @Input() hintPrefix = 'Format:';
  @Input() countries: readonly PhoneFormatData[] = PHONE_FORMATS_DATA;

  readonly localInputId = `phone-local-input-${Math.random().toString(36).slice(2, 10)}`;
  readonly countrySearchInputName = `phone-country-search-${Math.random().toString(36).slice(2, 10)}`;
  readonly countryListboxId = `phone-country-listbox-${Math.random().toString(36).slice(2, 10)}`;
  readonly countrySearchInputId = `phone-country-search-${Math.random().toString(36).slice(2, 10)}`;
  readonly countryResultsHintId = `phone-country-results-${Math.random().toString(36).slice(2, 10)}`;

  isCountryMenuOpen = false;
  countrySearchTerm = '';

  get selectedFormat(): PhoneFormatData {
    const selectedCountryCode = this.getControlValue(this.countryControlName);
    const match = this.countries.find((item) => item.COUNTRY_CODE === selectedCountryCode);
    return match ?? this.countries[0];
  }

  get selectedHint(): string {
    return this.selectedFormat.LOCAL_FORMAT_HINT;
  }

  get selectedPlaceholder(): string {
    return this.selectedFormat.LOCAL_PLACEHOLDER;
  }

  get selectedCountryLabel(): string {
    return `${this.selectedFormat.COUNTRY_CODE} (${this.selectedFormat.DIAL_CODE})`;
  }

  get localInputName(): string {
    return this.localControlName || 'phoneLocal';
  }

  get filteredCountries(): readonly PhoneFormatData[] {
    const query = this.countrySearchTerm.trim().toLowerCase();
    if (!query) {
      return this.countries;
    }

    return this.countries.filter((item) => {
      const searchable = `${item.COUNTRY_CODE} ${item.COUNTRY_NAME} ${item.DIAL_CODE}`.toLowerCase();
      return searchable.includes(query);
    });
  }

  toggleCountryMenu(): void {
    if (this.isCountryMenuOpen) {
      this.closeCountryMenu(true);
      return;
    }

    this.openCountryMenu();
  }

  openCountryMenu(): void {
    this.isCountryMenuOpen = true;
    this.countrySearchTerm = '';

    setTimeout(() => {
      this.countrySearchInput?.nativeElement.focus();
    });
  }

  closeCountryMenu(focusTrigger = false): void {
    this.isCountryMenuOpen = false;
    this.countrySearchTerm = '';

    if (focusTrigger) {
      setTimeout(() => {
        this.countryTriggerButton?.nativeElement.focus();
      });
    }
  }

  selectCountry(country: PhoneFormatData): void {
    this.formGroup.get(this.countryControlName)?.setValue(country.COUNTRY_CODE);
    this.onCountryChange();
    this.closeCountryMenu(true);
  }

  onCountrySearchInput(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    this.countrySearchTerm = input?.value ?? '';
  }

  focusCountrySearch(): void {
    this.countrySearchInput?.nativeElement.focus();
  }

  onCountryChange(): void {
    this.formGroup.get(this.localControlName)?.updateValueAndValidity();
  }

  onCountryTriggerKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!this.isCountryMenuOpen) {
        this.openCountryMenu();
      }
    }
  }

  onCountrySearchKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Enter') {
      return;
    }

    const firstMatch = this.filteredCountries[0];
    if (!firstMatch) {
      return;
    }

    event.preventDefault();
    this.selectCountry(firstMatch);
  }

  onLocalInput(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (!input) {
      return;
    }

    const digitsOnly = input.value.replace(/[^\d]/g, '');
    if (digitsOnly === input.value) {
      return;
    }

    input.value = digitsOnly;
    this.formGroup.get(this.localControlName)?.setValue(digitsOnly);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  getContainerClasses(): string {
    const base = 'relative flex w-full rounded-xl border bg-white';
    return this.isControlInvalid(this.localControlName)
      ? `${base} border-rose-300`
      : `${base} border-zinc-300`;
  }

  trackByCountryCode(_: number, country: PhoneFormatData): string {
    return country.COUNTRY_CODE;
  }

  getCountryOptionId(countryCode: string): string {
    return `${this.countryListboxId}-${countryCode.toLowerCase()}`;
  }

  getFlagUrl(countryCode: string): string {
    return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isCountryMenuOpen) {
      return;
    }

    const target = event.target;
    if (target instanceof Node && this.hostElement.nativeElement.contains(target)) {
      return;
    }

    this.closeCountryMenu();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isCountryMenuOpen) {
      this.closeCountryMenu(true);
    }
  }

  private getControlValue(controlName: string): string | null {
    const control = this.formGroup.get(controlName);
    if (!control) {
      return null;
    }

    const value = control.value;
    return typeof value === 'string' ? value : null;
  }
}
