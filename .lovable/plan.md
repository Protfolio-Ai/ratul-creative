

## Portfolio Section পুনর্গঠন

### তুমি যা চাচ্ছো (আমি যেভাবে বুঝেছি):
1. **"All" ট্যাবে**: একটা infinite horizontal marquee animation — ১০টি নতুন আপলোড করা poster ডান দিক থেকে এসে বাম দিকে চলে যাবে (auto-scrolling)
2. **Category ট্যাবগুলো** (Poster Design, Social Media, etc.): শুধু category নাম দেখাবে button হিসেবে — click করলে সেই category-র সব poster grid আকারে দেখাবে
3. **নতুন ১০টি ছবি** featured/showcase হিসেবে "All" ট্যাবের marquee-তে থাকবে

### নতুন ১০টি ছবির Category:

| ছবি | Category | Title |
|------|----------|-------|
| Offer-design.jpg | Advertising | Star Tech Eid Offer |
| Social-Media-Post.jpg | Product Design | Bip 5 Smart Watch |
| SONY-WH-1000XM4.jpg | Product Design | Sony WH-1000XM4 |
| Speaker-PS16.jpg | Product Design | Chorus PS16 Speaker |
| Sports-shoe-poster-design.jpg | Product Design | Puma Court Runner |
| Thinking.jpg | Social Media | Thinkmind - Digital Presence |
| T-shirt-poster-1.jpg | Product Design | Anime Inspired T-Shirt |
| T-shirt-poster-2.jpg | Product Design | Smile T-Shirt |
| We_create_trends.jpg | Social Media | Thinkmind - We Create Trends |
| পেঁয়াজ-কান্ড.jpg | Photo Manipulation | Onion Crisis - Yunus |

### পরিবর্তন

1. **ছবি কপি**: ১০টি ছবি `public/portfolio/` ফোল্ডারে কপি

2. **Database migration**: ১০টি নতুন portfolio item insert (sort_order 31-40), plus একটি নতুন `featured` boolean column যোগ করব এই ১০টির জন্য `true` সেট করে — যেন "All" marquee-তে শুধু এগুলো দেখায়

3. **`src/components/PortfolioSection.tsx`** সম্পূর্ণ পুনর্গঠন:
   - **"All" ট্যাব সিলেক্ট থাকলে**: Grid সরিয়ে একটি CSS marquee/infinite scroll animation দেখাব — featured poster গুলো ডান থেকে বামে continuously slide করবে। Duplicate করে seamless loop তৈরি হবে।
   - **Category ট্যাব click করলে**: সেই category-র সব poster grid আকারে দেখাবে (আগের মতো)
   - Marquee CSS keyframe animation ব্যবহার করব (`@keyframes marquee`)

4. **`src/index.css`**: marquee keyframe animation যোগ করব

### Technical Details
- Marquee: CSS `@keyframes` দিয়ে `translateX(0)` থেকে `translateX(-50%)` — items দুইবার duplicate করে seamless loop
- "All" ট্যাবে grid থাকবে না, শুধু horizontal scroll strip
- Category ট্যাবে click করলে grid layout (আগের মতো)
- `featured` column দিয়ে কোন poster marquee-তে দেখাবে সেটা নিয়ন্ত্রণ করা যাবে

