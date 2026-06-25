"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { submitEnquiry } from "@/app/actions/enquiry";
import { TextReveal } from "@/components/animations/TextReveal";
import { MagneticButton } from "@/components/animations/MagneticButton";

const inputCls =
  "w-full px-0 py-3.5 border-0 border-b border-border bg-transparent text-foreground text-sm placeholder:text-foreground/40 focus:outline-none focus:border-[var(--highlight-primary)] transition-colors duration-200 font-mono tracking-wide";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);
    await submitEnquiry(formData);
    setStatus("success");
    e.currentTarget.reset();
    setTimeout(() => setStatus("idle"), 7000);
  };

  return (
    <section id="contact" className="relative py-32 border-t border-border/40 overflow-hidden">

      {/* Pink bloom bg */}
      <div
        className="absolute bottom-0 right-0 w-[40vw] h-[40vw] pointer-events-none -z-10"
        style={{
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--highlight-primary) 0%, transparent 70%)",
          opacity: 0.03,
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">

        {/* Giant heading — full-width editorial */}
        <div className="mb-20">
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
            Get In Touch
          </motion.p>

          <div
            className="font-display font-semibold leading-[0.82] tracking-[-0.02em]"
            style={{ fontSize: "clamp(4rem, 10vw, 9rem)" }}
          >
            <TextReveal text="Let's" inView delay={0} stagger={0.04} />
            <TextReveal text="Talk." inView delay={0.2} stagger={0.04} />
          </div>

          {/* Meta strip below the giant heading */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center gap-8 mt-8 font-mono text-[11px] tracking-[0.15em] uppercase text-foreground/60"
          >
            <span className="flex items-center gap-2">
              <span
                className="w-1 h-1 rounded-full"
                style={{ backgroundColor: "var(--highlight-primary)" }}
              />
              Reply within 24h
            </span>
            <span className="flex items-center gap-2">
              <span
                className="w-1 h-1 rounded-full"
                style={{ backgroundColor: "var(--highlight-primary)" }}
              />
              Available worldwide
            </span>
            <span className="flex items-center gap-2">
              <span
                className="w-1 h-1 rounded-full"
                style={{ backgroundColor: "var(--highlight-primary)" }}
              />
              Open to freelance
            </span>
          </motion.div>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-20 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                className="w-14 h-14 border-2 flex items-center justify-center mx-auto mb-6"
                style={{ borderColor: "var(--highlight-primary)", color: "var(--highlight-primary)" }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h3 className="font-display font-semibold text-2xl text-foreground mb-2">
                Message Sent
              </h3>
              <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-foreground/70">
                I&apos;ll be in touch soon
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Row: name + email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="block font-mono text-[10px] tracking-[0.18em] uppercase text-foreground/60 mb-2">
                    Name{" "}
                    <span style={{ color: "var(--highlight-primary)" }}>*</span>
                  </label>
                  <input name="name" required placeholder="John Doe" className={inputCls} />
                </div>
                <div>
                  <label className="block font-mono text-[10px] tracking-[0.18em] uppercase text-foreground/60 mb-2">
                    Email{" "}
                    <span style={{ color: "var(--highlight-primary)" }}>*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] tracking-[0.18em] uppercase text-foreground/60 mb-2">
                  Subject
                </label>
                <input
                  name="subject"
                  placeholder="Project inquiry, Collaboration…"
                  className={inputCls}
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] tracking-[0.18em] uppercase text-foreground/60 mb-2">
                  Message{" "}
                  <span style={{ color: "var(--highlight-primary)" }}>*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell me about your project…"
                  className={`${inputCls} resize-none`}
                />
              </div>

              <MagneticButton strength={0.15}>
                <motion.button
                  type="submit"
                  disabled={status === "submitting"}
                  whileHover={{ backgroundColor: "var(--highlight-primary)", color: "#ffffff", borderColor: "var(--highlight-primary)" }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 py-4 px-10 border font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 disabled:opacity-40"
                  style={{ borderColor: "var(--foreground)", color: "var(--foreground)" }}
                >
                  {status === "submitting" ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
                        className="w-3 h-3 border border-current border-t-transparent rounded-full"
                      />
                      Sending
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-3 h-3 -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 7l-10 10M7 7h10v10" />
                      </svg>
                    </>
                  )}
                </motion.button>
              </MagneticButton>

            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
