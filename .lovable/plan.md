

## Plan: Hero Title Typing Animation + Bolder Tags

### Changes to `src/components/HeroSection.tsx`:

**1. Add typing animation to the hero title**
- Replace the current word-by-word stagger animation with a **typewriter/typing effect**
- The title "Creative Digital Designer & Tech Specialist" will type out character by character
- "Designer" and "Tech" will be colored in `text-primary` (blue) — matching the screenshot
- Use Framer Motion to reveal characters one by one with a blinking cursor at the end

**2. Make the title bolder and more prominent**
- Increase font weight to `font-extrabold` (800)
- Slightly increase size: `text-5xl sm:text-6xl lg:text-7xl`

**3. Modernize the skill tags (Graphic Design, Social Media, etc.)**
- Make tags bolder: `font-semibold` instead of default weight
- Increase padding: `px-4 py-1.5` instead of `px-3 py-1`
- Add `text-sm` instead of `text-xs`
- Add subtle primary color glow/border: `border-primary/40 text-foreground`
- Add hover effect: `hover:border-primary hover:bg-primary/10 transition-all`
- Use `backdrop-blur-sm bg-background/50` for a glassmorphism look

### Implementation approach:
- Create a `useEffect` + `useState` based typing animation that reveals the title text character by character
- Render the title with proper color spans for "Designer" and "Tech"
- Show a blinking cursor `|` at the end during typing
- Tags get upgraded styling for a modern pill look

