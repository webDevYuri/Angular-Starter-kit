import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../core/services/toast.service';
import { Toast } from '../../core/models/toast.model';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class ToastComponent implements OnInit {
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toasts$.subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  removeToast(id: number) {
    this.toastService.remove(id);
  }

  getIconPath(type: string): string {
    switch (type) {
      case 'success':
        return 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
      case 'error':
        return 'M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
      case 'warning':
        return 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z';
      case 'info':
        return 'M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z';
      default:
        return 'M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z';
    }
  }

  getColorClasses(type: string): string {
    const base = 'pointer-events-auto flex items-center gap-3 min-w-[280px] max-w-sm p-3 rounded-lg shadow-lg border-l-4 ';
    switch (type) {
      case 'success':
        return base + 'bg-emerald-50 border-emerald-500 text-emerald-900';
      case 'error':
        return base + 'bg-rose-50 border-rose-500 text-rose-900';
      case 'warning':
        return base + 'bg-amber-50 border-amber-500 text-amber-900';
      case 'info':
        return base + 'bg-sky-50 border-sky-500 text-sky-900';
      default:
        return base + 'bg-slate-50 border-slate-500 text-slate-900';
    }
  }

  getIconColor(type: string): string {
    switch (type) {
      case 'success': return 'text-emerald-500';
      case 'error':   return 'text-rose-500';
      case 'warning': return 'text-amber-500';
      case 'info':    return 'text-sky-500';
      default:        return 'text-slate-500';
    }
  }

  getProgressBarColor(type: string): string {
    switch (type) {
      case 'success': return 'bg-emerald-500';
      case 'error':   return 'bg-rose-500';
      case 'warning': return 'bg-amber-500';
      case 'info':    return 'bg-sky-500';
      default:        return 'bg-slate-500';
    }
  }

  getBorderColor(type: string): string {
    switch (type) {
      case 'success': return 'border-emerald-200';
      case 'error':   return 'border-rose-200';
      case 'warning': return 'border-amber-200';
      case 'info':    return 'border-sky-200';
      default:        return 'border-gray-200';
    }
  }

  getIconBgColor(type: string): string {
    switch (type) {
      case 'success': return 'bg-emerald-100';
      case 'error':   return 'bg-rose-100';
      case 'warning': return 'bg-amber-100';
      case 'info':    return 'bg-sky-100';
      default:        return 'bg-gray-100';
    }
  }
}