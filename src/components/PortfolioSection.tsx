import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { usePortfolioItems, useSiteContent } from "@/hooks/useSiteContent";

const defaultProjects = [
  { title: "Brand Identity System", cat: "Branding", color: "from-primary/30 to-primary/10" },
  { title: "Event Poster Series", cat: "Poster Design", color: "from-emerald-500/30 to-emerald-500/10" },
  { title: "Social Media Campaign", cat: "Social Media", color: "from-blue-500/30 to-blue-500/10" },
  { title: "Web Banner Collection", cat: "Web Banner", color: "from-purple-500/30 to-purple-500/10" },
  { title: "Product Ad Creative", cat: "Advertising", color: "from-orange-500/30 to-orange-500/10" },
  { title: "Package Design Concept", cat: "Packaging", color: "from-rose-500/30 to-rose-500/10" },
  { title: "Corporate Branding Kit", cat: "Branding", color: "from-cyan-500/30 to-cyan-500/10" },
  { title: "Festival Poster", cat: "Poster Design", color: "from-amber-500/30 to-amber-500/10" },
];

const PortfolioSection = () => {
  const [active, setActive] = useState("All");
  const { data: dbItems } = usePortfolioItems();
  const { data: content } = useSiteContent();

  const projects = dbItems?.length
    ? dbItems.map(i => ({ title: i.title, cat: i.category, color: i.color_class }))
    : defaultProjects;

  const categories = ["All", ...new Set(projects.map(p => p.cat))];
  const filtered = active === "All" ? projects : projects.filter(p => p.cat === active);

  const behanceUrl = content?.behance_url || "https://www.behance.net/mratulhasan10";
  const facebookUrl = content?.facebook_url || "https://www.facebook.com/ratulhasan.lemon";

  return (
    <section id="portfolio" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-mono-label text-xs tracking-[0.3em] uppercase text-primary mb-4">Portfolio</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-3xl sm:text-4xl font-bold mb-8">Selected Works</motion.h2>
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(c => (
            <button key={c} onClick={() => setActive(c)} className={`px-4 py-1.5 rounded-full text-xs font-mono-label transition-all ${active === c ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>{c}</button>
          ))}
        </div>
        <motion.div layout className="grid sm:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map(p => (
              <motion.div key={p.title} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className={`group relative aspect-[4/3] rounded-xl bg-gradient-to-br ${p.color} border border-border overflow-hidden cursor-pointer`}>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 bg-background/80 backdrop-blur-sm transition-opacity duration-300">
                  <h3 className="font-display text-lg font-semibold mb-1">{p.title}</h3>
                  <span className="font-mono-label text-xs text-primary">{p.cat}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        <div className="flex flex-wrap gap-4 mt-10">
          <a href={behanceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"><ExternalLink size={14} /> Behance Portfolio</a>
          <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"><ExternalLink size={14} /> Facebook</a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
