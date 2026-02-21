# Angular Starter Kit

A production-ready Angular starter template with Tailwind CSS, built-in UI services, scroll animations, and an in-app documentation page.

## Features

- Angular 20 with standalone components
- Tailwind CSS v3 for utility-first styling
- Toast notifications via `ToastService`
- Promise-based confirmation modals via `ConfirmService`
- AOS scroll animations
- Interactive documentation page at `/documentation`
- Scalable folder architecture for enterprise growth
- Core constants layer with barrel exports and domain grouping
- Core validators layer with sync, group, and async validation utilities
- Validation feedback service wired to shared toast and confirm-modal components
- Reusable phone input component with searchable country dropdown, real country flags, and country-based validation
- Reusable Flatpickr date picker component for modern date selection

## Tech Stack

| Technology | Version | Purpose |
| --- | --- | --- |
| Angular | 20 | Frontend framework |
| Tailwind CSS | 3 | Utility-first styling |
| AOS | 2.3.4 | Scroll animations |
| Flatpickr | 4.6.13 | Modern and accessible date picker |
| Heroicons | 2.2 | SVG icon set |
| TypeScript | 5.8 | Type safety |
| RxJS | 7.8 | Reactive programming |

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone <your-repo-url>
cd angular-starter-kit
npm install
npm start
```

Application URL: `http://localhost:4200`

### Environment Configuration

Create your local environment file from the example and update values:

```bash
cp src/environments/environment.ts.example src/environments/environment.ts
```

Then update API and other runtime values as needed.

### Production Build

```bash
npm run build
```

### Template Cleanup (Optional)

If you want to keep the architecture but remove starter placeholder files:

```powershell
Get-ChildItem src/app/core -Recurse -File -Filter 'sample.*' | Remove-Item -Force
```

## Project Structure

```text
src/app/
|-- core/
|   |-- constants/        # Immutable app constants and tokens
|   |-- data/             # Static/shared datasets (phone formats, options, etc.)
|   |-- directives/       # Custom directives
|   |-- enums/            # Runtime enum use cases only
|   |-- guards/           # Route guards
|   |-- interceptors/     # HTTP interceptors
|   |-- interfaces/       # TypeScript interfaces
|   |-- models/           # Classes with behavior
|   |-- pipes/            # Template transformation pipes
|   |-- services/         # Singleton services
|   |-- utils/            # Pure helpers
|   \\-- validators/      # Form validators
|-- layouts/              # Layout shells
|-- pages/                # Route-level pages
|-- shared/               # Shared reusable UI
|-- app.routes.ts
|-- app.ts
\\-- app.html
```

## Core Constants

All constant files live in `src/app/core/constants`.

### Files

- `api-config.constant.ts`: API base URL, version, timeout, default headers
- `api-endpoints.constant.ts`: Endpoint templates grouped by `AUTH` and `USERS`
- `app-config.constant.ts`: Pagination, debounce, date format, upload limits
- `auth.constant.ts`: Token keys and auth header metadata
- `feature-flags.constant.ts`: Feature toggles by domain
- `http-status.constant.ts`: Grouped HTTP status codes
- `query-params.constant.ts`: Query key names and sort orders
- `regex.constant.ts`: Validation patterns (email, phone, strong password, names, username, OTP, slug)
- `roles-permissions.constant.ts`: Roles, permissions, and role-to-permission mapping
- `route-paths.constant.ts`: Public/auth/protected route paths
- `storage-keys.constant.ts`: Namespaced storage keys
- `ui.constant.ts`: Breakpoints, z-index, and animation durations
- `validation-messages.constant.ts`: Validation error key to message resolvers
- `index.ts`: Barrel exports for all constants

### Data Source Example

- `core/data/phone-formats.data.ts`: Country dial codes and local phone format rules used by validators and forms

### Import Pattern

Use barrel imports to keep code clean:

```ts
import { API_CONFIG, ROUTE_PATHS, REGEX_PATTERNS } from 'src/app/core/constants';
```

### Boundary Rule

- Keep static values in `core/constants`.
- Keep validation rules and constraint checks in `core/validators`.
- Keep data transformation and formatting logic in `core/pipes`.
- Keep side-effect behavior and orchestration in `core/services`.

## Core Validators

All validator files live in `src/app/core/validators`.

### Files

