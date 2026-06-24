"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { IProject } from "@/models/Project";
import { FadeIn } from "@/components/animations/FadeIn";

interface Props {
  projects: IProject[];
}

const Card = ({
  project,
  i,
  progress,
  range,
  targetScale,
}: {
  project: IProject;
  i: number;
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
}) => {
  const scale = useTransform(progress, range, [1, targetScale]);
  const topOffset = `calc(6vh + ${i * 30}px)`;

  return (
    <div className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{ scale, top: topOffset }}
        className="relative flex flex-col md:flex-row w-[92vw] md:w-[78vw] max-w-6xl h-[72vh] md:h-[62vh] rounded-3xl overflow-hidden shadow-2xl shadow-black/40 origin-top border border-border/60"
      >
        {/* Left: info */}
        <div className="w-full md:w-[45%] p-8 md:p-12 flex flex-col justify-between bg-card/80 backdrop-blur-xl">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs text-foreground/30 font-mono font-medium">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  project.category === "Freelance"
                    ? "bg-highlight-primary/10 text-highlight-primary border border-highlight-primary/20"
                    : "bg-highlight-secondary/10 text-highlight-secondary border border-highlight-secondary/20"
                }`}
              >
                {project.category}
              </span>
              {project.featured && (
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                  Featured
                </span>
              )}
            </div>

            <h3 className="text-3xl md:text-4xl font-display font-semibold mb-4 text-foreground leading-tight">
              {project.title}
            </h3>
            <p className="text-foreground/60 leading-relaxed text-sm mb-6">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-background/60 border border-border rounded-lg text-xs text-foreground/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-5 mt-6 pt-6 border-t border-border/50">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-semibold text-highlight-primary hover:text-highlight-primary/80 transition-colors group"
              >
                Live Site
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-foreground/50 hover:text-foreground transition-colors group"
              >
                GitHub
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Right: image */}
        <div className="w-full md:w-[55%] relative overflow-hidden">
          {project.mainImage ? (
            <>
              <img
                src={project.mainImage}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay on left edge */}
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-card/80 to-transparent" />
              {/* Dark overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-highlight-primary/10 to-highlight-secondary/5 flex flex-col items-center justify-center gap-4">
              {/* Decorative circles */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 border border-highlight-primary/20 rounded-full absolute"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 border border-highlight-secondary/20 rounded-full absolute"
              />
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-highlight-primary to-highlight-secondary flex items-center justify-center shadow-xl">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="relative text-xs text-foreground/30">No image uploaded</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

function ProjectsSequenceInner({ projects }: { projects: IProject[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="projects" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-highlight-primary font-semibold mb-3">Portfolio</p>
              <h2 className="text-4xl md:text-6xl font-display font-semibold text-foreground">
                Selected{" "}
                <span className="bg-gradient-to-r from-highlight-primary to-highlight-secondary bg-clip-text text-transparent">
                  Work
                </span>
              </h2>
            </div>
            <p className="text-foreground/50 max-w-xs text-sm leading-relaxed">
              A curated collection of projects built with care, precision and creativity.
            </p>
          </div>
        </FadeIn>
      </div>

      <div ref={containerRef} className="relative mt-[5vh] pb-[10vh]">
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - i) * 0.04;
          return (
            <Card
              key={String(project._id)}
              i={i}
              project={project}
              progress={scrollYProgress}
              range={[i * (1 / projects.length), 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}

export function ProjectsSequence({ projects }: Props) {
  if (!projects || projects.length === 0) {
    return (
      <section id="projects" className="py-32 px-6 max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-12 mb-20">
            <div>
              <p className="text-xs uppercase tracking-widest text-highlight-primary font-semibold mb-3">Portfolio</p>
              <h2 className="text-4xl md:text-6xl font-display font-semibold text-foreground">
                Selected Work
              </h2>
            </div>
          </div>
          <div className="py-24 text-center rounded-3xl border border-dashed border-border/60 bg-card/20">
            <div className="w-16 h-16 rounded-2xl bg-highlight-primary/10 flex items-center justify-center mx-auto mb-4 text-2xl">📁</div>
            <p className="text-foreground/40 italic">No projects added yet. Add some in the Admin Panel.</p>
          </div>
        </FadeIn>
      </section>
    );
  }

  return <ProjectsSequenceInner projects={projects} />;
}
