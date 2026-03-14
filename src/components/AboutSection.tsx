import { motion } from "framer-motion";

const AboutSection = () => (
  <section id="about" className="py-24 px-6">
    <div className="max-w-3xl mx-auto">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-mono-label text-xs tracking-[0.3em] uppercase text-primary mb-4"
      >
        About Me
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-3xl sm:text-4xl font-bold mb-8"
      >
        Who I Am
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="space-y-5 text-muted-foreground text-base sm:text-lg leading-relaxed"
      >
        <p>
          I am <span className="text-foreground font-semibold">Ratul Hasan Lemon</span>, a creative digital professional with more than 5 years of experience in graphic design, branding, and digital media. I specialize in creating impactful visual identities, posters, social media graphics, and web banners.
        </p>
        <p>
          Alongside design, I work as a multimedia reporter producing digital news content. I also provide professional services in social media management, cyber security consultation, vibe coding and video editing.
        </p>
      </motion.div>
    </div>
  </section>
);

export default AboutSection;
