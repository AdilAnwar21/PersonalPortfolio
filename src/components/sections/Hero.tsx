"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Github, Linkedin, Instagram } from "@/components/Icons";
import { ISocialLink } from "@/models/Settings";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { MarqueeTrack } from "@/components/animations/MarqueeTrack";
import { TextReveal } from "@/components/animations/TextReveal";

interface HeroProps {
  title: string;
  subtitle?: string;
  resumeUrl?: string;
  profilePhotoUrl?: string;
  socialLinks?: ISocialLink[];
  skills?: string[];
  availableForWork?: boolean;
}

const socialIconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
};

const defaultSkills = [
  "Next.js", "React", "TypeScript", "Node.js", "MongoDB",
  "Tailwind", "Framer Motion", "Figma", "Python", "AWS",
];

/** Smooth crossfade word swap — no typewriter cursor */
function CrossfadeRole({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, 3200);
    return () => clearInterval(t);
  }, [words.length]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={words[index]}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="inline-block"
        style={{ color: "var(--highlight-primary)" }}
      >
        {words[index]}
      </motion.span>
    </AnimatePresence>
  );
}

export function Hero({
  title,
  subtitle,
  resumeUrl,
  profilePhotoUrl,
  socialLinks,
  skills,
  availableForWork = true,
}: HeroProps) {
  const marqueeItems = skills?.length ? skills : defaultSkills;

  // Split title into two lines for the giant display type
  const titleWords = title.trim().split(/\s+/);
  const mid = Math.ceil(titleWords.length / 2);
  const line1 = titleWords.slice(0, mid).join(" ");
  const line2 = titleWords.slice(mid).join(" ");

  const roles = subtitle
    ? [subtitle, "Full-Stack Developer", "Creative Coder"]
    : ["Software Engineer", "Full-Stack Developer", "Creative Coder"];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* Subtle radial glow — single hot-pink bloom */}
      <div
        className="absolute pointer-events-none -z-10"
        style={{
          top: "10%",
          right: "-5%",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--highlight-primary) 0%, transparent 70%)",
          opacity: 0.04,
          filter: "blur(60px)",
        }}
      />

      {/* ── Status badge ── */}
      <AnimatePresence>
        {availableForWork && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-28 left-6 md:left-10 lg:left-16 z-10"
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 border border-border bg-background/50 backdrop-blur-md text-[10px] font-mono tracking-[0.18em] uppercase text-foreground"
              style={{ borderRadius: 99 }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
                style={{ backgroundColor: "var(--highlight-primary)" }}
              />
              Available for work
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main content area ── */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-10 lg:px-16 pt-32 pb-12 relative">

        {/* Profile photo — flows naturally on mobile, absolute overlapping on desktop */}
        {profilePhotoUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 lg:mb-0 lg:absolute lg:right-16 lg:top-1/2 lg:-translate-y-1/2 z-10 origin-left lg:origin-center"
          >
            <div className="relative rounded-3xl overflow-hidden w-32 md:w-48 lg:w-[20vw] lg:max-w-[280px]">
              <img
                src={profilePhotoUrl}
                alt="Profile"
                className="w-full object-cover"
                style={{ aspectRatio: "3/4" }}
              />
              {/* Bottom fade */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to bottom, transparent 55%, var(--background) 100%)",
                }}
              />
            </div>
          </motion.div>
        )}

        {/* ── Giant display typography ── */}
        <div
          className="relative z-10 font-display font-semibold leading-[0.82] tracking-[-0.03em] select-none text-foreground"
          style={{ fontSize: "clamp(4rem, 11.5vw, 9.5rem)" }}
        >
          <TextReveal text={line1 || title} delay={0.3} />

          {line2 ? (
            <div className="flex items-end gap-3 md:gap-5">
              <TextReveal text={line2} delay={0.56} />
              {/* Hot-pink filled dot — the ONLY pink element in the heading */}
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.1, type: "spring", stiffness: 260, damping: 18 }}
                className="mb-1 md:mb-2 shrink-0 rounded-full inline-block"
                style={{
                  width: "clamp(1.2rem, 2.5vw, 2.5rem)",
                  height: "clamp(1.2rem, 2.5vw, 2.5rem)",
                  backgroundColor: "var(--highlight-primary)",
                }}
              />
            </div>
          ) : (
            /* Single word — append pink dot inline */
            <span
              className="inline-block rounded-full ml-3"
              style={{
                width: "clamp(1.2rem, 2.5vw, 2.5rem)",
                height: "clamp(1.2rem, 2.5vw, 2.5rem)",
                backgroundColor: "var(--highlight-primary)",
                verticalAlign: "middle",
                marginBottom: "0.15em",
              }}
            />
          )}
        </div>

        {/* ── Animated rule ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          style={{ originX: 0, maxWidth: "65%" }}
          transition={{ duration: 1.1, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-border mt-8 mb-7"
        />

        {/* ── Meta row — role + stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-[10px] font-mono tracking-[0.18em] uppercase text-foreground"
          style={{ borderRadius: 9999 }}
        >
          <CrossfadeRole words={roles} />
          <span className="text-border select-none">·</span>
          <span>{new Date().getFullYear()}</span>
          <span className="text-border select-none">·</span>
          <span>5+ Yrs Exp</span>
          <span className="text-border select-none">·</span>
          <span>40+ Projects</span>
        </motion.div>

        {/* ── Social + CTA row ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-wrap items-center gap-5 mt-8"
        >
          {/* Social icons */}
          {socialLinks && socialLinks.length > 0 && (
            <div className="flex items-center gap-2.5">
              {socialLinks.map((link, i) => {
                const Icon = socialIconMap[link.platform.toLowerCase()];
                if (!Icon) return null;
                return (
                  <MagneticButton key={link.platform}>
                    <motion.a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="w-9 h-9 flex items-center justify-center border border-border text-foreground hover:border-[var(--highlight-primary)] hover:text-[var(--highlight-primary)] rounded-full transition-all duration-250"
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </motion.a>
                  </MagneticButton>
                );
              })}
            </div>
          )}

          <div className="h-6 w-px bg-border hidden sm:block" />

          {/* Resume CTA */}
          {resumeUrl && (
            <MagneticButton>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] uppercase text-foreground hover:text-[var(--highlight-primary)] transition-colors duration-200"
              >
                <span>View Resume</span>
                <motion.span
                  className="block h-px bg-current"
                  initial={{ width: 20 }}
                  whileHover={{ width: 40 }}
                  transition={{ duration: 0.25 }}
                />
                <svg className="w-2.5 h-2.5 -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 7l-10 10M7 7h10v10" />
                </svg>
              </a>
            </MagneticButton>
          )}

          {/* Scroll indicator */}
          <MagneticButton>
            <a
              href="#about"
              className="group flex items-center gap-2.5 font-mono text-[11px] tracking-[0.18em] uppercase text-foreground hover:text-[var(--highlight-primary)] transition-colors duration-200"
            >
              <span>Explore</span>
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                className="block"
              >
                ↓
              </motion.span>
            </a>
          </MagneticButton>
        </motion.div>
      </div>

      {/* ── Marquee strip at bottom ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.6 }}
        className="border-t border-border/50 py-3.5 relative z-10"
      >
        <MarqueeTrack items={marqueeItems} speed={45} />
      </motion.div>
    </section>
  );
}
