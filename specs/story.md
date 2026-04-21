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

### Task 2.1: About page - Bio & Timeline
- [ ] Create About.vue page at `/about` route
- [ ] Build bio section with personal introduction
- [ ] Build timeline component showing work/education experiences
- [ ] Add dates, titles, and descriptions to timeline items
- [ ] Style timeline responsively (mobile-first)

### Task 2.2: About page - Skills & CV
- [ ] Create skills component with categorized skills (Frontend, Backend, Tools, etc.)
- [ ] Display skills as badges or cards
- [ ] Add CV download link (PDF from Supabase Storage or static file)
- [ ] Test CV download functionality
- [ ] Ensure responsive layout on mobile/tablet/desktop

### Task 2.3: About page - SEO & Accessibility
- [ ] Add SEO meta tags (title: "About Me", description, og:image)
- [ ] Add semantic HTML (section, article, nav, etc.)
- [ ] Verify accessibility (alt text, heading hierarchy, focus management)
- [ ] Test page loads without errors

---

## Phase 3: Projects Feature

### Task 3.1: Projects list - Grid layout & fetching
- [ ] Create ProjectList.vue page at `/projects` route
- [ ] Fetch projects from Supabase `projects` table
- [ ] Display projects in grid/list view with: thumbnail, title, short description, tech tags
- [ ] Implement mobile-first responsive grid
- [ ] Add loading state while fetching

### Task 3.2: Projects list - Filtering by technology
- [ ] Extract unique tech tags from all projects
- [ ] Create filter UI (buttons or dropdown)
- [ ] Implement tag filtering (show only projects with selected tag)
- [ ] Clear/reset filters
- [ ] Show "no results" when no projects match

### Task 3.3: Project detail page - Markdown & content
- [ ] Create ProjectDetail.vue page at `/projects/:slug` route
- [ ] Fetch single project by slug from Supabase
- [ ] Render project content as markdown (using markdown-it or marked)
- [ ] Display project metadata (title, tags, created_at)
- [ ] Add 404 handling for invalid slugs

### Task 3.4: Project detail page - Links & media
- [ ] Display GitHub link (clickable, with icon)
- [ ] Display live demo link (clickable, with icon)
- [ ] Display project thumbnail/cover image
- [ ] Implement image lazy-loading
- [ ] Add social share buttons (or prepare for Phase 7)

### Task 3.5: Projects - SEO & data management
- [ ] Add dynamic SEO meta tags per project (title, description, og:image=thumbnail)
- [ ] Populate sample project data in Supabase
- [ ] Add featured projects highlighting on list
- [ ] Verify accessibility (semantic HTML, alt text)
- [ ] Test featured filtering works

---

## Phase 4: Blog Feature

### Task 4.1: Blog list - Fetching & pagination
- [ ] Create BlogList.vue page at `/blog` route
- [ ] Fetch published posts (published=true) from Supabase
- [ ] Display posts with: title, excerpt, publish date, tags
- [ ] Implement pagination or infinite scroll
- [ ] Add loading state

### Task 4.2: Blog list - Search functionality
- [ ] Create search input field
- [ ] Implement search by post title and excerpt
- [ ] Show "no results" when no match
- [ ] Combine search + pagination

### Task 4.3: Blog list - Tag filtering
- [ ] Extract unique tags from all posts
- [ ] Create tag filter UI
- [ ] Implement tag-based filtering
- [ ] Allow combined search + tag filter
- [ ] Show active filters

### Task 4.4: Blog detail page - Markdown rendering
- [ ] Create BlogDetail.vue page at `/blog/:slug` route
- [ ] Fetch single post by slug from Supabase
- [ ] Render post content as markdown (markdown-it or marked)
- [ ] Display post metadata (title, excerpt, publish date, tags)
- [ ] Add 404 handling for invalid slugs

### Task 4.5: Blog detail page - Sharing & SEO
- [ ] Add social sharing buttons (Twitter, LinkedIn, copy link)
- [ ] Add cover image display (if available)
- [ ] Add dynamic SEO meta tags per post (title, description, og:image=cover_image_url)
- [ ] Populate sample blog post data in Supabase
- [ ] Verify accessibility

---

## Phase 5: Home Page

### Task 5.1: Home page - Hero section
- [ ] Create Home.vue page at `/` route
- [ ] Build hero section with: name, tagline, avatar, CTA buttons
- [ ] Style responsive hero (mobile-first)
- [ ] Add smooth animations to hero content

