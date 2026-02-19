import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarService } from '../../core/services/sidebar.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, NgClass],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayoutComponent {
  constructor(
    public router: Router,
    public sidebarService: SidebarService
  ) {}

  get isDocumentation(): boolean {
    return this.router.url.startsWith('/documentation');
  }
}