- `match-fields.validator.ts`: Validates matching values between two group controls
- `strong-password.validator.ts`: Applies password strength checks using `REGEX_PATTERNS.STRONG_PASSWORD`
- `name-format.validator.ts`: Validates `FIRST_NAME`, `LAST_NAME`, or `FULL_NAME` formats
- `phone-international.validator.ts`: Validates international phone number format
- `phone-local-by-country.validator.ts`: Validates local numbers based on selected country format
- `username.validator.ts`: Validates username format constraints
- `no-whitespace.validator.ts`: Rejects leading/trailing/only-whitespace values
- `date-range.validator.ts`: Ensures start date is not later than end date
- `min-age.validator.ts`: Validates minimum age from a date-of-birth input
- `file-size.validator.ts`: Validates file size using `APP_CONFIG.UPLOAD.MAX_SIZE_MB` defaults
- `file-type.validator.ts`: Validates file MIME types and extensions against an allow-list
- `email-available.validator.ts`: Async email availability check through a callback
- `username-available.validator.ts`: Async username availability check through a callback
- `index.ts`: Barrel exports for all validators

### Import Pattern

```ts
import { strongPasswordValidator, matchFieldsValidator } from 'src/app/core/validators';
```

### Reactive Form Example

```ts
import { Validators } from '@angular/forms';
import {
  emailAvailableValidator,
  matchFieldsValidator,
  strongPasswordValidator
} from 'src/app/core/validators';

this.form = this.fb.group(
  {
    email: ['', [Validators.required, Validators.email], [emailAvailableValidator(checkEmail)]],
    password: ['', [Validators.required, strongPasswordValidator()]],
    confirmPassword: ['', [Validators.required]]
  },
  { validators: [matchFieldsValidator('password', 'confirmPassword')] }
);
```

### Toast + Confirm Feedback Wiring

```ts
import { ValidationFeedbackService } from 'src/app/core/services/validation-feedback.service';

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
}
```

## Built-in Components

### Toast Notifications

```ts
constructor(private toastService: ToastService) {}

this.toastService.success('Operation successful!');
this.toastService.error('Something went wrong');
this.toastService.warning('Please review your changes');
this.toastService.info('This is informational');
```

### Confirmation Modal

```ts
constructor(private confirmService: ConfirmService) {}

async deleteItem() {
  const confirmed = await this.confirmService.confirm({
    title: 'Delete Item',
    message: 'This action cannot be undone. Continue?',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    type: 'danger'
  });

  if (confirmed) {
    // proceed with deletion
  }
}
```

### Phone Input Component

```html
<app-phone-input
  [formGroup]="form"
  countryControlName="phoneCountry"
  localControlName="phoneLocal"
  label="Phone Number"
/>
```

Use with `phone-formats.data.ts` and `phone-local-by-country.validator.ts` for country-aware local number rules.
The selector combines flag, country short code, and dial code in one compact group.
The dropdown is searchable and optimized for country selection at scale.

### Date Picker Component

```html
<app-date-picker
  [formGroup]="form"
  controlName="dateOfBirth"
  label="Date of Birth"
  placeholder="Select your birth date"
  hint="Use the calendar or type YYYY-MM-DD."
  [initialViewDate]="'2000-01-01'"
/>
```

The component uses Flatpickr for better UX than native browser date inputs and works directly with reactive forms.

### AOS Scroll Animations

```html
<div data-aos="fade-up">Animates on scroll</div>
<div data-aos="fade-up" data-aos-delay="200">Delayed animation</div>
<div data-aos="zoom-in" data-aos-duration="800">Custom duration</div>
```

## Documentation

The in-app documentation at `/documentation` includes:

- Getting started setup
- Continuous-scroll documentation with sidebar section tracking
- Folder structure and architecture notes
- Template cleanup guidance with one-line commands
- Core constants catalog and import rules
- Core validators catalog and reactive form usage
- Interactive validation playground with real form fields (including searchable phone input and modern date picker)
- Toast service usage
- Confirmation modal usage
- AOS animation usage

## Scripts

- `npm start`: Start development server
- `npm run build`: Build for production
- `npm test`: Run unit tests
- `npm run lint`: Lint source code

## Best Practices

- Keep components focused and small
- Prefer standalone components
- Use lazy loading for route modules
- Centralize cross-cutting logic in services
- Use strict typing in all layers
- Prefer `as const` objects over enums for static sets

## License

MIT
