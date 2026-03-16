

## Portfolio Section এ ছবি যোগ করা

### ছবিগুলোর Category বিভাজন
আপলোড করা ১০টি ছবি নিচের category অনুযায়ী ভাগ করব:

| ছবি | Category | Title |
|------|----------|-------|
| 1st-may.jpg | Poster Design | International Labour Day |
| A-man-flying-with-a-plan.jpg | Poster Design | Travel Ad - Munna Travels |
| 10-minute-job.jpg | Social Media | Branding Isn't a 10-Minute Job |
| A_Digital_Partner.jpg | Social Media | Digital Partner - Thinkmind |
| Are-you-tired.jpg | Social Media | Brand Solution - Thinkmind |
| Big-opportunity.jpg | Social Media | Big Opportunity - Thinkmind |
| AD-camping-For-Al-Azhar-2.jpg | Advertising | Al-Azhar School Campaign |
| beats-powerbeats-pro-2.jpg | Product Design | Powerbeats Pro 2 |
| AISC-Tri-fold-Brochure-front-part.png | Brochure Design | AISC Brochure (Inside) |
| AISC-Tri-fold-Brochure-Front-part-1.png | Brochure Design | AISC Brochure (Front) |

### পরিবর্তন

1. **ছবি কপি**: সব ছবি `public/portfolio/` ফোল্ডারে কপি করব

2. **Database migration**: `portfolio_items` table-এ `image_url` (text, nullable) column যোগ করব

3. **`src/components/PortfolioSection.tsx`**:
   - প্রতিটি card-এ gradient background এর বদলে actual image দেখাবে (`<img>` tag)
   - Image না থাকলে fallback হিসেবে gradient ব্যবহার হবে
   - Hover-এ title ও category overlay দেখাবে (যেমন আছে)

4. **`src/components/admin/PortfolioEditor.tsx`**:
   - `image_url` field এর জন্য Input যোগ করব

5. **`src/hooks/useSiteContent.ts`**:
   - `usePortfolioItems` এর return type-এ `image_url` যোগ হবে (auto from types)

6. **Default data insert**: ১০টি item database-এ insert করব migration দিয়ে, image path সহ (`/portfolio/filename.jpg`)

### Technical Details
- Migration SQL: `ALTER TABLE portfolio_items ADD COLUMN image_url text;` + INSERT statements for all 10 items
- Images served from `/portfolio/` public path
- Aspect ratio `4/3` বজায় থাকবে, `object-cover` দিয়ে image fit করব

