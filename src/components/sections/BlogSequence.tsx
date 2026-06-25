"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IBlog } from "@/models/Blog";
import { TextReveal } from "@/components/animations/TextReveal";
import { MagneticButton } from "@/components/animations/MagneticButton";

interface Props {
  blogs: IBlog[];
}

export function BlogSequence({ blogs }: Props) {
  if (!blogs || blogs.length === 0) return null;

  return (
    <section id="blog" className="py-32 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
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
              Writing
            </motion.p>
            <div
              className="font-display font-semibold leading-[0.85] tracking-tight"
              style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
            >
              <TextReveal text="Latest" inView delay={0} stagger={0.03} />
              <TextReveal text="Thoughts." inView delay={0.2} stagger={0.022} />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:pb-3"
          >
            <Link
              href="/blog"
              className="flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] uppercase text-foreground hover:text-[var(--highlight-primary)] transition-colors duration-200"
            >
              <span>View all</span>
              <motion.span
                className="block h-px bg-current"
                initial={{ width: 16 }}
                whileHover={{ width: 32 }}
                transition={{ duration: 0.25 }}
              />
              <svg className="w-2.5 h-2.5 -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 7l-10 10M7 7h10v10" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Blog cards — editorial grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px border border-border/40 rounded-3xl overflow-hidden">
          {blogs.slice(0, 3).map((blog, i) => (
            <motion.div
              key={String(blog._id)}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/blog/${blog.slug}`} className="group block h-full">
                <article className="h-full flex flex-col border-r border-border/40 last:border-r-0 bg-card hover:bg-card/70 transition-colors duration-300">

                  {/* Cover image */}
                  <div className="aspect-[16/10] w-full overflow-hidden relative border-b border-border/40">
                    {blog.coverImage ? (
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ background: "color-mix(in srgb, var(--highlight-primary) 4%, var(--card))" }}
                      >
                        <span
                          className="font-display font-semibold text-5xl opacity-[0.06]"
                          style={{ color: "var(--highlight-primary)" }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                    )}
                    {/* Date — vertical rotated text on left edge */}
                    <div className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center">
                      <span
                        className="font-mono text-[9px] tracking-widest uppercase text-foreground/90 -rotate-90 whitespace-nowrap"
                      >
                        {new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    {/* Tags */}
                    {blog.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.slice(0, 2).map((tag: string) => (
                          <span
                            key={tag}
                            className="font-mono text-[9px] tracking-[0.18em] uppercase px-2 py-1 border rounded-full"
                            style={{
                              borderColor: "var(--highlight-primary)",
                              color: "var(--highlight-primary)",
                              opacity: 0.7,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h3
                      className="font-display font-semibold text-foreground mb-3 leading-snug group-hover:text-[var(--highlight-primary)] transition-colors duration-300 line-clamp-3"
                      style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)" }}
                    >
                      {blog.title}
                    </h3>

                    <p className="text-sm text-foreground/75 leading-relaxed line-clamp-3 flex-1">
                      {blog.summary}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/40">
                      <MagneticButton>
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background font-mono text-[10px] tracking-wider uppercase rounded-full hover:bg-[var(--highlight-primary)] hover:text-white transition-colors duration-300">
                          Read more
                          <svg className="w-3 h-3 -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 7l-10 10M7 7h10v10" />
                          </svg>
                        </span>
                      </MagneticButton>
                      <div className="flex items-center gap-1 font-mono text-[10px] text-foreground/90">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {blog.likes || 0}
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
