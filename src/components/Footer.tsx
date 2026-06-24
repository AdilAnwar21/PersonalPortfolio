"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram } from "@/components/Icons";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/login")) {
    return null;
  }

  return (
    <footer className="relative border-t border-border mt-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-highlight-primary/3 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-highlight-primary to-highlight-secondary flex items-center justify-center shadow-lg shadow-highlight-primary/30">
                <span className="text-white text-sm font-bold font-display">A</span>
              </div>
              <span className="font-display font-semibold text-foreground">Portfolio</span>
            </div>
            <p className="text-sm text-foreground/50 leading-relaxed max-w-xs">
              Crafting digital experiences that blend design precision with engineering excellence.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-4">Navigation</p>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground/60 hover:text-highlight-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-4">Connect</p>
            <div className="flex items-center gap-3 mb-6">
              {[
                { Icon: Github, label: "GitHub" },
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Instagram, label: "Instagram" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-border bg-card hover:border-highlight-primary hover:bg-highlight-primary/10 hover:text-highlight-primary text-foreground/50 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-highlight-primary hover:underline"
            >
              Get in touch →
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-xs text-foreground/40">
            © {new Date().getFullYear()} All rights reserved.
          </p>
          <p className="text-xs text-foreground/40">
            Built with{" "}
            <span className="text-highlight-primary">Next.js</span>
            {" · "}
            <span className="text-highlight-secondary">Framer Motion</span>
            {" · "}
            <span className="text-foreground/60">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
