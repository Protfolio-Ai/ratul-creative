import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const CVSection = () => (
  <section className="py-24 px-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-2xl mx-auto text-center"
    >
      <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Download My CV</h2>
      <p className="text-muted-foreground mb-8">
        Download my professional CV to learn more about my experience, design skills and career journey.
      </p>
      <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
        <a href="/Ratul_Hasan_CV.pdf" download>
          <Download size={18} /> Download CV (PDF)
        </a>
      </Button>
    </motion.div>
  </section>
);

export default CVSection;
