"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { submitEnquiry } from "@/app/actions/enquiry";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);
    await submitEnquiry(formData);
    setStatus("success");
    e.currentTarget.reset();
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <section id="contact" className="py-32 px-6 max-w-3xl mx-auto border-t border-border">
      <FadeIn>
        <h2 className="text-3xl md:text-5xl font-display font-light mb-6 text-center">Let's Connect</h2>
        <p className="text-foreground/70 text-center mb-16">
          Have a project in mind or just want to say hi? Drop me a message below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 bg-card/20 p-8 border border-border/50 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground/50 mb-2">Name</label>
              <input name="name" required className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-highlight-primary/20 text-foreground transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/50 mb-2">Email</label>
              <input name="email" type="email" required className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-highlight-primary/20 text-foreground transition-all" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground/50 mb-2">Message</label>
            <textarea name="message" required rows={5} className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-highlight-primary/20 text-foreground transition-all resize-none" />
          </div>
          
          <button 
            type="submit" 
            disabled={status === "submitting" || status === "success"}
            className="w-full py-4 bg-foreground text-background font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {status === "submitting" ? "Sending..." : status === "success" ? "Message Sent ✓" : "Send Message"}
          </button>
        </form>
      </FadeIn>
    </section>
  );
}
