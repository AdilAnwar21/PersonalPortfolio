import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Github, Linkedin, Instagram, Code2 } from "@/components/Icons";
import { Hero } from "@/components/sections/Hero";
import { ProjectsSequence } from "@/components/sections/ProjectsSequence";
import { ExperienceSequence } from "@/components/sections/ExperienceSequence";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { getSettings } from "@/app/actions/settings";
import { getProjects } from "@/app/actions/project";
import { getExperiences } from "@/app/actions/experience";
import { getTestimonials } from "@/app/actions/testimonial";
import { FadeIn } from "@/components/animations/FadeIn";
import { ISettings } from "@/models/Settings";
import { IProject } from "@/models/Project";
import { IExperience } from "@/models/Experience";
import { ITestimonial } from "@/models/Testimonial";

export const revalidate = 60;

export default async function Home() {
  const settings: ISettings = await getSettings();
  const projects: IProject[] = await getProjects();
  const experiences: IExperience[] = await getExperiences();
  const testimonials: ITestimonial[] = await getTestimonials();

  return (
    <main className="relative min-h-screen">
      <Navbar />
      
      <Hero 
        title={settings.heroTitle || "Creative Developer"}
        subtitle={settings.heroSubtitle || "Building Digital Experiences"}
        resumeUrl={settings.resumePdfUrl}
        profilePhotoUrl={settings.profilePhotoUrl}
        socialLinks={settings.socialLinks}
      />

      <section id="about" className="py-32 px-6 max-w-6xl mx-auto">
        <FadeIn>
          <h2 className="text-4xl md:text-6xl font-display font-medium mb-16 max-w-2xl text-foreground">
            Architecting <br/><span className="text-highlight-primary">Digital Reality.</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 glass rounded-3xl p-8 md:p-12 border flex flex-col justify-between group hover:border-highlight-primary/50 transition-colors">
              <h3 className="text-2xl font-display mb-6 text-foreground">The Synthesis of Art & Engineering.</h3>
              <div className="text-foreground/70 text-lg leading-relaxed space-y-4">
                {(settings.aboutText || "Passionate about building beautiful interfaces.").split('\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="glass rounded-3xl p-8 border flex flex-col justify-center items-center group hover:border-highlight-secondary/50 transition-colors">
                <span className="text-5xl font-display font-bold text-highlight-secondary mb-2">05+</span>
                <span className="text-sm text-foreground/60 uppercase tracking-widest text-center">Years of Expertise</span>
              </div>
              <div className="glass rounded-3xl p-8 border flex flex-col justify-center items-center group hover:border-highlight-primary/50 transition-colors">
                <span className="text-5xl font-display font-bold text-highlight-primary mb-2">40+</span>
                <span className="text-sm text-foreground/60 uppercase tracking-widest text-center">Projects Delivered</span>
              </div>
            </div>
            
            <div className="md:col-span-3 glass rounded-3xl p-8 border">
              <p className="text-sm text-foreground/50 uppercase tracking-widest mb-8">Technical Stack / Precision Instruments</p>
              <div className="flex flex-wrap gap-4">
                {(settings.skills?.length ? settings.skills : ['Next.js', 'React', 'Tailwind', 'Framer Motion', 'MongoDB', 'TypeScript', 'Node.js', 'Figma']).map(skill => (
                  <span key={skill} className="px-4 py-2 bg-card border flex items-center gap-2 rounded-lg text-sm text-foreground/80 hover:text-highlight-primary hover:border-highlight-primary transition-colors cursor-default">
                    <Code2 className="w-4 h-4 opacity-50" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <ProjectsSequence projects={projects} />
      <ExperienceSequence experiences={experiences} />
      <Testimonials testimonials={testimonials} />
      <Contact />

      <Footer />
    </main>
  );
}
