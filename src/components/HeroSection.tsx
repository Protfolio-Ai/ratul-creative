import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Mail, ShieldCheck, Palette, PenTool, Sparkles, Film, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent, useHeroTags } from "@/hooks/useSiteContent";

const defaultTags = ["Graphic Design", "Social Media", "Cyber Security", "Vibe Coding", "Video Editing"];
const defaultTitle = "Creative Digital Designer & Tech Specialist";
const primaryWords = new Set(["Designer", "Tech"]);

const floatingSkills = [
  { Icon: Palette, alt: "Photoshop", top: "5%", left: "-8%", delay: 0, duration: 3.5 },
  { Icon: PenTool, alt: "Illustrator", top: "15%", right: "-6%", delay: 0.8, duration: 4.2 },
  { Icon: Sparkles, alt: "After Effects", bottom: "25%", left: "-10%", delay: 1.5, duration: 3.8 },
  { Icon: Film, alt: "Premiere Pro", top: "55%", right: "-8%", delay: 0.4, duration: 4.5 },
  { Icon: Scissors, alt: "CapCut", bottom: "10%", right: "5%", delay: 1.2, duration: 3.2 },
  { Icon: ShieldCheck, alt: "Cyber Security", top: "-2%", right: "30%", delay: 2, duration: 4 },
];

const HeroSection = () => {
  const { data: content } = useSiteContent();
  const { data: dbTags } = useHeroTags();

  const fullTitle = content?.hero_title || defaultTitle;
  const subtitle = content?.hero_subtitle || "Digital Creator & Specialist";
  const tags = dbTags?.map(t => t.label) || defaultTags;

  const [displayedLength, setDisplayedLength] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => { setDisplayedLength(0); }, [fullTitle]);

  useEffect(() => {
    if (displayedLength < fullTitle.length) {
      const timeout = setTimeout(() => setDisplayedLength(prev => prev + 1), 45);
      return () => clearTimeout(timeout);
    }
  }, [displayedLength, fullTitle]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor(v => !v), 530);
    return () => clearInterval(interval);
  }, []);

  const renderTypedText = () => {
    const words = fullTitle.split(" ");
    let charIndex = 0;
    const elements: React.ReactNode[] = [];
    words.forEach((word, wi) => {
      const wordStart = charIndex;
      const wordEnd = charIndex + word.length;
      const visibleChars = Math.max(0, Math.min(word.length, displayedLength - wordStart));
      const visiblePart = word.slice(0, visibleChars);
      if (visibleChars > 0) {
        const isPrimary = primaryWords.has(word);
        elements.push(<span key={wi} className={isPrimary ? "text-primary" : ""}>{visiblePart}</span>);
      }
      charIndex = wordEnd + 1;
      if (displayedLength > wordEnd && wi < words.length - 1) {
        elements.push(<span key={`s${wi}`}> </span>);
      }
    });
    return elements;
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16">
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />
      <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="flex flex-col gap-6">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-mono-label text-xs tracking-[0.3em] uppercase text-primary">
            {subtitle}
          </motion.p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
            {renderTypedText()}
            <span className="inline-block w-[3px] h-[0.85em] bg-primary ml-1 align-middle rounded-sm" style={{ opacity: showCursor ? 1 : 0, transition: "opacity 0.1s" }} />
          </h1>
          <div className="flex flex-wrap gap-2.5 mt-2">
            {tags.map((tag, i) => (
              <motion.span key={tag} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 + i * 0.1 }} className="px-4 py-1.5 rounded-full border border-primary/40 text-sm font-semibold text-foreground backdrop-blur-sm bg-background/50 hover:border-primary hover:bg-primary/10 transition-all cursor-default">
                {tag}
              </motion.span>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="flex flex-wrap gap-3 mt-4">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"><a href="#portfolio"><ArrowDown size={16} /> View Portfolio</a></Button>
            <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground"><a href="#contact"><Mail size={16} /> Contact Me</a></Button>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.8 }} className="relative flex justify-center md:justify-end">
          <div className="absolute w-80 h-80 rounded-full bg-primary/20 blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          {floatingSkills.map((skill) => {
            const IconComp = skill.Icon;
            return (
              <div key={skill.alt} className="absolute z-20 p-2.5 rounded-xl bg-background/60 backdrop-blur-md border border-primary/30" style={{ top: skill.top, left: skill.left, right: skill.right, bottom: skill.bottom, animation: `float ${skill.duration}s ease-in-out ${skill.delay}s infinite`, boxShadow: "0 0 20px hsl(var(--primary) / 0.3), 0 0 40px hsl(var(--primary) / 0.15), 0 4px 12px rgba(0,0,0,0.5)" }}>
                <IconComp size={32} className="text-primary" />
              </div>
            );
          })}
          <div className="relative z-10 w-72 sm:w-80 lg:w-96 rounded-2xl gradient-border p-[3px]">
            <img src="/profile.jpg" alt="MD. Ratul Hasan Lemon" width={384} height={494} loading="eager" fetchPriority="high" className="w-full rounded-2xl object-cover animate-float" style={{ maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)" }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
