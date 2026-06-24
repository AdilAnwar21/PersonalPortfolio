"use client";

import { motion } from "framer-motion";

import { Github, Linkedin, Instagram } from "@/components/Icons";
import { ISocialLink } from "@/models/Settings";

interface HeroProps {
  title: string;
  subtitle?: string;
  resumeUrl?: string;
  profilePhotoUrl?: string;
  socialLinks?: ISocialLink[];
}

export function Hero({ title, subtitle, resumeUrl, profilePhotoUrl, socialLinks }: HeroProps) {
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-6 text-center pt-24 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-highlight-primary/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-foreground/60 uppercase tracking-[0.3em] text-sm md:text-base mb-8 font-display font-medium"
        >
          {subtitle}
        </motion.p>
      )}

      <motion.h1
        variants={titleVariants}
        initial="hidden"
        animate="visible"
        className="text-6xl md:text-8xl lg:text-9xl font-display tracking-tighter leading-[0.9] mb-12 max-w-5xl mx-auto"
      >
        {title.split("").map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            variants={letterVariants}
            className="inline-block"
            style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>

      {profilePhotoUrl && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-12 relative"
        >
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-border p-1 bg-card/50 backdrop-blur-sm">
            <img 
              src={profilePhotoUrl} 
              alt="Profile" 
              className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500" 
            />
          </div>
        </motion.div>
      )}

      <div className="flex flex-col items-center gap-6">
        {socialLinks && socialLinks.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((link) => {
              const Icon = link.platform.toLowerCase() === "github" ? Github 
                : link.platform.toLowerCase() === "linkedin" ? Linkedin 
                : link.platform.toLowerCase() === "instagram" ? Instagram 
                : null;
              
              if (!Icon) return null;

              return (
                <a 
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-card border border-border rounded-full hover:bg-highlight-primary hover:text-white hover:border-highlight-primary transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </motion.div>
        )}

        {resumeUrl && (
          <motion.a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="px-8 py-4 bg-foreground text-background font-medium rounded-full hover:scale-105 transition-transform"
          >
            View Resume
          </motion.a>
        )}
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-widest text-foreground/50 font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-16 bg-gradient-to-b from-foreground/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
