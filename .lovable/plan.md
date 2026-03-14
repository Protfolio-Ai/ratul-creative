

## Changes to Hero Section

### 1. Remove "Download CV" button
Remove the Download CV button (lines 60-62) from the hero section buttons. Keep only "View Portfolio" and "Contact Me".

### 2. Add floating skill/software icons around profile image
Add animated skill icons that orbit/float around the profile image with gradient styling, similar to the floating animation of the image itself. Each icon will have:
- A gradient background (neon green tones)
- A bouncing/floating animation with staggered delays so they move independently
- Positioned at various points around the profile image using absolute positioning

Icons to include: Adobe Photoshop, Premiere Pro, After Effects, CapCut, Figma, code/web, shield/security — represented using simple styled badges with text or Lucide icons.

Each icon badge will use CSS `animate-float` with different animation delays and durations to create an organic orbiting feel. They'll have a gradient border/background using the neon green accent color.

### Implementation
- Edit `src/components/HeroSection.tsx`:
  - Remove the Download CV `<Button>` block
  - Add an array of skill icons (name + icon + position offsets)
  - Render them as absolutely-positioned `motion.div` elements around the profile image, each with a unique float animation delay
  - Style with gradient borders and semi-transparent dark backgrounds

