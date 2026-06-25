"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState, useEffect } from "react";
import { getSettings } from "@/app/actions/settings";

const links = [
  { name: "Work", href: "/#projects" },
  { name: "About", href: "/#about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/#contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    getSettings().then((s) => {
      if (s?.profilePhotoUrl) setProfilePhotoUrl(s.profilePhotoUrl);
    });
  }, []);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 60);
  });

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/login")) {
    return null;
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <nav
          className={`pointer-events-auto flex items-center w-full max-w-2xl px-5 py-3 transition-all duration-500 ${
            scrolled
              ? "glass border border-border/60 shadow-2xl shadow-black/20"
              : "bg-transparent border border-transparent"
          }`}
          style={{ borderRadius: scrolled ? "9999px" : "9999px" }}
        >
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center shrink-0 mr-auto">
            {profilePhotoUrl ? (
              <img
                src={profilePhotoUrl}
                alt="Logo"
                className="w-7 h-7 rounded-full object-cover"
              />
            ) : (
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold font-display"
                style={{ backgroundColor: "var(--highlight-primary)" }}
              >
                A
              </div>
            )}
          </Link>

          {/* Desktop links — centered */}
          <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative px-4 py-1.5 text-xs font-mono uppercase tracking-[0.12em] text-foreground hover:text-foreground transition-colors duration-200 group"
              >
                <span className="relative z-10">{link.name}</span>
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-[var(--highlight-primary)] transition-all duration-300 w-0 group-hover:w-4"
                />
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 ml-auto">
            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-[5px]"
              aria-label="Menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="w-4 h-[1.5px] bg-foreground rounded-full block origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className="w-4 h-[1.5px] bg-foreground rounded-full block origin-center"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="w-4 h-[1.5px] bg-foreground rounded-full block origin-center"
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <motion.div
        initial={false}
        animate={
          mobileOpen
            ? { opacity: 1, y: 0, pointerEvents: "auto" }
            : { opacity: 0, y: -16, pointerEvents: "none" }
        }
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-20 left-4 right-4 z-40 md:hidden glass border border-border/60 p-4 shadow-2xl"
        style={{ borderRadius: 24 }}
      >
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 px-3 py-3.5 text-xs font-mono uppercase tracking-[0.15em] text-foreground hover:text-foreground border-b border-border/30 last:border-0 transition-colors"
          >
            <span
              className="w-1 h-1 rounded-full shrink-0"
              style={{ backgroundColor: "var(--highlight-primary)" }}
            />
            {link.name}
          </Link>
        ))}
      </motion.div>
    </>
  );
}
