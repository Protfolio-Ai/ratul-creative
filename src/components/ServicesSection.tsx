import { useState } from "react";
import { motion } from "framer-motion";
import { Palette, Share2, ShieldCheck, Wand2, Film, Stamp, MessageCircle, type LucideIcon } from "lucide-react";
import ServiceChatDialog from "./ServiceChatDialog";
import { useServices } from "@/hooks/useSiteContent";

const iconMap: Record<string, LucideIcon> = { Palette, Share2, ShieldCheck, Wand2, Film, Stamp, MessageCircle };

const defaultServices = [
  { icon: "Palette", title: "Graphic Design", description: "Posters, banners, social media graphics & advertising creatives that capture attention." },
  { icon: "Share2", title: "Social Media Management", description: "Content strategy, scheduling & growth-driven social media campaigns." },
  { icon: "ShieldCheck", title: "Cyber Security", description: "Security consulting, vulnerability assessments & digital protection strategies." },
  { icon: "Wand2", title: "Vibe Coding", description: "AI-powered vibe coding to build modern, responsive websites & web apps effortlessly." },
  { icon: "Film", title: "Video Editing", description: "Professional video editing for social media, marketing & digital storytelling." },
  { icon: "Stamp", title: "Branding & Identity", description: "Logo design, brand guidelines & cohesive visual identity systems." },
];

const ServicesSection = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const { data: dbServices } = useServices();

  const services = dbServices?.length
    ? dbServices.map(s => ({ icon: s.icon_name, title: s.title, description: s.description }))
    : defaultServices;

  const openChat = (service: string) => { setSelectedService(service); setChatOpen(true); };

  return (
    <>
      <section id="services" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-mono-label text-xs tracking-[0.3em] uppercase text-primary mb-4">Services</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-3xl sm:text-4xl font-bold mb-12">What I Do</motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => {
              const Icon = iconMap[s.icon] || Palette;
              return (
                <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} onClick={() => openChat(s.title)} className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_-10px_hsl(var(--primary)/0.3)] cursor-pointer">
                  <Icon className="text-primary mb-4" size={28} />
                  <h3 className="font-display text-lg font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{s.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity"><MessageCircle size={14} /> Learn more</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      <ServiceChatDialog open={chatOpen} onOpenChange={setChatOpen} service={selectedService} />
    </>
  );
};

export default ServicesSection;
