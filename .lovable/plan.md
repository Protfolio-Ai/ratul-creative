

## Plan: ডুপ্লিকেট ডাটা মুছে ছবি যোগ করা

### সমস্যা
1. **ডুপ্লিকেট rows**: sort_order 61-70 এর প্রতিটি item দুইবার করে আছে (মোট ২০টি row, হওয়া উচিত ১০টি)
2. **Missing images**: ১০টি ছবি ফাইল `public/portfolio/` এ নেই — তাই marquee তে broken দেখাচ্ছে

### সমাধান

**১. Database cleanup** — ডুপ্লিকেট rows মুছে ফেলব:
```sql
DELETE FROM portfolio_items 
WHERE id IN (
  SELECT id FROM (
    SELECT id, ROW_NUMBER() OVER (PARTITION BY sort_order ORDER BY id) as rn
    FROM portfolio_items WHERE sort_order BETWEEN 61 AND 70
  ) t WHERE rn > 1
);
```

**২. ১০টি ছবি ফাইল তৈরি করব** `public/portfolio/` এ:
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

User-uploaded ছবিগুলো এই নামে copy করব।

### কোনো কোড পরিবর্তন নেই
Frontend component ঠিক আছে — শুধু data ও asset fix।

