

## Plan: Modernize Skills Section UI

The current skills section shows simple horizontal bars with percentages. I'll redesign it to be more visually appealing with modern UI patterns.

### Changes to `src/components/SkillsSection.tsx`:

**1. Upgrade skill bar design:**
- Increase bar height from `h-2` to `h-3` for better visibility
- Add glassmorphism effect to the background track: `bg-secondary/50 backdrop-blur-sm`
- Add gradient to the filled portion instead of solid color
- Add subtle glow effect on the progress bar: `shadow-[0_0_15px_-3px_hsl(var(--primary)/0.5)]`
- Add rounded pill shape with `rounded-full`

**2. Improve typography:**
- Increase skill name text size from `text-xs` to `text-sm` for readability
- Make skill names `font-medium` instead of default weight
- Keep percentage in `text-sm` with `font-semibold`
- Add better spacing: `mb-2` instead of `mb-1.5`

**3. Add visual hierarchy with cards:**
- Wrap each skill in a subtle card with `p-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm`
- Add hover effect: `hover:border-primary/30 hover:bg-card/50 transition-all duration-300`
- Add subtle shadow on hover: `hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.2)]`

**4. Enhanced animations:**
- Keep the existing slide-in animation
- Add scale effect on hover: `group hover:scale-[1.02]`
- Add pulse effect to the percentage badge on scroll into view

**5. Optional: Group skills by category**
- Could organize into Design, Tech, and Video categories with subtle section headers
- For now, keep flat list but improve individual item design

### Visual improvements:
- Modern card-based layout instead of plain list
- Gradient progress bars with glow
- Better spacing and typography
- Subtle hover interactions
- Glassmorphism effects matching the overall theme

