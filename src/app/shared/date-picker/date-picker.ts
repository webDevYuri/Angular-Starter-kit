import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import flatpickr from 'flatpickr';
import { Instance as FlatpickrInstance } from 'flatpickr/dist/types/instance';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './date-picker.html',
  styleUrl: './date-picker.css'
})
export class DatePickerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('dateInput', { static: true }) dateInputRef!: ElementRef<HTMLInputElement>;

  @Input({ required: true }) formGroup!: FormGroup;
  @Input() controlName = 'date';
  @Input() label = 'Date';
  @Input() placeholder = 'Select date';
  @Input() hint = 'Pick a date from the calendar.';
  @Input() minDate?: string | Date;
  @Input() maxDate?: string | Date;
  @Input() initialViewDate?: string | Date;

  readonly inputId = `date-picker-${Math.random().toString(36).slice(2, 10)}`;

  private pickerInstance?: FlatpickrInstance;
  private controlValueSubscription?: Subscription;
  private calendarFieldObserver?: MutationObserver;

  ngAfterViewInit(): void {
    const control = this.formGroup.get(this.controlName);
    if (!control) {
      return;
    }

    const normalizedInitialValue = this.normalizeControlDateValue(control.value);
    const normalizedInitialViewDate = this.normalizeControlDateValue(this.initialViewDate);

    this.pickerInstance = flatpickr(this.dateInputRef.nativeElement, {
      dateFormat: 'Y-m-d',
      monthSelectorType: 'dropdown',
      disableMobile: true,
      allowInput: true,
      minDate: this.minDate,
      maxDate: this.maxDate,
      defaultDate: normalizedInitialValue || undefined,
      onChange: (_, dateString) => {
        control.setValue(dateString);
      },
      onClose: () => {
        control.markAsTouched();
      },
      onOpen: () => {
        this.applyCalendarFieldAccessibilityAttributes();
      },
      onMonthChange: () => {
        this.applyCalendarFieldAccessibilityAttributes();
      },
      onYearChange: () => {
        this.applyCalendarFieldAccessibilityAttributes();
      },
      onReady: () => {
        this.startCalendarFieldObserver();
        this.applyCalendarFieldAccessibilityAttributes();
        setTimeout(() => this.applyCalendarFieldAccessibilityAttributes(), 0);
        if (!normalizedInitialValue && normalizedInitialViewDate) {
          this.pickerInstance?.jumpToDate(normalizedInitialViewDate);
        }
      },
    });

    this.controlValueSubscription = control.valueChanges.subscribe((value) => {
      const normalizedControlValue = this.normalizeControlDateValue(value);
      const currentPickerValue = this.pickerInstance?.input.value ?? '';

      if (!normalizedControlValue && currentPickerValue) {
        this.pickerInstance?.clear();
        return;
      }

      if (normalizedControlValue && normalizedControlValue !== currentPickerValue) {
        this.pickerInstance?.setDate(normalizedControlValue, false, 'Y-m-d');
      }
    });
  }

  ngOnDestroy(): void {
    this.controlValueSubscription?.unsubscribe();
    this.calendarFieldObserver?.disconnect();
    this.pickerInstance?.destroy();
  }

  openCalendar(): void {
    this.applyCalendarFieldAccessibilityAttributes();
    this.pickerInstance?.open();
    setTimeout(() => this.applyCalendarFieldAccessibilityAttributes(), 0);
  }

  isInvalid(): boolean {
    const control = this.formGroup.get(this.controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  getContainerClasses(): string {
    const baseClasses =
      'flex items-center rounded-lg border bg-white transition-colors focus-within:ring-2';

    if (this.isInvalid()) {
      return `${baseClasses} border-rose-300 focus-within:border-rose-500 focus-within:ring-rose-200`;
    }

    return `${baseClasses} border-zinc-300 focus-within:border-zinc-900 focus-within:ring-zinc-200`;
  }

  get inputName(): string {
    return this.controlName || 'date';
  }

  private applyCalendarFieldAccessibilityAttributes(): void {
    const calendarContainer = this.pickerInstance?.calendarContainer;
    if (!calendarContainer) {
      return;
    }

    const monthSelect = calendarContainer.querySelector<HTMLSelectElement>('.flatpickr-monthDropdown-months');
    if (monthSelect) {
      monthSelect.id = `${this.inputId}-month`;
      monthSelect.name = `${this.inputName}-month`;
      monthSelect.setAttribute('aria-label', `${this.label} month`);
    }

    const yearInput = calendarContainer.querySelector<HTMLInputElement>('input.numInput.cur-year');
    if (yearInput) {
      yearInput.id = `${this.inputId}-year`;
      yearInput.name = `${this.inputName}-year`;
      yearInput.setAttribute('aria-label', `${this.label} year`);
    }
  }

  private startCalendarFieldObserver(): void {
    const calendarContainer = this.pickerInstance?.calendarContainer;
    if (!calendarContainer) {
      return;
    }

    this.calendarFieldObserver?.disconnect();
    this.calendarFieldObserver = new MutationObserver(() => {
      this.applyCalendarFieldAccessibilityAttributes();
    });

    this.calendarFieldObserver.observe(calendarContainer, {
      childList: true,
      subtree: true,
    });
  }

  private normalizeControlDateValue(value: unknown): string {
    if (typeof value === 'string') {
      return value.trim();
    }

    if (value instanceof Date && !Number.isNaN(value.getTime())) {
      return this.formatDateToYyyyMmDd(value);
    }

    return '';
  }

  private formatDateToYyyyMmDd(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
