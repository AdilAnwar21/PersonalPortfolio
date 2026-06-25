"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ITestimonial } from "@/models/Testimonial";
import { TextReveal } from "@/components/animations/TextReveal";
import { submitTestimonial } from "@/app/actions/testimonial";
import { MessageSquareQuote, Check, X } from "lucide-react";

interface Props {
  testimonials: ITestimonial[];
}

const inputCls =
  "w-full px-4 py-3 bg-background border border-border text-foreground text-sm placeholder:text-foreground/50 focus:outline-none focus:border-[var(--highlight-primary)] transition-all duration-200 font-mono tracking-wide";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className="text-[10px]"
          style={{ color: star <= rating ? "var(--highlight-primary)" : "var(--border)" }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export function Testimonials({ testimonials }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success">("idle");
  const dragRef = useRef<HTMLDivElement>(null);

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
    <section id="testimonials" className="relative py-32 border-t border-border/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">

        {/* Header */}
        <div className="flex items-end justify-between mb-16">
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
              Social Proof
            </motion.p>
            <div
              className="font-display font-semibold leading-[0.85] tracking-tight"
              style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
            >
              <TextReveal text="What People" inView delay={0} stagger={0.02} />
              <TextReveal text="Say." inView delay={0.2} stagger={0.03} />
            </div>
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            onClick={() => setIsModalOpen(true)}
            className="hidden md:flex items-center gap-3 self-end mb-3 font-mono text-[11px] tracking-[0.18em] uppercase text-foreground hover:text-[var(--highlight-primary)] transition-colors duration-200 group"
            data-cursor-hover
          >
            <span>Leave a review</span>
            <span
              className="block h-px bg-current transition-all duration-300"
              style={{ width: 16 }}
            />
          </motion.button>
        </div>

        {/* Content */}
        {approved.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="py-24 text-center border border-dashed border-border/40"
          >
            <MessageSquareQuote
              className="w-10 h-10 mx-auto mb-4"
              style={{ color: "var(--highlight-primary)", opacity: 0.2 }}
            />
            <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-foreground/80">
              No testimonials yet — be the first
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-6 font-mono text-[11px] tracking-[0.18em] uppercase text-foreground hover:text-[var(--highlight-primary)] transition-colors duration-200 border-b border-current pb-0.5"
            >
              Leave a review
            </button>
          </motion.div>
        ) : approved.length === 1 ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="py-16 px-8 md:px-20 text-center border border-border/50 rounded-3xl max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <StarRating rating={approved[0].rating || 5} />
            </div>
            <p
              className="font-display font-light leading-relaxed mb-8 text-foreground"
              style={{ fontSize: "clamp(1.3rem, 3vw, 2.5rem)" }}
            >
              &ldquo;{approved[0].content}&rdquo;
            </p>
            <div className="flex items-center justify-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs font-mono"
                style={{ backgroundColor: "var(--highlight-primary)" }}
              >
                {approved[0].authorName[0]}
              </div>
              <div className="text-left">
                <p className="font-mono text-xs tracking-wider text-foreground">{approved[0].authorName}</p>
                <p className="font-mono text-[10px] text-foreground/90 tracking-wide">
                  {approved[0].authorTitle} @ {approved[0].company}
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Horizontal drag carousel */
          <div className="relative overflow-hidden">
            <motion.div
              ref={dragRef}
              className="flex gap-4 cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{
                right: 0,
                left: -(Math.max(0, approved.length - 2) * 380),
              }}
              dragElastic={0.08}
              whileTap={{ cursor: "grabbing" }}
            >
              {approved.map((test, i) => (
                <motion.div
                  key={String(test._id)}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="shrink-0 w-[340px] md:w-[370px] p-8 border border-border/60 rounded-3xl bg-card hover:border-[var(--highlight-primary)]/30 transition-colors duration-300 flex flex-col justify-between select-none"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <StarRating rating={test.rating || 5} />
                      <span
                        className="font-serif text-5xl leading-none opacity-[0.06]"
                        style={{ color: "var(--highlight-primary)" }}
                      >
                        &ldquo;
                      </span>
                    </div>
                    <p className="text-foreground text-sm leading-relaxed">
                      &ldquo;{test.content}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-6 mt-6 border-t border-border/40">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs font-mono shrink-0"
                      style={{ backgroundColor: "var(--highlight-primary)" }}
                    >
                      {test.authorName[0]}
                    </div>
                    <div>
                      <p className="font-mono text-xs tracking-wider text-foreground">
                        {test.authorName}
                      </p>
                      <p className="font-mono text-[10px] text-foreground/90 tracking-wide">
                        {test.authorTitle}
                        {test.company ? ` @ ${test.company}` : ""}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Drag hint */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="font-mono text-[10px] tracking-[0.15em] uppercase text-foreground/80 mt-6 text-right"
            >
              ← drag to explore →
            </motion.p>
          </div>
        )}

        {/* Mobile leave review button */}
        <div className="mt-10 md:hidden">
          <button
            onClick={() => setIsModalOpen(true)}
            className="font-mono text-[11px] tracking-[0.18em] uppercase text-foreground hover:text-[var(--highlight-primary)] transition-colors border-b border-current pb-0.5"
          >
            Leave a review
          </button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
            onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              className="w-full max-w-lg bg-background border border-border rounded-3xl p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 w-7 h-7 flex items-center justify-center border border-border text-foreground/70 hover:border-[var(--highlight-primary)] hover:text-[var(--highlight-primary)] transition-all"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {submitStatus === "success" ? (
                <div className="text-center py-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-14 h-14 border-2 flex items-center justify-center mx-auto mb-5"
                    style={{ borderColor: "var(--highlight-primary)", color: "var(--highlight-primary)" }}
                  >
                    <Check className="w-6 h-6" strokeWidth={3} />
                  </motion.div>
                  <h3 className="font-display font-semibold text-2xl text-foreground mb-2">
                    Thank You!
                  </h3>
                  <p className="font-mono text-[11px] tracking-wider text-foreground uppercase">
                    Submitted for review
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-7">
                    <h3 className="font-display font-semibold text-2xl text-foreground mb-1">
                      Leave a Review
                    </h3>
                    <p className="font-mono text-[11px] tracking-wider text-foreground/90 uppercase">
                      Reviewed before publishing
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-foreground/90 mb-2">
                          Name *
                        </label>
                        <input name="authorName" placeholder="Jane Smith" required className={inputCls} />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-foreground/90 mb-2">
                          Title
                        </label>
                        <input name="authorTitle" placeholder="CEO, Designer…" className={inputCls} />
                      </div>
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-foreground/90 mb-2">
                        Company
                      </label>
                      <input name="company" placeholder="Acme Inc." className={inputCls} />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-foreground/90 mb-2">
                        Testimonial *
                      </label>
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
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full py-3.5 border font-mono text-[11px] tracking-[0.18em] uppercase transition-all duration-200 disabled:opacity-40"
                      style={{
                        borderColor: "var(--highlight-primary)",
                        color: "var(--highlight-primary)",
                      }}
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
