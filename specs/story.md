# Portfolio Website - Implementation Tasks

Nhóm từng Phase thành PR-sized tasks. Mỗi task đủ nhỏ để 1 PR, đủ lớn để meaningful.

---

## Phase 1: Project Setup & Infrastructure

### Task 1.1: Vue 3 + Vite + Tailwind CSS setup
- [x] Initialize Vue 3 + Vite project
- [x] Configure Tailwind CSS with proper build
- [x] Add Vue Router with route definitions (7 routes)
- [x] Create basic project structure (src/components, src/pages, src/lib)
- [x] Verify `npm run dev` works locally

### Task 1.2: Supabase project & database schema
- [x] Create Supabase project
- [x] Create `projects` table (id, title, slug, description, content, thumbnail_url, tags, github_url, demo_url, featured, created_at)
- [x] Create `posts` table (id, title, slug, excerpt, content, cover_image_url, tags, published, published_at, created_at)
- [x] Create `contacts` table (id, name, email, message, created_at)
- [x] Setup RLS policies for all tables (SELECT public, INSERT/UPDATE/DELETE auth for projects/posts; INSERT public, SELECT auth for contacts)

### Task 1.3: Supabase client & TypeScript setup
- [x] Create `src/lib/supabase.ts` client configuration
- [x] Generate TypeScript types from Supabase schema
- [x] Setup environment variables (.env.local)
- [x] Test Supabase connection from Vue component

### Task 1.4: Shared layout & routing
- [x] Create Header component (logo, nav, links)
- [x] Create Navbar component (mobile-responsive)
- [x] Create Footer component (copyright, links)
- [x] Create Layout wrapper component
- [x] Apply layout to all 7 routes
- [x] Verify routing works (navigate between pages)

### Task 1.5: Project documentation & deployment setup
- [x] Write `CLAUDE.md` (tech stack, commands, conventions, notes)
- [x] Configure Vercel project and environment variables
- [x] Test build: `npm run build`
- [x] Deploy initial setup to Vercel (empty pages OK)
- [x] Verify GitHub connection for auto-deploy

---

## Phase 2: About Page

> Design reference: [`specs/design/about.jsx`](design/about.jsx)

### Task 2.1: About page - Bio & Timeline
- [x] Create About.vue page at `/about` route
- [x] Build bio section with personal introduction
- [x] Build timeline component showing work/education experiences
- [x] Add dates, titles, and descriptions to timeline items
- [x] Style timeline responsively (mobile-first)

### Task 2.2: About page - Skills & CV
- [x] Create skills component with categorized skills (Frontend, Backend, Tools, etc.)
- [x] Display skills as badges or cards
- [x] Add CV download link (PDF from Supabase Storage or static file)
- [x] Test CV download functionality
- [x] Ensure responsive layout on mobile/tablet/desktop

### Task 2.3: About page - SEO & Accessibility
- [x] Add SEO meta tags (title: "About Me", description, og:image)
- [x] Add semantic HTML (section, article, nav, etc.)
- [x] Verify accessibility (alt text, heading hierarchy, focus management)
- [x] Test page loads without errors

---

## Phase 3: Projects Feature

> Design reference: [`specs/design/project.jsx`](design/project.jsx) — includes list page (grid/list view, tag filter) and detail page

### Task 3.1: Projects list - Grid layout & fetching
- [x] Create ProjectList.vue page at `/projects` route
- [x] Fetch projects from Supabase `projects` table
- [x] Display projects in grid/list view with: thumbnail, title, short description, tech tags
- [x] Implement mobile-first responsive grid
- [x] Add loading state while fetching

### Task 3.2: Projects list - Filtering by technology
- [x] Extract unique tech tags from all projects
- [x] Create filter UI (buttons or dropdown)
- [x] Implement tag filtering (show only projects with selected tag)
- [x] Clear/reset filters
- [x] Show "no results" when no projects match

### Task 3.3: Project detail page - Markdown & content
- [x] Create ProjectDetail.vue page at `/projects/:slug` route
- [x] Fetch single project by slug from Supabase
- [x] Render project content as markdown (using markdown-it or marked)
- [x] Display project metadata (title, tags, created_at)
- [x] Add 404 handling for invalid slugs

### Task 3.4: Project detail page - Links & media
- [x] Display GitHub link (clickable, with icon)
- [x] Display live demo link (clickable, with icon)
- [x] Display project thumbnail/cover image
- [x] Implement image lazy-loading
- [x] Add social share buttons (or prepare for Phase 7)

### Task 3.5: Projects - SEO & data management
- [x] Add dynamic SEO meta tags per project (title, description, og:image=thumbnail)
- [x] Populate sample project data in Supabase
- [x] Add featured projects highlighting on list
- [x] Verify accessibility (semantic HTML, alt text)
- [x] Test featured filtering works

---

## Phase 4: Blog Feature

> Design reference: [`specs/design/blog.jsx`](design/blog.jsx) — includes list page (search, tag filter, featured post) and detail page (markdown rendering, reading progress, share, related posts)

