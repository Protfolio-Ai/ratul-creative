import { motion } from "framer-motion";
import { Palette, Share2, ShieldCheck, Wand2, Film, Stamp } from "lucide-react";

const services = [
  { icon: Palette, title: "Graphic Design", desc: "Posters, banners, social media graphics & advertising creatives that capture attention." },
  { icon: Share2, title: "Social Media Management", desc: "Content strategy, scheduling & growth-driven social media campaigns." },
  { icon: ShieldCheck, title: "Cyber Security", desc: "Security consulting, vulnerability assessments & digital protection strategies." },
  { icon: Wand2, title: "Vibe Coding", desc: "AI-powered vibe coding to build modern, responsive websites & web apps effortlessly." },
  { icon: Film, title: "Video Editing", desc: "Professional video editing for social media, marketing & digital storytelling." },
  { icon: Stamp, title: "Branding & Identity", desc: "Logo design, brand guidelines & cohesive visual identity systems." },
];

const ServicesSection = () => (
  <section id="services" className="py-24 px-6">
    <div className="max-w-6xl mx-auto">
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-mono-label text-xs tracking-[0.3em] uppercase text-primary mb-4">Services</motion.p>
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-3xl sm:text-4xl font-bold mb-12">What I Do</motion.h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_-10px_hsl(var(--primary)/0.3)]"
          >
            <s.icon className="text-primary mb-4" size={28} />
            <h3 className="font-display text-lg font-semibold mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
