"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { submitEnquiry } from "@/app/actions/enquiry";

const inputCls = "w-full px-4 py-3.5 bg-card/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-highlight-primary/30 focus:border-highlight-primary/50 text-foreground placeholder:text-foreground/30 transition-all duration-200 text-sm backdrop-blur-sm";

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
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-highlight-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-highlight-primary font-semibold mb-4">Let's Talk</p>
            <h2 className="text-4xl md:text-6xl font-display font-semibold text-foreground mb-4">
              Start a{" "}
              <span className="bg-gradient-to-r from-highlight-primary to-highlight-secondary bg-clip-text text-transparent">
                Conversation
              </span>
            </h2>
            <p className="text-foreground/50 max-w-xl mx-auto">
              Have a project in mind? Want to collaborate? Or just want to say hi? I'd love to hear from you.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Info cards */}
          <FadeIn direction="right" delay={0.1}>
            <div className="lg:col-span-2 space-y-4">
              {[
                {
                  icon: "📧",
                  label: "Email",
                  value: "Drop me a message",
                  desc: "I typically reply within 24 hours",
                },
                {
                  icon: "💼",
                  label: "Availability",
                  value: "Open to work",
                  desc: "Freelance & full-time opportunities",
                },
                {
                  icon: "🌍",
                  label: "Location",
                  value: "Remote-first",
                  desc: "Available worldwide",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-highlight-primary/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-highlight-primary/10 flex items-center justify-center text-lg shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-foreground/40 uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm font-semibold text-foreground mt-0.5">{item.value}</p>
                    <p className="text-xs text-foreground/50 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn direction="left" delay={0.2}>
            <div className="lg:col-span-3">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20 px-8 rounded-3xl border border-green-500/20 bg-green-500/5"
                >
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">✓</div>
                  <h3 className="text-2xl font-display font-semibold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-foreground/50">Thanks for reaching out. I'll get back to you as soon as possible.</p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="p-8 rounded-3xl border border-border bg-card/30 backdrop-blur-sm space-y-5 shadow-2xl shadow-black/5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-foreground/50 mb-2 uppercase tracking-wide">Name</label>
                      <input name="name" required placeholder="John Doe" className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground/50 mb-2 uppercase tracking-wide">Email</label>
                      <input name="email" type="email" required placeholder="john@example.com" className={inputCls} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-foreground/50 mb-2 uppercase tracking-wide">Subject</label>
                    <input name="subject" placeholder="Project inquiry, Collaboration…" className={inputCls} />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-foreground/50 mb-2 uppercase tracking-wide">Message</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell me about your project or idea…"
                      className={`${inputCls} resize-none`}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === "submitting"}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-highlight-primary to-highlight-primary/80 text-white font-semibold rounded-xl shadow-lg shadow-highlight-primary/25 hover:shadow-highlight-primary/40 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {status === "submitting" ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
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
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
