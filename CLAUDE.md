# Portfolio – Project Documentation

## Tech Stack

- **Vue 3** – UI framework (Composition API + `<script setup>`)
- **Vite** – build tool and dev server
- **TypeScript** – type checking via `vue-tsc`
- **Tailwind CSS** – utility-first styling
- **Vue Router 4** – client-side routing
- **Supabase** – backend (Postgres DB + auth client)

## Dev Commands

```bash
npm run dev          # start dev server (http://localhost:5173)
npm run build        # type-check + production build → dist/
npm run lint         # ESLint with zero-warning policy
npm run preview      # serve the production build locally
```

> There is no separate `type-check` script; TypeScript is checked as part of `npm run build` via `tsc && vite build`.

## Folder Conventions

```
src/
  pages/        # route-level views (one file per route)
  components/   # shared UI components (Layout, Navbar, Header, Footer)
  lib/          # Supabase client + generated DB types
  constants/    # shared constants (e.g. nav links)
  router/       # Vue Router configuration
```

- Route components live in `src/pages/` and are named in PascalCase (e.g. `Home.vue`, `BlogDetail.vue`).
- Shared/reusable components live in `src/components/`.
- The Supabase client singleton is exported from `src/lib/supabase.ts`; import from there, never instantiate elsewhere.
- Generated TypeScript types for the DB schema are in `src/lib/database.types.ts`.

## Environment Variables

Runtime config is loaded from `.env.local` (gitignored — never commit this file).

| Variable               | Description              |
| ---------------------- | ------------------------ |
| `VITE_SUPABASE_URL`    | Supabase project API URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/public key |

Variables **must** use the `VITE_` prefix so Vite exposes them to the client bundle. A plain `SUPABASE_URL` without the prefix is `undefined` at runtime.

For Vercel deployments, set these in **Settings → Environment Variables** for all three environments (Production, Preview, Development). Vercel does not read `.env.local` from the repo.

## Supabase Notes

- Project ID: `ebcmjbcklusdjdwaaydg` (region: `ap-south-1`)
- GitHub: https://github.com/nxhung2304/portfolio

## Vercel Deployment

- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`
- Every push to `main` triggers an automatic production deploy.
- PRs get automatic Preview URLs.
