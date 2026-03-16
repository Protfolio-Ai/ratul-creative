

## Plan: Navbar এ Three-Dot Menu যোগ করা

### Changes to `src/components/Navbar.tsx`:

1. **Import** `MoreVertical` from lucide-react and `useNavigate` from react-router-dom
2. **Add a DropdownMenu** (from existing `@/components/ui/dropdown-menu`) next to the Contact link (desktop) and in mobile menu
3. The dropdown will have one item: **"Admin Panel"** — clicking it navigates to `/admin/login`
4. Three-dot icon styled subtly as `text-muted-foreground hover:text-foreground`

### Desktop layout:
- After the nav links, add a `DropdownMenu` with `MoreVertical` icon trigger
- Dropdown contains "Admin Panel" item that does `navigate('/admin/login')`

### Mobile layout:
- Add the same three-dot dropdown in the mobile menu at the bottom

Single file change only: `src/components/Navbar.tsx`

