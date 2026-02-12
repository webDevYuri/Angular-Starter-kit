import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from '../models/toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toasts.asObservable();
  private nextId = 1;

  /**
   * Display a toast notification
   * @param message Notification message text
   * @param type Notification type (success, error, warning, info)
   * @param duration Display duration in milliseconds
   */
  show(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', duration: number = 3000) {
    const toast: Toast = {
      id: this.nextId++,
      message,
      type,
      duration
    };

    const currentToasts = this.toasts.value;
    this.toasts.next([...currentToasts, toast]);

    setTimeout(() => {
      this.remove(toast.id);
    }, duration);
  }

  /**
   * Display success toast notification
   * @param message Success message
   * @param duration Display duration in milliseconds (default: 3000)
   */
  success(message: string, duration: number = 3000) {
    this.show(message, 'success', duration);
  }

  /**
   * Display error toast notification
   * @param message Error message
   * @param duration Display duration in milliseconds (default: 3000)
   */
  error(message: string, duration: number = 3000) {
    this.show(message, 'error', duration);
  }

  /**
   * Display warning toast notification
   * @param message Warning message
   * @param duration Display duration in milliseconds (default: 3000)
   */
  warning(message: string, duration: number = 3000) {
    this.show(message, 'warning', duration);
  }

  /**
   * Display info toast notification
   * @param message Information message
   * @param duration Display duration in milliseconds (default: 3000)
   */
  info(message: string, duration: number = 3000) {
    this.show(message, 'info', duration);
  }

  /**
   * Remove a toast notification by ID
   * @param id Toast notification ID
   */
  remove(id: number) {
    const currentToasts = this.toasts.value;
    this.toasts.next(currentToasts.filter(t => t.id !== id));
  }
}
