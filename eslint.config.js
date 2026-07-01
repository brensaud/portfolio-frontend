import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // Files and directories that should never be linted
  globalIgnores([
    'dist',
    'node_modules',
    '.velite',
    'playwright-report',
    'test-results',
    'coverage',
  ]),

  // Main config for all TypeScript/TSX source files
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      // TODO Phase 2: Upgrade to tseslint.configs.strictTypeChecked after
      // configuring parserOptions.project for type-aware linting.
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // Disallow `any` — use `unknown` and type guards instead
      '@typescript-eslint/no-explicit-any': 'error',

      // Enforce type-only imports to avoid unintentional value imports
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],

      // Warn on console statements — use a logger utility in production code
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // UI component files (especially shadcn-style) export both component variants
      // (e.g. buttonVariants) and components from the same file. allowConstantExport
      // is the documented solution for this pattern — see:
      // https://github.com/ArnaudBarre/eslint-plugin-react-refresh#allowconstantexport-v040
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },

  // Relaxed rules for test files
  {
    files: ['__tests__/**/*.{ts,tsx}', 'src/test/**/*.{ts,tsx}', '*.config.{ts,js}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
      // Test utilities re-export everything from Testing Library — this
      // triggers a false positive from the react-refresh rule.
      'react-refresh/only-export-components': 'off',
    },
  },

  // UI component files intentionally export both React components AND component
  // variants (e.g. buttonVariants from CVA) and Radix primitive re-exports.
  // This pattern, popularized by shadcn/ui, is safe for Vite HMR in practice.
  // The react-refresh rule is disabled for this directory rather than suppressed
  // per-file, keeping component files free of lint-disable comments.
  {
    files: ['src/components/ui/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
])
