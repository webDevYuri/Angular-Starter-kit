import { AfterViewInit, Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SidebarService } from '../../core/services/sidebar.service';
import { DatePickerComponent } from '../../shared/date-picker/date-picker';
import { PhoneInputComponent } from '../../shared/phone-input/phone-input';
import {
  matchFieldsValidator,
  minAgeValidator,
  nameFormatValidator,
  noWhitespaceValidator,
  phoneLocalByCountryValidator,
  strongPasswordValidator,
  usernameValidator
} from '../../core/validators';
import { ToastService } from '../../core/services/toast.service';
import { ValidationFeedbackService } from '../../core/services/validation-feedback.service';
import { PHONE_FORMATS_DATA } from '../../core/data/phone-formats.data';

@Component({
  selector: 'app-documentation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePickerComponent, PhoneInputComponent],
  templateUrl: './documentation.html',
  styleUrl: './documentation.css'
})
export class DocumentationComponent implements AfterViewInit {
  readonly formBuilder = inject(FormBuilder);
  readonly sidebarService = inject(SidebarService);
  readonly activatedRoute = inject(ActivatedRoute);
  readonly toastService = inject(ToastService);
  readonly validationFeedbackService = inject(ValidationFeedbackService);

  ready = false;
  activeSection = 'getting-started';
  private ignoreScrollSyncUntil = 0;

