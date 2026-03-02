# Angular Calendar

A lightweight and elegant Angular calendar component built with Preact and Tailwind CSS. This project was originally forked from:

https://github.com/dayflow-js/calendar

## Overview

**Angular Calendar** provides an easily integratable, highly customizable calendar component designed with "standalone" Angular principles. This means you can import and use the component directly, without relying on complex NgModule hierarchies. Built with performance in mind using [Preact](https://preactjs.com/) for rendering, and styled effortlessly with [Tailwind CSS](https://tailwindcss.com/).

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Angular Standalone Integration](#angular-standalone-integration)
- [Angular Version Support](#angular-version-support)
- [Development Setup](#development-setup)
- [Contribution Guidelines](#contribution-guidelines)
- [License](#license)

---

## Features

- 📅 Simple, elegant calendar UI
- ⚡ Standalone component – no NgModule required
- 🎨 Fully customizable via Tailwind CSS classes
- 🚀 Fast and lightweight, powered by Preact under the hood
- 🧩 Easy integration and configuration
- 🅰️ Compatible with modern Angular (v21+ Standalone API)

---

## Installation

Install via npm:

```bash
npm install @iqx-limited/angular-calendar
```

Peer dependencies required:

- Angular (see table below for version support)
- [Preact](https://preactjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)

```bash
npm install preact tailwindcss
```

---

## Usage

### Basic Example

Import the standalone component and use it directly in your component:

```typescript
import { CalendarComponent } from '@iqx-limited/angular-calendar';

// In your component metadata or routing config
@Component({
  standalone: true,
  imports: [CalendarComponent],
  ...
})
export class MyComponent { }
```

```html
<!-- In your component template -->
<angular-calendar
  [selectedDate]="selectedDate"
  (dateChange)="onDateChange($event)">
</angular-calendar>
```

### Customization

Override Tailwind classes or provide additional props to style and configure:

```html
<angular-calendar
  [selectedDate]="selectedDate"
  calendarClass="bg-white rounded-lg shadow-md"
  [showWeekNumbers]="true">
</angular-calendar>
```

---

## Angular Standalone Integration

Angular Calendar is built as a **standalone component**. To use it:

1. **No NgModule needed**: Just import the component in your `imports: [...]` array of any other standalone component, feature, or route.

2. **Tree-shakable**: Only pulls in what you use.

3. **Direct integration**: Works seamlessly with Angular's new [Standalone API](https://angular.io/guide/standalone-components).

**Example integration:**

```typescript
import { CalendarComponent } from '@iqx-limited/angular-calendar';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CalendarComponent],
  template: `<angular-calendar></angular-calendar>`,
})
export class DashboardComponent {}
```

---

## Angular Version Support

| Package Version                     | Angular Version      | Standalone Support    |
|--------------------------------------|----------------------|-----------------------|
| `^1.0.0`                            | `>=21.0.0`   | Partial (experimental)|

> **Note:** For best results, use the latest version with Angular v21+ for optimal standalone and performance benefits.

---

## Development Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/mattfrank48/angular-calendar.git
   cd angular-calendar
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Run tests**

   ```bash
   npm test
   ```

5. **Build library**

   ```bash
   npm run build
   ```

---

## Contribution Guidelines

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/my-feature`
3. Make your changes and commit: `git commit -am 'Add new feature'`
4. Push to your fork: `git push origin feature/my-feature`
5. Open a pull request describing your changes

Adhere to the following code principles:

- Write clear, maintainable code
- Use Tailwind utility classes for styling
- Keep components stateless when possible
- Cover new code with tests

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

---

## License

This project is licensed under the MIT License.  
See [LICENSE](LICENSE) for details.

---

## Standalone-First Principles

- **No Angular modules required:** Use components with minimal setup via the Standalone API.
- **Direct imports everywhere:** Integrate the calendar in routes, components, or features without going through NgModules.
- **Tree-shakable and future proof:** Designed for the new Angular ecosystem.

---

## Questions?

Open an [issue](https://github.com/mattfrank48/angular-calendar/issues) or contact the maintainer.