### Task 5.2: Home page - Featured projects & latest posts
- [ ] Create featured projects section (fetch top 3–4 projects where featured=true)
- [ ] Display each as card with thumbnail, title, short desc
- [ ] Create latest posts section (fetch 2–3 most recent published posts)
- [ ] Display each as card with title, excerpt, publish date
- [ ] Add links to /projects and /blog list pages

### Task 5.3: Home page - Tech stack showcase
- [ ] Create tech stack section (grid or marquee layout)
- [ ] Display icons for technologies (Vue, React, Node, PostgreSQL, Tailwind, etc.)
- [ ] Ensure responsive on mobile
- [ ] Add smooth animations

### Task 5.4: Home page - Performance & SEO
- [ ] Verify no N+1 queries to Supabase (use batch fetch if needed)
- [ ] Implement lazy-loading for images in featured sections
- [ ] Add dynamic SEO meta tags (title, description, og:image)
- [ ] Test page load performance
- [ ] Verify all links work

---

## Phase 6: Contact Page

### Task 6.1: Contact form - HTML & validation
- [ ] Create Contact.vue page at `/contact` route
- [ ] Build form with: name, email, message fields
- [ ] Add form validation (required fields, valid email format)
- [ ] Show error messages per field
- [ ] Style form responsively (mobile-first)

### Task 6.2: Contact form - Submission & storage
- [ ] Implement form submission handler
- [ ] Insert valid submissions into Supabase `contacts` table
- [ ] Handle Supabase errors gracefully
- [ ] Show success message after submission
- [ ] Clear form after successful submission

### Task 6.3: Contact page - Social links & SEO
- [ ] Display social media links (GitHub, LinkedIn, Twitter, email)
- [ ] Make links clickable and accessible
- [ ] Add icons for social media
- [ ] Add dynamic SEO meta tags (title, description)
- [ ] Verify accessibility (form labels, ARIA attributes, keyboard nav)

---

## Phase 7: Refinements

### Task 7.1: Dark mode toggle
- [ ] Create dark mode toggle in Header/Nav
- [ ] Implement light/dark theme CSS (Tailwind dark: modifier)
- [ ] Persist dark mode preference in localStorage
- [ ] Apply dark theme to all pages
- [ ] Test on all pages

### Task 7.2: Animations & transitions
- [ ] Add smooth page transitions between routes (Vue Router)
- [ ] Add subtle hover effects to interactive elements (buttons, links, cards)
- [ ] Add entrance animations to sections (fade-in, slide-up)
- [ ] Ensure animations are performant (no jank)

### Task 7.3: Image optimization & lazy-loading
- [ ] Implement lazy-loading for all images (native loading="lazy" or Intersection Observer)
- [ ] Optimize image sizes (use smaller thumbnails, responsive images)
- [ ] Test lazy-loading in browser DevTools
- [ ] Verify images load correctly on slow network

### Task 7.4: Code splitting & bundling
- [ ] Verify route-based code splitting (separate chunks per route)
- [ ] Check bundle size with build analyzer
- [ ] Optimize Supabase client (tree-shake unused features)
- [ ] Test bundle size acceptable

### Task 7.5: Performance optimization
- [ ] Run Lighthouse audit on all pages
- [ ] Fix performance issues (target > 90 on all pages)
- [ ] Optimize CSS delivery (critical path)
- [ ] Minify and compress assets
- [ ] Test on slow 3G network (DevTools)

### Task 7.6: Analytics & monitoring
- [ ] Integrate Vercel Analytics or Umami
- [ ] Track page views on all routes
- [ ] Track interactions (button clicks, form submissions)
- [ ] Test analytics dashboard shows data

### Task 7.7: Accessibility polish
- [ ] Run accessibility audit (Axe, Lighthouse)
- [ ] Fix WCAG 2.1 AA compliance issues
- [ ] Test with keyboard navigation (Tab, Enter, Escape)
- [ ] Test with screen reader (VoiceOver or NVDA)
- [ ] Improve focus management on modals/dialogs (if any)

### Task 7.8: Cross-device testing
- [ ] Test on iPhone, iPad, Android, Desktop
- [ ] Verify responsive design (all breakpoints)
- [ ] Test all features work on mobile (forms, links, nav)
- [ ] Fix any platform-specific issues
- [ ] Verify no 404s or broken links

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
