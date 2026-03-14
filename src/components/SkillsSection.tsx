import { motion } from "framer-motion";

const skills = [
  { name: "Branding & Visual Identity", pct: 95 },
  { name: "Logo Design", pct: 92 },
  { name: "Poster Design", pct: 94 },
  { name: "Social Media Design", pct: 96 },
  { name: "Web Banner Design", pct: 90 },
  { name: "Cyber Security", pct: 80 },
  { name: "Web Coding", pct: 85 },
  { name: "Video Editing", pct: 88 },
  { name: "Adobe Premiere Pro", pct: 85 },
  { name: "After Effects", pct: 78 },
  { name: "CapCut", pct: 90 },
];

const SkillsSection = () => (
  <section id="skills" className="py-24 px-6 bg-card/50">
    <div className="max-w-4xl mx-auto">
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-mono-label text-xs tracking-[0.3em] uppercase text-primary mb-4">Skills</motion.p>
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-3xl sm:text-4xl font-bold mb-12">My Expertise</motion.h2>
      <div className="space-y-5">
        {skills.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="flex justify-between mb-1.5">
              <span className="font-mono-label text-xs text-foreground">{s.name}</span>
              <span className="font-mono-label text-xs text-primary">{s.pct}%</span>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${s.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.05 }}
                className="h-full rounded-full bg-primary"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
