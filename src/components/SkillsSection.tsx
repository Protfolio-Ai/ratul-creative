import { motion } from "framer-motion";
import { useSkills } from "@/hooks/useSiteContent";

const defaultSkills = [
  { name: "Branding & Visual Identity", pct: 95, category: "Design" },
  { name: "Logo Design", pct: 92, category: "Design" },
  { name: "Poster Design", pct: 94, category: "Design" },
  { name: "Social Media Design", pct: 96, category: "Design" },
  { name: "Web Banner Design", pct: 90, category: "Design" },
  { name: "Cyber Security", pct: 80, category: "Tech" },
  { name: "Vibe Coding", pct: 85, category: "Tech" },
  { name: "Video Editing", pct: 88, category: "Video" },
  { name: "Adobe Premiere Pro", pct: 85, category: "Video" },
  { name: "After Effects", pct: 78, category: "Video" },
  { name: "CapCut", pct: 90, category: "Video" },
];

const SkillsSection = () => {
  const { data: dbSkills } = useSkills();
  const skills = dbSkills?.length
    ? dbSkills.map(s => ({ name: s.name, pct: s.percentage, category: s.category }))
    : defaultSkills;

  const categories = [...new Set(skills.map(s => s.category))];

  return (
    <section id="skills" className="py-24 px-6 bg-card/50">
      <div className="max-w-5xl mx-auto">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-mono-label text-xs tracking-[0.3em] uppercase text-primary mb-4">Skills</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-3xl sm:text-4xl font-bold mb-14">My Expertise</motion.h2>
        <div className="space-y-10">
          {categories.map(cat => (
            <div key={cat}>
              <motion.h3 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-mono-label text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4 border-b border-border/50 pb-2">{cat}</motion.h3>
              <div className="grid gap-3">
                {skills.filter(s => s.category === cat).map((s, i) => (
                  <motion.div key={s.name} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group p-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/30 hover:bg-card/50 hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.2)] hover:scale-[1.02] transition-all duration-300">
                    <div className="flex justify-between mb-2">
                      <span className="font-mono-label text-sm font-medium text-foreground">{s.name}</span>
                      <motion.span initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 + 0.3 }} className="font-mono-label text-sm font-semibold text-primary">{s.pct}%</motion.span>
                    </div>
                    <div className="h-3 rounded-full bg-secondary/50 backdrop-blur-sm overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.pct}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.06 }} className="h-full rounded-full bg-gradient-to-r from-primary/80 to-primary shadow-[0_0_15px_-3px_hsl(var(--primary)/0.5)]" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
