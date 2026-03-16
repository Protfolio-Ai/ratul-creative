

## Plan: Admin Backend for Portfolio Content Management

### Overview
Create an admin panel at `/admin` with email+password login, allowing you to edit all sections of your portfolio website. Content will be stored in the database and fetched dynamically by the frontend.

### Database Tables (via migrations)

**1. `site_content` table** — single-row key-value store for simple text content:
- `id` (text, PK) — key like `hero_title`, `hero_subtitle`, `about_text_1`, `about_text_2`, `contact_email`, `contact_phone`, `contact_location`, `cv_url`, `footer_text`
- `value` (text) — the content
- `updated_at` (timestamptz)

**2. `services` table:**
- `id` (uuid, PK), `title`, `description`, `icon_name` (text — e.g. "Palette"), `sort_order` (int)

**3. `skills` table:**
- `id` (uuid, PK), `name`, `percentage` (int), `category` (text — Design/Tech/Video), `sort_order` (int)

**4. `portfolio_items` table:**
- `id` (uuid, PK), `title`, `category`, `color_class` (text), `sort_order` (int)

**5. `experience_items` table:**
- `id` (uuid, PK), `role`, `company`, `period` (text, nullable), `sort_order` (int)

**6. `hero_tags` table:**
- `id` (uuid, PK), `label` (text), `sort_order` (int)

### RLS Policies
- All tables: **SELECT** open to everyone (public portfolio)
- All tables: **INSERT/UPDATE/DELETE** restricted to authenticated users with admin role
- Use `user_roles` table + `has_role()` security definer function per project guidelines

### Authentication
- Email + password signup/login
- Admin role assigned via `user_roles` table
- Login page at `/admin/login`
- Protected `/admin` route checks auth + admin role

### Admin Panel (`/admin`)
- Sidebar or tab navigation for each section: Hero, About, Services, Skills, Portfolio, Experience, Contact
- Each tab shows editable forms with current data pre-filled
- Save button per section that updates the database
- Add/remove items for lists (services, skills, portfolio, experience, hero tags)
- Drag-to-reorder or manual sort_order for list items

### Frontend Changes
- Each section component will use `useQuery` to fetch from the database
- Fallback to current hardcoded values if no DB data exists (graceful migration)
- Components: `HeroSection`, `AboutSection`, `ServicesSection`, `SkillsSection`, `PortfolioSection`, `ExperienceSection`, `ContactSection`, `CVSection`, `Footer`

### New Files
- `src/pages/AdminLogin.tsx` — login form
- `src/pages/Admin.tsx` — admin dashboard with tabs
- `src/components/admin/HeroEditor.tsx`
- `src/components/admin/AboutEditor.tsx`
- `src/components/admin/ServicesEditor.tsx`
- `src/components/admin/SkillsEditor.tsx`
- `src/components/admin/PortfolioEditor.tsx`
- `src/components/admin/ExperienceEditor.tsx`
- `src/components/admin/ContactEditor.tsx`
- `src/hooks/useSiteContent.ts` — shared hooks for fetching content

### Routes
- `/admin/login` — admin login page
- `/admin` — protected admin dashboard

### Seed Data
- Insert current hardcoded content into all tables as initial data so nothing changes visually

### Implementation Order
1. Create database tables + RLS + roles
2. Seed existing content into tables
3. Create auth pages (login)
4. Create admin dashboard with editors
5. Update frontend components to fetch from DB
6. Add routes to App.tsx

