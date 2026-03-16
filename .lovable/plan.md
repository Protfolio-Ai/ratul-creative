

## Plan: Marquee Poster সাইজ ও Gradient Border ঠিক করা

### সমস্যা
1. `aspect-[4/3]` + `object-cover` দিয়ে poster কেটে যাচ্ছে — original aspect ratio রাখতে হবে
2. Poster গুলো একসাথে লেগে আছে — gap দরকার
3. প্রতিটি poster এর চারপাশে rotating gradient border চাই (profile ছবির মতো)

### পরিবর্তন

**`src/components/PortfolioSection.tsx`** (marquee section, lines 37-50):
- `aspect-[4/3]` সরিয়ে দেব, poster নিজের original aspect ratio তে দেখাবে — fixed height দেব (`h-72 sm:h-80 md:h-96`) আর width auto
- প্রতিটি poster item এ `mx-4` gap যোগ করব
- প্রতিটি poster কে `.gradient-border` class দিয়ে wrap করব — rotating conic gradient border তৈরি হবে (profile photo র মতোই)
- `.gradient-border` এর `z-index: -1` সমস্যা হবে marquee তে, তাই poster এর জন্য আলাদা CSS class বানাব যেখানে `z-index` ঠিক থাকবে

**`src/index.css`**:
- `.poster-gradient-border` নতুন class যোগ করব — `.gradient-border` এর মতোই কিন্তু `overflow: hidden` ছাড়া `z-index` সমস্যা সমাধান করে। `::before` দিয়ে rotating gradient, `::after` দিয়ে inner background fill

### Category Grid (lines 54-65):
- Grid items এও same gradient border effect দেব
- `aspect-[4/3]` রেখে দেব grid এ কারণ সেখানে uniform look ভালো দেখায়, তবে `object-contain` বিবেচনা করা যায়

