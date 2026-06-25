"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState, useEffect } from "react";
import { getSettings } from "@/app/actions/settings";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/#projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/#contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
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
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <nav
          onMouseLeave={() => setHoveredPath(null)}
          className={`pointer-events-auto flex items-center justify-between w-full max-w-3xl px-6 py-3 rounded-full transition-all duration-500 border shadow-2xl ${
            scrolled
              ? "bg-background/40 backdrop-blur-3xl border-border/50 shadow-black/5 dark:shadow-black/40"
              : "bg-background/20 backdrop-blur-xl border-border/20 shadow-transparent"
          }`}
        >
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center group shrink-0 pr-2">
            {profilePhotoUrl ? (
              <img src={profilePhotoUrl} alt="Logo" className="w-9 h-9 rounded-full object-cover shadow-lg group-hover:scale-110 transition-transform" />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-highlight-primary to-highlight-secondary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-white text-xs font-bold font-display">A</span>
              </div>
            )}
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center justify-center flex-1 relative gap-1">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoveredPath(link.href)}
                className="relative px-5 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors z-10"
              >
                {hoveredPath === link.href && (
                  <motion.div
                    layoutId="navbar-hover"
                    className="absolute inset-0 bg-foreground/10 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 pl-2 md:border-l md:border-border/50">
            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-full hover:bg-foreground/10 transition-colors ml-1"
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
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-highlight-primary/50" />
            {link.name}
          </Link>
        ))}
      </motion.div>
    </>
  );
}
