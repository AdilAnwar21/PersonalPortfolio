import { getProjects } from "@/app/actions/project";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { notFound } from "next/navigation";
import { Globe2 } from "lucide-react";
import { Github } from "@/components/Icons";

export const revalidate = 60;

export default async function ProjectPreview({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projects = await getProjects();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const project = projects.find((p: any) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Navbar />
      
      <article className="pt-40 pb-24 px-6 max-w-5xl mx-auto">
        <FadeIn>
          <header className="mb-12">
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <span className={`text-xs px-3 py-1.5 rounded-md font-medium tracking-wide uppercase border ${project.category === "Freelance" ? "bg-highlight-primary/10 text-highlight-primary border-highlight-primary/20" : "bg-highlight-secondary/10 text-highlight-secondary border-highlight-secondary/20"}`}>
                {project.category}
              </span>
              {project.tags?.map((tag: string) => (
                <span key={tag} className="text-xs px-3 py-1.5 rounded-md bg-card text-foreground font-medium tracking-wide uppercase border border-border">
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-semibold mb-6 leading-tight">
              {project.title}
            </h1>
            
            <p className="text-xl text-foreground max-w-3xl leading-relaxed mb-8">
              {project.description}
            </p>
            
            <div className="flex items-center gap-4 flex-wrap">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-foreground text-background font-semibold rounded-xl hover:opacity-90 transition-opacity">
                  <Globe2 className="w-5 h-5" />
                  Live Preview
                </a>
              )}
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-card border border-border text-foreground font-semibold rounded-xl hover:bg-highlight-primary/10 hover:text-highlight-primary hover:border-highlight-primary/30 transition-all">
                  <Github className="w-5 h-5" />
                  Source Code
                </a>
              )}
            </div>
          </header>

          {project.mainImage && (
            <div className="aspect-[16/9] md:aspect-[21/9] w-full rounded-3xl overflow-hidden mb-16 border border-border shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent z-10 pointer-events-none" />
              <img src={project.mainImage} alt={project.title} className="w-full h-full object-cover" />
            </div>
          )}

          {project.galleryImages && project.galleryImages.length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl font-semibold mb-8">Project Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.galleryImages.map((img: string, i: number) => (
                  <div key={i} className="aspect-[4/3] w-full rounded-2xl overflow-hidden border border-border bg-card group">
                    <img src={img} alt={`${project.title} gallery ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </FadeIn>
      </article>

      <Footer />
    </main>
  );
}
