"use client";

import { IExperience } from "@/models/Experience";
import { FadeIn } from "@/components/animations/FadeIn";
import { motion } from "framer-motion";

interface Props {
  experiences: IExperience[];
}

export function ExperienceSequence({ experiences }: Props) {
  if (!experiences || experiences.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="py-32 px-6 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-highlight-secondary/4 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 border-b border-border pb-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-highlight-primary font-semibold mb-3">Career Path</p>
              <h2 className="text-4xl md:text-6xl font-display font-semibold text-foreground">
                Work{" "}
                <span className="bg-gradient-to-r from-highlight-primary to-highlight-secondary bg-clip-text text-transparent">
                  Experience
                </span>
              </h2>
            </div>
            <p className="text-foreground/50 max-w-xs text-sm leading-relaxed">
              A timeline of my professional journey and the companies I've helped build.
            </p>
          </div>
        </FadeIn>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-5 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-highlight-primary/50 via-border to-transparent" />

          <div className="space-y-0">
            {experiences.map((exp, index) => {
              const startYear = new Date(exp.startDate).getFullYear();
              const endYear = exp.current ? "Now" : exp.endDate ? new Date(exp.endDate).getFullYear() : "—";

              return (
                <FadeIn key={String(exp._id)} delay={index * 0.1}>
                  <div className="relative pl-16 md:pl-24 pb-16 group">
                    {/* Timeline dot */}
                    <div className="absolute left-[14px] md:left-[22px] top-1.5 flex flex-col items-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                        className="w-5 h-5 rounded-full border-2 border-highlight-primary bg-background shadow-lg shadow-highlight-primary/30 group-hover:bg-highlight-primary transition-colors duration-300"
                      />
                    </div>

                    {/* Year badge */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-mono text-highlight-secondary font-semibold px-2.5 py-1 bg-highlight-secondary/10 rounded-lg">
                        {startYear} – {endYear}
                      </span>
                      {exp.current && (
                        <span className="flex items-center gap-1.5 text-xs text-green-400 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          Current
                        </span>
                      )}
                      {exp.location && (
                        <span className="text-xs text-foreground/40">{exp.location}</span>
                      )}
                    </div>

                    {/* Card */}
                    <div className="p-6 md:p-8 rounded-2xl border border-border bg-card/30 backdrop-blur-sm hover:border-highlight-primary/30 hover:shadow-xl hover:shadow-highlight-primary/5 transition-all duration-300">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                        <div>
                          <h3 className="text-xl md:text-2xl font-display font-semibold text-foreground">
                            {exp.role}
                          </h3>
                          <p className="text-highlight-secondary font-medium mt-1">{exp.company}</p>
                        </div>
                      </div>

                      {exp.description.length > 0 && (
                        <ul className="space-y-2.5 mb-6">
                          {exp.description.map((desc, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-foreground/70 leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-highlight-primary/60 mt-1.5 shrink-0" />
                              {desc}
                            </li>
                          ))}
                        </ul>
                      )}

                      {exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-background/80 border border-border rounded-lg text-xs text-foreground/70 hover:border-highlight-primary/40 hover:text-highlight-primary transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
