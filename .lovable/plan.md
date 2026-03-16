
সমস্যাটা deep check করে আমি যেটা পেয়েছি:

### আসল কারণ
- ডাটাবেজে এখন `title + image_url` অনুযায়ী exact duplicate row নেই।
- কিন্তু `PortfolioSection.tsx`-এ marquee বানানোর জন্য এই লাইন আছে:
  ```tsx
  [...featuredItems, ...featuredItems]
  ```
  এর মানে একই featured poster list ইচ্ছাকৃতভাবে ২ বার render হচ্ছে, যাতে infinite scroll seamless লাগে।
- তাই user-এর চোখে কিছু poster “copy হয়ে আবার” আসছে। এটা data duplication না, UI duplication।

### কীভাবে fix করব
আমি safest way-তে fix করব, যাতে design/animation feel ঠিক থাকে কিন্তু copy poster আর না লাগে:

1. **Featured items render-এর আগে de-duplicate layer যোগ করব**
   - `title + image_url` বা normalized image key দিয়ে unique list বানাব
   - ভবিষ্যতে admin panel থেকে accidental repeat এলেও সেটা আর UI-তে দেখাবে না

2. **Current CSS marquee duplication pattern remove করব**
   - `[..., ...]` style same-list-twice rendering বাদ দেব
   - অর্থাৎ exact একই poster একসাথে/খুব কাছাকাছি আর দেখা যাবে না

3. **Same animation feel রেখে unique-loop marquee করব**
   - single unique poster queue animate হবে
   - first item বের হয়ে গেলে list-এর শেষে চলে যাবে
   - visual flow আগের মতোই থাকবে, কিন্তু “হুবহু copy” poster থাকবে না

4. **Grid tab-গুলোকেও same de-duplication দিয়ে protect করব**
   - যদি future-এ repeat data ঢুকে যায়, category view-তেও duplicate না আসে

### কী পরিবর্তন লাগবে
- `src/components/PortfolioSection.tsx` — marquee logic refactor
- প্রয়োজন হলে animation support-এর জন্য ছোট helper state/useMemo/useEffect
- **Database delete লাগবে না**, কারণ এখনকার সমস্যা মূলত render logic-এ

### Technical details
- Existing `featuredItems = projects.filter(p => p.featured)` থাকবে
- এর পরে `uniqueFeaturedItems` বানানো হবে
- marquee render-এ duplicated array বাদ যাবে
- infinite feeling রাখতে either:
  - item rotation approach, or
  - measured single-track looping approach
- আমি এমন approach নেব যেটাতে current UX least affected থাকে এবং poster repeat visually না লাগে

### Expected result
- All tab-এর animated poster row-তে আর same poster copy হয়ে সাথে সাথে দেখা যাবে না
- animation feel same থাকবে
- future duplicate content এলে UI automatically clean থাকবে

### Validation
implement করার পর আমি এই জিনিসগুলো check করার plan নেব:
- All tab-এ visually same poster back-to-back আসে কি না
- animation smooth আছে কি না
- featured poster count কমে যায়নি কি না
- category tabs ঠিকমতো কাজ করছে কি না
