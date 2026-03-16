import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Waves, EllipsisVertical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme, Theme } from "@/contexts/ThemeContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import logoBlue from "@/assets/logo-blue.png";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const themeIcons: Record<Theme, typeof Sun> = {
  light: Sun,
  dark: Moon,
  "blue-dark": Waves,
};

const themeLabels: Record<Theme, string> = {
  light: "Light",
  dark: "Dark",
  "blue-dark": "Navy",
};

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const { theme, cycleTheme } = useTheme();

  const ThemeIcon = themeIcons[theme];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = links.map((l) => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Logo filter: light theme = use as-is (blue), dark themes = make it white
  const logoFilter = theme === "light" ? "none" : "brightness(0) invert(1)";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#home" className="flex items-center">
          <img
            src={logoBlue}
            alt="Ratul Logo"
            className="h-8 w-auto"
            style={{ filter: logoFilter }}
          />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {/* Theme toggle */}
          <button
            onClick={cycleTheme}
            className="p-2 rounded-lg border border-border hover:bg-secondary transition-colors"
            title={`Theme: ${themeLabels[theme]}`}
          >
            <ThemeIcon size={16} className="text-primary" />
          </button>

          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors relative ${
                active === l.href.slice(1) ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
              {active === l.href.slice(1) && (
                <motion.span
                  layoutId="nav-dot"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                />
              )}
            </a>
          ))}
          {/* Three-dot admin menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                <EllipsisVertical size={16} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate('/admin/login')}>
                Admin Panel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={cycleTheme}
            className="p-2 rounded-lg border border-border hover:bg-secondary transition-colors"
            title={`Theme: ${themeLabels[theme]}`}
          >
            <ThemeIcon size={16} className="text-primary" />
          </button>
          <button className="text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`text-sm font-medium ${
                    active === l.href.slice(1) ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
