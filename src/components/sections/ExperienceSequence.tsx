"use client";

import { IExperience } from "@/models/Experience";
import { FadeIn } from "@/components/animations/FadeIn";

interface Props {
  experiences: IExperience[];
}

export function ExperienceSequence({ experiences }: Props) {
  if (!experiences || experiences.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="py-32 px-6 max-w-4xl mx-auto border-t border-border">
      <FadeIn>
        <h2 className="text-3xl md:text-5xl font-display font-light mb-16 text-center">Experience</h2>
      </FadeIn>

      <div className="relative border-l border-border ml-4 md:ml-0 space-y-12">
        {experiences.map((exp, index) => (
          <FadeIn key={String(exp._id)} delay={0.1}>
            <div className="relative pl-8 md:pl-12">
              {/* Glowing dot on timeline */}
              <div className="absolute w-3 h-3 bg-highlight-primary rounded-full -left-[6.5px] top-2 shadow-[0_0_10px_var(--color-highlight-primary)]" />
              
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-4">
                <h3 className="text-2xl font-display font-medium text-foreground">{exp.role}</h3>
                <span className="text-highlight-secondary">@ {exp.company}</span>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-foreground/50 mb-6 font-mono">
                <span>{new Date(exp.startDate).getFullYear()} - {exp.current ? "Present" : exp.endDate && new Date(exp.endDate).getFullYear()}</span>
                {exp.location && <span>• {exp.location}</span>}
              </div>

              <ul className="space-y-3 mb-6">
                {exp.description.map((desc, i) => (
                  <li key={i} className="text-foreground/70 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-foreground/30 before:rounded-full">
                    {desc}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-card/50 border border-border rounded-full text-xs text-foreground/80">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
