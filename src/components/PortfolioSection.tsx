import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { usePortfolioItems, useSiteContent } from "@/hooks/useSiteContent";

const PortfolioSection = () => {
  const [active, setActive] = useState("All");
  const { data: dbItems } = usePortfolioItems();
  const { data: content } = useSiteContent();

  const projects = dbItems?.length
    ? dbItems.map(i => ({ title: i.title, cat: i.category, color: i.color_class, image: (i as any).image_url }))
    : [];

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
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map(p => (
              <motion.div key={p.title} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className={`group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border border-border ${!p.image ? `bg-gradient-to-br ${p.color}` : ''}`}>
                {p.image && (
                  <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                )}
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
