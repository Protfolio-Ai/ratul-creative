import { ExternalLink, Mail, Phone } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const Footer = () => {
  const { data: content } = useSiteContent();
  const footerText = content?.footer_text || "© 2026 Ratul Hasan Lemon — Creative Graphic Designer & Digital Specialist";
  const behance = content?.behance_url || "https://www.behance.net/mratulhasan10";
  const facebook = content?.facebook_url || "https://www.facebook.com/ratulhasan.lemon";
  const email = content?.contact_email || "ratullemon1010@gmail.com";
  const phone = content?.contact_phone || "+8801537543335";

  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground text-center sm:text-left">{footerText}</p>
        <div className="flex items-center gap-5">
          <a href={behance} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><ExternalLink size={16} /></a>
          <a href={facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><ExternalLink size={16} /></a>
          <a href={`mailto:${email}`} className="text-muted-foreground hover:text-primary transition-colors"><Mail size={16} /></a>
          <a href={`tel:${phone}`} className="text-muted-foreground hover:text-primary transition-colors"><Phone size={16} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
