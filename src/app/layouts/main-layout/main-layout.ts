import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarService } from '../../core/services/sidebar.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule],
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