  sections = [
    { id: 'getting-started', label: 'Getting Started', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { id: 'folder', label: 'Folder Structure', icon: 'M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z' },
    { id: 'cleanup', label: 'Template Cleanup', icon: 'M3 6.75h18M8.25 6.75V4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V6.75m-9 0h9m-9 0V18a2.25 2.25 0 0 0 2.25 2.25h4.5A2.25 2.25 0 0 0 15.75 18V6.75' },
    { id: 'constants', label: 'Core Constants', icon: 'M12 6v12m6-6H6' },
    { id: 'validators', label: 'Form Validators', icon: 'M9 12.75 11.25 15 15 9.75M4.5 12.75l2.25 2.25 4.5-4.5' },
    { id: 'toast', label: 'Toast Notifications', icon: 'M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 012.087 6.022c1.479.722 2.903 1.485 4.637 1.982.54.798.888 1.595 1.133 2.248' },
    { id: 'confirm', label: 'Confirmation Modal', icon: 'M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' },
    { id: 'aos', label: 'AOS Animations', icon: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5' }
  ];

  installSteps = [
    { title: 'Clone the repository', desc: '', code: 'git clone https://github.com/webDevYuri/Angular-Starter-kit.git\ncd Angular-Starter-kit', note: '' },
    { title: 'Install dependencies', desc: '', code: 'npm install', note: '' },
    { title: 'Configure environment variables', desc: 'Copy the example file and update with your local values.', code: 'cp src/environments/environment.ts.example src/environments/environment.ts', note: '' },
    { title: 'Start the development server', desc: '', code: 'npm start', note: 'Open http://localhost:4200 in your browser.' }
  ];

  npmScripts = [
    { cmd: 'npm start', desc: 'Run the development server on port 4200' },
    { cmd: 'npm test', desc: 'Run unit tests with Karma' },
    { cmd: 'npm run build', desc: 'Build for production output' }
  ];

  nextSteps = [
    { title: 'Explore the folder structure', desc: 'Check the "Folder Structure" section to understand the project organization.' },
    { title: 'Run template cleanup', desc: 'Open "Template Cleanup" for one-line commands and route updates if you want a lean baseline.' },
    { title: 'Review core constants', desc: 'Open the "Core Constants" section to see available files and import rules.' },
    { title: 'Review form validators', desc: 'Open the "Form Validators" section to apply reusable validation logic in reactive forms.' },
    { title: 'Create your first page', desc: 'Add a new component in <code class="bg-gray-100 px-1 rounded font-mono text-xs">src/app/pages/</code> and define its route in <code class="bg-gray-100 px-1 rounded font-mono text-xs">app.routes.ts</code>.' },
    { title: 'Leverage built-in services', desc: 'Use <code class="bg-gray-100 px-1 rounded font-mono text-xs">ToastService</code> for notifications and <code class="bg-gray-100 px-1 rounded font-mono text-xs">ConfirmService</code> for user confirmations.' }
  ];

  cleanupPrinciples = [
    'Keep the folder structure; remove only files you will not use.',
    'Start with placeholder sample files first because they are safe to delete.',
    'After deleting starter pages/components, update routes and root imports in the same pass.'
  ];

  cleanupSafeCommand = `Get-ChildItem src/app/core -Recurse -File -Filter 'sample.*' | Remove-Item -Force`;

  cleanupOptionalDocsCommand = `if (Test-Path 'src/app/pages/documentation') { Remove-Item -Recurse -Force 'src/app/pages/documentation' }`;

  cleanupRouteExample = `import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout';
import { HomeComponent } from './pages/home/home';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' }
    ]
  }
];`;

  cleanupChecklist = [
    'Update src/app/app.routes.ts after deleting any starter pages.',
    'If you remove toast or confirm-modal, update imports in src/app/app.ts.',
    'Run npm run build immediately after cleanup to catch missing imports early.'
  ];

  coreFolders = [
    {
      path: 'core/constants/',
      desc: 'Centralized immutable values grouped by domain. Keep this folder static (no transformation logic).',
      code: `core/constants/
|-- api-config.constant.ts         # API base URL, version, timeout, headers
|-- api-endpoints.constant.ts      # AUTH and USERS endpoint templates
|-- app-config.constant.ts         # Pagination, debounce, date, upload limits
|-- auth.constant.ts               # Token keys and auth header metadata
|-- feature-flags.constant.ts      # Feature toggles by domain
|-- http-status.constant.ts        # HTTP status code groups
|-- query-params.constant.ts       # Query key names and sort orders
|-- regex.constant.ts              # Validation regex patterns
|-- roles-permissions.constant.ts  # Roles, permissions, role mapping
|-- route-paths.constant.ts        # Public, auth, protected route paths
|-- storage-keys.constant.ts       # Namespaced local/session storage keys
|-- ui.constant.ts                 # Breakpoints, z-index, animation durations
|-- validation-messages.constant.ts # Validation error key to UI message resolvers
\\-- index.ts                      # Barrel exports for all constants`
    },
    {
      path: 'core/data/',
      desc: 'Static reference datasets and reusable data maps used across forms and UI modules.',
      code: `core/data/
\\-- phone-formats.data.ts  # Country code, dial code, and local phone rules`
    },
    {
      path: 'core/directives/',
      desc: 'Custom attribute directives that add reusable behavior to DOM elements without creating full components.',
      code: `core/directives/
|-- click-outside.directive.ts  # Detect clicks outside an element
|-- auto-focus.directive.ts     # Auto-focus input on render
\\-- debounce-click.directive.ts # Prevent rapid double-clicks`
    },
    {
      path: 'core/enums/',
      desc: 'Use enums only when their runtime behavior is required. Prefer const objects for static value sets.',
      code: `core/enums/
|-- user-role.enum.ts      # Admin, Editor, Viewer
|-- status.enum.ts         # Active, Inactive, Pending
\\-- process.enum.ts        # Runtime enum use cases`
    },
    {
      path: 'core/guards/',
      desc: 'Route guards that protect routes based on conditions like authentication status or user roles.',
      code: `core/guards/
|-- auth.guard.ts          # Redirect to login if unauthenticated
\\-- role.guard.ts          # Check user role before granting access`
    },
    {
      path: 'core/interceptors/',
      desc: 'HTTP interceptors that modify requests or responses globally, such as attaching auth tokens or handling errors.',
      code: `core/interceptors/
|-- auth.interceptor.ts    # Attach Bearer token to requests
\\-- error.interceptor.ts   # Catch HTTP errors, show toast`
    },
    {
      path: 'core/interfaces/',
      desc: 'TypeScript interfaces that define object and API response shapes for type safety.',
      code: `core/interfaces/
|-- user.interface.ts      # IUser, IUserProfile
|-- api-response.interface.ts # IApiResponse<T>, IPaginatedResponse<T>
\\-- table.interface.ts     # ITableColumn, ITableConfig`
    },
    {
      path: 'core/models/',
      desc: 'TypeScript classes with behavior, computed properties, methods, and constructor logic.',
      code: `core/models/
|-- toast.model.ts         # Toast class with type, message, duration
|-- confirm.model.ts       # ConfirmOptions with defaults
\\-- user.model.ts          # User class with getInitials(), fullName`
    },
    {
      path: 'core/pipes/',
      desc: 'Custom Angular pipes for template transformations. Keep validation rules and static patterns in constants.',
      code: `core/pipes/
|-- time-ago.pipe.ts       # "5 minutes ago" from a Date
|-- truncate.pipe.ts       # Shorten long text with "..."
\\-- currency-ph.pipe.ts    # Format to Philippine Peso`
    },
    {
      path: 'core/services/',
      desc: 'Singleton services provided at the root level for global state, API communication, and cross-cutting concerns.',
      code: `core/services/
|-- toast.service.ts       # Global toast notifications
|-- confirm.service.ts     # Confirmation modal dialogs
|-- validation-feedback.service.ts # Form validation to toast/confirm feedback bridge
|-- auth.service.ts        # Authentication and token management
|-- api.service.ts         # Base HTTP client wrapper
\\-- storage.service.ts     # LocalStorage and SessionStorage helper`
    },
    {
      path: 'core/utils/',
      desc: 'Pure helper functions with no side effects, such as formatting, parsing, and data transformation.',
      code: `core/utils/
|-- date.util.ts           # Format dates, calculate differences
|-- string.util.ts         # Capitalize, slugify, truncate
\\-- file.util.ts           # File size formatting, extensions`
    },
    {
      path: 'core/validators/',
      desc: 'Custom form validators for reactive and template-driven forms beyond Angular built-in validators.',
      code: `core/validators/
|-- date-range.validator.ts         # Ensure start date is before end date
|-- email-available.validator.ts    # Async email availability check
|-- file-size.validator.ts          # File size validation using APP_CONFIG
|-- file-type.validator.ts          # MIME type / extension whitelist
|-- match-fields.validator.ts       # Confirm fields have matching values
|-- min-age.validator.ts            # Minimum age validation from birth date
|-- name-format.validator.ts        # First/last/full-name format validation
|-- no-whitespace.validator.ts      # Disallow leading/trailing/only spaces
|-- phone-international.validator.ts # International phone number format
|-- phone-local-by-country.validator.ts # Local number validation by selected country
|-- strong-password.validator.ts    # Password strength validation
|-- username-available.validator.ts # Async username availability check
|-- username.validator.ts           # Username format validation
\\-- index.ts                       # Barrel exports for validators`
    }
  ];

  constantFiles = [
    { file: 'api-config.constant.ts', exportName: 'API_CONFIG', purpose: 'API transport defaults such as base URL, version, timeout, and headers.' },
    { file: 'api-endpoints.constant.ts', exportName: 'API_ENDPOINTS', purpose: 'Endpoint templates grouped by AUTH and USERS domains.' },
    { file: 'app-config.constant.ts', exportName: 'APP_CONFIG', purpose: 'Global app defaults for pagination, debounce, date format, and upload limits.' },
    { file: 'auth.constant.ts', exportName: 'AUTH_CONFIG', purpose: 'Token storage keys and authorization header metadata.' },
    { file: 'feature-flags.constant.ts', exportName: 'FEATURE_FLAGS', purpose: 'Feature toggles grouped by modules (AUTH, DASHBOARD, SYSTEM).' },
    { file: 'http-status.constant.ts', exportName: 'HTTP_STATUS', purpose: 'Grouped HTTP status codes for success and error handling.' },
    { file: 'query-params.constant.ts', exportName: 'QUERY_PARAMS, SORT_ORDERS', purpose: 'Standard query parameter keys and sort order values.' },
    { file: 'regex.constant.ts', exportName: 'REGEX_PATTERNS', purpose: 'Validation patterns for email, phone, password, names, username, OTP, and slug.' },
    { file: 'roles-permissions.constant.ts', exportName: 'ROLES, PERMISSIONS, ROLE_PERMISSIONS', purpose: 'Authorization constants for guards and permission checks.' },
    { file: 'route-paths.constant.ts', exportName: 'ROUTE_PATHS', purpose: 'Canonical route paths grouped by PUBLIC, AUTH, and PROTECTED.' },
    { file: 'storage-keys.constant.ts', exportName: 'STORAGE_KEYS', purpose: 'Namespaced keys for user state and preferences in storage.' },
    { file: 'ui.constant.ts', exportName: 'UI_BREAKPOINTS, UI_Z_INDEX, UI_ANIMATION_DURATION_MS', purpose: 'Reusable UI tokens for responsive and layering behavior.' },
    { file: 'validation-messages.constant.ts', exportName: 'VALIDATION_MESSAGES', purpose: 'Validation error key resolvers used by form feedback/toast flows.' }
  ];

  constantPrinciples = [
    'Use UPPER_SNAKE_CASE for exported constants.',
    'Use as const for immutable and strongly typed values.',
    'Prefer grouped const objects over enums for static value sets.',
    'Import from the barrel file in src/app/core/constants/index.ts.',
    'Keep constants static only; move transforms to pipes and behavior to services.'
  ];

  constantsImportExample = `import { API_CONFIG, ROUTE_PATHS, REGEX_PATTERNS } from 'src/app/core/constants';

const loginPath = ROUTE_PATHS.AUTH.LOGIN;
const requestTimeout = API_CONFIG.REQUEST_TIMEOUT_MS;
const emailPattern = REGEX_PATTERNS.EMAIL;`;

  validatorFiles = [
    { file: 'match-fields.validator.ts', exportName: 'matchFieldsValidator', kind: 'Group', purpose: 'Checks two fields in the same form group for equal values.' },
    { file: 'strong-password.validator.ts', exportName: 'strongPasswordValidator', kind: 'Control', purpose: 'Applies REGEX_PATTERNS.STRONG_PASSWORD to password fields.' },
    { file: 'name-format.validator.ts', exportName: 'nameFormatValidator', kind: 'Control', purpose: 'Validates first name, last name, or full name format.' },
    { file: 'phone-international.validator.ts', exportName: 'phoneInternationalValidator', kind: 'Control', purpose: 'Validates full E.164-style international phone values.' },
    { file: 'phone-local-by-country.validator.ts', exportName: 'phoneLocalByCountryValidator', kind: 'Control', purpose: 'Validates local number format based on selected country.' },
    { file: 'username.validator.ts', exportName: 'usernameValidator', kind: 'Control', purpose: 'Validates username format constraints.' },
    { file: 'no-whitespace.validator.ts', exportName: 'noWhitespaceValidator', kind: 'Control', purpose: 'Rejects leading, trailing, or all-whitespace values.' },
    { file: 'date-range.validator.ts', exportName: 'dateRangeValidator', kind: 'Group', purpose: 'Ensures start date is not later than end date.' },
    { file: 'min-age.validator.ts', exportName: 'minAgeValidator', kind: 'Control', purpose: 'Ensures minimum age based on date-of-birth input.' },
    { file: 'file-size.validator.ts', exportName: 'fileSizeValidator', kind: 'Control', purpose: 'Validates max upload size using APP_CONFIG defaults.' },
    { file: 'file-type.validator.ts', exportName: 'fileTypeValidator', kind: 'Control', purpose: 'Validates MIME types and extensions against allow-list.' },
    { file: 'email-available.validator.ts', exportName: 'emailAvailableValidator', kind: 'Async', purpose: 'Checks email availability via API callback.' },
    { file: 'username-available.validator.ts', exportName: 'usernameAvailableValidator', kind: 'Async', purpose: 'Checks username availability via API callback.' },
    { file: 'index.ts', exportName: 'barrel exports', kind: 'Module', purpose: 'Single import entry for all validators.' }
  ];

  validatorPrinciples = [
    'Return stable error keys and let UI map messages separately.',
    'Use constants for regex and limits instead of hardcoded values.',
    'Keep validators pure and side-effect free.',
    'Use AsyncValidatorFn only for remote checks (availability/uniqueness).',
    'Import validators from src/app/core/validators/index.ts.'
  ];

  validatorsImportExample = `import { FormBuilder, Validators } from '@angular/forms';
import {
  matchFieldsValidator,
  strongPasswordValidator,
  emailAvailableValidator
} from 'src/app/core/validators';

this.form = this.fb.group(
  {
    email: ['', [Validators.required, Validators.email], [emailAvailableValidator(checkEmail)]],
    password: ['', [Validators.required, strongPasswordValidator()]],
    confirmPassword: ['', [Validators.required]]
  },
  { validators: [matchFieldsValidator('password', 'confirmPassword')] }
);`;

  validatorUiFeedbackExample = `import { ValidationFeedbackService } from 'src/app/core/services/validation-feedback.service';

constructor(private validationFeedback: ValidationFeedbackService) {}

async submit() {
  if (this.form.invalid) {
    this.validationFeedback.showInvalidFormToast(this.form, {
      fieldLabels: { email: 'Email', password: 'Password' }
    });

    const proceed = await this.validationFeedback.confirmInvalidForm(this.form);
    if (!proceed) {
      return;
    }
  }

  // continue submit flow
}`;

  phoneInputComponentExample = `<app-phone-input
  [formGroup]="form"
  countryControlName="phoneCountry"
  localControlName="phoneLocal"
  label="Phone Number"
/>`;

  datePickerComponentExample = `<app-date-picker
  [formGroup]="form"
  controlName="dateOfBirth"
  label="Date of Birth"
  placeholder="Select your birth date"
  hint="Use the calendar or type YYYY-MM-DD."
  [initialViewDate]="'2000-01-01'"
/>`;

  readonly validatorPlaygroundFieldLabels = {
    firstName: 'First Name',
    username: 'Username',
    email: 'Email',
    phoneCountry: 'Phone Country',
    phoneLocal: 'Phone Number',
    dateOfBirth: 'Date of Birth',
    password: 'Password',
    confirmPassword: 'Confirm Password',
  } as const;

  validatorPlaygroundSubmitted = false;

  validatorPlaygroundForm = this.formBuilder.group(
    {
      firstName: [
        '',
        [Validators.required, nameFormatValidator('FIRST_NAME'), noWhitespaceValidator()]
      ],
      username: ['', [Validators.required, usernameValidator()]],
      email: ['', [Validators.required, Validators.email]],
      phoneCountry: [PHONE_FORMATS_DATA[0].COUNTRY_CODE, [Validators.required]],
      phoneLocal: ['', [Validators.required, phoneLocalByCountryValidator('phoneCountry')]],
      dateOfBirth: ['', [Validators.required, minAgeValidator(18)]],
      password: ['', [Validators.required, strongPasswordValidator()]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [matchFieldsValidator('password', 'confirmPassword')]
    }
  );

  getValidatorPlaygroundFieldMessages(controlName: string): string[] {
    const control = this.validatorPlaygroundForm.get(controlName);

    if (!control || !this.shouldShowControlErrors(control)) {
      return [];
    }

    return this.validationFeedbackService.getValidationMessages(control, {
      maxMessages: 2
    });
  }

  getValidatorPlaygroundSummaryMessages(): string[] {
    if (!this.validatorPlaygroundSubmitted) {
      return [];
    }

    return this.validationFeedbackService.getValidationMessages(this.validatorPlaygroundForm, {
      fieldLabels: this.validatorPlaygroundFieldLabels,
      maxMessages: 6
    });
  }

  isValidatorPlaygroundControlInvalid(controlName: string): boolean {
    const control = this.validatorPlaygroundForm.get(controlName);
    return !!control && this.shouldShowControlErrors(control);
  }

  getValidatorPlaygroundInputClasses(controlName: string): string {
    const baseClasses =
      'w-full rounded-lg border px-3 py-2 text-sm text-zinc-900 bg-white transition-colors focus:outline-none focus:ring-2';

    if (this.isValidatorPlaygroundControlInvalid(controlName)) {
      return `${baseClasses} border-rose-300 focus:border-rose-500 focus:ring-rose-200`;
    }

    return `${baseClasses} border-zinc-300 focus:border-zinc-900 focus:ring-zinc-200`;
  }

  async submitValidatorPlayground(): Promise<void> {
    this.validatorPlaygroundSubmitted = true;

    if (this.validatorPlaygroundForm.invalid) {
      this.validationFeedbackService.showInvalidFormToast(this.validatorPlaygroundForm, {
        fieldLabels: this.validatorPlaygroundFieldLabels,
        maxMessages: 6,
        prefixMessage: 'Validation demo: please fix highlighted fields.'
      });
      return;
    }

    this.toastService.success('Validation demo passed. The form is ready to submit.');
  }

  async tryContinueWithInvalidValidatorPlayground(): Promise<void> {
    this.validatorPlaygroundSubmitted = true;

    if (this.validatorPlaygroundForm.valid) {
      this.toastService.info('Form is already valid. Submit it directly.');
      return;
    }

    const shouldContinue = await this.validationFeedbackService.confirmInvalidForm(
      this.validatorPlaygroundForm,
      {
        fieldLabels: this.validatorPlaygroundFieldLabels,
        title: 'Continue with invalid demo form?',
        confirmText: 'Continue Demo',
        cancelText: 'Fix Form',
        previewLimit: 4
      }
    );

    if (shouldContinue) {
      this.toastService.warning('Demo continued with invalid values.');
      return;
    }

    this.toastService.info('Review the fields and try again.');
  }

  resetValidatorPlayground(): void {
    this.validatorPlaygroundSubmitted = false;
    this.validatorPlaygroundForm.reset({
      firstName: '',
      username: '',
      email: '',
      phoneCountry: PHONE_FORMATS_DATA[0].COUNTRY_CODE,
      phoneLocal: '',
      dateOfBirth: '',
      password: '',
      confirmPassword: '',
    });
  }

  toastMethods = [
    { call: 'toastService.success(message)', desc: 'Display a success notification' },
    { call: 'toastService.error(message)', desc: 'Display an error notification' },
    { call: 'toastService.warning(message)', desc: 'Display a warning notification' },
    { call: 'toastService.info(message)', desc: 'Display an info notification' }
  ];

  confirmTypes = [
    { name: 'danger', desc: 'Red - for destructive actions like delete' },
    { name: 'warning', desc: 'Amber - for important cautionary actions' },
    { name: 'info', desc: 'Blue - for informational confirmations' }
  ];

  aosAnimations = [
    { name: 'fade-up', desc: 'Fade in from below' },
    { name: 'fade-down', desc: 'Fade in from above' },
    { name: 'fade-left', desc: 'Fade in from right' },
    { name: 'fade-right', desc: 'Fade in from left' },
    { name: 'zoom-in', desc: 'Scale up into view' },
    { name: 'flip-up', desc: 'Flip into view' }
  ];

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.ready = true;
      this.applyInitialSectionFromUrl();
      this.syncActiveSectionFromViewport();
    });
  }

