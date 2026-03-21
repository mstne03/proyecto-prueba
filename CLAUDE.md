# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Development server
npm run build      # Production build (output: www/)
npm run watch      # Watch mode build
npm test           # Run tests (Karma + Jasmine, Chrome)
npm run lint       # ESLint on .ts and .html files
```

Run a single test file by passing `--include` to the test runner:
```bash
npx ng test --include='src/app/home/home.page.spec.ts'
```

## Architecture

**Ionic Angular standalone app** (no NgModules). Key patterns:

- All components are standalone (Angular 14+ style), imported directly in each component's `imports` array.
- Routing uses lazy-loaded standalone components (`loadComponent`). Routes defined in `src/app/app.routes.ts`.
- Bootstrap in `src/main.ts` via `bootstrapApplication` with `IonicRouteStrategy` and `provideRouter`.
- Pages live under `src/app/<name>/<name>.page.ts` and must be named `*Page` (ESLint enforced).
- Components use the `app-` prefix selector in kebab-case (ESLint enforced).
- Directives use the `app` prefix in camelCase (ESLint enforced).

**Theme:** Custom Ionic CSS variables defined in `src/theme/variables.scss`. Dark mode uses `@media (prefers-color-scheme: dark)`. Key brand colors: magenta primary, dark-blue secondary, teal accent, dark-gray background.

**TypeScript:** Strict mode enabled with `noImplicitOverride`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, and Angular strict template checking.

**Build output:** `www/` directory (not `dist/`).
