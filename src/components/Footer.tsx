"use client";

import { usePathname } from "next/navigation";
import { Github, Linkedin, Instagram } from "@/components/Icons";
import { useState, useEffect } from "react";
import { getSettings } from "@/app/actions/settings";
import { ISocialLink } from "@/models/Settings";
import { motion } from "framer-motion";

const footerLinks = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

const socialIconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
};

export function Footer() {
  const pathname = usePathname();
  const [socialLinks, setSocialLinks] = useState<ISocialLink[]>([]);

  useEffect(() => {
    getSettings().then((s) => {
      if (s?.socialLinks) setSocialLinks(s.socialLinks);
    });
  }, []);

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/login")) {
    return null;
  }

  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-16">

        {/* Giant year watermark — pure editorial element */}
        <div
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 font-display font-bold leading-none pointer-events-none select-none"
          style={{
            fontSize: "clamp(6rem, 18vw, 18rem)",
            WebkitTextStroke: "1px color-mix(in srgb, var(--foreground) 5%, transparent)",
            color: "transparent",
          }}
          aria-hidden="true"
        >
          {year}
        </div>

        {/* Content */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
          {/* Left */}
          <div>
            {/* Logo + tagline */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-[10px] font-mono shrink-0"
                style={{ backgroundColor: "var(--highlight-primary)" }}
              >
                A
              </div>
              <span className="font-mono text-xs tracking-[0.15em] uppercase text-foreground">
                Portfolio
              </span>
            </div>
            <p className="text-sm text-foreground max-w-xs leading-relaxed mb-8">
              Crafting digital experiences through thoughtful design and precise engineering.
            </p>

            {/* Nav links */}
            <nav className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-mono text-[11px] tracking-[0.15em] uppercase text-foreground/90 hover:text-[var(--highlight-primary)] transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.length > 0 ? (
                socialLinks.map((link) => {
                  const Icon = socialIconMap[link.platform.toLowerCase()];
                  if (!Icon) return null;
                  return (
                    <motion.a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.platform}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="w-8 h-8 flex items-center justify-center border border-border rounded-full text-foreground/90 hover:border-[var(--highlight-primary)] hover:text-[var(--highlight-primary)] transition-all duration-200"
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </motion.a>
                  );
                })
              ) : (
                [Github, Linkedin, Instagram].map((Icon, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 flex items-center justify-center border border-border rounded-full text-foreground/80"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right — bottom row */}
          <div className="md:text-right">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] uppercase text-foreground hover:text-[var(--highlight-primary)] transition-colors duration-200 mb-8"
            >
              <span>Get in touch</span>
              <motion.span
                className="block h-px bg-current"
                initial={{ width: 16 }}
                whileHover={{ width: 36 }}
                transition={{ duration: 0.25 }}
              />
            </a>
            <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-foreground/80 block">
              © {year} All rights reserved.
            </p>
            <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-foreground/80 mt-1">
              Built with{" "}
              <span style={{ color: "var(--highlight-primary)", opacity: 0.7 }}>Next.js</span>
              {" · "}
              <span style={{ color: "var(--highlight-primary)", opacity: 0.7 }}>Framer Motion</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