  setActiveSection(sectionId: string): void {
    this.activeSection = sectionId;
    this.sidebarService.close();
    this.scrollToSection(sectionId);
  }

  getActiveSectionLabel(): string {
    return this.sections.find((section) => section.id === this.activeSection)?.label ?? '';
  }

  getStepLabel(i: number): string {
    return String(i + 1).padStart(2, '0');
  }

  getSectionElementId(sectionId: string): string {
    return `doc-section-${sectionId}`;
  }

  private applyInitialSectionFromUrl(): void {
    const sectionFromQuery = this.activatedRoute.snapshot.queryParamMap.get('section');
    const sectionFromFragment = this.activatedRoute.snapshot.fragment;
    const requestedSection = sectionFromQuery ?? sectionFromFragment;

    if (!requestedSection) {
      return;
    }

    if (this.sections.some((section) => section.id === requestedSection)) {
      this.activeSection = requestedSection;
      this.scrollToSection(requestedSection, false);
      return;
    }

    this.syncActiveSectionFromViewport();
  }

  private scrollToSection(sectionId: string, smooth = true): void {
    const sectionElement = document.getElementById(this.getSectionElementId(sectionId));
    if (!sectionElement) {
      return;
    }

    const headerOffset = 96;
    const targetTop = Math.max(window.scrollY + sectionElement.getBoundingClientRect().top - headerOffset, 0);
    this.ignoreScrollSyncUntil = Date.now() + (smooth ? 500 : 0);

    window.scrollTo({
      top: targetTop,
      behavior: smooth ? 'smooth' : 'auto'
    });
  }

  private syncActiveSectionFromViewport(): void {
    if (Date.now() < this.ignoreScrollSyncUntil || this.sections.length === 0) {
      return;
    }

    const sectionTopOffset = 130;
    let nextActiveSection = this.sections[0].id;

    for (const section of this.sections) {
      const sectionElement = document.getElementById(this.getSectionElementId(section.id));
      if (!sectionElement) {
        continue;
      }

      if (sectionElement.getBoundingClientRect().top <= sectionTopOffset) {
        nextActiveSection = section.id;
      }
    }

    const nearPageBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
    if (nearPageBottom) {
      nextActiveSection = this.sections[this.sections.length - 1].id;
    }

    if (nextActiveSection !== this.activeSection) {
      this.activeSection = nextActiveSection;
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.syncActiveSectionFromViewport();
  }

  private shouldShowControlErrors(control: AbstractControl): boolean {
    return control.invalid && (control.touched || control.dirty || this.validatorPlaygroundSubmitted);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.sidebarService.close();
  }
}
