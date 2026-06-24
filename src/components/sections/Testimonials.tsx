"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ITestimonial } from "@/models/Testimonial";
import { FadeIn } from "@/components/animations/FadeIn";
import { submitTestimonial } from "@/app/actions/testimonial";

interface Props {
  testimonials: ITestimonial[];
}

const inputCls = "w-full px-4 py-3 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-highlight-primary/30 focus:border-highlight-primary/50 text-foreground placeholder:text-foreground/30 transition-all text-sm";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${star <= rating ? "text-yellow-400" : "text-foreground/20"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials({ testimonials }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success">("idle");

  const approved = testimonials?.filter((t) => t.status === "Approved") || [];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus("submitting");
    const formData = new FormData(e.currentTarget);
    await submitTestimonial(formData);
    setSubmitStatus("success");
    setTimeout(() => {
      setIsModalOpen(false);
      setSubmitStatus("idle");
    }, 3000);
  };

  return (
    <section id="testimonials" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-highlight-primary/4 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-12 mb-16">
            <div>
              <p className="text-xs uppercase tracking-widest text-highlight-primary font-semibold mb-3">Social Proof</p>
              <h2 className="text-4xl md:text-6xl font-display font-semibold text-foreground">
                What People{" "}
                <span className="bg-gradient-to-r from-highlight-primary to-highlight-secondary bg-clip-text text-transparent">
                  Say
                </span>
              </h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-transparent border border-foreground text-foreground rounded-xl text-sm font-semibold hover:bg-foreground hover:text-background transition-colors duration-300 self-start md:self-auto"
            >
              + Leave a Review
            </motion.button>
          </div>
        </FadeIn>

        {approved.length === 0 ? (
          <FadeIn>
            <div className="py-24 text-center rounded-3xl border border-dashed border-border/60 bg-card/20">
              <div className="text-4xl mb-4">💬</div>
              <p className="text-foreground/40 italic">No testimonials yet. Be the first to leave a review!</p>
            </div>
          </FadeIn>
        ) : approved.length === 1 ? (
          <FadeIn>
            <div className="py-16 px-8 md:px-16 text-center rounded-3xl border border-border bg-card/30 backdrop-blur-sm max-w-4xl mx-auto">
              <div className="flex justify-center mb-6">
                <StarRating rating={approved[0].rating || 5} />
              </div>
              <p className="text-2xl md:text-4xl font-display font-light leading-relaxed mb-8 text-foreground/80">
                &ldquo;{approved[0].content}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-highlight-primary to-highlight-secondary flex items-center justify-center text-white font-bold text-sm">
                  {approved[0].authorName[0]}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">{approved[0].authorName}</p>
                  <p className="text-xs text-foreground/50">{approved[0].authorTitle} @ {approved[0].company}</p>
                </div>
              </div>
            </div>
          </FadeIn>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {approved.map((test, i) => (
              <FadeIn key={String(test._id)} delay={i * 0.08}>
                <div className="p-7 rounded-3xl border border-border bg-card/40 backdrop-blur-sm hover:border-highlight-primary/30 hover:shadow-xl hover:shadow-highlight-primary/5 transition-all duration-300 h-full flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <StarRating rating={test.rating || 5} />
                      <span className="text-4xl opacity-10 font-serif group-hover:opacity-20 transition-opacity">&ldquo;</span>
                    </div>
                    <p className="text-foreground/75 leading-relaxed text-sm mb-6">
                      &ldquo;{test.content}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-5 border-t border-border/50">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-highlight-primary/80 to-highlight-secondary/80 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {test.authorName[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{test.authorName}</p>
                      <p className="text-xs text-foreground/40">{test.authorTitle}{test.company ? ` @ ${test.company}` : ""}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 24, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              className="w-full max-w-lg bg-background border border-border rounded-3xl p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-card border border-border text-foreground/50 hover:text-foreground hover:border-foreground/30 transition-all text-sm"
              >
                ✕
              </button>

              {submitStatus === "success" ? (
                <div className="text-center py-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-5 text-3xl"
                  >
                    ✓
                  </motion.div>
                  <h3 className="text-2xl font-display font-semibold text-foreground mb-2">Thank You!</h3>
                  <p className="text-foreground/60 text-sm">Your testimonial has been submitted for review.</p>
                </div>
              ) : (
                <>
                  <div className="mb-7">
                    <h3 className="text-2xl font-display font-semibold text-foreground mb-1">Leave a Review</h3>
                    <p className="text-sm text-foreground/50">Your feedback will be reviewed before publishing.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-foreground/40 mb-1.5 uppercase tracking-wide">Name *</label>
                        <input name="authorName" placeholder="Jane Smith" required className={inputCls} />
                      </div>
                      <div>
                        <label className="block text-xs text-foreground/40 mb-1.5 uppercase tracking-wide">Title</label>
                        <input name="authorTitle" placeholder="CEO, Designer…" className={inputCls} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-foreground/40 mb-1.5 uppercase tracking-wide">Company</label>
                      <input name="company" placeholder="Acme Inc." className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-xs text-foreground/40 mb-1.5 uppercase tracking-wide">Testimonial *</label>
                      <textarea
                        name="content"
                        placeholder="Working with you was amazing…"
                        required
                        rows={4}
                        className={`${inputCls} resize-none`}
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={submitStatus === "submitting"}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3.5 bg-transparent border border-foreground text-foreground font-semibold rounded-xl hover:bg-foreground hover:text-background transition-colors duration-300 disabled:opacity-50"
                    >
                      {submitStatus === "submitting" ? "Submitting…" : "Submit Review"}
                    </motion.button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
