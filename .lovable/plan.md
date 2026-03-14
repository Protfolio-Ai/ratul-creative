

## Plan: Default Navy Blue Theme + Larger About Text + AI Chat for Services

### 1. Set "blue-dark" as default theme
**File: `src/contexts/ThemeContext.tsx`**
- Change the default fallback from `"light"` to `"blue-dark"` on line 19

### 2. Increase About section body text size
**File: `src/components/AboutSection.tsx`**
- Change the text container class from default size to `text-lg` (or `text-base sm:text-lg`) and keep `leading-relaxed`

### 3. Integrate Gemini AI chat into Services section
When a user clicks a service card (e.g. Graphic Design, Vibe Coding), a dialog opens with an AI-powered chat that provides information about how Ratul delivers that specific service. This requires:

**a. Enable Lovable Cloud + AI Gateway**
- Set up a Supabase edge function to proxy requests to the Lovable AI Gateway
- The system prompt will include Ratul's profile info and the selected service context

**b. Create edge function `supabase/functions/service-chat/index.ts`**
- Accepts `{ service: string, messages: [...] }` from the client
- Adds a system prompt: "You are an AI assistant for Ratul Hasan Lemon's portfolio. The customer is asking about the '{service}' service. Explain how Ratul provides this service, his experience, process, and what customers can expect. Be professional and helpful."
- Streams response from Lovable AI Gateway using `LOVABLE_API_KEY`
- Handles CORS, 429/402 errors

**c. Create `supabase/config.toml`**
- Register the `service-chat` function with `verify_jwt = false`

**d. Create `src/components/ServiceChatDialog.tsx`**
- A dialog component with:
  - Service title in the header
  - Chat messages list (user + assistant) rendered with `react-markdown`
  - Text input + send button
  - Streaming token-by-token display
  - Pre-populated first assistant message like "Hi! Ask me anything about how Ratul handles {service}."

**e. Update `src/components/ServicesSection.tsx`**
- Make each service card clickable (cursor-pointer)
- On click, open `ServiceChatDialog` with the selected service title
- Add a subtle "Learn More" or chat icon indicator on each card

### Dependencies
- Need to install `react-markdown` package
- Lovable Cloud must be enabled for the edge function and `LOVABLE_API_KEY`

