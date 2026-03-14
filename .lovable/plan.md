

## Plan: Replace Text Labels with Real App Icons + Glow/Shadow

### What changes
Replace the current text-based floating skill badges (Ps, Pr, Ae, etc.) with **actual application logo images** using CDN-hosted SVG/PNG icons for:
- **Adobe Photoshop**
- **Adobe Illustrator**
- **Adobe After Effects**
- **Adobe Premiere Pro**
- **CapCut**
- **Cyber Security** (shield/lock icon via Lucide)

### How
**Edit `src/components/HeroSection.tsx`:**

1. Update the `floatingSkills` array to include image URLs from a public CDN (e.g., `cdn.simpleicons.org` or `img.icons8.com`) for each app's original logo icon, plus sizing info.

2. Replace the text `{skill.label}` render with `<img>` tags showing the real icons (~32-40px).

3. Add **drop shadow** and **glow effect** styling to each floating icon:
   - `filter: drop-shadow(0 4px 12px rgba(0,0,0,0.5))`
   - Neon glow ring: `box-shadow: 0 0 20px hsl(var(--primary)/0.3), 0 0 40px hsl(var(--primary)/0.15)`
   - Rounded container with subtle glass background

4. For Cyber Security, use a Lucide `ShieldCheck` icon styled with the same glow treatment instead of an image.

5. Keep the existing float animation with staggered delays/durations for organic movement.

### Icon sources
Use `https://cdn.simpleicons.org/` (free, no API key needed):
- `adobephotoshop/31A8FF`
- `adobeillustrator/FF9A00`
- `adobeaftereffects/9999FF`
- `adobepremierepro/9999FF`
- `capcut/000000` (will invert for dark theme)

