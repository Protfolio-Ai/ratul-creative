import { motion } from "framer-motion";
import { ArrowDown, Mail, Code, Shield, Palette, Film, Figma, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";

const tags = ["Graphic Design", "Social Media", "Cyber Security", "Web Dev", "Video Editing"];

const floatingSkills = [
  { label: "Ps", top: "5%", left: "-8%", delay: 0, duration: 3.5 },
  { label: "Pr", top: "15%", right: "-6%", delay: 0.8, duration: 4.2 },
  { label: "Ae", bottom: "25%", left: "-10%", delay: 1.5, duration: 3.8 },
  { label: "Figma", top: "55%", right: "-8%", delay: 0.4, duration: 4.5 },
  { label: "CapCut", bottom: "10%", right: "5%", delay: 1.2, duration: 3.2 },
  { label: "</>" , top: "-2%", right: "30%", delay: 2, duration: 4 },
  { label: "🛡️", bottom: "5%", left: "5%", delay: 0.6, duration: 3.6 },
];

const HeroSection = () => (
  <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16">
    <div className="absolute inset-0 opacity-[0.04]" style={{
      backgroundImage: "radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)",
      backgroundSize: "32px 32px",
    }} />

    <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
      {/* Left */}
      <div className="flex flex-col gap-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-mono-label text-xs tracking-[0.3em] uppercase text-primary"
        >
          Digital Creator & Specialist
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight"
        >
          Creative Digital{" "}
          <span className="text-primary">Designer</span> &{" "}
          <span className="text-primary">Tech</span> Specialist
        </motion.h1>

        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="px-3 py-1 rounded-full border border-border text-xs font-mono-label text-muted-foreground"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-wrap gap-3 mt-4"
        >
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
            <a href="#portfolio"><ArrowDown size={16} /> View Portfolio</a>
          </Button>
          <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground">
            <a href="#contact"><Mail size={16} /> Contact Me</a>
          </Button>
        </motion.div>
      </div>

      {/* Right — profile image with floating skills */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="relative flex justify-center md:justify-end"
      >
        <div className="absolute w-80 h-80 rounded-full bg-primary/20 blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        
        {/* Floating skill badges */}
        {floatingSkills.map((skill) => (
          <div
            key={skill.label}
            className="absolute z-20 px-2.5 py-1.5 rounded-lg text-xs font-mono-label font-bold border border-primary/40 bg-background/80 text-primary backdrop-blur-sm shadow-[0_0_12px_hsl(var(--primary)/0.25)]"
            style={{
              top: skill.top,
              left: skill.left,
              right: skill.right,
              bottom: skill.bottom,
              animation: `float ${skill.duration}s ease-in-out ${skill.delay}s infinite`,
            }}
          >
            {skill.label}
          </div>
        ))}

        <img
          src="/profile.jpg"
          alt="MD. Ratul Hasan Lemon"
          className="relative z-10 w-72 sm:w-80 lg:w-96 rounded-2xl object-cover animate-float"
          style={{ maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)" }}
        />
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
