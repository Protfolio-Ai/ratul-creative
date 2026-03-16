

## Plan: Image Loading ও Overall Speed Optimization

### সমস্যা
- Portfolio ছবিগুলো (৭০+) বড় JPG/PNG — প্রতিটি কয়েক শত KB থেকে MB পর্যন্ত
- IntersectionObserver আছে কিন্তু rootMargin মাত্র 200px — ছবি viewport-এ আসার পরেই load শুরু হয়
- React Query staleTime 5 মিনিট আছে কিন্তু initial API call গুলো waterfall করে
- Suspense boundary একটাই — সব section একসাথে load হয়

### সমাধান (৪টি পরিবর্তন)

**১. OptimizedImage — Aggressive Preloading**
- `rootMargin` বাড়িয়ে `"600px"` করব — viewport-এ আসার অনেক আগেই image fetch শুরু হবে
- `loading="lazy"` native attribute যোগ করব browser-level optimization এর জন্য
- Width/height hints দিয়ে layout shift কমাব

**২. React Query — Prefetch Critical Data**
- `main.tsx`-এ app boot এর সময়ই `site_content` ও `portfolio_items` prefetch করব
- এতে user scroll করার আগেই data ready থাকবে
- `queryClient.prefetchQuery()` ব্যবহার করব

**৩. Portfolio Marquee — Image Size Optimization**
- Marquee-র featured items-এ ছোট size hint দেব (width/height attributes)
- Browser কে আগে থেকে space allocate করতে দেব

**৪. Suspense Boundaries Split**
- Above-the-fold sections (About, Services) আলাদা Suspense boundary-তে রাখব
- Below-the-fold sections (Portfolio, Experience, CV, Contact, Footer) আলাদা boundary-তে
- এতে উপরের sections আগে interactive হবে

### Files পরিবর্তন
- `src/components/OptimizedImage.tsx` — rootMargin বাড়ানো, native lazy loading
- `src/main.tsx` — critical data prefetch
- `src/pages/Index.tsx` — Suspense boundary split
- `src/hooks/useSiteContent.ts` — staleTime ও caching optimize

