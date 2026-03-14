import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { service, messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are an AI assistant for Ratul Hasan Lemon's portfolio website. The customer is asking about the "${service}" service.

About Ratul Hasan Lemon:
- Creative digital professional with 5+ years of experience
- Specializes in graphic design, branding, digital media, social media management, cyber security consultation, vibe coding, and video editing
- Works as a multimedia reporter producing digital news content
- Creates impactful visual identities, posters, social media graphics, and web banners

Service Details:
- Graphic Design: Posters, banners, social media graphics & advertising creatives. Uses Adobe Photoshop, Illustrator, and other professional tools.
- Social Media Management: Content strategy, scheduling & growth-driven social media campaigns across platforms.
- Cyber Security: Security consulting, vulnerability assessments & digital protection strategies for businesses.
- Vibe Coding: AI-powered vibe coding to build modern, responsive websites & web apps effortlessly using cutting-edge tools.
- Video Editing: Professional video editing for social media, marketing & digital storytelling using Premiere Pro, After Effects, CapCut.
- Branding & Identity: Logo design, brand guidelines & cohesive visual identity systems.

Instructions:
- Explain how Ratul provides this specific service, his experience, process, and what customers can expect.
- Be professional, friendly, and helpful.
- Keep responses concise but informative.
- If asked about pricing, say that pricing depends on the project scope and suggest contacting Ratul directly via the contact form on the website.
- Answer in the same language the customer uses.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("service-chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
