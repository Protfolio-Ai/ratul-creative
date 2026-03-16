

## Plan: Marquee সাইজ বড় করা + ১১টি নতুন poster যোগ করা

### ১. Marquee poster সাইজ বড় করা
`PortfolioSection.tsx` এ line 40 এর sizing classes পরিবর্তন:
- `w-64 sm:w-72 md:w-80` → `w-80 sm:w-96 md:w-[28rem]` (প্রায় ৪০% বড়)

### ২. ১১টি নতুন ছবি যোগ করা

| ছবি | Category | Title |
|------|----------|-------|
| FRIDAY-Ramadan-Mubarak-2.jpg | Poster Design | Heritage of the Desert |
| Ghee-poster-with-Chef-2.jpg | Product Design | iOrganic Desi Cow Ghee |
| Ghee-product-poster-2.jpg | Product Design | Kohli Dairy Cow Ghee v2 |
| ISp-Social-Media-Design-1-2.jpg | Advertising | BDCOM Smart Connection |
| jewelry-Product-1-2.jpg | Product Design | Italian Luxury Earring |
| Jewelry-product-2-2.jpg | Product Design | Marco Bicego Alta Ring |
| Jewelry-product-3-2.jpg | Product Design | Aurora Studs - Jenny Bird |
| Lipstick-Poster-1-2.jpg | Product Design | Lafz Velvet Matte Lipstick |
| Mitti-Attar-2.jpg | Product Design | Ali Brothers Mitti Attar v2 |
| Rosier-Ghee.jpg | Product Design | Rosier A2 Bilona Ghee |

### পরিবর্তন
1. **ছবি কপি**: ১১টি (আসলে ১০টি unique) ছবি `public/portfolio/` এ কপি
2. **Database insert**: ১০টি নতুন item insert (sort_order 51-60)
3. **`PortfolioSection.tsx`**: marquee item width বড় করা

