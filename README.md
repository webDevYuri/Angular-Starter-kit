# Angular Starter Kit

A clean, production-ready Angular starter template with Tailwind CSS, built-in UI components, scroll animations, and an interactive documentation page — designed to help you skip the boilerplate and start building immediately.

## Features

- **Angular 20** — Standalone components, latest Angular features
- **Tailwind CSS v3** — Utility-first CSS with zero custom config needed
- **Toast Notifications** — Success, error, warning, and info toasts via a simple service
- **Confirmation Modals** — Promise-based confirm dialogs with danger, warning, and info types
- **AOS Scroll Animations** — Animate elements on scroll with fade, zoom, flip effects
- **Interactive Documentation** — Built-in docs page with sidebar navigation covering folder structure, components, and usage examples
- **Scalable Folder Structure** — Feature-based architecture with core, layouts, pages, sections, and shared directories

## Tech Stack

| Technology   | Version | Purpose                   |
| ------------ | ------- | ------------------------- |
| Angular      | 20      | Frontend framework        |
| Tailwind CSS | 3       | Utility-first styling     |
| AOS          | 2.3.4   | Scroll animations         |
| Heroicons    | 2.2     | SVG icon set              |
| TypeScript   | 5.8     | Type safety               |
| RxJS         | 7.8     | Reactive state management |

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd angular-starter-kit

# Install dependencies
npm install

# Start development server
npm start
```

The app will be running at `http://localhost:4200`.

### Environment Configuration

Environment files are included in `.gitignore` to keep sensitive data out of version control. To set up your environments:

```bash
# Copy example environment files
cp src/environments/environment.local.ts.example src/environments/environment.local.ts
cp src/environments/environment.staging.ts.example src/environments/environment.staging.ts
cp src/environments/environment.prod.ts.example src/environments/environment.prod.ts

# Edit each file with your specific configuration
```

Update the `apiUrl` and other values in each environment file as needed.

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/app/
├── core/                  # Core functionality (singletons)
│   ├── constants/        # App-wide constants & config
│   ├── data/             # API data sources
│   ├── directives/       # Custom attribute directives
│   ├── enums/            # Named constant sets
│   ├── guards/           # Route guards
│   ├── interceptors/     # HTTP interceptors
│   ├── interfaces/       # TypeScript interfaces
│   ├── models/           # Classes with behavior
│   ├── pipes/            # Custom pipes
│   ├── services/         # Singleton services (toast, confirm, etc.)
│   ├── utils/            # Pure helper functions
│   └── validators/       # Custom form validators
├── layouts/              # Layout components (header + router-outlet)
├── pages/                # Page-level components (one per route)
├── sections/             # Large reusable page sections
├── shared/               # Small reusable components (toast, modal, etc.)
├── app.routes.ts         # Route definitions
├── app.ts                # Root component
└── app.html              # Root template
```

## Built-in Components

### Toast Notifications

Inject `ToastService` and call one of its methods:

```typescript
constructor(private toastService: ToastService) {}

this.toastService.success('Operation successful!');
this.toastService.error('Something went wrong');
this.toastService.warning('Please review your changes');
this.toastService.info('This is informational');
```

### Confirmation Modal

Inject `ConfirmService` for async confirmation dialogs:

```typescript
constructor(private confirmService: ConfirmService) {}

async deleteItem() {
  const confirmed = await this.confirmService.confirm({
    title: 'Delete Item',
    message: 'This action cannot be undone. Continue?',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    type: 'danger' // 'danger' | 'warning' | 'info'
  });

  if (confirmed) {
    // User confirmed
  }
}
```

### AOS Scroll Animations

Add `data-aos` attributes to any element:

```html
<div data-aos="fade-up">Animates on scroll</div>
<div data-aos="fade-up" data-aos-delay="200">Delayed animation</div>
<div data-aos="zoom-in" data-aos-duration="800">Custom duration</div>
```

Available animations: `fade-up`, `fade-down`, `fade-left`, `fade-right`, `zoom-in`, `flip-up`, and more.

## Documentation

The starter kit includes a built-in interactive documentation page accessible at `/documentation`. It covers:

- Folder structure with detailed explanations and examples
- Toast notification API and usage
- Confirmation modal types and configuration
- AOS animation options and best practices
- Getting started guide

## Deployment

### Deploy to Production

After building your application with `npm run build`, you can deploy the `dist/` folder to any hosting service:

- **Vercel** — Zero-config deployment with automatic CI/CD
- **Netlify** — Drop-in static hosting with preview deployments
- **GitHub Pages** — Free hosting with repository integration
- **Firebase Hosting** — Scalable hosting with real-time database
- **AWS S3** — Static site hosting with CDN integration

## Scripts

- `npm start` — Start development server
- `npm run build` — Build for production
- `npm test` — Run unit tests
- `npm run lint` — Check code quality

## Best Practices

- **Component Organization** — Keep components small and focused on a single responsibility
- **Standalone Components** — Leverage Angular's standalone API for simpler dependency management
- **Lazy Loading** — Use route-level code splitting to optimize bundle size
- **Services** — Centralize business logic in services for reusability
- **Type Safety** — Use TypeScript for all code to catch errors at compile time

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License — feel free to use this template for both personal and commercial projects.

## Support

For issues, questions, or suggestions, please open an issue on the project repository.

## Author

Yuri Gonzaga
