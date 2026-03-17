

## Plan: Mobile Navigation Links Fix

### সমস্যা
Mobile menu-তে links ক্লিক করলে section-এ scroll হচ্ছে না। কারণ: Framer Motion-এর exit animation (`height: 0`) hash navigation-কে block করছে — menu বন্ধ হওয়ার সময় browser hash scroll cancel হয়ে যায়।

### সমাধান
**`src/components/Navbar.tsx`** — Mobile link click handler-এ manual scroll করব:

- `e.preventDefault()` দিয়ে default hash navigation বন্ধ করব
- `setOpen(false)` দিয়ে menu বন্ধ করব
- `setTimeout` দিয়ে ছোট delay-এর পর `document.getElementById(id).scrollIntoView({ behavior: 'smooth' })` call করব — এতে menu animation শেষ হওয়ার পর scroll হবে
- Desktop links-এ কোনো পরিবর্তন নেই

### পরিবর্তন: শুধু `src/components/Navbar.tsx`
- Mobile menu-র `<a>` tag গুলোতে নতুন click handler যোগ হবে

