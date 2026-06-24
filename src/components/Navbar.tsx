"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState, useEffect } from "react";
import { getSettings } from "@/app/actions/settings";

const links = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    getSettings().then((settings) => {
      if (settings?.profilePhotoUrl) {
        setProfilePhotoUrl(settings.profilePhotoUrl);
      }
    });
  }, []);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
  });

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/login")) {
    return null;
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-5"
      >
        <nav
          className={`w-full max-w-5xl flex items-center justify-between px-5 py-3 rounded-2xl border transition-all duration-500 ${
            scrolled
              ? "bg-background/80 backdrop-blur-xl border-border/80 shadow-2xl shadow-black/10"
              : "bg-transparent border-transparent"
          }`}
        >
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            {profilePhotoUrl ? (
              <img src={profilePhotoUrl} alt="Logo" className="w-8 h-8 rounded-xl object-cover shadow-lg group-hover:scale-110 transition-transform" />
            ) : (
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-highlight-primary to-highlight-secondary flex items-center justify-center shadow-lg shadow-highlight-primary/30 group-hover:scale-110 transition-transform">
                <span className="text-white text-xs font-bold font-display">A</span>
              </div>
            )}
            <span className="font-display font-semibold text-sm text-foreground tracking-tight hidden sm:block">
              Portfolio
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-foreground/60 hover:text-foreground transition-colors rounded-xl hover:bg-foreground/5 group"
              >
                {link.name}
                <span className="absolute bottom-1.5 left-4 right-4 h-px bg-highlight-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <a
              href="#contact"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-transparent border border-foreground text-foreground text-xs font-semibold rounded-xl hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              Hire Me
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-xl border border-border hover:bg-card/50 transition-colors"
              aria-label="Menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-4 h-0.5 bg-foreground rounded-full block"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className="w-4 h-0.5 bg-foreground rounded-full block"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-4 h-0.5 bg-foreground rounded-full block"
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <motion.div
        initial={false}
        animate={mobileOpen ? { opacity: 1, y: 0, pointerEvents: "auto" } : { opacity: 0, y: -20, pointerEvents: "none" }}
        className="fixed top-20 left-4 right-4 z-40 md:hidden bg-background/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl p-4"
      >
        {links.map((link, i) => (
          <motion.a
            key={link.name}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            initial={{ opacity: 0, x: -20 }}
            animate={mobileOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-highlight-primary/50" />
            {link.name}
          </motion.a>
        ))}
        <div className="mt-3 pt-3 border-t border-border">
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3 bg-transparent border border-foreground text-foreground text-sm font-semibold rounded-xl hover:bg-foreground hover:text-background transition-colors duration-300"
          >
            Hire Me →
          </a>
        </div>
      </motion.div>
    </>
  );
}
