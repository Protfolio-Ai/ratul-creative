

## Plan: Ensure Blinking Cursor Stays at End of "Specialist"

The typing animation and cursor already work correctly in the code. The cursor blinks at the end of the typed text via `showCursor` state toggling every 530ms. Once typing completes (`displayedLength === fullTitle.length`), the cursor remains at the end and keeps blinking.

**However**, there's a potential issue: the cursor might appear to "jump" because it's placed outside the `renderTypedText()` output. As each new character appears, the text reflows and the cursor shifts. After typing finishes, it should be stable.

### What I'll verify/fix:

**In `src/components/HeroSection.tsx`:**
- Ensure the cursor only blinks (no jumping) after typing completes by keeping the current implementation intact — it already does this correctly
- The blinking cursor (`w-[3px]` bar) is already positioned inline after the last typed character and blinks indefinitely via the `setInterval`

**No changes needed** — the current code already has the cursor blinking permanently at the end after "Specialist" is fully typed. The `useEffect` for blinking runs independently and never stops.

If the user is seeing the cursor "jump" during typing (before completion), that's expected behavior as characters appear. After typing finishes, the cursor stays fixed at the end of "Specialist" and blinks continuously.

If there's an actual visual bug, I'd need to check the preview. Shall I verify in the browser?

