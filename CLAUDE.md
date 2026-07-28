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

`src/features/auth/Login.tsx` gates the entire app. `App.tsx` holds `authenticated` in `useState`; passing the login screen flips it. There is no real auth — it's a UI gate. Fields are not `required`; the form submits with empty credentials.

### Routing / navigation

There is no router library. Navigation is a single `activeNav` index in `App.tsx` state, mapped against `navItems` from `src/features/dashboard/data.ts`. The sidebar calls `onNavigate(index)`; `App.renderView()` switches on `navItems[activeNav].label`. Adding a new module requires: (1) add an entry to `modules` in `dashboard/data.ts` — `navItems` is derived from it automatically, (2) render the component in `renderView()`, (3) wrap it in its Provider in the JSX tree.

### Feature structure

Each feature lives under `src/features/<name>/` with its own CSS file and a `store.tsx` (context + hooks). Static seed data lives in `data.ts`; types in `types.ts`.

```
src/
  app/              # App.tsx shell, App.css, global layout wiring
  features/
    auth/           # Login screen
    dashboard/      # Dashboard overview + sub-components
    layout/         # Header, Sidebar (shared across all views)
    tech-interview-tracker/
    behavioral-interview/
    interview-tracker/
    react-mastery/
    golang-mastery/
    java-study-tracker/
    agentic-ai-learning/
    cloud-mastery/
    claude-mastery/
    current-actions/
  shared/
    components/     # Modal, ModuleBadge
    icons/          # Icon.tsx — inline SVG registry
    mastery-layout.css  # Shared two-panel layout used by all mastery modules
    types.ts        # Module, NavItem shared types
```

### Standard mastery module pattern

All mastery features follow the same shape:

- **`types.ts`** — item type + status/category/phase constants + label maps
- **`data.ts`** — `seed*` array (initial state)
- **`store.tsx`** — `createContext` + Provider component + `use*()` hook + `use*Summary()` hook (used by Dashboard). The Provider is mounted in `App.tsx`.
- **`*.tsx`** — main view; imports from store, renders stats bar + mastery-layout (left category panel + right detail/table panel)
- **`*.css`** — feature-scoped styles. `mastery-layout.css` (shared) provides the two-panel layout, stat cards, phase sections, topic rows, and view-tab bar.

`use*Summary()` is the contract between a module and the Dashboard card — it returns `{ progress, done, active, left }`.

### Tech Interview Tracker internals

The most complex module:

- **`spacedRepetition.ts`** — pure date-math. Revisit intervals are `[3, 7, 21]` days, advancing with `revisitCount`.
- **`filtering.ts`** — pure filter/sort logic over `Problem[]`.
- **`stats.ts`** — derives aggregate counts from `Problem[]`.
- **`components/`** — `ProblemTable`, `ProblemFilters`, `ProblemModal`, `StatsPanel`.

### Dashboard data

`src/features/dashboard/data.ts` exports `modules` (drives sidebar + Dashboard cards), `navItems` (derived from `modules`), `attention`, `focus`, `recentActivity`. The Dashboard cards for live modules pull real stats via each module's `use*Summary()` hook; static fields (`progress`, `done`, `active`, `left`) in `modules` are fallback display values only.

### Theming — two-zone rule

The app has a strict two-zone colour split that must be preserved in all new work:

**Left zone — sidebar (`src/features/layout/layout.css`):** Fixed dark navy. Do not change these colours.
- Background: `linear-gradient(155deg, #14254c, #101d3d 55%, #12234b)`
- Brand mark gradient: `linear-gradient(135deg, #55a1ff, #7d4de6)` (blue → purple)
- Active nav button: `linear-gradient(100deg, #2a74f3, #7846e7)`
- All text: white / light-blue tones (`#c7d2ec`, `#aebce0`)

**Right zone — main content area:** Claude brand theme. All new UI elements, buttons, highlights, active states, and interactive controls in the content area must use the Claude orange palette:
- Primary accent: `#c96442`
- Accent background (tints): `#fdf3ef`
- Accent border: `#f0c9b8`
- Accent dark (hover/text): `#9b4628`

These four values are set as CSS custom properties on the root content div of each module:

```tsx
const ACCENT = {
  '--accent': '#c96442',
  '--accent-bg': '#fdf3ef',
  '--accent-border': '#f0c9b8',
  '--accent-dark': '#9b4628',
} as React.CSSProperties
// applied as: <div className="content mastery-v2" style={ACCENT}>
```

`mastery-layout.css` and all shared component styles consume these variables (`var(--accent)` etc.), so setting them at the module root is all that's needed. Never hardcode the orange values inside a module's own CSS — always reference the variables.

### Styling

Plain CSS with BEM-ish class names, one `.css` file per feature. Dark mode is toggled via a `dark` class on the root `.app` div (set in `App.tsx`). No CSS-in-JS, no Tailwind.

### Icons

`src/shared/icons/Icon.tsx` defines an `ICONS` object mapping name → inline SVG path string. `IconName` is `keyof typeof ICONS`. Adding an icon: add a `name: '<path ...>'` entry to `ICONS` — no external file needed. The `public/icons.svg` sprite file exists but is **not used** by `Icon.tsx`.
