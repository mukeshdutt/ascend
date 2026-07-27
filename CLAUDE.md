# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (Vite, HMR)
npm run build      # Type-check (tsc -b) then bundle
npm run lint       # ESLint
npm run preview    # Serve the dist/ build locally
```

No test framework is configured — there are no test files in this repo.

## Architecture

**Ascend** is a personal learning dashboard — a React 19 + TypeScript SPA built with Vite. All state is in-memory (no backend, no persistence); the app resets on page reload.

### Auth

`src/features/auth/Login.tsx` gates the entire app. `App.tsx` holds `authenticated` in `useState`; passing the login screen flips it. There is no real auth — it's a UI gate.

### Routing / navigation

There is no router library. Navigation is a single `activeNav` index in `App.tsx` state, mapped against `navItems` from `src/features/dashboard/data.ts`. The sidebar calls `onNavigate(index)`; `App` switches between `<Dashboard>` and `<TechInterviewTracker>` based on the active label. All other module views (Interview Tracker, Behavioral Interview, etc.) are placeholders — only Dashboard and Tech Interview Tracker are implemented.

### Feature structure

Each feature lives under `src/features/<name>/` with its own CSS file, components subfolder, and optionally a `data.ts` (static seed data) and `store.tsx` (context + hooks).

```
src/
  app/           # App.tsx shell, App.css, global layout wiring
  features/
    auth/        # Login screen
    dashboard/   # Dashboard view + sub-components
    layout/      # Header, Sidebar shared across all views
    tech-interview-tracker/  # Only fully-implemented module
  shared/
    components/  # Modal, ModuleBadge
    icons/       # Icon.tsx — SVG sprite lookup by IconName
    types.ts     # Module, NavItem shared types
```

### Tech Interview Tracker internals

The only module with real interactivity:

- **`store.tsx`** — `ProblemsProvider` wraps the app in `App.tsx`. Exposes `useProblems()` (CRUD) and `useTechTrackerSummary()` (aggregated stats for the Dashboard card). State is seeded from `data.ts`.
- **`types.ts`** — canonical `Problem` type and all enum constants (`SOURCES`, `DIFFICULTIES`, `STATUSES`, `LANGUAGES`, `COMMON_PATTERNS`, `STATUS_META`, `DIFFICULTY_META`).
- **`spacedRepetition.ts`** — pure date-math utilities. Revisit intervals are `[3, 7, 21]` days, advancing with `revisitCount`.
- **`filtering.ts`** — pure filter/sort logic over `Problem[]`.
- **`stats.ts`** — derives aggregate counts from `Problem[]`.
- **`components/`** — `ProblemTable`, `ProblemFilters`, `ProblemModal`, `StatsPanel`.

### Dashboard data

`src/features/dashboard/data.ts` exports static arrays (`modules`, `navItems`, `attention`, `focus`, `recentActivity`). The `navItems` array drives the sidebar; its indices are how navigation works. `Tech Interview Tracker` at index 1 of `modules` is the live-data module; all others are static.

### Styling

Plain CSS with BEM-ish class names, one `.css` file per feature. Dark mode is toggled via an `dark` class on the root `.app` div (set in `App.tsx`). No CSS-in-JS, no Tailwind.

### Icons

`src/shared/icons/Icon.tsx` renders SVG icons from a sprite sheet at `public/icons.svg`. `IconName` is a string union of valid icon ids. Adding a new icon requires adding the `<symbol>` to `icons.svg` and extending the `IconName` type.
