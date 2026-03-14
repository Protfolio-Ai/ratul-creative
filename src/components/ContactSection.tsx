import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => (
  <section id="contact" className="py-24 px-6 bg-card/50">
    <div className="max-w-5xl mx-auto">
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-mono-label text-xs tracking-[0.3em] uppercase text-primary mb-4">Contact</motion.p>
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-3xl sm:text-4xl font-bold mb-12">Get In Touch</motion.h2>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-6">
          <div className="flex items-start gap-3">
            <MapPin className="text-primary mt-0.5" size={18} />
            <div>
              <p className="font-semibold text-sm">Location</p>
              <p className="text-sm text-muted-foreground">Chashara, Narayanganj, Bangladesh</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="text-primary mt-0.5" size={18} />
            <div>
              <p className="font-semibold text-sm">Email</p>
              <a href="mailto:ratullemon1010@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">ratullemon1010@gmail.com</a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="text-primary mt-0.5" size={18} />
            <div>
              <p className="font-semibold text-sm">Phone</p>
              <a href="tel:+8801537543335" className="text-sm text-muted-foreground hover:text-primary transition-colors">+8801537543335</a>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button asChild className="bg-[#25D366] hover:bg-[#25D366]/90 text-white">
              <a href="https://wa.me/8801537543335" target="_blank" rel="noopener noreferrer">
                <MessageCircle size={16} /> WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" className="border-border">
              <a href="https://www.behance.net/mratulhasan10" target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} /> Behance
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input placeholder="Your Name" className="bg-secondary border-border" />
          <Input type="email" placeholder="Your Email" className="bg-secondary border-border" />
          <Textarea placeholder="Your Message" rows={5} className="bg-secondary border-border" />
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
            Send Message
          </Button>
        </motion.form>
      </div>
    </div>
  </section>
);

export default ContactSection;