### Task 4.1: Blog list - Fetching & pagination
- [x] Create BlogList.vue page at `/blog` route
- [x] Fetch published posts (published=true) from Supabase
- [x] Display posts with: title, excerpt, publish date, tags
- [x] Implement pagination or infinite scroll
- [x] Add loading state

### Task 4.2: Blog list - Search functionality
- [x] Create search input field
- [x] Implement search by post title and excerpt
- [x] Show "no results" when no match
- [x] Combine search + pagination

### Task 4.3: Blog list - Tag filtering
- [x] Extract unique tags from all posts
- [x] Create tag filter UI
- [x] Implement tag-based filtering
- [x] Allow combined search + tag filter
- [x] Show active filters

### Task 4.4: Blog detail page - Markdown rendering
- [x] Create BlogDetail.vue page at `/blog/:slug` route
- [x] Fetch single post by slug from Supabase
- [x] Render post content as markdown (markdown-it or marked)
- [x] Display post metadata (title, excerpt, publish date, tags)
- [x] Add 404 handling for invalid slugs

### Task 4.5: Blog detail page - Sharing & SEO
- [x] Add social sharing buttons (Twitter, LinkedIn, copy link)
- [x] Add cover image display (if available)
- [x] Add dynamic SEO meta tags per post (title, description, og:image=cover_image_url)
- [x] Populate sample blog post data in Supabase
- [x] Verify accessibility

---

## Phase 5: Home Page

> Design reference: [`specs/design/home.jsx`](design/home.jsx) — hero with animated canvas + terminal text, featured projects grid, latest posts list, tech stack badges

### Task 5.1: Home page - Hero section
- [x] Create Home.vue page at `/` route
- [x] Build hero section with: name, tagline, avatar, CTA buttons
- [x] Style responsive hero (mobile-first)
- [x] Add smooth animations to hero content

### Task 5.2: Home page - Featured projects & latest posts
- [x] Create featured projects section (fetch top 3–4 projects where featured=true)
- [x] Display each as card with thumbnail, title, short desc
- [x] Create latest posts section (fetch 2–3 most recent published posts)
- [x] Display each as card with title, excerpt, publish date
- [x] Add links to /projects and /blog list pages

### Task 5.3: Home page - Tech stack showcase
- [x] Create tech stack section (grid or marquee layout)
- [x] Display icons for technologies (Vue, React, Node, PostgreSQL, Tailwind, etc.)
- [x] Ensure responsive on mobile
- [x] Add smooth animations

### Task 5.4: Home page - Performance & SEO
- [x] Verify no N+1 queries to Supabase (use batch fetch if needed)
- [x] Implement lazy-loading for images in featured sections
- [x] Add dynamic SEO meta tags (title, description, og:image)
- [x] Test page load performance
- [x] Verify all links work

---

## Phase 6: Contact Page

> Design reference: [`specs/design/contact.jsx`](design/contact.jsx) — contact form with validation + success state, social links panel, response time indicator, CTA banner

### Task 6.1: Contact form - HTML & validation
- [x] Create Contact.vue page at `/contact` route
- [x] Build form with: name, email, message fields
- [x] Add form validation (required fields, valid email format)
- [x] Show error messages per field
- [x] Style form responsively (mobile-first)

### Task 6.2: Contact page - Social links & SEO
- [ ] Display social media links (GitHub, LinkedIn, Twitter, email)
- [ ] Make links clickable and accessible
- [ ] Add icons for social media
- [ ] Add dynamic SEO meta tags (title, description)
- [ ] Verify accessibility (form labels, ARIA attributes, keyboard nav)

### Task 6.3: Add content to CV
- Currently, content in CV is placeholder
- Source of content
    - Supabase?
    - Import file?
    - Content fix in source code?

---

## Phase 7: Refinements
### Task 7.1: Add i18n
- Support English / Vietnames
- Toggle language in left of header

### Task 7.2: Dark mode toggle
- [ ] Create dark mode toggle in Header/Nav
- [ ] Implement light/dark theme CSS (Tailwind dark: modifier)
- [ ] Persist dark mode preference in localStorage
- [ ] Apply dark theme to all pages
- [ ] Test on all pages

---

## Summary

- **Phase 1**: 5 PR-sized tasks (infrastructure setup)
- **Phase 2**: 3 PR-sized tasks (About page)
- **Phase 3**: 5 PR-sized tasks (Projects feature)
- **Phase 4**: 5 PR-sized tasks (Blog feature)
- **Phase 5**: 4 PR-sized tasks (Home page)
- **Phase 6**: 3 PR-sized tasks (Contact page)
- **Phase 7**: 8 PR-sized tasks (Refinements & polish)

**Total: 33 tasks across 7 phases**

Each task is scoped for a single PR (40–100 lines of code typically, plus tests/styling). All tasks follow vertical slices — no layer-by-layer splitting.
