"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import Link from "next/link";
import { IBlog } from "@/models/Blog";

interface Props {
  blogs: IBlog[];
}

export function BlogSequence({ blogs }: Props) {
  if (!blogs || blogs.length === 0) return null;

  return (
    <section id="blog" className="py-32 bg-background relative border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-12 mb-16">
            <div>
              <p className="text-xs uppercase tracking-widest text-highlight-primary font-semibold mb-3">Writing</p>
              <h2 className="text-4xl md:text-6xl font-display font-semibold text-foreground">
                Latest{" "}
                <span className="bg-gradient-to-r from-highlight-primary to-highlight-secondary bg-clip-text text-transparent">
                  Thoughts
                </span>
              </h2>
            </div>
            <Link
              href="/blog"
              className="px-6 py-3 bg-card border border-border text-foreground text-sm font-semibold rounded-xl hover:bg-highlight-primary/10 hover:border-highlight-primary/30 hover:text-highlight-primary transition-colors whitespace-nowrap"
            >
              View all articles
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.slice(0, 3).map((blog, i) => (
            <FadeIn key={String(blog._id)} delay={i * 0.1}>
              <Link href={`/blog/${blog.slug}`} className="group block h-full">
                <article className="p-5 rounded-3xl border border-border bg-card/40 hover:bg-card hover:border-highlight-primary/30 transition-all duration-300 h-full flex flex-col shadow-sm hover:shadow-xl hover:shadow-highlight-primary/5">
                  {blog.coverImage ? (
                    <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden mb-5 relative border border-border/50">
                      <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ) : (
                    <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden mb-5 relative border border-border/50 bg-gradient-to-br from-highlight-primary/5 to-highlight-secondary/5 flex items-center justify-center">
                      <span className="text-4xl">📝</span>
                    </div>
                  )}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        {blog.tags?.map((tag: string) => (
                          <span key={tag} className="text-[10px] px-2 py-1 rounded-md bg-highlight-primary/10 text-highlight-primary font-medium tracking-wide uppercase border border-highlight-primary/20">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-highlight-primary transition-colors line-clamp-2 leading-snug">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-foreground/60 line-clamp-3 mb-6 leading-relaxed">
                        {blog.summary}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-foreground/40 mt-auto pt-4 border-t border-border/50">
                      <span>{new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                      <span className="flex items-center gap-1 group-hover:text-red-400 transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {blog.likes || 0}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
