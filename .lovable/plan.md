

## Plan: Fix Floating Icons + Add Gradient Border to Profile Image

### Problem
The CDN-hosted Simple Icons (`cdn.simpleicons.org`) are not loading/visible. The user wants all icons to use Lucide-style icons like the working `ShieldCheck`.

### Changes to `src/components/HeroSection.tsx`:

**1. Replace all CDN image icons with Lucide icons:**
- Photoshop → `Palette` (color design)
- Illustrator → `PenTool` (vector drawing)
- After Effects → `Sparkles` (effects/motion)
- Premiere Pro → `Film` (video editing)
- CapCut → `Scissors` (video cutting)
- Cyber Security → `ShieldCheck` (keep as-is)

All rendered as Lucide components with `className="text-primary"` — consistent with the working ShieldCheck.

**2. Add animated rotating gradient border around profile image:**
- Wrap the profile image in a container with a `conic-gradient` background (neon green to transparent) that rotates continuously using a CSS `@keyframes spin` animation.
- Use a slightly larger wrapper with rounded corners, the gradient as the border, and the image inset inside.

### CSS addition to `src/index.css`:
Add a `@keyframes rotate-gradient` animation and `.gradient-border` utility class that uses `conic-gradient(hsl(var(--primary)), transparent, hsl(var(--primary)))` rotating around the image.

