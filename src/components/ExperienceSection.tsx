import { motion } from "framer-motion";

const timeline = [
  { role: "Lead Creative Projects", company: "R10 Creative Co.", period: "Present" },
  { role: "Multimedia Reporter", company: "Dainik Jonotar Khobor", period: "2025 – Present" },
  { role: "Brand & Ad Designer", company: "Munshiganj IT", period: "" },
  { role: "Brand & Ad Designer", company: "TeachBD21", period: "" },
  { role: "Brand & Ad Designer", company: "Gadget Waki", period: "" },
  { role: "Designer", company: "Momento Dhaka", period: "" },
];

const ExperienceSection = () => (
  <section id="experience" className="py-24 px-6 bg-card/50">
    <div className="max-w-3xl mx-auto">
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-mono-label text-xs tracking-[0.3em] uppercase text-primary mb-4">Experience</motion.p>
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-3xl sm:text-4xl font-bold mb-12">Career Timeline</motion.h2>

      <div className="relative pl-8 border-l border-border space-y-10">
        {timeline.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative"
          >
            {/* node */}
            <div className="absolute -left-[calc(2rem+5px)] top-1.5 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.6)]" />
            <h3 className="font-display text-base font-semibold">{t.role}</h3>
            <p className="text-sm text-muted-foreground">{t.company}</p>
            {t.period && <span className="font-mono-label text-xs text-primary">{t.period}</span>}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ExperienceSection;
