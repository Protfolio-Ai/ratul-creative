import { ExternalLink, Mail, Phone } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-10 px-6">
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground text-center sm:text-left">
        © 2026 Ratul Hasan Lemon — Creative Graphic Designer & Digital Specialist
      </p>
      <div className="flex items-center gap-5">
        <a href="https://www.behance.net/mratulhasan10" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><ExternalLink size={16} /></a>
        <a href="https://www.facebook.com/ratulhasan.lemon" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><ExternalLink size={16} /></a>
        <a href="mailto:ratullemon1010@gmail.com" className="text-muted-foreground hover:text-primary transition-colors"><Mail size={16} /></a>
        <a href="tel:+8801537543335" className="text-muted-foreground hover:text-primary transition-colors"><Phone size={16} /></a>
      </div>
    </div>
  </footer>
);

export default Footer;
