

## Plan: Admin Signup শুধু নির্দিষ্ট দুটো Email এ সীমাবদ্ধ করা

### Changes to `src/pages/AdminLogin.tsx`:

1. **Allowed emails whitelist** — একটা constant array রাখবো:
   ```ts
   const ALLOWED_ADMIN_EMAILS = ["ratullemon1010@gmail.com", "ratulhassan4444@gmail.com"];
   ```

2. **Signup এ email check** — signup করার আগে check করবে email allowed list এ আছে কিনা। না থাকলে error toast দেখাবে: "This email is not authorized to create an admin account."

3. **Signup toggle hide করা** — signup option শুধু তখনই দেখাবে যখন typed email whitelist এ আছে, অথবা signup toggle সম্পূর্ণ রেখে শুধু submit এ block করবো (এটা বেশি secure কারণ client-side hide করা যায় bypass)।

4. **Server-side protection** — Login flow তে already admin role check আছে, তাই কেউ signup করলেও admin access পাবে না (trigger শুধু first user কে admin দেয়)। তবে signup নিজেই block করতে হলে client-side check যথেষ্ট কারণ Supabase auth এ email restriction server-side করতে হলে custom hook লাগবে।

### Approach:
- Client-side: Signup attempt block করবো allowed emails ছাড়া
- Server-side safety net: `auto_assign_first_admin` trigger already আছে, আর login flow তে admin role check আছে — তাই unauthorized signup করলেও admin access পাবে না

Single file change: `src/pages/AdminLogin.tsx`

