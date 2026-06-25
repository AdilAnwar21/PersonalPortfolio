"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { IProject } from "@/models/Project";
import { TextReveal } from "@/components/animations/TextReveal";
import { FolderOpen } from "lucide-react";

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
  const topOffset = `calc(5vh + ${i * 28}px)`;

  return (
    <div className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{ scale, top: topOffset }}
        className="relative flex flex-col md:flex-row w-[92vw] md:w-[80vw] max-w-6xl rounded-3xl overflow-hidden origin-top border border-border/60 bg-card"
        data-cursor-hover
      >
        {/* ── Left: Project info ── */}
        <div className="w-full md:w-[42%] p-8 md:p-12 flex flex-col justify-between relative z-10 overflow-hidden">

          {/* Huge outlined project number — background watermark */}
          <span
            className="absolute -top-4 -left-3 font-display font-bold leading-none pointer-events-none select-none z-0"
            style={{
              fontSize: "clamp(7rem, 15vw, 12rem)",
              WebkitTextStroke: "1px color-mix(in srgb, var(--foreground) 6%, transparent)",
              color: "transparent",
              lineHeight: 1,
            }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>

          {/* Top badges */}
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-7">
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-foreground/90">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="px-2.5 py-1 text-[10px] font-mono tracking-[0.1em] uppercase border"
                style={{
                  borderColor: "var(--highlight-primary)",
                  color: "var(--highlight-primary)",
                }}
              >
                {project.category}
              </span>
              {project.featured && (
                <span className="px-2.5 py-1 text-[10px] font-mono tracking-[0.1em] uppercase border border-foreground/20 text-foreground">
                  Featured
                </span>
              )}
            </div>

            <h3
              className="font-display font-semibold mb-4 text-foreground leading-tight"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
            >
              {project.title}
            </h3>

            <p className="text-foreground text-sm leading-relaxed mb-6 line-clamp-4">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 5).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 border border-border text-[10px] font-mono tracking-wider uppercase text-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="relative z-10 flex flex-wrap items-center gap-5 mt-8 pt-8 border-t border-border/50">
            <a
              href={`/projects/${project.slug}`}
              className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.15em] uppercase text-foreground hover:text-[var(--highlight-primary)] transition-colors duration-200 group"
            >
              <span>Case Study</span>
              <motion.span
                className="block h-px bg-current"
                initial={{ width: 16 }}
                whileHover={{ width: 32 }}
                transition={{ duration: 0.25 }}
              />
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.15em] uppercase text-foreground hover:text-[var(--highlight-primary)] transition-colors duration-200"
              >
                Live Site
                <svg className="w-2.5 h-2.5 -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 7l-10 10M7 7h10v10" />
                </svg>
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.15em] uppercase text-foreground/90 hover:text-foreground transition-colors duration-200"
              >
                GitHub
                <svg className="w-2.5 h-2.5 -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 7l-10 10M7 7h10v10" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* ── Right: Image ── */}
        <div className="w-full md:w-[58%] relative overflow-hidden min-h-[260px] md:min-h-0">
          {project.mainImage ? (
            <>
              <img
                src={project.mainImage}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Left edge fade into card bg */}
              <div
                className="absolute inset-y-0 left-0 w-24 pointer-events-none"
                style={{
                  background: "linear-gradient(to right, var(--card) 0%, transparent 100%)",
                }}
              />
              {/* Hot-pink tint overlay on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: "var(--highlight-primary)" }}
              />
            </>
          ) : (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-3"
              style={{ background: "color-mix(in srgb, var(--highlight-primary) 4%, var(--card))" }}
            >
              <FolderOpen
                className="w-10 h-10"
                style={{ color: "var(--highlight-primary)", opacity: 0.25 }}
              />
              <p className="font-mono text-[10px] tracking-widest uppercase text-foreground/80">
                No image
              </p>
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
    <section id="projects" className="relative py-32 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 mb-20">
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
          Portfolio
        </motion.p>

        <div
          className="font-display font-semibold leading-[0.85] tracking-tight"
          style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
        >
          <TextReveal text="Selected" inView delay={0} stagger={0.02} />
          <TextReveal text="Work." inView delay={0.2} stagger={0.03} />
        </div>
      </div>

      <div ref={containerRef} className="relative mt-[5vh] pb-[10vh]">
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - i) * 0.03;
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
      <section id="projects" className="py-32 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div
            className="font-display font-semibold leading-[0.85] tracking-tight mb-20"
            style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
          >
            Selected Work.
          </div>
          <div className="py-24 text-center border border-dashed border-border/50">
            <FolderOpen
              className="w-10 h-10 mx-auto mb-4"
              style={{ color: "var(--highlight-primary)", opacity: 0.25 }}
            />
            <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-foreground/90">
              No projects yet — add some in the Admin Panel
            </p>
          </div>
        </div>
      </section>
    );
  }

  return <ProjectsSequenceInner projects={projects} />;
}
