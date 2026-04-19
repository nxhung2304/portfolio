## 1. Tổng quan

Xây dựng trang web cá nhân giới thiệu bản thân, showcase kỹ năng, dự án và chia sẻ kiến thức qua blog. Tất cả trong một codebase duy nhất.

## 2. Tech Stack

| Thành phần | Công nghệ |
| --- | --- |
| Frontend | Vue 3 (Composition API) + Vite |
| Styling | Tailwind CSS |
| Backend / Database | Supabase (PostgreSQL, Auth, Storage) |
| Deploy | Vercel |


## Design
- Home: ./design/home.jsx
- About: ./design/about.jsx
- Projects: ./design/project.jsx
- Blog: ./design/blog.jsx
- Contact: ./design/contact.jsx.jsx
-> Must convert to Vue3 when implement

## 3. Cấu trúc trang (Routes)

| Route | Mô tả |
| --- | --- |
| `/` | Trang chủ — giới thiệu ngắn, highlight projects & bài viết mới |
| `/about` | Giới thiệu chi tiết bản thân, kinh nghiệm, kỹ năng |
| `/projects` | Danh sách dự án đã làm |
| `/projects/:slug` | Chi tiết một dự án |
| `/blog` | Danh sách bài viết |
| `/blog/:slug` | Chi tiết bài viết |
| `/contact` | Form liên hệ |

## 4. Tính năng chi tiết

### 4.1 Trang chủ (`/`)

- Hero section: tên, tagline, avatar, CTA
- Featured projects (3–4 project nổi bật)
- Bài viết mới nhất (2–3 bài)
- Tech stack / kỹ năng (icon grid hoặc marquee)

### 4.2 About (`/about`)

- Bio chi tiết
- Timeline kinh nghiệm làm việc / học tập
- Kỹ năng phân loại (Frontend, Backend, Tools…)
- Link CV (PDF download từ Supabase Storage)

### 4.3 Projects (`/projects`)

- Grid/list dự án với thumbnail, tên, mô tả ngắn, tags công nghệ
- Filter theo tag/công nghệ
- Trang chi tiết: mô tả, ảnh/video demo, link Github, link live demo

### 4.4 Blog (`/blog`)

- Danh sách bài viết: tiêu đề, excerpt, ngày đăng, tags
- Phân trang hoặc infinite scroll
- Trang chi tiết: nội dung markdown render ra HTML, chia sẻ social
- Tìm kiếm & lọc theo tag

### 4.5 Contact (`/contact`)

- Form liên hệ (tên, email, nội dung) — lưu vào Supabase
- Link social media (Github, LinkedIn, Twitter…)

## 5. Supabase Schema

### Bảng `projects`

| Cột | Kiểu | Ghi chú |
| --- | --- | --- |
| id | uuid | PK, auto |
| title | text |  |
| slug | text | unique |
| description | text | Mô tả ngắn |
| content | text | Markdown chi tiết |
| thumbnail_url | text | Ảnh đại diện |
| tags | text[] | Mảng tags công nghệ |
| github_url | text | nullable |
| demo_url | text | nullable |
| featured | boolean | default false |
| created_at | timestamptz |  |

### Bảng `posts`

| Cột | Kiểu | Ghi chú |
| --- | --- | --- |
| id | uuid | PK, auto |
| title | text |  |
| slug | text | unique |
| excerpt | text | Tóm tắt |
| content | text | Markdown |
| cover_image_url | text | nullable |
| tags | text[] |  |
| published | boolean | default false |
| published_at | timestamptz | nullable |
| created_at | timestamptz |  |

### Bảng `contacts`

| Cột | Kiểu | Ghi chú |
| --- | --- | --- |
| id | uuid | PK, auto |
| name | text |  |
| email | text |  |
| message | text |  |
| created_at | timestamptz |  |

## 6. Supabase RLS (Row Level Security)

- `projects`, `posts`: SELECT public (ai cũng đọc được); INSERT/UPDATE/DELETE chỉ authenticated (admin)
- `contacts`: INSERT public (ai cũng gửi được); SELECT chỉ authenticated
- `posts` thêm filter: chỉ trả về `published = true` cho public

## 8. Yêu cầu phi chức năng

- **Responsive**: mobile-first, đẹp trên mọi kích thước
- **Performance**: Lighthouse > 90, lazy load ảnh, code splitting theo route
- **SEO**: meta tags động theo từng trang (dùng `@unhead/vue` hoặc `vue-meta`)
- **Dark mode**: hỗ trợ toggle sáng/tối
- **Accessibility**: semantic HTML, focus management, alt text
- **Animation**: transition mượt giữa các trang, subtle hover effects

## 9. Developer Tooling & AI Workflow

### Claude Code

Dùng Claude Code làm công cụ phát triển chính. Lưu ý:

- Tạo file `CLAUDE.md` ở root, ghi rõ: tech stack, convention, cách chạy dev/build, lưu ý đặc biệt. Claude Code tự động đọc file này mỗi session.
- Chia task nhỏ, rõ ràng — ví dụ "tạo component ProjectCard" thay vì "làm xong trang Projects".
- Dùng TypeScript và generate types từ Supabase (`supabase gen types typescript`) để AI sinh code chính xác hơn.
- Verify kỹ các RLS policies và migration do AI tạo ra.

### MCP Servers cần cấu hình

| MCP Server | Mục đích |
| --- | --- |
| Supabase MCP | Query database, kiểm tra schema, tạo migration trực tiếp |
| GitHub MCP | Tạo PR, review code, quản lý issues |
| Filesystem (built-in) | Đọc/ghi file trong project |

### CLAUDE.md convention (gợi ý nội dung)

```
# Portfolio Website

## Tech Stack
Vue 3 (Composition API) + Vite + Tailwind CSS + Supabase + Vercel

## Commands
- Dev: `npm run dev`
- Build: `npm run build`
- Type check: `npm run type-check`
- Supabase types: `npx supabase gen types typescript --project-id <id> > src/types/supabase.ts`

## Conventions
- Components: PascalCase, single-file `.vue`
- Composables: `use` prefix, đặt trong `src/composables/`
- Supabase client: import từ `src/lib/supabase.ts`
- Styling: Tailwind utility classes, không dùng scoped CSS trừ khi cần thiết
- Markdown: render bằng markdown-it

## Lưu ý
- Luôn check RLS policies khi tạo/sửa bảng Supabase
- Lazy load images, code split theo route
- Mobile-first responsive
```

## 10. Giai đoạn phát triển

### Phase 1 — MVP

- Setup project (Vue + Vite + Tailwind + Supabase)
- Layout chung (Header, Footer, Navbar)
- Trang chủ, About, Contact
- Projects CRUD + hiển thị
- Deploy Vercel

### Phase 2 — Blog

- Blog listing + detail
- Markdown rendering (dùng `markdown-it` hoặc `marked`)
- Tìm kiếm & filter theo tag
- SEO meta tags

### Phase 3 — Polish

- Dark mode
- Animations / transitions
- Tối ưu performance
- Analytics (Vercel Analytics hoặc Umami)
- Admin panel đơn giản để quản lý content (nếu cần)

