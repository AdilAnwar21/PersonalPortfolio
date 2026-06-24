"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ITestimonial } from "@/models/Testimonial";
import { FadeIn } from "@/components/animations/FadeIn";
import { submitTestimonial } from "@/app/actions/testimonial";

interface Props {
  testimonials: ITestimonial[];
}

export function Testimonials({ testimonials }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success">("idle");

  const approved = testimonials?.filter(t => t.status === "Approved") || [];

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
    <section id="testimonials" className="py-32 px-6 max-w-7xl mx-auto border-t border-border">
      <FadeIn>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <h2 className="text-3xl md:text-5xl font-display font-light">Testimonials</h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-card border border-border rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm font-medium"
          >
            Leave a Note
          </button>
        </div>
      </FadeIn>

      {approved.length === 0 ? (
        <FadeIn>
          <div className="py-24 text-center border border-border/50 rounded-3xl bg-card/20">
            <p className="text-foreground/50 italic">No testimonials yet.</p>
          </div>
        </FadeIn>
      ) : approved.length === 1 ? (
        <FadeIn>
          <div className="py-24 px-8 text-center border border-border/50 rounded-3xl bg-card/20 max-w-4xl mx-auto">
            <p className="text-2xl md:text-4xl font-display font-light leading-snug mb-8 text-foreground/80">
              "{approved[0].content}"
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="text-left">
                <p className="font-medium text-foreground">{approved[0].authorName}</p>
                <p className="text-sm text-foreground/50">{approved[0].authorTitle} @ {approved[0].company}</p>
              </div>
            </div>
          </div>
        </FadeIn>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {approved.map((test, i) => (
            <FadeIn key={String(test._id)} delay={i * 0.1}>
              <div className="p-8 border border-border/50 rounded-3xl bg-card/20 h-full flex flex-col justify-between">
                <p className="text-foreground/80 leading-relaxed mb-8">"{test.content}"</p>
                <div>
                  <p className="font-medium text-foreground">{test.authorName}</p>
                  <p className="text-sm text-foreground/50">{test.authorTitle} @ {test.company}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-lg bg-background border border-border rounded-3xl p-8 shadow-2xl relative text-foreground"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-foreground/50 hover:text-foreground"
              >
                ✕
              </button>
              
              {submitStatus === "success" ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">✓</div>
                  <h3 className="text-2xl font-display font-medium mb-2">Thank You!</h3>
                  <p className="text-foreground/70">Your testimonial has been submitted for review.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-display font-medium mb-8">Leave a Testimonial</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input name="authorName" placeholder="Your Name" required className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-highlight-primary/20" />
                      <input name="authorTitle" placeholder="Your Title" className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-highlight-primary/20" />
                    </div>
                    <input name="company" placeholder="Company" className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-highlight-primary/20" />
                    <textarea name="content" placeholder="Your Testimonial..." required rows={4} className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-highlight-primary/20 resize-none" />
                    <button 
                      type="submit" 
                      disabled={submitStatus === "submitting"}
                      className="w-full py-4 mt-4 bg-foreground text-background font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {submitStatus === "submitting" ? "Submitting..." : "Submit"}
                    </button>
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
