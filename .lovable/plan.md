

## Plan: ১০টি নতুন poster যোগ করা marquee animation এ

### কাজ
ইউজারের আপলোড করা ১০টি নতুন ছবি portfolio তে যোগ করতে হবে — একই marquee animation এ চলবে।

### ১. ছবি কপি (`public/portfolio/`)
১০টি ছবি কপি করব:
- `A_Digital_Partner-2.jpg`
- `AISC-Tri-fold-Brochure-front-part-2.png`
- `beats-powerbeats-pro-2-2.jpg`
- `FRIDAY-Ramadan-Mubarak-3.jpg`
- `Gramin-Ghee-2.jpg`
- `Home-Is-Calling-2.jpg`
- `jewelry-Product-1-3.jpg`
- `Jewelry-product-2-3.jpg`
- `Nahar-Sweet-Doi-poster-2-2.jpg`
- `Panjabi-Poster-2.jpg`

### ২. Database insert
১০টি নতুন `portfolio_items` row insert করব (sort_order 61-70, `featured: true` যাতে marquee তে দেখায়):

| File | Category | Title |
|------|----------|-------|
| A_Digital_Partner-2.jpg | Advertising | Digital Partner - Thinkmind |
| AISC-Tri-fold-Brochure-front-part-2.png | Brochure Design | AISC Tri-fold Brochure v2 |
| beats-powerbeats-pro-2-2.jpg | Product Design | Powerbeats Pro 2 - Messi |
| FRIDAY-Ramadan-Mubarak-3.jpg | Poster Design | Heritage of the Desert v2 |
| Gramin-Ghee-2.jpg | Product Design | Gramin Ghee - Traditional |
| Home-Is-Calling-2.jpg | Poster Design | Almost Over - Final Nights |
| jewelry-Product-1-3.jpg | Product Design | Italian Luxury Earring v2 |
| Jewelry-product-2-3.jpg | Product Design | Marco Bicego Alta Ring v2 |
| Nahar-Sweet-Doi-poster-2-2.jpg | Product Design | Nahar Sweet Doi v2 |
| Panjabi-Poster-2.jpg | Fashion Design | Manfare Timeless Black |

### কোনো কোড পরিবর্তন নেই
`PortfolioSection.tsx` এ কোনো পরিবর্তন লাগবে না — database থেকে `featured: true` items automatic marquee তে দেখাবে।

