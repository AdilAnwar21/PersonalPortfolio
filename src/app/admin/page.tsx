"use client";

import { useEffect, useState } from "react";
import { getProjects } from "@/app/actions/project";
import { getExperiences } from "@/app/actions/experience";
import { getTestimonials } from "@/app/actions/testimonial";
import { getEnquiries } from "@/app/actions/enquiry";
import Link from "next/link";

const quickLinks = [
  { name: "Projects", href: "/admin/projects", description: "Manage your portfolio items" },
  { name: "Experience", href: "/admin/experience", description: "Update your career timeline" },
  { name: "Testimonials", href: "/admin/testimonials", description: "Review client feedback" },
  { name: "Settings", href: "/admin/settings", description: "Configure your profile" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, experiences: 0, testimonials: 0, enquiries: 0 });

  useEffect(() => {
    Promise.all([getProjects(), getExperiences(), getTestimonials(), getEnquiries()]).then(
      ([projects, experiences, testimonials, enquiries]) => {
        setStats({
          projects: projects.length,
          experiences: experiences.length,
          testimonials: testimonials.length,
          enquiries: enquiries.length,
        });
      }
    );
  }, []);

  const statCards = [
    { label: "Projects", value: stats.projects, href: "/admin/projects" },
    { label: "Experiences", value: stats.experiences, href: "/admin/experience" },
    { label: "Testimonials", value: stats.testimonials, href: "/admin/testimonials" },
    { label: "Enquiries", value: stats.enquiries, href: "/admin/enquiries" },
  ];

  return (
    <div className="space-y-10 max-w-5xl mx-auto pt-4">
      {/* Welcome */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-border/40">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-highlight-primary animate-pulse" />
            <span className="text-[9px] font-mono tracking-widest text-foreground/80 uppercase">System Active</span>
          </div>
          <h2 className="text-4xl font-display font-semibold text-foreground tracking-tight mb-2">Admin Engine</h2>
          <p className="text-foreground/60 text-sm max-w-md">Orchestrate your portfolio content and manage your digital presence.</p>
        </div>
        <a
          href="/"
          target="_blank"
          className="group flex items-center gap-2 px-5 py-2.5 bg-foreground text-background text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          View Live Site
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group relative p-6 bg-card border border-border/60 rounded-2xl hover:border-highlight-primary/50 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-highlight-primary/5 rounded-bl-full translate-x-12 -translate-y-12 group-hover:bg-highlight-primary/10 transition-colors" />
            
            <p className="text-[10px] text-foreground/50 uppercase tracking-widest font-mono mb-6">{card.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-4xl font-display font-semibold text-foreground leading-none">{card.value}</p>
              <svg className="w-4 h-4 text-foreground/30 group-hover:text-highlight-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 7l-10 10M7 7h10v10" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h3 className="text-[10px] font-mono font-semibold text-foreground/50 uppercase tracking-widest mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="p-5 rounded-2xl bg-card border border-border/60 hover:bg-background transition-colors group flex flex-col justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-foreground mb-1 group-hover:text-highlight-primary transition-colors">
                  {link.name}
                </p>
                <p className="text-xs text-foreground/60">{link.description}</p>
              </div>
              <div className="mt-6 flex justify-end">
                <svg className="w-4 h-4 text-foreground/40 group-hover:text-highlight-primary group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="p-6 rounded-2xl bg-card border border-border/60">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-4 h-4 text-highlight-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-[10px] font-mono font-semibold text-foreground/60 uppercase tracking-widest">System Notes</p>
        </div>
        <ul className="space-y-3 text-sm text-foreground/70">
          <li className="flex gap-3"><span className="text-highlight-primary">/</span> Go to <strong className="text-foreground">Settings</strong> to upload your profile photo and resume.</li>
          <li className="flex gap-3"><span className="text-highlight-primary">/</span> Add your <strong className="text-foreground">GitHub, LinkedIn and Instagram</strong> links in Social Links (JSON).</li>
          <li className="flex gap-3"><span className="text-highlight-primary">/</span> <strong className="text-foreground">Featured projects</strong> appear in the animated stack sequence on your portfolio.</li>
          <li className="flex gap-3"><span className="text-highlight-primary">/</span> Image uploads support up to <strong className="text-foreground">10 MB</strong>.</li>
        </ul>
      </div>
    </div>
  );
}
