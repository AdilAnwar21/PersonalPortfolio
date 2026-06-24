"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { Github, Linkedin, Instagram } from "@/components/Icons";
import { ISocialLink } from "@/models/Settings";

interface HeroProps {
  title: string;
  subtitle?: string;
  resumeUrl?: string;
  profilePhotoUrl?: string;
  socialLinks?: ISocialLink[];
}

// Animated counter component
function AnimatedCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v) + suffix);

  useEffect(() => {
    const controls = animate(count, to, { duration: 2, ease: "easeOut", delay: 1.2 });
    return controls.stop;
  }, []);

  return <motion.span>{rounded}</motion.span>;
}

const socialIconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
};

export function Hero({ title, subtitle, resumeUrl, profilePhotoUrl, socialLinks }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);

  // Split name into first + last for two-tone layout
  const words = title.split(" ");
  const firstName = words.slice(0, -1).join(" ") || title;
  const lastName = words.length > 1 ? words[words.length - 1] : "";

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* ── Layered background ── */}
      {/* Main radial spotlight */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,var(--highlight-primary)/15,transparent_70%)]" />
      </div>
      {/* Floating orbs */}
      <motion.div
        animate={{ y: [0, -24, 0], x: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-1/4 right-[12%] w-72 h-72 rounded-full bg-highlight-primary/8 blur-[90px] -z-10"
      />
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 11, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 left-[8%] w-64 h-64 rounded-full bg-highlight-secondary/8 blur-[80px] -z-10"
      />

      {/* Subtle dot-grid texture */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Main content ── */}
      <div className="max-w-6xl w-full mx-auto flex flex-col lg:flex-row items-center lg:items-center gap-12 lg:gap-20 pt-24 lg:pt-0">
        
        {/* Left column — text */}
        <div className="flex-1 text-center lg:text-left">

          {/* Eyebrow badge */}
          {subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-highlight-primary animate-pulse" />
              <span className="text-xs md:text-sm font-medium uppercase tracking-[0.25em] text-foreground/60">
                {subtitle}
              </span>
            </motion.div>
          )}

          {/* Name — large display */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="font-display tracking-tight leading-[0.88] mb-6"
          >
            {firstName && (
              <motion.span
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="block text-[clamp(3.5rem,10vw,8rem)] text-foreground"
              >
                {firstName}
              </motion.span>
            )}
            {lastName && (
              <motion.span
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="block text-[clamp(3.5rem,10vw,8rem)] text-highlight-primary"
              >
                {lastName}
              </motion.span>
            )}
          </motion.h1>

          {/* Divider line */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="h-px bg-gradient-to-r from-highlight-primary via-highlight-secondary/50 to-transparent mb-8 lg:max-w-xs"
          />

          {/* Social links */}
          {socialLinks && socialLinks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex items-center gap-3 mb-10 justify-center lg:justify-start"
            >
              {socialLinks.map((link) => {
                const Icon = socialIconMap[link.platform.toLowerCase()];
                if (!Icon) return null;
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.platform}
                    className="group w-10 h-10 flex items-center justify-center rounded-xl border border-border bg-card hover:border-highlight-primary hover:bg-highlight-primary/10 hover:scale-110 transition-all duration-200"
                  >
                    <Icon className="w-4 h-4 text-foreground/60 group-hover:text-highlight-primary transition-colors" />
                  </a>
                );
              })}
            </motion.div>
          )}

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="flex items-center gap-4 justify-center lg:justify-start flex-wrap"
          >
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-7 py-3 bg-highlight-primary text-white font-semibold rounded-xl hover:bg-highlight-primary/90 hover:scale-105 transition-all duration-200 text-sm shadow-lg shadow-highlight-primary/25"
              >
                View Resume
                <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
              </a>
            )}
            <a
              href="#about"
              className="px-7 py-3 border border-border rounded-xl text-sm font-semibold text-foreground/70 hover:border-foreground/40 hover:text-foreground transition-all duration-200"
            >
              About Me
            </a>
          </motion.div>

          {/* Mini stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="flex items-center gap-8 mt-12 justify-center lg:justify-start"
          >
            {[
              { value: 5, suffix: "+", label: "Years Exp." },
              { value: 40, suffix: "+", label: "Projects" },
              { value: 100, suffix: "%", label: "Satisfaction" },
            ].map(({ value, suffix, label }) => (
              <div key={label} className="text-center lg:text-left">
                <p className="text-2xl font-display font-bold text-foreground">
                  <AnimatedCounter to={value} suffix={suffix} />
                </p>
                <p className="text-xs text-foreground/50 uppercase tracking-wider mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right column — profile photo */}
        {profilePhotoUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative shrink-0"
          >
            {/* Decorative ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-highlight-primary/20 -m-4"
            />
            {/* Glow blob behind photo */}
            <div className="absolute inset-0 rounded-full bg-highlight-primary/20 blur-3xl scale-110" />
            {/* Photo */}
            <div className="relative w-52 h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-2 border-highlight-primary/30 shadow-2xl shadow-highlight-primary/20">
              <img
                src={profilePhotoUrl}
                alt="Profile photo"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
              {/* Subtle overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-highlight-primary/10 to-transparent" />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, type: "spring", stiffness: 200 }}
              className="absolute -bottom-3 -right-3 bg-card border border-border rounded-2xl px-4 py-2 shadow-xl"
            >
              <span className="text-xs font-semibold text-foreground/70">Available for work</span>
              <span className="ml-2 w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/40">scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-highlight-primary/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
