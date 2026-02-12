import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ConfirmOptions } from '../models/confirm.model';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  private optionsSubject = new BehaviorSubject<ConfirmOptions | null>(null);
  private responseSubject = new Subject<boolean>();

  options$ = this.optionsSubject.asObservable();

  confirm(options: ConfirmOptions): Promise<boolean> {
    this.optionsSubject.next({
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      type: 'info',
      ...options
    });

    return new Promise<boolean>(resolve => {
      const sub = this.responseSubject.subscribe(result => {
        sub.unsubscribe();
        resolve(result);
      });
    });
  }

  respond(result: boolean) {
    this.optionsSubject.next(null);
    this.responseSubject.next(result);
  }
}
