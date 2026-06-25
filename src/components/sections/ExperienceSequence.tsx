"use client";

import { useRef } from "react";
import { IExperience } from "@/models/Experience";
import { motion, useScroll, useSpring } from "framer-motion";
import { TextReveal } from "@/components/animations/TextReveal";

interface Props {
  experiences: IExperience[];
}

export function ExperienceSequence({ experiences }: Props) {
  if (!experiences || experiences.length === 0) return null;

  return (
    <section id="experience" className="relative py-32 border-t border-border/40 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-16">

        {/* Section header */}
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
          Career Path
        </motion.p>

        <div
          className="font-display font-semibold leading-[0.85] tracking-tight mb-20"
          style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
        >
          <TextReveal text="Work" inView delay={0} stagger={0.03} />
          <TextReveal text="Experience." inView delay={0.18} stagger={0.022} />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <ScrollTimeline />

          <div className="space-y-0">
            {experiences.map((exp, index) => {
              const startYear = new Date(exp.startDate).getFullYear();
              const endYear = exp.current
                ? "Now"
                : exp.endDate
                ? new Date(exp.endDate).getFullYear()
                : "—";

              return (
                <motion.div
                  key={String(exp._id)}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative pl-14 pb-20 last:pb-0 group"
                >
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.06 + 0.2,
                      type: "spring",
                      stiffness: 220,
                      damping: 20,
                    }}
                    className="absolute left-0 top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors duration-300"
                    style={{
                      borderColor: "var(--highlight-primary)",
                      backgroundColor: "var(--background)",
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                      style={{ backgroundColor: "var(--highlight-primary)" }}
                    />
                  </motion.div>

                  {/* Year + location row */}
                  <div className="flex flex-wrap items-center gap-4 mb-5">
                    <span className="font-mono text-xs tracking-[0.12em] text-foreground/90">
                      {startYear} – {endYear}
                    </span>
                    {exp.current && (
                      <span
                        className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.12em] uppercase"
                        style={{ color: "var(--highlight-primary)" }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full animate-pulse"
                          style={{ backgroundColor: "var(--highlight-primary)" }}
                        />
                        Current
                      </span>
                    )}
                    {exp.location && (
                      <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-foreground/80">
                        {exp.location}
                      </span>
                    )}
                  </div>

                  {/* Role + company */}
                  <div className="mb-5">
                    <h3
                      className="font-display font-semibold text-foreground mb-1"
                      style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)" }}
                    >
                      {exp.role}
                    </h3>
                    <p
                      className="font-mono text-sm tracking-wider"
                      style={{ color: "var(--highlight-primary)" }}
                    >
                      {exp.company}
                    </p>
                  </div>

                  {/* Description bullets */}
                  {exp.description.length > 0 && (
                    <ul className="space-y-2.5 mb-6">
                      {exp.description.map((desc, di) => (
                        <li
                          key={di}
                          className="flex items-start gap-3 text-sm text-foreground leading-relaxed"
                        >
                          <span
                            className="mt-2 w-1 h-1 rounded-full shrink-0"
                            style={{ backgroundColor: "var(--highlight-primary)", opacity: 0.6 }}
                          />
                          {desc}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tech pills */}
                  {exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 border border-border rounded-full font-mono text-[10px] tracking-[0.1em] uppercase text-foreground hover:border-[var(--highlight-primary)] hover:text-[var(--highlight-primary)] transition-colors duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Scroll-linked vertical timeline line */
function ScrollTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 30%"],
  });
  const height = useSpring(scrollYProgress, { stiffness: 80, damping: 30 });

  return (
    <div
      ref={ref}
      className="absolute left-[7px] top-0 bottom-0 w-px overflow-hidden"
      style={{ backgroundColor: "var(--border)" }}
    >
      <motion.div
        className="absolute top-0 left-0 right-0 origin-top"
        style={{
          scaleY: height,
          backgroundColor: "var(--highlight-primary)",
          opacity: 0.5,
          bottom: 0,
        }}
      />
    </div>
  );
}
