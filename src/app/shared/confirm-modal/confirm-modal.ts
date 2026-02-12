import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmService } from '../../core/services/confirm.service';
import { ConfirmOptions } from '../../core/models/confirm.model';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.css',
  animations: [
    trigger('backdrop', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0 }))
      ])
    ]),
    trigger('modal', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95) translateY(8px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'scale(0.95) translateY(8px)' }))
      ])
    ])
  ]
})
export class ConfirmModalComponent {
  @ViewChild('modal') modalRef!: ElementRef;
  @ViewChild('backdrop') backdropRef!: ElementRef;
  
  options: ConfirmOptions | null = null;

  constructor(private confirmService: ConfirmService) {
    this.confirmService.options$.subscribe(options => {
      this.options = options;
    });
  }

  onConfirm() {
    this.fadeOut();
    setTimeout(() => {
      this.confirmService.respond(true);
    }, 150);
  }

  onCancel() {
    this.fadeOut();
    setTimeout(() => {
      this.confirmService.respond(false);
    }, 100);
  }

  private fadeOut() {
    this.modalRef?.nativeElement.classList.add('fade-out');
    this.backdropRef?.nativeElement.classList.add('fade-out');
  }

  getIconPath(): string {
    switch (this.options?.type) {
      case 'danger':
        return 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z';
      case 'warning':
        return 'M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z';
      default:
        return 'M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z';
    }
  }

  getIconBg(): string {
    switch (this.options?.type) {
      case 'danger': return 'bg-rose-100';
      case 'warning': return 'bg-amber-100';
      default: return 'bg-sky-100';
    }
  }

  getIconColor(): string {
    switch (this.options?.type) {
      case 'danger': return 'text-rose-600';
      case 'warning': return 'text-amber-600';
      default: return 'text-sky-600';
    }
  }

  getConfirmBtnClass(): string {
    switch (this.options?.type) {
      case 'danger': return 'text-rose-600 hover:bg-rose-50 active:bg-rose-100';
      case 'warning': return 'text-amber-600 hover:bg-amber-50 active:bg-amber-100';
      default: return 'text-sky-600 hover:bg-sky-50 active:bg-sky-100';
    }
  }
}