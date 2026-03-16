
## Plan: কেন `Access denied` হচ্ছে এবং কীভাবে ঠিক করব

### আমি যা পেয়েছি
সমস্যাটা frontend whitelist না, backend role assignment-এ।

- `/admin/login` এ আপনার দুইটা email whitelist করা আছে, তাই ওই email দিয়ে signup attempt block হয় না
- কিন্তু login-এর পরে app `user_roles` table থেকে `admin` role চেক করে
- এখন database-এ `admin` role আছে শুধু এই account-এর জন্য:
  - `admin@ratulhasan.com`
- `ratullemon1010@gmail.com` account আছে, কিন্তু তার `admin` role নেই
- `ratulhassan4444@gmail.com` account এখনো database-এ নেই
- current trigger/function শুধু **first ever user**-কে admin বানায়, allowed email-গুলোকে না

এই কারণেই allowed email দিয়ে login successful হলেও পরে `Access denied` দেখাচ্ছে।

## সমাধান
আমি এটা 2 ভাগে fix করব:

### 1) Existing account-এ admin role backfill
- `ratullemon1010@gmail.com` এর user id খুঁজে বের করে `user_roles` table-এ `admin` role insert করব
- ফলে এই email দিয়ে login করলে সাথে সাথে admin dashboard access পাবে

### 2) Future signup-এ allowed email-কে auto-admin করা
বর্তমান “first user becomes admin” logic বদলে backend-side whitelist logic বসাবো:
- যদি signup email হয়:
  - `ratullemon1010@gmail.com`
  - `ratulhassan4444@gmail.com`
- তাহলে signup-এর সময় automatically `user_roles` table-এ `admin` role assign হবে
- অন্য যেকোনো email signup করলেও admin role পাবে না

এতে frontend whitelist + backend role assignment — দুই দিকেই rule match করবে।

## কী কী বদলাবে
### Backend
- existing admin-assign function update
- signup trigger logic change to email-based whitelist
- existing allowed account-এ admin role insert

### Frontend
- `/admin/login` এর login flow বড় পরিবর্তন লাগবে না
- current `Access denied` check ঠিকই আছে, কারণ backend role ঠিক হলে সেটা pass করবে

## Expected result
এর পরে:
- `ratullemon1010@gmail.com` → admin access পাবে
- `ratulhassan4444@gmail.com` → account create/login করলে admin access পাবে
- অন্য কোনো email → admin access পাবে না

## Technical details
```text
Current flow:
Allowed email -> signup/login works
              -> app checks user_roles
              -> no admin row
              -> Access denied

Fixed flow:
Allowed email -> signup/login works
              -> backend auto-assigns admin role
              -> app checks user_roles
              -> admin dashboard opens
```

### Implementation notes
- Client-side whitelist alone যথেষ্ট secure না
- admin permission অবশ্যই backend role দিয়েই enforce করা হবে
- current accidental admin account (`admin@ratulhasan.com`) রেখে দেব নাকি remove করব, সেটা implementation-এর সময় decide করা যেতে পারে; safest default হলো আপনার দুইটা email-ও admin করা, existing access না ভেঙে

