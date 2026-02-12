import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/toast/toast';
import { ConfirmModalComponent } from './shared/confirm-modal/confirm-modal';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent, ConfirmModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  ngOnInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-out',
      once: true,
      offset: 0
    });
  }
}
