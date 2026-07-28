import type { ReactTopic } from './types'

export const seedReactTopics: ReactTopic[] = [
  // ─── Tab 1: Fundamentals ────────────────────────────────────────────────────
  {
    id: 'react-1-1', category: 'Fundamentals', phase: 'Tab 1 — React (Fundamentals)',
    lessonNum: '1.1', title: 'JSX & Components', status: 'not-started', notes: '',
    content: {
      concept: 'JSX is not HTML — it compiles to function calls (`jsx(\'div\', {...})`) that produce plain JS objects called React elements. A component is just a function that returns those elements. Fragments (`<>...</>`) let you return siblings without a wrapper div.',
      inYourProject: [{
        file: 'src/shared/components/ui/Badge.tsx',
        code: `export function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }))}>
      {children}
    </span>
  );
}`,
        description: 'One function, one return, props in — elements out. Every page in anf-admin is this pattern scaled up.',
      }],
      watchOut: [
        '`class` → `className`, `for` → `htmlFor`; JSX attributes are camelCase.',
        'A component must return ONE root node — hence fragments.',
        'Capitalization matters: `<badge />` is an HTML tag, `<Badge />` is your component.',
      ],
      tryIt: 'Create a tiny `StatusDot` component in `shared/components/ui/` that renders a colored circle, and use it on any list page.',
    },
  },
  {
    id: 'react-1-2', category: 'Fundamentals', phase: 'Tab 1 — React (Fundamentals)',
    lessonNum: '1.2', title: 'Props & TypeScript interfaces', status: 'not-started', notes: '',
    content: {
      concept: 'Props are the single argument your component function receives. In TS you describe them with an interface; `children: ReactNode` types anything renderable; `?` marks optional props; destructuring with `=` supplies defaults.',
      inYourProject: [{
        file: 'src/app/theme-provider.tsx',
        code: `interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "anf-admin-theme",
}: ThemeProviderProps) { ... }`,
        description: '`AppProviders` in `app/providers.tsx` is the minimal version: it only takes `children` and wraps them in providers.',
      }],
      watchOut: [
        'Props are read-only — never mutate them; derive or lift state instead.',
        '`ReactNode` vs `ReactElement`: `ReactNode` also allows strings, numbers, null — it\'s the right type for `children`.',
      ],
      tryIt: 'Add an optional `size?: "sm" | "md"` prop with a default to your `StatusDot`.',
    },
  },
  {
    id: 'react-1-3', category: 'Fundamentals', phase: 'Tab 1 — React (Fundamentals)',
    lessonNum: '1.3', title: 'useState', status: 'not-started', notes: '',
    content: {
      concept: '`useState` gives a component memory across renders. Setting state schedules a re-render. Two power features: functional updates (`set(p => p + 1)`) when new state depends on old, and lazy initializers (`useState(() => expensive())`) so the initial value is computed only once.',
      inYourProject: [
        {
          file: 'src/shared/hooks/usePagination.ts',
          code: `const nextPage = useCallback(() => {
  setPage((p) => Math.min(p + 1, totalPages));
}, [totalPages]);`,
          description: 'Functional update — new state depends on previous page, so we use the callback form.',
        },
        {
          file: 'src/app/theme-provider.tsx',
          code: `const [theme, setTheme] = useState<Theme>(
  () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
);`,
          description: 'Lazy initializer — reads localStorage once at mount, not on every render.',
        },
      ],
      watchOut: [
        'State updates are async-ish: reading `page` right after `setPage` gives the old value.',
        '`setPage(page + 1)` twice in a row increments once; `setPage(p => p + 1)` twice increments twice.',
      ],
      tryIt: 'Write a `useToggle` shared hook (`const [on, toggle] = useToggle(false)`) using a functional update.',
    },
  },
  {
    id: 'react-1-4', category: 'Fundamentals', phase: 'Tab 1 — React (Fundamentals)',
    lessonNum: '1.4', title: 'useEffect', status: 'not-started', notes: '',
    content: {
      concept: '`useEffect` synchronizes your component with something outside React (timers, DOM, subscriptions). It runs after render; the dependency array decides when it re-runs; the returned function is cleanup, running before the next effect and on unmount.',
      inYourProject: [{
        file: 'src/shared/hooks/useDebounce.ts',
        code: `export function useDebounce<T>(value: T, delay = 500): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);   // cleanup
  }, [value, delay]);

  return debounced;
}`,
        description: 'A perfect 10-line specimen: effect sets a timer, cleanup cancels it, deps re-arm it whenever `value` changes. This is how your search boxes avoid firing an API call per keystroke.',
      }],
      watchOut: [
        'You usually do NOT need an effect to derive data from props/state — compute it during render.',
        'Missing deps cause stale values; the lint rule is right far more often than you are.',
        'Data fetching in effects is what TanStack Query replaces (lesson 3.5).',
      ],
      tryIt: 'Add a `useDocumentTitle(title)` hook that sets `document.title` and restores the old title on cleanup.',
    },
  },
  {
    id: 'react-1-5', category: 'Fundamentals', phase: 'Tab 1 — React (Fundamentals)',
    lessonNum: '1.5', title: 'Conditional rendering & lists', status: 'not-started', notes: '',
    content: {
      concept: 'Rendering is just JS expressions: `cond && <X />`, ternaries for either/or, and `array.map()` for lists. Keys give React a stable identity per item so it can reuse DOM instead of rebuilding it — and so state doesn\'t leak between rows.',
      inYourProject: [{
        file: 'src/shared/components/DataTable.tsx',
        code: `{isLoading ? (
  <TableSkeleton rows={10} />
) : rows.length === 0 ? (
  <EmptyState message="No records found" />
) : (
  rows.map((row) => <TableRow key={row.id} row={row} />)
)}`,
        description: 'Loading → empty → data. Three branches, zero extra state.',
      }],
      watchOut: [
        'Never use array index as key for lists that reorder, filter, or paginate — your list pages do all three.',
        '`count && <X />` renders a literal `0` when count is 0; use `count > 0 &&`.',
      ],
      tryIt: 'Find one `.map()` in a list page and explain to yourself why its key choice is (or isn\'t) safe under pagination.',
    },
  },
  {
    id: 'react-1-6', category: 'Fundamentals', phase: 'Tab 1 — React (Fundamentals)',
    lessonNum: '1.6', title: 'Event handling & controlled inputs', status: 'not-started', notes: '',
    content: {
      concept: 'Handlers are typed callbacks: `onClick={(e: React.MouseEvent) => ...}`, `onChange={(e: React.ChangeEvent<HTMLInputElement>) => ...}`. A controlled input\'s value lives in React state (`value` + `onChange`); an uncontrolled one keeps its own DOM state.',
      inYourProject: [{
        code: `const [search, setSearch] = useState("");
const debouncedSearch = useDebounce(search);

<Input
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search products..."
/>`,
        description: 'Controlled input feeding `useDebounce` — the standard search pattern on your list pages.',
      }],
      watchOut: [
        '`value` without `onChange` = frozen input (React warns).',
        'Passing `onClick={handle()}` calls it during render; pass the function reference, not its result.',
      ],
      tryIt: 'Add a "clear" button to a search input that resets the state — notice the input updates without touching the DOM.',
    },
  },
  {
    id: 'react-1-7', category: 'Fundamentals', phase: 'Tab 1 — React (Fundamentals)',
    lessonNum: '1.7', title: 'Custom hooks', status: 'not-started', notes: '',
    content: {
      concept: 'A custom hook is just a function whose name starts with `use` and which calls other hooks. It extracts stateful logic, not UI. Rules of hooks: call them at the top level (no ifs/loops), only from components or other hooks — the order must be identical every render.',
      inYourProject: [{
        file: 'src/shared/hooks/',
        code: `useDebounce.ts    // state + effect  → debounced value
usePagination.ts  // state + callbacks → page controls
usePermission.ts  // reads auth store → boolean checks`,
        description: 'Three hooks, three flavors: one wraps an effect, one wraps state transitions, one wraps a store read. None render anything — that\'s the point.',
      }],
      watchOut: [
        'Two components using the same hook do NOT share state — each call gets its own.',
        'If a "hook" doesn\'t call any other hook, it\'s just a function; drop the `use` prefix.',
      ],
      tryIt: 'Ship that `useToggle` from lesson 1.3 into `shared/hooks/` with a barrel export, matching the existing style.',
    },
  },
  {
    id: 'react-1-8', category: 'Fundamentals', phase: 'Tab 1 — React (Fundamentals)',
    lessonNum: '1.8', title: 'Context API', status: 'not-started', notes: '',
    content: {
      concept: 'Context passes a value down the tree without prop-drilling: `createContext` → `<Provider value=...>` → `useContext`. The guard-throw pattern makes misuse fail loudly instead of silently returning a broken default.',
      inYourProject: [{
        file: 'src/app/theme-provider.tsx',
        code: `const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (ctx === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}`,
        description: 'Textbook implementation: undefined default + custom hook + guard throw. Any component calling `useTheme()` outside the provider crashes immediately with a clear message.',
      }],
      watchOut: [
        'Every consumer re-renders when the context value changes — keep context values small and stable.',
        'Context is for low-frequency global-ish data (theme, auth). High-frequency shared state → Zustand (lesson 3.6).',
      ],
      tryIt: 'Trace `useTheme()` usage: find one component that calls it and follow the value back to the provider.',
    },
  },
  {
    id: 'react-1-9', category: 'Fundamentals', phase: 'Tab 1 — React (Fundamentals)',
    lessonNum: '1.9', title: 'Component composition', status: 'not-started', notes: '',
    content: {
      concept: '`children` turns a component into a slot: the parent decides the frame, the caller decides the content. This is how layouts wrap pages without knowing anything about them — composition over configuration.',
      inYourProject: [{
        file: 'src/app/router.tsx',
        code: `{
  path: "/products",
  element: (
    <AppShell>
      <ProductsListPage />
    </AppShell>
  ),
}`,
        description: '`AppShell` renders sidebar + header + `{children}`. Every routed page slots into the same frame.',
      }],
      watchOut: [
        'Prefer passing components as children over boolean-flag props (`showSidebar`, `isCompact`) that multiply variants.',
      ],
      tryIt: 'Build a `PageHeader` component with a `title` prop and an `actions` children slot; use it on two pages.',
    },
  },

  // ─── Tab 2: Tailwind & shadcn ───────────────────────────────────────────────
  {
    id: 'react-2-1', category: 'Tailwind & shadcn', phase: 'Tab 2 — Tailwind & shadcn',
    lessonNum: '2.1', title: 'Utility-first mental model', status: 'not-started', notes: '',
    content: {
      concept: 'Tailwind replaces "invent a class name, write CSS elsewhere" with composing single-purpose utilities in markup: `p-4` (padding: 1rem), `flex`, `text-sm`. The spacing scale is 1 unit = 0.25rem, so `p-4` = 16px. You trade "clean HTML" for zero naming, zero dead CSS, and styles you can read at the point of use.',
      inYourProject: [{
        code: `<div className="flex items-center justify-between gap-4 rounded-lg border p-4">`,
        description: 'Reads as: flexbox row, vertically centered, pushed apart, 16px gaps, rounded border, 16px padding. Once the scale is in your head, markup IS the stylesheet.',
      }],
      watchOut: [
        'Don\'t build class strings dynamically (`` `p-${size}` ``) — Tailwind only ships classes it can see verbatim at build time.',
      ],
      tryIt: 'Pick any div in a page, delete its classes, and rebuild the same look from memory.',
    },
  },
  {
    id: 'react-2-2', category: 'Tailwind & shadcn', phase: 'Tab 2 — Tailwind & shadcn',
    lessonNum: '2.2', title: 'Layout patterns', status: 'not-started', notes: '',
    content: {
      concept: 'Two workhorses: flexbox for 1-D rows/columns (`flex`, `items-*`, `justify-*`, `gap-*`, `flex-1`) and grid for 2-D (`grid grid-cols-3 gap-6`). The classic admin layout — fixed sidebar plus scrolling content — is one flex row.',
      inYourProject: [{
        file: 'src/shared/components/layout/AppShell.tsx',
        code: `<div className="flex h-screen">
  <Sidebar className="w-64 shrink-0 border-r" />
  <main className="flex-1 overflow-y-auto p-6">{children}</main>
</div>`,
        description: '`w-64 shrink-0` pins the sidebar; `flex-1` lets content take the rest; `overflow-y-auto` scrolls only the content pane.',
      }],
      watchOut: [
        'Forgetting `shrink-0` lets flexbox squash your sidebar when content is wide (tables!).',
        'Prefer `gap-*` over margins between siblings — no first/last-child exceptions.',
      ],
      tryIt: 'Build a stats row: 4 equal cards with `grid grid-cols-4 gap-4`, then make it `grid-cols-2` on small screens after lesson 2.3.',
    },
  },
  {
    id: 'react-2-3', category: 'Tailwind & shadcn', phase: 'Tab 2 — Tailwind & shadcn',
    lessonNum: '2.3', title: 'Responsive & state variants', status: 'not-started', notes: '',
    content: {
      concept: 'Prefixes conditionally apply a utility: breakpoints are mobile-first (`md:flex` = flex at ≥768px), and state variants track interaction: `hover:bg-accent`, `focus-visible:ring-2`, `disabled:opacity-50`. Stack them: `md:hover:underline`.',
      inYourProject: [{
        code: `<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">`,
        description: 'One column on phones, two on tablets, four on desktop — no media queries written by hand anywhere in anf-admin.',
      }],
      watchOut: [
        'Mobile-first means `md:` is "medium AND UP", not "only medium".',
        'Use `focus-visible:` not `focus:` for rings — avoids the ring flashing on mouse clicks.',
      ],
      tryIt: 'Make the sidebar hide on mobile: `hidden md:flex` on the Sidebar wrapper.',
    },
  },
  {
    id: 'react-2-4', category: 'Tailwind & shadcn', phase: 'Tab 2 — Tailwind & shadcn',
    lessonNum: '2.4', title: 'Dark mode', status: 'not-started', notes: '',
    content: {
      concept: 'With the class strategy, `dark:*` utilities activate whenever an ancestor (usually `<html>`) has the `dark` class. Someone has to put that class there — in anf-admin, that\'s your ThemeProvider from lesson 1.8.',
      inYourProject: [{
        file: 'src/app/theme-provider.tsx',
        code: `useEffect(() => {
  const root = window.document.documentElement;
  root.classList.remove("light", "dark");
  const applied = theme === "system"
    ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    : theme;
  root.classList.add(applied);
}, [theme]);`,
        description: 'Context state → effect → class on `<html>` → every `dark:bg-...` in the app flips. Lesson 1.8\'s context and this one are the same feature seen from two sides.',
      }],
      watchOut: [
        'Always pair colors: a `bg-white` without a `dark:bg-...` partner is a future bug report.',
      ],
      tryIt: 'Toggle the theme in the UI with DevTools open on `<html>` and watch the class swap.',
    },
  },
  {
    id: 'react-2-5', category: 'Tailwind & shadcn', phase: 'Tab 2 — Tailwind & shadcn',
    lessonNum: '2.5', title: 'Tailwind v4 specifics', status: 'not-started', notes: '',
    content: {
      concept: 'Tailwind v4 moved configuration into CSS: no `tailwind.config.js`. You `@import "tailwindcss"` and customize via CSS variables in `@theme` blocks. Design tokens are plain custom properties you can read anywhere.',
      inYourProject: [{
        file: 'src/index.css',
        code: `@import "tailwindcss";

@theme {
  --color-primary: oklch(0.55 0.2 260);
  --radius-lg: 0.5rem;
}`,
        description: 'Note what\'s absent from the repo root: no `tailwind.config.js`. If a tutorial tells you to edit it, translate to CSS-based config instead.',
      }],
      watchOut: [
        'Most Stack Overflow answers still assume v3 — check dates before copying config snippets.',
      ],
      tryIt: 'Add a custom token in `@theme` and use it via its generated utility class.',
    },
  },
  {
    id: 'react-2-6', category: 'Tailwind & shadcn', phase: 'Tab 2 — Tailwind & shadcn',
    lessonNum: '2.6', title: 'The cn() utility', status: 'not-started', notes: '',
    content: {
      concept: '`cn()` = `clsx` (join classes conditionally) + `tailwind-merge` (resolve conflicts, last wins). Without merging, `"p-2 p-4"` is a CSS specificity coin-flip; with it, `p-4` reliably wins — which lets components accept a `className` override prop.',
      inYourProject: [{
        file: 'src/lib/utils.ts',
        code: `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`,
        description: 'All four lines of it. Probably the most-imported function in the codebase.',
      }],
      watchOut: [
        'Order matters in `cn(base, props.className)` — caller overrides must come LAST.',
      ],
      tryIt: 'In a scratch file, log `cn("p-2 text-red-500", "p-4")` and confirm `p-2` is gone.',
    },
  },
  {
    id: 'react-2-7', category: 'Tailwind & shadcn', phase: 'Tab 2 — Tailwind & shadcn',
    lessonNum: '2.7', title: 'class-variance-authority (CVA)', status: 'not-started', notes: '',
    content: {
      concept: 'CVA turns "a component with visual variants" into data: base classes + a map of variant names to class strings + defaults. Your component takes `variant`/`size` props and CVA computes the class list.',
      inYourProject: [{
        file: 'src/components/ui/button.tsx',
        code: `const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default:     "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline:     "border bg-background hover:bg-accent",
        ghost:       "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm:      "h-8 rounded-md px-3",
        lg:      "h-10 rounded-md px-6",
        icon:    "size-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

<button className={cn(buttonVariants({ variant, size }), className)} />`,
        description: 'Base string (always applied) → variant maps → defaults → merged with caller\'s `className` via `cn()`.',
      }],
      watchOut: [
        'Adding a variant means adding it to the map AND (thanks to `VariantProps`) TS updates the prop type for free — don\'t hand-write the union.',
      ],
      tryIt: 'Add a `success` variant to `buttonVariants` and use it once.',
    },
  },
  {
    id: 'react-2-8', category: 'Tailwind & shadcn', phase: 'Tab 2 — Tailwind & shadcn',
    lessonNum: '2.8', title: 'shadcn/ui philosophy', status: 'not-started', notes: '',
    content: {
      concept: 'shadcn/ui is not an npm dependency — `npx shadcn add dialog` copies the source INTO `src/components/ui/`. You own it, edit it, and never wait for an upstream fix. Underneath: headless primitives handle behavior/accessibility, Tailwind + CVA handle looks.',
      inYourProject: [{
        file: 'src/components/ui/ + components.json',
        code: `// components.json tells "add" where to put files, aliases, style prefs
// components/ui/  — button, input, dialog... all yours to edit`,
        description: 'That\'s why `button.tsx` is readable source in your repo instead of a black box in `node_modules`.',
      }],
      watchOut: [
        'Re-running `add` for an existing component can overwrite your local edits — diff before accepting.',
        'These files don\'t auto-update; you update them deliberately.',
      ],
      tryIt: 'Run `npx shadcn add tooltip`, read every line it adds, and identify the primitive vs the styling.',
    },
  },

  // ─── Tab 3: Architectures ───────────────────────────────────────────────────
  {
    id: 'react-3-1', category: 'Architectures', phase: 'Tab 3 — React Architectures',
    lessonNum: '3.1', title: 'Feature-Sliced Design', status: 'not-started', notes: '',
    content: {
      concept: 'Code is grouped by business feature, not by file type. Each feature is a self-contained slice with the same internal anatomy, exposing a public API through its `index.ts` barrel. The one rule: never reach into another feature\'s internals — import only from the barrel.',
      inYourProject: [{
        file: 'src/features/vendors/',
        code: `vendors/
├── api/         vendors.api.ts
├── hooks/       useVendors.ts
├── pages/       VendorsListPage.tsx, AddVendorPage.tsx
├── components/  VendorForm.tsx
├── types/       vendor.types.ts
└── index.ts     // the ONLY door in`,
        description: 'Every feature repeats this shape. New code placement is never a debate: API call → `api/`, query hook → `hooks/`, screen → `pages/`.',
      }],
      watchOut: [
        '`import { x } from "@/features/vendors/hooks/useVendors"` from another feature = architecture violation. Go through the barrel.',
        'Truly shared code (Button, useDebounce) lives in `shared/`, not inside any feature.',
      ],
      tryIt: 'Sketch the slice for a hypothetical `orders` feature on paper before ever creating it.',
    },
  },
  {
    id: 'react-3-2', category: 'Architectures', phase: 'Tab 3 — React Architectures',
    lessonNum: '3.2', title: 'App bootstrap layer', status: 'not-started', notes: '',
    content: {
      concept: 'The `app/` layer is the composition root: it wires providers, router, and global CSS together, and owns nothing business-specific. The chain: `main.tsx` mounts → `App.tsx` → `AppProviders` → `AppRouter`.',
      inYourProject: [{
        file: 'src/app/providers.tsx',
        code: `export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system">
        {children}
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}`,
        description: 'Nesting order matters: QueryClient outermost so everything can fetch; theme inside it; toasts rendered last so they overlay all.',
      }],
      watchOut: [
        'Provider order bugs are silent: a hook that needs a provider ABOVE it in the tree just throws or misbehaves.',
      ],
      tryIt: 'Follow the import chain from `main.tsx` down to one rendered page, writing each hop.',
    },
  },
  {
    id: 'react-3-3', category: 'Architectures', phase: 'Tab 3 — React Architectures',
    lessonNum: '3.3', title: 'Routing architecture', status: 'not-started', notes: '',
    content: {
      concept: '`createBrowserRouter` takes a route tree: paths map to elements, `:id` segments become params (read via `useParams`), `<Navigate>` declares redirects, and child routes render inside a parent\'s `<Outlet />` — that\'s how nested tabs share a page frame.',
      inYourProject: [{
        file: 'src/app/router.tsx',
        code: `{
  path: "/products/:id/edit",
  element: <AppShell><ProductEditPage /></AppShell>,
  children: [
    { index: true, element: <Navigate to="details" replace /> },
    { path: "details",   element: <ProductDetailsTab /> },
    { path: "inventory", element: <ProductInventoryTab /> },
    { path: "pricing",   element: <ProductPricingTab /> },
  ],
}`,
        description: 'A param (`:id`), an index redirect, and nested children rendering into `ProductEditPage`\'s `<Outlet />` — each tab is a URL, so refresh and back-button just work.',
      }],
      watchOut: [
        '`useParams()` returns strings — parse before comparing to numeric IDs.',
        'Forget `<Outlet />` in the parent and children silently render nothing.',
      ],
      tryIt: 'Add a fourth tab route under `/products/:id/edit` and link it from the tab bar.',
    },
  },
  {
    id: 'react-3-4', category: 'Architectures', phase: 'Tab 3 — React Architectures',
    lessonNum: '3.4', title: 'The API layer', status: 'not-started', notes: '',
    content: {
      concept: 'One shared axios instance owns cross-cutting HTTP concerns: base URL, auth header injection (request interceptor), global 401 handling (response interceptor). Features then define flat api-objects so no component ever imports axios directly.',
      inYourProject: [
        {
          file: 'src/config/api.ts',
          code: `export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token ?? TEST_TOKEN;
  if (token) config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) window.location.href = "/login";
    return Promise.reject(err);
  }
);`,
        },
        {
          file: 'src/features/products/api/products.api.ts',
          code: `export const productsApi = {
  getAll:  (params?) => api.get("/products", { params }).then(r => r.data),
  getById: (id: string) => api.get(\`/products/\${id}\`).then(r => r.data),
  create:  (body) => api.post("/products", body).then(r => r.data),
};`,
          description: 'Features define flat api-objects; no component ever imports axios directly.',
        },
      ],
      watchOut: [
        'The hardcoded test token in the request interceptor is a dev shortcut — remove before anything ships.',
        'Redirecting on 401 inside the interceptor loses in-progress form state; fine for an admin panel, but know the tradeoff.',
      ],
      tryIt: 'Add `vendorsApi.remove(id)` following the existing convention exactly.',
    },
  },
  {
    id: 'react-3-5', category: 'Architectures', phase: 'Tab 3 — React Architectures',
    lessonNum: '3.5', title: 'Server state with TanStack Query', status: 'not-started', notes: '',
    content: {
      concept: 'Server data isn\'t state you own — it\'s a cache of someone else\'s truth. TanStack Query manages that cache: `useQuery` reads (with loading/error states, deduping, background refetch), `useMutation` writes, and `invalidateQueries` marks stale data for refetch. Query keys are the cache\'s addressing scheme — anf-admin centralizes them in a key factory.',
      inYourProject: [
        {
          file: 'src/shared/utils/queryKeys.ts',
          code: `export const queryKeys = {
  products: {
    all:    ["products"] as const,
    lists:  () => [...queryKeys.products.all, "list"] as const,
    list:   (params) => [...queryKeys.products.lists(), params] as const,
    detail: (id: string) => [...queryKeys.products.all, "detail", id] as const,
  },
};`,
        },
        {
          file: 'src/features/products/hooks/useProducts.ts',
          code: `export function useProduct(id?: string) {
  return useQuery({
    queryKey: queryKeys.products.detail(id!),
    queryFn:  () => productsApi.getById(id!),
    enabled:  !!id,   // don't fire until the id exists
  });
}`,
          description: '`enabled: !!id` is the difference between a clean detail page and a request for `/products/undefined`.',
        },
        {
          file: 'src/features/products/hooks/useProductMutations.ts',
          code: `export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: productsApi.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.products.lists() });
      toast.success("Product created");
    },
  });
}`,
          description: 'Mutation writes → invalidation targets the factory key → affected lists refetch. Invalidating `lists()` hits every params-variation at once.',
        },
      ],
      watchOut: [
        'Hand-typed keys (`["products","list"]` in one file, `["product-list"]` in another) silently break invalidation — always use the factory.',
        '`enabled: !!id` is the difference between a clean detail page and a request for `/products/undefined`.',
        'Don\'t copy query data into `useState` — render from the query directly, or you now have two sources of truth.',
      ],
      tryIt: 'Open DevTools\' network tab, edit a product, and watch the invalidation trigger exactly one list refetch.',
    },
  },
  {
    id: 'react-3-6', category: 'Architectures', phase: 'Tab 3 — React Architectures',
    lessonNum: '3.6', title: 'Client state with Zustand', status: 'not-started', notes: '',
    content: {
      concept: 'Zustand holds the client-owned state that isn\'t a server cache: session identity, UI flags. `create()` defines a store hook; components subscribe by selecting slices. The boundary rule: if the server knows it, it\'s Query; if only the browser knows it, it\'s Zustand.',
      inYourProject: [
        {
          file: 'src/features/auth/store/auth.store.ts',
          code: `export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setAuth:   (user, token) => set({ user, token }),
  clearAuth: () => set({ user: null, token: null }),
}));`,
        },
        {
          code: `const loginMutation = useMutation({
  mutationFn: authApi.login,
  onSuccess: ({ user, token }) => {
    useAuthStore.getState().setAuth(user, token);   // client state
    navigate("/dashboard");
  },
});`,
          description: 'The mutation (server) feeds the store (client); the interceptor from 3.4 reads the store on every request. One loop, three layers.',
        },
      ],
      watchOut: [
        'Select narrowly: `useAuthStore(s => s.user)` re-renders less than grabbing the whole store.',
        'Resist mirroring query data into Zustand "for convenience" — that\'s the two-sources-of-truth bug again.',
      ],
      tryIt: 'Find every reader of `useAuthStore` (grep it) and classify each as component, hook, or interceptor.',
    },
  },
  {
    id: 'react-3-7', category: 'Architectures', phase: 'Tab 3 — React Architectures',
    lessonNum: '3.7', title: 'Forms architecture', status: 'not-started', notes: '',
    content: {
      concept: 'One pipeline, no exceptions: Zod schema defines shape + rules → `z.infer` derives the TS type (types can\'t drift from validation) → `useForm` with `zodResolver` wires it to inputs → submit hands validated data to a mutation → invalidation refreshes lists.',
      inYourProject: [{
        file: 'src/features/vendors/pages/AddVendorPage.tsx',
        code: `const vendorSchema = z.object({
  name:  z.string().min(2, "Name is required"),
  email: z.string().email(),
  phone: z.string().optional(),
});
type VendorForm = z.infer<typeof vendorSchema>;

const form = useForm<VendorForm>({
  resolver: zodResolver(vendorSchema),
  defaultValues: { name: "", email: "", phone: "" },
});

function onSubmit(values: VendorForm) {
  createVendor.mutate(values, { onSuccess: () => navigate("/vendors") });
}

<form onSubmit={form.handleSubmit(onSubmit)}>
  <Input {...form.register("name")} />
  {form.formState.errors.name && <p>{form.formState.errors.name.message}</p>}
</form>`,
        description: 'Schema → type → form → mutation → redirect. RHF keeps inputs uncontrolled internally so typing doesn\'t re-render the page.',
      }],
      watchOut: [
        '`onSubmit` only runs AFTER validation passes — error branches live in `formState.errors`, not in your handler.',
        'Always give `defaultValues`; undefined-to-defined input switches trigger React warnings.',
      ],
      tryIt: 'Add a `website` field with URL validation to the vendor form — schema first, watch the type follow.',
    },
  },
  {
    id: 'react-3-8', category: 'Architectures', phase: 'Tab 3 — React Architectures',
    lessonNum: '3.8', title: 'Capstone: full data flow', status: 'not-started', notes: '',
    content: {
      concept: 'Everything from Tabs 1–3 in one trace. If you can narrate this diagram from memory, you understand the application structure end-to-end.',
      inYourProject: [{
        code: `1. User opens /products
2. router.tsx matches → renders <AppShell><ProductsListPage /></AppShell>
3. ProductsListPage calls useProducts(params)
4. useQuery → cache miss → calls productsApi.getAll
5. axios interceptor attaches Bearer token → request → response cached
6. Page renders rows (loading skeleton → data)
7. User edits → form (Zod → RHF) → useUpdateProduct().mutate(values)
8. onSuccess → invalidateQueries(queryKeys.products.lists())
9. Query refetches in background → fresh rows render. Loop closed.`,
        description: 'Every numbered step maps to a lesson: step 2 = 1.9; steps 3–5 = 3.5 + 3.4; step 7 = 3.7; steps 8–9 = 3.5.',
      }],
      watchOut: [
        'The interceptor calls `useAuthStore.getState()` directly (not a hook) — that\'s the Zustand escape hatch for non-component code.',
      ],
      tryIt: 'Draw this same trace for the vendors feature without looking, then verify each hop in the code.',
    },
  },

  // ─── Tab 4: Advanced React ──────────────────────────────────────────────────
  {
    id: 'react-4-1', category: 'Advanced React', phase: 'Tab 4 — Advanced React',
    lessonNum: '4.1', title: 'Re-renders & referential equality', status: 'not-started', notes: '',
    content: {
      concept: 'A component re-renders when its state changes or its parent re-renders. The real traps come from referential equality: `{} !== {}`. Every render creates NEW object/array/function references, which defeats memoization and re-triggers effects that depend on them.',
      inYourProject: [{
        code: `// New array reference every render — innocent-looking, consequential:
const columns = [{ key: "name" }, { key: "price" }];
<DataTable columns={columns} />   // "new" prop each render`,
        description: 'If `DataTable` is memoized, this defeats the memo because `columns` is a new object reference every render.',
      }],
      watchOut: [
        '"Parent re-rendered" is the #1 cause of child re-renders — not props changing.',
        'An effect with an object dep (`[options]`) where options is built inline runs every render.',
      ],
      tryIt: 'Add a `console.log` to a table row component, type in the page\'s search box, and count renders.',
    },
  },
  {
    id: 'react-4-2', category: 'Advanced React', phase: 'Tab 4 — Advanced React',
    lessonNum: '4.2', title: 'useMemo / useCallback', status: 'not-started', notes: '',
    content: {
      concept: '`useMemo` caches a computed value; `useCallback` caches a function reference. Both exist ONLY to preserve referential equality across renders. They are not free — each adds bookkeeping — so use them for a measured reason: a memoized child, an effect dep, or an expensive computation.',
      inYourProject: [{
        file: 'src/shared/hooks/usePagination.ts',
        code: `const nextPage = useCallback(() => {
  setPage((p) => Math.min(p + 1, totalPages));
}, [totalPages]);`,
        description: 'Without `useCallback`, every consumer gets a new function per render — breaking any memoized button or effect dep downstream. Audit the consumers first, then decide if it earns its keep.',
      }],
      watchOut: [
        'Wrapping everything "for performance" without a memoized consumer is pure overhead.',
        'React Compiler (lesson 4.4) aims to make most manual memoization obsolete.',
      ],
      tryIt: 'Find each consumer of `usePagination` and determine whether the `useCallback` earns its keep.',
    },
  },
  {
    id: 'react-4-3', category: 'Advanced React', phase: 'Tab 4 — Advanced React',
    lessonNum: '4.3', title: 'useRef & forwardRef', status: 'not-started', notes: '',
    content: {
      concept: '`useRef` is a box whose `.current` survives renders without causing them — two uses: holding DOM nodes (`ref={inputRef}`) and holding mutable values (timer ids, previous values). React 19 note: `ref` can now be passed as a normal prop, so new code rarely needs `forwardRef`.',
      inYourProject: [{
        code: `const inputRef = useRef<HTMLInputElement>(null);
useEffect(() => { inputRef.current?.focus(); }, []);  // autofocus on mount
<Input ref={inputRef} />`,
        description: 'Classic autofocus pattern: ref captures the DOM node, effect fires after mount and calls `.focus()`.',
      }],
      watchOut: [
        'Changing `.current` does NOT re-render — never use a ref where the UI must react to the change.',
        'Refs are `null` until after first render; always guard with `?.`.',
      ],
      tryIt: 'Autofocus the first field of `AddVendorPage` with a ref (or RHF\'s `setFocus` — compare both).',
    },
  },
  {
    id: 'react-4-4', category: 'Advanced React', phase: 'Tab 4 — Advanced React',
    lessonNum: '4.4', title: 'React 19 features', status: 'not-started', notes: '',
    content: {
      concept: 'anf-admin runs React 19 but uses none of its new APIs. What\'s on the table: `use()` (read promises/context conditionally), Actions + `useActionState` (built-in pending/error for form submissions), `useOptimistic` (show expected result instantly, reconcile later), and the React Compiler direction.',
      inYourProject: [{
        code: `// Worth adopting — useOptimistic pairs with your mutation hooks:
const [optimisticProducts, addOptimistic] = useOptimistic(
  products,
  (current, newItem) => [...current, { ...newItem, pending: true }]
);
// call addOptimistic(values) right before mutate(values)`,
        description: 'Verdict for this codebase: `useOptimistic` — yes, where UX feels laggy; Actions — maybe; `use()` — wait; Compiler — adopt when stable in your toolchain.',
      }],
      watchOut: [
        'Don\'t mix Actions AND RHF on the same form — pick one submission pipeline per form.',
      ],
      tryIt: 'Read the React 19 release notes with your codebase open, tagging each feature adopt / wait / skip.',
    },
  },
  {
    id: 'react-4-5', category: 'Advanced React', phase: 'Tab 4 — Advanced React',
    lessonNum: '4.5', title: 'Error boundaries & Suspense', status: 'not-started', notes: '',
    content: {
      concept: 'An error boundary catches render errors below it and shows a fallback instead of white-screening the app. Suspense shows a fallback while something below it is "not ready" — including a lazily loaded component. `React.lazy(() => import(...))` splits each page into its own chunk.',
      inYourProject: [{
        file: 'src/app/router.tsx',
        code: `// Today: every page imported eagerly → one big initial bundle.
import { ProductsListPage } from "@/features/products";

// The win — split per route:
const ProductsListPage = lazy(() =>
  import("@/features/products").then(m => ({ default: m.ProductsListPage }))
);

element: (
  <Suspense fallback={<PageSkeleton />}>
    <AppShell><ProductsListPage /></AppShell>
  </Suspense>
)`,
        description: 'Concrete payoff: the login screen stops paying for the product editor\'s bundle.',
      }],
      watchOut: [
        'Error boundaries don\'t catch errors in event handlers or async code — those need try/catch.',
        'Add a route-level `errorElement` before lazy-loading, so chunk-load failures degrade gracefully.',
      ],
      tryIt: 'Lazy-load ONE heavy route, run `npm run build`, and compare chunk sizes before/after.',
    },
  },
  {
    id: 'react-4-6', category: 'Advanced React', phase: 'Tab 4 — Advanced React',
    lessonNum: '4.6', title: 'TanStack Query advanced', status: 'not-started', notes: '',
    content: {
      concept: 'Four upgrades to the lesson 3.5 backbone: optimistic updates (snapshot → cache write → rollback in `onError`), `placeholderData` (keep showing previous page while fetching next), prefetching (load on hover, instant on click), and `select` (transform/subset data without re-shaping the cache).',
      inYourProject: [
        {
          code: `// Fixes the flash on paginated list pages:
useQuery({
  queryKey: queryKeys.products.list(params),
  queryFn:  () => productsApi.getAll(params),
  placeholderData: (prev) => prev,   // keep old page while fetching new
});`,
        },
        {
          code: `// Optimistic delete with rollback:
useMutation({
  mutationFn: productsApi.remove,
  onMutate: async (id) => {
    await qc.cancelQueries({ queryKey: queryKeys.products.lists() });
    const prev = qc.getQueryData(queryKeys.products.list(params));
    qc.setQueryData(queryKeys.products.list(params),
      (old) => old.filter(p => p.id !== id));
    return { prev };
  },
  onError:   (_e, _id, ctx) => qc.setQueryData(..., ctx?.prev),
  onSettled: () => qc.invalidateQueries({ queryKey: queryKeys.products.lists() }),
});`,
          description: 'Always `invalidateQueries` in `onSettled` — the optimistic write is a guess, the server is truth.',
        },
      ],
      watchOut: [
        'Optimistic updates without `cancelQueries` race against in-flight refetches.',
        'Always `invalidateQueries` in `onSettled` — the optimistic write is a guess, the server is truth.',
      ],
      tryIt: 'Add `placeholderData` to one list page and click through pages — the flash is gone.',
    },
  },
  {
    id: 'react-4-7', category: 'Advanced React', phase: 'Tab 4 — Advanced React',
    lessonNum: '4.7', title: 'Performance profiling', status: 'not-started', notes: '',
    content: {
      concept: 'Never optimize on vibes. React DevTools\' Profiler records a session and shows which components rendered, why ("props changed", "hook changed", "parent rendered"), and how long each took. Measure → identify → fix → re-measure.',
      inYourProject: [{
        code: `// Workflow on ProductsListPage:
// 1. Profiler tab → record → type in the search box → stop.
// 2. Enable "Record why each component rendered".
// 3. Expect: rows re-render per keystroke (controlled input re-renders page).
// 4. Judge: 50 rows — fine. 500 — memo the row or virtualize.`,
        description: 'Profile production-ish builds for real timings; dev mode inflates numbers (but render CAUSES are valid in dev).',
      }],
      watchOut: [
        'Dev mode inflates timings by 2–10×; profile a production build for real numbers.',
        '"Slow" is relative — a 50-row re-render at 2ms is fine; a 5000-row re-render at 200ms is not.',
      ],
      tryIt: 'Run that exact workflow and write one sentence: what re-rendered and why.',
    },
  },
  {
    id: 'react-4-8', category: 'Advanced React', phase: 'Tab 4 — Advanced React',
    lessonNum: '4.8', title: 'Testing — the missing skill', status: 'not-started', notes: '',
    content: {
      concept: 'Vitest (Vite-native runner) + React Testing Library (render components, query like a user) + jsdom. Philosophy: test behavior through the UI, not implementation details. The first three tests for this codebase, easiest first: a pure function, a hook with timers, a form with a mocked API.',
      inYourProject: [
        {
          code: `// vite.config.ts
test: { environment: "jsdom", setupFiles: "./src/test/setup.ts", globals: true }`,
        },
        {
          code: `// 1) cn() — pure function
expect(cn("p-2", "p-4")).toBe("p-4");

// 2) useDebounce — fake timers
vi.useFakeTimers();
const { result, rerender } = renderHook(
  ({ v }) => useDebounce(v, 500), { initialProps: { v: "a" } }
);
rerender({ v: "ab" });
act(() => vi.advanceTimersByTime(500));
expect(result.current).toBe("ab");

// 3) AddVendorPage — mocked API
vi.mock("@/features/vendors/api/vendors.api");
render(<AddVendorPage />, { wrapper: TestProviders });
await user.type(screen.getByLabelText(/name/i), "Acme");
await user.click(screen.getByRole("button", { name: /save/i }));
expect(vendorsApi.create).toHaveBeenCalledWith(
  expect.objectContaining({ name: "Acme" }));`,
          description: '`TestProviders` wraps a fresh QueryClient + MemoryRouter — a mini version of your `AppProviders`.',
        },
      ],
      watchOut: [
        'Query by role/label (what users perceive), not test-ids, wherever possible.',
        'Each test needs a FRESH QueryClient or cached data leaks between tests.',
      ],
      tryIt: 'Set up Vitest and land the `cn()` test — smallest possible green checkmark first.',
    },
  },
  {
    id: 'react-4-9', category: 'Advanced React', phase: 'Tab 4 — Advanced React',
    lessonNum: '4.9', title: 'Patterns to recognize', status: 'not-started', notes: '',
    content: {
      concept: 'Three patterns you\'ll meet in every library\'s docs. Compound components: a family sharing implicit context — `Dialog` + `Dialog.Trigger` + `Dialog.Content` coordinate state without you wiring it. Render props vs hooks: passing a function-as-child — mostly superseded by hooks. Controlled vs uncontrolled: does the parent own the state (`open`/`onOpenChange`) or the component (`defaultOpen`)?',
      inYourProject: [{
        file: 'src/components/ui/dialog.tsx',
        code: `<Dialog open={open} onOpenChange={setOpen}>   {/* controlled */}
  <DialogTrigger asChild><Button>Edit</Button></DialogTrigger>
  <DialogContent>...</DialogContent>
</Dialog>

<Dialog defaultOpen={false}>   {/* uncontrolled */}`,
        description: 'Open `dialog.tsx` and find where Trigger and Content share state — you now recognize the compound component mechanism.',
      }],
      watchOut: [
        'Supplying `open` without `onOpenChange` freezes the dialog — same trap as a value-without-onChange input.',
      ],
      tryIt: 'Open your `dialog.tsx` and find where Trigger and Content share state — you now recognize the mechanism. Course complete. 🎓',
    },
  },
]
