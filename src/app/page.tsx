import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Code2 } from "@/components/Icons";
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

  const skills = settings.skills?.length
    ? settings.skills
    : ["Next.js", "React", "TypeScript", "Node.js", "MongoDB", "Tailwind", "Framer Motion", "Figma"];

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

      {/* ── About ── */}
      <section id="about" className="py-32 px-6 relative overflow-hidden">
        {/* Subtle background blob */}
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-highlight-primary/3 rounded-full blur-[120px] -z-10" />

        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="mb-20">
              <p className="text-xs uppercase tracking-widest text-highlight-primary font-semibold mb-4">About Me</p>
              <h2 className="text-4xl md:text-6xl font-display font-semibold text-foreground leading-tight">
                Crafting Digital
                <br />
                <span className="bg-gradient-to-r from-highlight-primary to-highlight-secondary bg-clip-text text-transparent">
                  Excellence.
                </span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* About text — spans 2 cols */}
            <FadeIn delay={0.1}>
              <div className="lg:col-span-2 p-8 md:p-10 rounded-3xl border border-border bg-card/40 backdrop-blur-sm hover:border-highlight-primary/30 transition-colors group h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-highlight-primary/10 flex items-center justify-center">
                    <span className="text-highlight-primary text-sm">✦</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">The Story</h3>
                </div>
                <div className="text-foreground/65 text-base leading-relaxed space-y-4">
                  {(settings.aboutText || "Passionate about building beautiful, fast, and accessible digital experiences. I merge design thinking with engineering precision to craft products that users love.").split("\n").map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Stats column */}
            <div className="flex flex-col gap-4">
              <FadeIn delay={0.2}>
                <div className="p-7 rounded-3xl border border-border bg-card/40 backdrop-blur-sm hover:border-highlight-secondary/40 transition-colors flex flex-col items-center text-center group">
                  <span className="text-5xl font-display font-bold bg-gradient-to-br from-highlight-primary to-highlight-secondary bg-clip-text text-transparent mb-2">
                    05+
                  </span>
                  <span className="text-xs text-foreground/50 uppercase tracking-widest">Years of Expertise</span>
                </div>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="p-7 rounded-3xl border border-border bg-card/40 backdrop-blur-sm hover:border-highlight-primary/40 transition-colors flex flex-col items-center text-center">
                  <span className="text-5xl font-display font-bold bg-gradient-to-br from-highlight-secondary to-highlight-primary bg-clip-text text-transparent mb-2">
                    40+
                  </span>
                  <span className="text-xs text-foreground/50 uppercase tracking-widest">Projects Delivered</span>
                </div>
              </FadeIn>
            </div>

            {/* Skills — full width */}
            <FadeIn delay={0.15} fullWidth>
              <div className="lg:col-span-3 p-8 rounded-3xl border border-border bg-card/40 backdrop-blur-sm hover:border-highlight-primary/20 transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-highlight-primary/10 flex items-center justify-center">
                    <Code2 className="w-4 h-4 text-highlight-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Technical Stack</h3>
                  <span className="ml-auto text-xs text-foreground/30 uppercase tracking-wider">Precision Instruments</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, i) => (
                    <div
                      key={skill}
                      className="px-4 py-2 rounded-xl border border-border bg-background/60 text-sm text-foreground/70 hover:text-highlight-primary hover:border-highlight-primary/40 hover:bg-highlight-primary/5 transition-all duration-200 cursor-default flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-highlight-primary/40 group-hover:bg-highlight-primary transition-colors" />
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <ProjectsSequence projects={projects} />
      <ExperienceSequence experiences={experiences} />
      <Testimonials testimonials={testimonials} />
      <Contact />

      <Footer />
    </main>
  );
}
