"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { submitEnquiry } from "@/app/actions/enquiry";
import { Mail, Globe2, Briefcase } from "lucide-react";

const inputCls =
  "w-full px-4 py-3.5 rounded-xl border border-border bg-card text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-highlight-primary/60 focus:ring-2 focus:ring-highlight-primary/10 transition-all duration-200";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);
    await submitEnquiry(formData);
    setStatus("success");
    e.currentTarget.reset();
    setTimeout(() => setStatus("idle"), 6000);
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <FadeIn>
          <div className="mb-12 text-center">
            <p className="text-xs uppercase tracking-widest text-highlight-primary font-semibold mb-3">
              Get In Touch
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-4">
              Let&apos;s Work Together
            </h2>
            <p className="text-foreground/50 text-base max-w-lg mx-auto leading-relaxed">
              Have a project in mind or want to collaborate? Send me a message and I&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </FadeIn>

        {/* Quick info strip */}
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10 pb-10 border-b border-border">
            {[
              { icon: <Mail className="w-4 h-4" />, text: "Reply within 24h" },
              { icon: <Globe2 className="w-4 h-4" />, text: "Available worldwide" },
              { icon: <Briefcase className="w-4 h-4" />, text: "Open to freelance" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-foreground/50">
                <span>{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Form card */}
        <FadeIn delay={0.15}>
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 rounded-2xl border border-border bg-card"
            >
              <div className="w-14 h-14 rounded-full bg-green-500/15 border border-green-500/20 flex items-center justify-center mx-auto mb-5">
                <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">Message Sent</h3>
              <p className="text-foreground/50 text-sm">Thanks for reaching out — I&apos;ll be in touch soon.</p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl border border-border bg-card space-y-5"
            >
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground/50 mb-2 uppercase tracking-wider">
                    Name <span className="text-highlight-secondary">*</span>
                  </label>
                  <input
                    name="name"
                    required
                    placeholder="John Doe"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground/50 mb-2 uppercase tracking-wider">
                    Email <span className="text-highlight-secondary">*</span>
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

              {/* Subject */}
              <div>
                <label className="block text-xs font-medium text-foreground/50 mb-2 uppercase tracking-wider">
                  Subject
                </label>
                <input
                  name="subject"
                  placeholder="Project inquiry, Collaboration, Just saying hi…"
                  className={inputCls}
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-medium text-foreground/50 mb-2 uppercase tracking-wider">
                  Message <span className="text-highlight-secondary">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell me a bit about your project or what you have in mind…"
                  className={`${inputCls} resize-none`}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === "submitting"}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-transparent border border-foreground text-foreground font-semibold text-sm hover:bg-foreground hover:text-background transition-colors duration-300 disabled:opacity-50"
              >
                {status === "submitting" ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
                      className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full"
                    />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Message
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </>
                )}
              </motion.button>
            </form>
          )}
        </FadeIn>

      </div>
    </section>
  );
}
