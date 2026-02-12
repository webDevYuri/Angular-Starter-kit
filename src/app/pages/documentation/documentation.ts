import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-documentation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './documentation.html',
  styleUrl: './documentation.css'
})
export class DocumentationComponent {
  activeSection: string = 'folder';

  sections = [
    { id: 'folder', label: 'Folder Structure', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9m-9-6h0m-9 6h18M9 5h6m-6 0a2 2 0 100-4 2 2 0 000 4z' },
    { id: 'toast', label: 'Toast Notifications', icon: 'M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 012.087 6.022c1.479.722 2.903 1.485 4.637 1.982.54.798.888 1.595 1.133 2.248C13.91 21.646 14.902 22 16 22c1.097 0 2.09-.355 2.857-.944' },
    { id: 'confirm', label: 'Confirmation Modal', icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'aos', label: 'AOS Animations', icon: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5' },
    { id: 'getting-started', label: 'Getting Started', icon: 'M13 10V3L4 14h7v7l9-11h-7z' }
  ];

  setActiveSection(sectionId: string) {
    this.activeSection = sectionId;
  }

  onMobileSelectChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.setActiveSection(value);
  }
}
