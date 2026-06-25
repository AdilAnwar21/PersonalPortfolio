"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { MarqueeTrack } from "@/components/animations/MarqueeTrack";
import { TextReveal } from "@/components/animations/TextReveal";

interface AboutSectionProps {
  aboutText?: string;
  skills?: string[];
}

function AnimatedCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsub = count.on("change", (v) => setDisplay(Math.round(v)));
    return unsub;
  }, [count]);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, {
        duration: 2.4,
        ease: [0.16, 1, 0.3, 1],
      });
      return controls.stop;
    }
  }, [inView, to, count]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const defaultAbout = `I'm a software engineer focused on building clean, performant, and accessible web applications. I enjoy solving complex problems and turning ideas into reality through thoughtful design and precise engineering.

Whether it's a consumer-facing product or a developer tool, I bring the same obsession with craft to every project I take on.`;

export function AboutSection({ aboutText, skills = [] }: AboutSectionProps) {
  const reverseSkills = [...skills].reverse();

  return (
    <section id="about" className="relative py-28 md:py-40 overflow-hidden">
      {/* Left edge pink accent line */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-6 md:left-10 lg:left-16 top-28 bottom-28 w-px origin-top"
        style={{ backgroundColor: "var(--highlight-primary)", opacity: 0.25 }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">

        {/* ── Section label ── */}
        <motion.p
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[10px] tracking-[0.22em] uppercase mb-8 pl-6 relative"
          style={{ color: "var(--highlight-primary)" }}
        >
          <span
            className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-px"
            style={{ backgroundColor: "var(--highlight-primary)" }}
          />
          About
        </motion.p>

        {/* ── Main grid: heading + stats | body ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 lg:gap-24 items-start mb-24">

          {/* Left: giant section heading */}
          <div>
            <div
              className="font-display font-semibold leading-[0.85] tracking-tight mb-10"
              style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
            >
              <TextReveal text="A look into" inView delay={0} stagger={0.02} />
              <TextReveal text="my journey." inView delay={0.18} stagger={0.02} />
            </div>

            {/* About text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-foreground text-base leading-relaxed space-y-4 max-w-xl"
            >
              {(aboutText || defaultAbout).split("\n").filter(Boolean).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </motion.div>
          </div>

          {/* Right: animated stat counters */}
          <div className="flex flex-row lg:flex-col gap-12 lg:gap-16 lg:pt-4">
            {[
              { value: 5, suffix: "+", label: "Years of\nExperience" },
              { value: 40, suffix: "+", label: "Projects\nDelivered" },
              { value: 100, suffix: "%", label: "Client\nSatisfaction" },
            ].map(({ value, suffix, label }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="shrink-0"
              >
                <p
                  className="font-display font-semibold leading-none tracking-tight mb-1.5"
                  style={{
                    fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
                    color: "var(--highlight-primary)",
                  }}
                >
                  <AnimatedCounter to={value} suffix={suffix} />
                </p>
                <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-foreground/90 whitespace-pre-line leading-relaxed">
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Skills dual marquee ── */}
        {skills.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-3 border-t border-border/40 pt-12"
          >
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-foreground/80 mb-6">
              Technical Stack
            </p>
            <MarqueeTrack items={skills} speed={38} size="md" />
            <MarqueeTrack items={reverseSkills} speed={32} reverse size="md" />
          </motion.div>
        )}
      </div>
    </section>
  );
}
