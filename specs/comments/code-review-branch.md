# Code Review: Current Branch

## Context
- Branch: HEAD (detached, latest commit `52c3000`)
- Commit: `feat(projects): implement projects list page with grid layout and supabase fetching`
- Files changed:
  - `AGENTS.md` — documentation reorganisation (non-code)
  - `specs/issues/3.1-projects-list-grid-layout-and-fetching.md` — spec/issue file (non-code)
  - `src/lib/database.types.ts` — added `slug`, `thumbnail_url`, `tags` fields to `projects` table types
  - `src/components/ProjectCard.vue` — new card component
  - `src/pages/Projects.vue` — replaced placeholder with full implementation

---

## Passed
- Supabase client is imported from `src/lib/supabase.ts` singleton — follows project convention.
- Vue 3 Composition API with `<script setup lang="ts">` — correct pattern throughout.
- `ref<Project[]>([])` and explicit type annotations used consistently.
- `onMounted` triggers fetch on page load — correct lifecycle usage.
- Error is caught and propagated; retry button calls `fetchProjects` again — good UX.
- `loading`, `error`, empty state, and grid state are mutually exclusive via `v-if / v-else-if / v-else` — no overlapping render conditions.
- `ProjectCard` receives full typed `Project` prop — no loose `any` in the component itself.
- Router uses named route `project-detail` and `Projects.vue` route is lazy-loaded — consistent with other routes.
- Tailwind grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` is mobile-first and matches the spec.
- Skeleton loading matches card structure (aspect-video, title, body lines, tag pills) — good shimmer UX.
- `aria-hidden="true"` on the placeholder emoji in `ProjectCard` — correct accessibility.
- `database.types.ts` is updated in sync with the actual columns being queried.

---

## Issues

### TypeScript / Type Safety

- `src/pages/Projects.vue:78` — `error` ref is typed `ref<any>(null)`. This loses all type information. Use `ref<Error | null>(null)` (or `ref<PostgrestError | null>(null)` from `@supabase/supabase-js`) and cast appropriately in the catch block.
  ```ts
  // before
  const error = ref<any>(null)
  // after
  import type { PostgrestError } from '@supabase/supabase-js'
  const error = ref<PostgrestError | Error | null>(null)
  ```

- `src/pages/Projects.vue:87` — The `.select(...)` string selects `id, title, slug, description, thumbnail_url, tags, created_at` (7 columns) but **omits `updated_at`**. The `Project` type (full `Row`) includes `updated_at: string`, so `data` will be typed as `Project[]` while actually missing that field at runtime. Either select `*`, or narrow the local type to only the fetched columns to avoid a type/runtime mismatch.
  ```ts
  // Option A — select all
  .select('*')
  // Option B — narrow type
  type ProjectListItem = Pick<Project, 'id' | 'title' | 'slug' | 'description' | 'thumbnail_url' | 'tags' | 'created_at'>
  const projects = ref<ProjectListItem[]>([])
  ```

- `src/components/ProjectCard.vue:48` — `Project` type is redefined locally (duplicating the same `type Project = Database[...]` already declared in `Projects.vue`). Extract this shared type to `src/lib/database.types.ts` or a dedicated `src/types/project.ts` to avoid divergence.

### Supabase Query

- `src/pages/Projects.vue:87-88` — The diff in the commit shows `.select('id, title, slug, description, thumbnail_url, tags, created_at, updated_at')` but the actual file on disk reads `.select('id, title, slug, description, thumbnail_url, tags, created_at')` (without `updated_at`). This is inconsistent with the `Row` type. See type-safety issue above.

### Security

- `src/components/ProjectCard.vue:10` — `thumbnail_url` is rendered directly in an `<img src>` tag coming from the database. If the Supabase row is ever populated with a `javascript:` URI or a data URI, browsers will load it. Validate or sanitise `thumbnail_url` at insert time (DB constraint / check constraint `thumbnail_url LIKE 'https://%'`) and/or add a Content Security Policy `img-src` directive. No code change needed in the component itself if handled at DB/CSP level, but this is a risk to document.

### Clean Code

- `src/pages/Projects.vue:100-102` — `onMounted(() => { fetchProjects() })` can be simplified to `onMounted(fetchProjects)` since the callback signature matches exactly.

- `src/pages/Projects.vue:66-72` — SEO meta is minimal: `og:description` and `og:image` are missing while `og:title` is present. The About page sets more complete OG tags. For consistency (and actual social sharing), add at minimum `og:description`.

### Accessibility

- `src/pages/Projects.vue:29` and `src/pages/Projects.vue:43` — The emoji icons inside the error/empty-state containers (`⚠️`, `🔍`) are rendered as raw text nodes, not wrapped in a `<span aria-hidden="true">`. Screen readers will announce these as emoji character names. Add `aria-hidden="true"` as was correctly done in `ProjectCard.vue`.

- `src/pages/Projects.vue:32-37` — The retry `<button>` has no `type="button"` attribute. Inside a `<main>` (not a `<form>`) this is harmless, but adding `type="button"` is an explicit best practice to prevent accidental form submission if the DOM structure changes.

---

## Summary

The implementation is solid overall: Supabase fetch, loading/error/empty states, responsive grid, and the `ProjectCard` component are all well-structured and follow project conventions. The two main issues to address before merging are the `ref<any>` error type (replace with a concrete type) and the select-vs-Row type mismatch (`updated_at` is in the type but not fetched), which will cause a silent runtime discrepancy. Accessibility gaps on the emoji icons and the missing `og:description` meta tag are minor but straightforward to fix.
