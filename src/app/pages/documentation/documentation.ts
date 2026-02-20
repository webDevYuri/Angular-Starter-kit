import { Component, HostListener, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../core/services/sidebar.service';

@Component({
  selector: 'app-documentation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './documentation.html',
  styleUrl: './documentation.css'
})
export class DocumentationComponent implements AfterViewInit {
  readonly sidebarService = inject(SidebarService);
  ready = false;

  ngAfterViewInit() {
    setTimeout(() => this.ready = true);
  }

  activeSection: string = 'getting-started';

  sections = [
    { id: 'getting-started', label: 'Getting Started',     icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { id: 'folder',          label: 'Folder Structure',    icon: 'M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z' },
    { id: 'toast',           label: 'Toast Notifications', icon: 'M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 012.087 6.022c1.479.722 2.903 1.485 4.637 1.982.54.798.888 1.595 1.133 2.248' },
    { id: 'confirm',         label: 'Confirmation Modal',  icon: 'M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' },
    { id: 'aos',             label: 'AOS Animations',      icon: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5' }
  ];

  installSteps = [
    { title: 'Clone the repository',            desc: '',                                                        code: `git clone https://github.com/webDevYuri/Angular-Starter-kit.git\ncd Angular-Starter-kit`, note: '' },
    { title: 'Install dependencies',            desc: '',                                                        code: `npm install`,                                                                              note: '' },
    { title: 'Configure environment variables', desc: 'Copy the example file and update with your local values.', code: `cp src/environments/environment.ts.example src/environments/environment.ts`,             note: '' },
    { title: 'Start the development server',    desc: '',                                                        code: `npm start`,                                                                               note: 'Open http://localhost:4200 in your browser.' }
  ];

  npmScripts = [
    { cmd: 'npm start',     desc: 'Run the development server on port 4200' },
    { cmd: 'npm test',      desc: 'Run unit tests with Karma' },
    { cmd: 'npm run build', desc: 'Build for production output' }
  ];

  nextSteps = [
    { title: 'Explore the folder structure', desc: 'Check the "Folder Structure" section to understand the project organization.' },
    { title: 'Create your first page',       desc: 'Add a new component in <code class="bg-gray-100 px-1 rounded font-mono text-xs">src/app/pages/</code> and define its route in <code class="bg-gray-100 px-1 rounded font-mono text-xs">app.routes.ts</code>.' },
    { title: 'Leverage built-in services',   desc: 'Use <code class="bg-gray-100 px-1 rounded font-mono text-xs">ToastService</code> for notifications and <code class="bg-gray-100 px-1 rounded font-mono text-xs">ConfirmService</code> for user confirmations.' }
  ];

  coreFolders = [
    { path: 'core/services/',     desc: 'Singleton services provided at the root level. Handle global state, API communication, and cross-cutting concerns.',          code: `core/services/\n├── toast.service.ts       # Global toast notifications\n├── confirm.service.ts     # Confirmation modal dialogs\n├── auth.service.ts        # Authentication & token management\n├── api.service.ts         # Base HTTP client wrapper\n└── storage.service.ts     # LocalStorage/SessionStorage helper` },
    { path: 'core/data/',         desc: 'Data sources that handle API calls for specific resources. Each file maps to a backend endpoint or resource.',              code: `core/data/\n├── user.data.ts           # GET/POST/PUT /api/users\n├── product.data.ts        # GET/POST/PUT /api/products\n└── order.data.ts          # GET/POST /api/orders` },
    { path: 'core/guards/',       desc: 'Route guards that protect routes based on conditions like authentication status or user roles.',                              code: `core/guards/\n├── auth.guard.ts          # Redirect to login if unauthenticated\n└── role.guard.ts          # Check user role before granting access` },
    { path: 'core/interceptors/', desc: 'HTTP interceptors that modify requests/responses globally — attaching auth tokens or handling errors.',                     code: `core/interceptors/\n├── auth.interceptor.ts    # Attach Bearer token to requests\n└── error.interceptor.ts   # Catch HTTP errors, show toast` },
    { path: 'core/models/',       desc: 'TypeScript interfaces and types that define the shape of your data across the app.',                                         code: `core/models/\n├── user.model.ts          # interface User { id, name, email }\n├── product.model.ts       # interface Product { id, title, price }\n└── api-response.model.ts  # interface ApiResponse<T> { data, message }` },
    { path: 'core/pipes/',        desc: 'Custom Angular pipes for transforming data in templates.',                                                                    code: `core/pipes/\n├── time-ago.pipe.ts       # "5 minutes ago" from a Date\n├── truncate.pipe.ts       # Shorten long text with "..."\n└── currency-ph.pipe.ts    # Format to Philippine Peso` }
  ];

  toastMethods = [
    { call: 'toastService.success(message)', desc: 'Display a success notification' },
    { call: 'toastService.error(message)',   desc: 'Display an error notification' },
    { call: 'toastService.warning(message)', desc: 'Display a warning notification' },
    { call: 'toastService.info(message)',    desc: 'Display an info notification' }
  ];

  confirmTypes = [
    { name: 'danger',  desc: 'Red — for destructive actions like delete' },
    { name: 'warning', desc: 'Amber — for important cautionary actions' },
    { name: 'info',    desc: 'Blue — for informational confirmations' }
  ];

  aosAnimations = [
    { name: 'fade-up',    desc: 'Fade in from below' },
    { name: 'fade-down',  desc: 'Fade in from above' },
    { name: 'fade-left',  desc: 'Fade in from right' },
    { name: 'fade-right', desc: 'Fade in from left' },
    { name: 'zoom-in',    desc: 'Scale up into view' },
    { name: 'flip-up',    desc: 'Flip into view' }
  ];

  setActiveSection(sectionId: string) {
    this.activeSection = sectionId;
    this.sidebarService.close();
  }

  getActiveSectionLabel(): string {
    return this.sections.find(s => s.id === this.activeSection)?.label ?? '';
  }

  getStepLabel(i: number): string {
    return String(i + 1).padStart(2, '0');
  }

  @HostListener('document:keydown.escape')
  onEscape() { this.sidebarService.close(); }
}