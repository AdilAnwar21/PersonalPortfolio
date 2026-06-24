"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { IProject } from "@/models/Project";

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
  const containerRef = useRef(null);

  const scale = useTransform(progress, range, [1, targetScale]);
  // Use a slight top margin push for stacked cards
  const topPush = `calc(5vh + ${i * 25}px)`;

  return (
    <div ref={containerRef} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{
          scale,
          top: topPush,
        }}
        className="relative flex flex-col md:flex-row w-[90vw] md:w-[70vw] max-w-6xl h-[70vh] md:h-[60vh] bg-card border border-border rounded-3xl overflow-hidden shadow-2xl shadow-black/50 origin-top"
      >
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs uppercase tracking-widest text-foreground/50 font-medium">0{i + 1}</span>
              <span className={`px-2 py-1 rounded text-xs ${project.category === 'Freelance' ? 'bg-highlight-primary/10 text-highlight-primary' : 'bg-highlight-secondary/10 text-highlight-secondary'}`}>
                {project.category}
              </span>
            </div>
            <h3 className="text-4xl md:text-5xl font-display font-light mb-4">{project.title}</h3>
            <p className="text-foreground/70 leading-relaxed mb-6">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-background border border-border rounded-full text-xs text-foreground/80">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex gap-4 mt-8">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-highlight-primary transition-colors">
                Live Site ↗
              </a>
            )}
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-highlight-primary transition-colors">
                GitHub ↗
              </a>
            )}
          </div>
        </div>
        
        <div className="w-full md:w-1/2 h-full relative border-l border-border">
          {project.mainImage ? (
            <img 
              src={project.mainImage} 
              alt={project.title} 
              className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
            />
          ) : (
            <div className="absolute inset-0 bg-background flex items-center justify-center">
              <span className="text-foreground/20 font-display text-4xl">Image Placeholder</span>
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
    offset: ["start start", "end end"]
  });

  return (
    <section id="projects" className="relative border-t border-border pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h2 className="text-3xl md:text-5xl font-display font-light text-center">Selected Work</h2>
      </div>
      
      <div ref={containerRef} className="relative mt-[5vh] pb-[10vh]">
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - i) * 0.05;
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
      <div className="py-32 px-6 max-w-7xl mx-auto min-h-[50vh] flex flex-col items-center justify-center border-t border-border">
        <h2 className="text-3xl md:text-5xl font-display font-light mb-8 text-center">Selected Work</h2>
        <p className="text-foreground/50 italic text-center">No projects available yet.</p>
      </div>
    );
  }

  return <ProjectsSequenceInner projects={projects} />;
}
