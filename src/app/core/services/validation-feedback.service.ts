/**
 * Form validation feedback utilities that map validation errors to messages
 * and expose toast/confirm modal helpers for invalid form states.
 */
import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';
import { VALIDATION_MESSAGES, ValidationMessageResolver } from '../constants';
import { ConfirmService } from './confirm.service';
import { ToastService } from './toast.service';

export interface ValidationFeedbackOptions {
  fieldLabels?: Record<string, string>;
  maxMessages?: number;
  markAllAsTouched?: boolean;
}

export interface ValidationToastOptions extends ValidationFeedbackOptions {
  durationMs?: number;
  prefixMessage?: string;
}

export interface ValidationConfirmOptions extends ValidationFeedbackOptions {
  title?: string;
  confirmText?: string;
  cancelText?: string;
  previewLimit?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ValidationFeedbackService {
  constructor(
    private readonly toastService: ToastService,
    private readonly confirmService: ConfirmService
  ) {}

  getValidationMessages(
    control: AbstractControl,
    options: ValidationFeedbackOptions = {}
  ): string[] {
    const fieldLabels = options.fieldLabels ?? {};
    const maxMessages = options.maxMessages ?? Number.POSITIVE_INFINITY;
    const messages = this.collectValidationMessages(control, fieldLabels, '', maxMessages);

    return Array.from(new Set(messages));
  }

  showInvalidFormToast(
    control: AbstractControl,
    options: ValidationToastOptions = {}
  ): string[] {
    if (options.markAllAsTouched ?? true) {
      control.markAllAsTouched();
    }

    const messages = this.getValidationMessages(control, options);

    if (messages.length === 0) {
      return [];
    }

    const firstMessage = messages[0];
    const remainingCount = messages.length - 1;
    const suffix = remainingCount > 0 ? ` (+${remainingCount} more)` : '';
    const prefix = options.prefixMessage ?? 'Please review the form.';

    this.toastService.error(`${prefix} ${firstMessage}${suffix}`, options.durationMs ?? 4500);

    return messages;
  }

  async confirmInvalidForm(
    control: AbstractControl,
    options: ValidationConfirmOptions = {}
  ): Promise<boolean> {
    if (options.markAllAsTouched ?? true) {
      control.markAllAsTouched();
    }

    const messages = this.getValidationMessages(control, options);

    if (messages.length === 0) {
      return true;
    }

    const previewLimit = options.previewLimit ?? 3;
    const previewMessages = messages.slice(0, previewLimit);
    const hiddenCount = messages.length - previewMessages.length;
    const listText = previewMessages.map((message, index) => `${index + 1}. ${message}`).join('\n');
    const moreText = hiddenCount > 0 ? `\n+ ${hiddenCount} more issue(s).` : '';

    return this.confirmService.confirm({
      title: options.title ?? 'Form has validation issues',
      message: `Please review:\n${listText}${moreText}\n\nDo you want to continue anyway?`,
      confirmText: options.confirmText ?? 'Continue',
      cancelText: options.cancelText ?? 'Review Form',
      type: 'warning',
    });
  }

  private collectValidationMessages(
    control: AbstractControl,
    fieldLabels: Record<string, string>,
    controlPath: string,
    maxMessages: number
  ): string[] {
    const messages: string[] = [];

    if (control.errors) {
      messages.push(...this.resolveErrorMessages(control.errors, controlPath, fieldLabels));
    }

    if (messages.length >= maxMessages) {
      return messages.slice(0, maxMessages);
    }

    if (control instanceof FormGroup) {
      Object.entries(control.controls).forEach(([key, childControl]) => {
        if (messages.length >= maxMessages) {
          return;
        }

        const childPath = controlPath ? `${controlPath}.${key}` : key;
        messages.push(
          ...this.collectValidationMessages(
            childControl,
            fieldLabels,
            childPath,
            maxMessages - messages.length
          )
        );
      });
    }

    if (control instanceof FormArray) {
      control.controls.forEach((childControl, index) => {
        if (messages.length >= maxMessages) {
          return;
        }

        const childPath = `${controlPath}[${index}]`;
        messages.push(
          ...this.collectValidationMessages(
            childControl,
            fieldLabels,
            childPath,
            maxMessages - messages.length
          )
        );
      });
    }

    return messages.slice(0, maxMessages);
  }

  private resolveErrorMessages(
    errors: ValidationErrors,
    controlPath: string,
    fieldLabels: Record<string, string>
  ): string[] {
    const fieldLabel = this.resolveFieldLabel(controlPath, fieldLabels);

    return Object.entries(errors).map(([errorKey, errorValue]) => {
      const resolver = (VALIDATION_MESSAGES as Record<string, ValidationMessageResolver>)[errorKey];
      const baseMessage = resolver ? resolver(errorValue) : 'Invalid value.';

      return fieldLabel ? `${fieldLabel}: ${baseMessage}` : baseMessage;
    });
  }

  private resolveFieldLabel(
    controlPath: string,
    fieldLabels: Record<string, string>
  ): string | null {
    if (!controlPath) {
      return null;
    }

    const mappedLabel = fieldLabels[controlPath];
    if (mappedLabel) {
      return mappedLabel;
    }

    const pathParts = controlPath.split('.');
    const lastSegment = pathParts[pathParts.length - 1];

    return this.humanizeFieldKey(lastSegment);
  }

  private humanizeFieldKey(fieldKey: string): string {
    return fieldKey
      .replace(/\[\d+\]/g, '')
      .replace(/[_-]+/g, ' ')
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/^./, (char) => char.toUpperCase());
  }
}
