

## Plan: White+Blue Theme, Logo Replacement, and 3-Theme Switcher

### Overview
1. Change default theme to **white & blue** (light theme)
2. Replace "Ratul" text with the uploaded **R brush logo**
3. Add a **theme switcher** icon in the navbar with 3 themes: Light (White+Blue), Dark (Black+Neon Green), Blue Dark (Navy+Blue)

---

### 1. Copy Logo to Project
- Copy `user-uploads://R-logo-Blue-row.png` to `src/assets/logo-blue.png` (for light theme)
- Copy `user-uploads://Row-logo-black.png` to `src/assets/logo-black.png` (for dark themes, but will need to invert or use the blue one — the black logo won't show on dark backgrounds, so we'll use blue for all or add a white variant via CSS filter)

### 2. Create Theme Provider (`src/contexts/ThemeContext.tsx`)
- Create a React context with 3 themes: `light`, `dark`, `blue-dark`
- Store selected theme in `localStorage`
- Apply a `data-theme` attribute on `<html>` element
- Export `useTheme` hook and `ThemeProvider`

### 3. Update CSS Variables (`src/index.css`)
Define 3 sets of CSS variables:

**Light (default — White+Blue):**
- `--background: 0 0% 100%` (white)
- `--foreground: 220 20% 15%` (dark text)
- `--primary: 217 91% 60%` (blue, matching the logo)
- `--card: 210 40% 97%`, borders light gray, etc.

**Dark (Black+Neon Green — current theme preserved):**
- Keep existing dark values under `[data-theme="dark"]`

**Blue Dark (Navy+Blue):**
- `--background: 220 30% 10%` (navy)
- `--foreground: 210 40% 95%`
- `--primary: 217 91% 60%` (blue)
- Cards and borders in navy tones

### 4. Update Navbar (`src/components/Navbar.tsx`)
- Replace the `<span>R</span>atul` text with an `<img>` of the logo (~32px height), using CSS `filter` to adjust color per theme (e.g., invert for dark themes)
- Add a theme toggle button (using Lucide `Paintbrush` or `Palette` icon) next to "Home" link
- Clicking cycles through the 3 themes, with a small dropdown or cycling on click

### 5. Update `src/App.tsx`
- Wrap the app with `<ThemeProvider>`

### 6. Adjust Components
- The `.gradient-border` and floating icon glow styles use `hsl(var(--primary))` so they'll automatically adapt to the blue primary color

---

### Technical Details

**Theme switching mechanism:**
- `[data-theme="light"]` (default) — CSS variables on `:root`
- `[data-theme="dark"]` — override block
- `[data-theme="blue-dark"]` — override block
- Theme toggle icon cycles: light → dark → blue-dark → light

**Logo color handling:**
- Light theme: use blue logo as-is
- Dark/Blue-dark themes: apply CSS `filter: brightness(0) invert(1)` to make logo white, or `filter: brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(180deg)` for neon green in dark mode

**Files to create/edit:**
- Create: `src/contexts/ThemeContext.tsx`
- Copy: logo files to `src/assets/`
- Edit: `src/index.css`, `src/components/Navbar.tsx`, `src/App.tsx` (or `src/main.tsx`)

