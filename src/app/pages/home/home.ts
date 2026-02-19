import { Component, AfterViewInit } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmService } from '../../core/services/confirm.service';
import AOS from 'aos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements AfterViewInit {
  constructor(
    private toastService: ToastService,
    private confirmService: ConfirmService
  ) {}

  ngAfterViewInit() {
    setTimeout(() => {
      AOS.init({
        duration: 600,
        easing: 'ease-out',
        once: true,
        offset: 0,
      });
      AOS.refreshHard();
    }, 100);
  }

  showSuccess() {
    this.toastService.success('Operation completed successfully!');
  }

  showError() {
    this.toastService.error('Something went wrong. Please try again.');
  }

  showWarning() {
    this.toastService.warning('Please review your changes carefully.');
  }

  showInfo() {
    this.toastService.info('This is an informational message.');
  }

  async showDangerConfirm() {
    await this.confirmService.confirm({
      title: 'Delete Item',
      message: 'This action cannot be undone. Are you sure you want to proceed?',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      type: 'danger'
    });
  }

  async showWarningConfirm() {
    await this.confirmService.confirm({
      title: 'Unsaved Changes',
      message: 'You have unsaved changes. Do you want to leave without saving?',
      confirmText: 'Leave',
      cancelText: 'Stay',
      type: 'warning'
    });
  }

  async showInfoConfirm() {
    await this.confirmService.confirm({
      title: 'Confirm Action',
      message: 'Would you like to proceed with this action?',
      confirmText: 'Proceed',
      cancelText: 'Cancel',
      type: 'info'
    });
  }
}