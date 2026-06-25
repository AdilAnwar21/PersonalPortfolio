import { getBlogBySlug } from "@/app/actions/blog";
import { getApprovedComments } from "@/app/actions/comment";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { BlogInteractions } from "@/components/blog/BlogInteractions";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

export const revalidate = 60;

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog || !blog.published) {
    notFound();
  }

  const comments = await getApprovedComments(blog._id.toString());

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Navbar />
      
      <article className="pt-40 pb-24 px-6 max-w-3xl mx-auto">
        <FadeIn>
          <header className="mb-12 text-center md:text-left">
            <div className="flex items-center gap-2 mb-6 justify-center md:justify-start flex-wrap">
              {blog.tags?.map((tag: string) => (
                <span key={tag} className="text-xs px-3 py-1.5 rounded-md bg-highlight-primary/10 text-highlight-primary font-medium tracking-wide uppercase border border-highlight-primary/20">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-6 leading-tight">
              {blog.title}
            </h1>
            <div className="flex items-center gap-4 justify-center md:justify-start text-sm text-foreground/80 mb-10">
              <span>{new Date(blog.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {Math.max(1, Math.ceil(blog.content.length / 1000))} min read
              </span>
            </div>

            {blog.coverImage && (
              <div className="aspect-[21/9] w-full rounded-3xl overflow-hidden mb-12 border border-border shadow-2xl">
                <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
              </div>
            )}
          </header>

          <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-semibold prose-a:text-highlight-primary hover:prose-a:text-highlight-secondary prose-img:rounded-2xl prose-img:border prose-img:border-border prose-pre:bg-card prose-pre:border prose-pre:border-border">
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </div>

          <BlogInteractions 
            blogId={blog._id.toString()} 
            initialLikes={blog.likes || 0} 
            comments={comments} 
          />
        </FadeIn>
      </article>

      <Footer />
    </main>
  );
}
