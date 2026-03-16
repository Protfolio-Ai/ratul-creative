

## Plan: Contact Form → WhatsApp Chat Open

### কী হবে
Contact form-এ Name, Email, Message লিখে "Send Message" চাপলে visitor-এর WhatsApp (app/web) খুলবে তোমার নম্বরে (+8801537543335) — মেসেজ pre-filled থাকবে এই format-এ:

```
Name: [নাম]
Email: [ইমেইল]
Message: [মেসেজ]
```

Visitor নিজে Send চাপবে WhatsApp-এ। ফ্রি, কোনো API লাগবে না।

### পরিবর্তন
**`src/components/ContactSection.tsx`**
- Form-এ state যোগ (name, email, message)
- Submit handler-এ `https://wa.me/8801537543335?text=...` URL generate করে `window.open()` দিয়ে WhatsApp খুলবে
- Validation: সব field ফাঁকা থাকলে submit হবে না
- Submit-এর পর form reset হবে

### কোনো অন্য file পরিবর্তন লাগবে না

