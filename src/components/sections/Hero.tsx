"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Instagram } from "@/components/Icons";
import { ISocialLink } from "@/models/Settings";

interface HeroProps {
  title: string;
  subtitle?: string;
  resumeUrl?: string;
  profilePhotoUrl?: string;
  socialLinks?: ISocialLink[];
}

const socialIconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
};

// Animated typing effect for role text
function TypeWriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBlink((v) => !v);
    }, 500);
    return () => clearTimeout(timeout);
  }, [blink]);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), 1500);
      return;
    }
    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((s) => s + (deleting ? -1 : 1));
    }, deleting ? 60 : 100);
    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, words]);

  return (
    <span>
      {words[index].substring(0, subIndex)}
      <span className={`${blink ? "opacity-100" : "opacity-0"} transition-opacity`}>|</span>
    </span>
  );
}

// Canvas particle background
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
        ctx.fill();
      });

      // Draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.07 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 -z-10 opacity-60 dark:opacity-100" />;
}

export function Hero({ title, subtitle, resumeUrl, profilePhotoUrl, socialLinks }: HeroProps) {
  const words = title.split(" ");
  const firstName = words.slice(0, -1).join(" ") || title;
  const lastName = words.length > 1 ? words[words.length - 1] : "";

  const roles = subtitle
    ? [subtitle, "Frontend Developer", "Software Engineer"]
    : ["Software Engineer", "Frontend Developer", "Creative Coder"];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Gradient overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-background to-highlight-primary/5" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-highlight-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-highlight-secondary/5 rounded-full blur-[100px] -z-10" />

      {/* Grid lines decoration */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[85vh]">
          
          {/* ── Left: Text Content ── */}
          <div>
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-highlight-primary/30 bg-highlight-primary/5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-medium text-foreground/60 tracking-widest uppercase">Open to Work</span>
              </div>
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-display leading-[0.9] tracking-tight mb-6">
                <span className="block text-[clamp(3rem,8vw,6.5rem)] text-foreground/90">
                  {firstName || "Hello,"}
                </span>
                <span className="block text-[clamp(3rem,8vw,6.5rem)] bg-gradient-to-r from-highlight-primary to-highlight-secondary bg-clip-text text-transparent">
                  {lastName || "World."}
                </span>
              </h1>
            </motion.div>

            {/* Animated role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-xl md:text-2xl text-foreground/50 font-light mb-10 h-9"
            >
              <TypeWriter words={roles} />
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              style={{ originX: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="h-px w-full max-w-sm bg-gradient-to-r from-highlight-primary/60 via-highlight-secondary/30 to-transparent mb-10"
            />

            {/* Social icons */}
            {socialLinks && socialLinks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.75 }}
                className="flex items-center gap-3 mb-10"
              >
                {socialLinks.map((link, i) => {
                  const Icon = socialIconMap[link.platform.toLowerCase()];
                  if (!Icon) return null;
                  return (
                    <motion.a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.platform}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.1, type: "spring", stiffness: 200 }}
                      whileHover={{ scale: 1.15, y: -2 }}
                      className="w-10 h-10 flex items-center justify-center rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-highlight-primary hover:bg-highlight-primary/10 transition-colors duration-200"
                    >
                      <Icon className="w-4 h-4 text-foreground/60 group-hover:text-highlight-primary" />
                    </motion.a>
                  );
                })}
              </motion.div>
            )}

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex items-center gap-4 flex-wrap"
            >
              {resumeUrl && (
                <motion.a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative px-8 py-3.5 bg-transparent border border-foreground text-foreground font-semibold rounded-xl text-sm hover:bg-foreground hover:text-background transition-colors duration-300 overflow-hidden flex items-center justify-center"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    View Resume
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </motion.a>
              )}
              <motion.a
                href="#about"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 bg-transparent border border-foreground text-foreground font-semibold rounded-xl text-sm hover:bg-foreground hover:text-background transition-colors duration-300 flex items-center justify-center"
              >
                Learn More
              </motion.a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="flex items-center gap-10 mt-14 pt-10 border-t border-border"
            >
              {[["5+", "Years Exp."], ["40+", "Projects"], ["100%", "Client Satisfaction"]].map(([val, label]) => (
                <div key={label}>
                  <p className="text-2xl font-display font-bold text-foreground">{val}</p>
                  <p className="text-xs text-foreground/40 mt-0.5 uppercase tracking-wider">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Visual panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Glassmorphism card frame */}
            <div className="relative w-full max-w-md aspect-square">
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-highlight-primary/20 to-highlight-secondary/10 blur-2xl scale-110" />
              
              {/* Main card */}
              <div className="relative rounded-3xl border border-border/60 bg-card/30 backdrop-blur-xl overflow-hidden shadow-2xl">
                
                {/* Profile photo or geometric art */}
                {profilePhotoUrl ? (
                  <div className="relative w-full aspect-square">
                    <img
                      src={profilePhotoUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                    {/* Bottom text overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-white font-display text-2xl font-semibold tracking-tight">{title}</p>
                      <p className="text-white/60 text-sm mt-1">{subtitle || "Software Engineer"}</p>
                    </div>
                  </div>
                ) : (
                  // Abstract geometric art if no photo
                  <div className="w-full aspect-square flex items-center justify-center bg-gradient-to-br from-highlight-primary/10 to-highlight-secondary/5 relative overflow-hidden">
                    {/* Decorative geometric shapes */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                      className="absolute w-72 h-72 border border-highlight-primary/20 rounded-full"
                    />
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute w-48 h-48 border border-highlight-secondary/20 rounded-full"
                    />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="absolute w-24 h-24 border border-highlight-primary/40 rounded-full"
                    />
                    {/* Center icon */}
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-highlight-primary to-highlight-secondary flex items-center justify-center shadow-2xl shadow-highlight-primary/40">
                      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <p className="absolute bottom-8 text-foreground/40 text-sm">Add your photo in Settings</p>
                  </div>
                )}
              </div>

              {/* Floating info chips */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -top-4 -right-4 bg-card border border-border rounded-2xl px-4 py-3 shadow-xl backdrop-blur-md"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-highlight-primary/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-highlight-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">Top Rated</p>
                    <p className="text-[10px] text-foreground/50">5.0 ⭐ reviews</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="absolute -bottom-4 -left-4 bg-card border border-border rounded-2xl px-4 py-3 shadow-xl backdrop-blur-md"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">Available Now</p>
                    <p className="text-[10px] text-foreground/50">Open to freelance</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/30">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-highlight-primary/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
