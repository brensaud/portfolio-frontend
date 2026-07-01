# Portfolio — Frontend

A world-class personal portfolio for a Python Backend Engineer. Built with React 19, TypeScript, Vite, and Tailwind CSS v4.

---

## Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Copy environment variables
cp .env.example .env.local
# Edit .env.local and fill in required values

# 3. Start the development server
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Commands

| Command | Description |
|---|---|
| `pnpm dev` | Start the Vite development server |
| `pnpm build` | Type-check + build for production |
| `pnpm preview` | Preview the production build locally |
| `pnpm type-check` | Run TypeScript compiler without emitting |
| `pnpm lint` | Run ESLint across all source files |
| `pnpm lint:fix` | Run ESLint and auto-fix violations |
| `pnpm format` | Format all files with Prettier |
| `pnpm format:check` | Check formatting without writing |
| `pnpm test` | Run Vitest in watch mode |
| `pnpm test:run` | Run Vitest once (CI mode) |
| `pnpm test:coverage` | Run tests with coverage report |
| `pnpm test:e2e` | Run Playwright E2E tests |
| `pnpm test:e2e:ui` | Open the Playwright interactive UI |
| `pnpm test:e2e:install` | Install Playwright browser binaries (run once) |

---

## Environment Variables

All required variables are documented in [`.env.example`](.env.example).

Copy it to `.env.local` for local development. For production, set the variables in Vercel's project dashboard.

---

## Folder Structure

```
frontend/
├── __tests__/
│   ├── components/     # Testing Library component tests
│   ├── e2e/            # Playwright end-to-end tests
│   └── unit/           # Vitest unit tests (utilities, hooks)
│
├── src/
│   ├── app/            # Application bootstrapping (AppProviders)
│   ├── assets/         # Static assets (SVGs, images)
│   ├── components/
│   │   ├── layout/     # Navbar, Footer, RootLayout, PageHero
│   │   ├── shared/     # Components shared across features
│   │   └── ui/         # Primitive components (Button, Badge, Card, …)
│   ├── config/         # Environment-derived configuration
│   ├── constants/      # Compile-time constants (routes, navigation, site)
│   ├── features/       # Feature modules (TOC, lightbox, contact form, …)
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utilities (cn, formatDate, readingTime, …)
│   ├── pages/          # Route-level page components
│   ├── routes/         # React Router route definitions
│   ├── styles/         # globals.css — Tailwind v4 + design tokens
│   ├── test/           # Test setup (setup.ts) and utilities (utils.tsx)
│   ├── types/          # Shared TypeScript types
│   └── utils/          # Pure utility functions (non-React)
│
├── .env.example        # Environment variable template
├── .prettierrc         # Prettier configuration
├── eslint.config.js    # ESLint flat config
├── playwright.config.ts
├── tsconfig.app.json   # TypeScript config for application source
├── tsconfig.json       # TypeScript project references
├── tsconfig.node.json  # TypeScript config for Vite/Node config files
├── vite.config.ts
└── vitest.config.ts
```

---

## Design System

Design tokens are defined as CSS custom properties in [`src/styles/globals.css`](src/styles/globals.css) using Tailwind CSS v4's `@theme` block.

Key tokens (all available as Tailwind utility classes):

| Token | Value | Utility |
|---|---|---|
| `--color-background` | `#0c0c0c` | `bg-background` |
| `--color-accent` | `#6366f1` | `bg-accent`, `text-accent` |
| `--color-text-primary` | `#f5f5f5` | `text-text-primary` |
| `--color-text-secondary` | `#a1a1aa` | `text-text-secondary` |
| `--color-border` | `#27272a` | `border-border` |
| `--font-sans` | Geist → Inter → system-ui | `font-sans` |
| `--radius-md` | `8px` | `rounded-md` |

Full specification: [`docs/VISUAL_DESIGN_SYSTEM.md`](../docs/VISUAL_DESIGN_SYSTEM.md)

---

## Architecture

This project follows the architecture defined in [`docs/TECHNICAL_ARCHITECTURE.md`](../docs/TECHNICAL_ARCHITECTURE.md).

Key decisions:
- **Vite + React 19** — fast development server, React 19 features
- **React Router v7** — client-side routing with the data router API
- **Tailwind CSS v4** — CSS-first design token system via `@theme`
- **TypeScript strict** — `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`
- **`@/` path alias** — maps to `src/` in both TypeScript and Vite

---

## Implementation Status

| Phase | Description | Status |
|---|---|---|
| **1** | Foundation (this phase) | ✅ Complete |
| **2** | Layout system + design tokens | ⏳ Next |
| **3** | UI primitive components | — |
| **4** | Content system (Velite + MDX) | — |
| **5** | Homepage | — |
| **6** | Project pages + case studies | — |
| **7** | Writing pages | — |
| **8** | Secondary pages + contact form | — |
| **9** | SEO + metadata | — |
| **10** | Performance + accessibility audit | — |
| **11** | Full test suite | — |
| **12** | Production deployment | — |

Full roadmap: [`docs/IMPLEMENTATION_ROADMAP.md`](../docs/IMPLEMENTATION_ROADMAP.md)

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
