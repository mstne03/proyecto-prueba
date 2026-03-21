# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Los scripts npm delegan en Angular CLI (`ng`), que está en `devDependencies`. El Ionic CLI (`ionic`) es una herramienta global que delega a su vez en `ng` para proyectos Angular — ambas vías producen el mismo resultado.

```bash
npm start                   # Servidor de desarrollo → ng serve
npm run build               # Build de producción (output: www/)
npm run watch               # Build en modo watch (desarrollo)
npm test                    # Tests con Karma + Jasmine (Chrome)
npm run lint                # ESLint sobre .ts y .html
```

Equivalentes con Angular CLI directamente:
```bash
npx ng serve
npx ng build
npx ng test
npx ng lint
npx ng generate component|page|service|pipe|directive ...
```

Equivalentes con Ionic CLI (requiere instalación global: `npm install -g @ionic/cli`):
```bash
ionic serve                 # Igual que npm start
ionic build                 # Igual que npm run build
ionic generate page <name>  # Genera página con estructura Ionic (page.ts, .html, .scss, .spec.ts)
ionic generate component <name>
ionic capacitor add android|ios   # Añadir plataforma nativa
ionic capacitor run android|ios   # Ejecutar en dispositivo/emulador
```

Generar una página nueva (recomendado usar Ionic CLI para respetar la estructura del proyecto):
```bash
ionic generate page features/my-feature
# Crea: src/app/features/my-feature/my-feature.page.ts|html|scss|spec.ts
```

Ejecutar un único test:
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
