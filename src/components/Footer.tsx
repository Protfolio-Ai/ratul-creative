import { Mail, Phone, Linkedin, Instagram } from "lucide-react";

const FacebookIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
import { useSiteContent } from "@/hooks/useSiteContent";

// Pinterest icon (Lucide doesn't have one)
const PinterestIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
  </svg>
);

const Footer = () => {
  const { data: content } = useSiteContent();
  const footerText = content?.footer_text || "© 2026 Ratul Hasan Lemon — Creative Graphic Designer & Digital Specialist";
  const facebook = content?.facebook_url || "https://www.facebook.com/ratulhasan.lemon";
  const email = content?.contact_email || "ratullemon1010@gmail.com";
  const phone = content?.contact_phone || "+8801537543335";
  const linkedin = content?.linkedin_url || "https://www.linkedin.com/in/mr-ratul-hasan-1137b8240/";
  const instagram = content?.instagram_url || "https://www.instagram.com/mr_ratulhasan/";
  const pinterest = content?.pinterest_url || "https://pin.it/7Eq7NcWuy";

  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground text-center sm:text-left">{footerText}</p>
        <div className="flex items-center gap-5">
          <a href={facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><ExternalLink size={16} /></a>
          <a href={facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><ExternalLink size={16} /></a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={16} /></a>
          <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={16} /></a>
          <a href={pinterest} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><PinterestIcon size={16} /></a>
          <a href={`mailto:${email}`} className="text-muted-foreground hover:text-primary transition-colors"><Mail size={16} /></a>
          <a href={`tel:${phone}`} className="text-muted-foreground hover:text-primary transition-colors"><Phone size={16} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
