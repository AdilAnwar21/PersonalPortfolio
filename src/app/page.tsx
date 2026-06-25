import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { ProjectsSequence } from "@/components/sections/ProjectsSequence";
import { ExperienceSequence } from "@/components/sections/ExperienceSequence";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { BlogSequence } from "@/components/sections/BlogSequence";
import { AboutSection } from "@/components/sections/AboutSection";
import { getSettings } from "@/app/actions/settings";
import { getProjects } from "@/app/actions/project";
import { getExperiences } from "@/app/actions/experience";
import { getTestimonials } from "@/app/actions/testimonial";
import { getBlogs } from "@/app/actions/blog";
import { ISettings } from "@/models/Settings";
import { IProject } from "@/models/Project";
import { IExperience } from "@/models/Experience";
import { ITestimonial } from "@/models/Testimonial";
import { IBlog } from "@/models/Blog";

export const revalidate = 60;

export default async function Home() {
  const settings: ISettings = await getSettings();
  const projects: IProject[] = await getProjects();
  const experiences: IExperience[] = await getExperiences();
  const testimonials: ITestimonial[] = await getTestimonials();
  const blogs: IBlog[] = await getBlogs();

  const skills = settings.skills?.length
    ? settings.skills
    : [
        "Next.js", "React", "TypeScript", "Node.js", "MongoDB",
        "Tailwind", "Framer Motion", "Figma", "Python", "AWS",
        "Docker", "GraphQL",
      ];

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />

      <Hero
        title={settings.heroTitle || "Creative Developer"}
        subtitle={settings.heroSubtitle || "Software Engineer"}
        resumeUrl={settings.resumePdfUrl}
        profilePhotoUrl={settings.profilePhotoUrl}
        socialLinks={settings.socialLinks}
        skills={skills}
        availableForWork={settings.availableForWork ?? true}
      />

      <AboutSection
        aboutText={settings.aboutText}
        skills={skills}
      />

      <ProjectsSequence projects={projects} />
      <ExperienceSequence experiences={experiences} />
      <Testimonials testimonials={testimonials} />
      <BlogSequence blogs={blogs} />
      <Contact />

      <Footer />
    </main>
  );
}
