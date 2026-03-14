

## Plan: Hero Title Animation + Replace "Web Dev/Coding" with "Vibe Coding"

### 1. Animate Hero Title — Word-by-word reveal animation

**Edit `src/components/HeroSection.tsx`:**

Replace the current `motion.h1` block (lines 34-43) with a **staggered word-by-word animation** where each word slides up and fades in sequentially using Framer Motion's `variants` and `staggerChildren`.

- Split "Creative Digital Designer & Tech Specialist" into individual words
- Each word animates from `opacity: 0, y: 40` to `opacity: 1, y: 0` with staggered delays
- "Designer" and "Tech" words get `text-primary` styling
- Use `overflow-hidden` on each word wrapper for a clean clip/reveal effect

### 2. Replace "Web Dev/Coding" → "Vibe Coding" everywhere

**Files to edit:**

- **`src/components/HeroSection.tsx` (line 5):** Change `"Web Dev"` → `"Vibe Coding"` in tags array
- **`src/components/ServicesSection.tsx` (line 8):** Change title `"Web Coding"` → `"Vibe Coding"`, update desc to mention AI-powered/vibe coding instead of front-end web development. Change icon from `Code` to `Wand2` or `Sparkles`
- **`src/components/SkillsSection.tsx` (line 10):** Change `"Web Coding"` → `"Vibe Coding"`
- **`src/components/AboutSection.tsx` (line 33):** Change `"web coding"` → `"vibe coding"` in the paragraph text

