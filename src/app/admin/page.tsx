"use client";

import { useEffect, useState } from "react";
import { getProjects } from "@/app/actions/project";
import { getExperiences } from "@/app/actions/experience";
import { getTestimonials } from "@/app/actions/testimonial";
import { getEnquiries } from "@/app/actions/enquiry";
import Link from "next/link";

const quickLinks = [
  { name: "Projects", href: "/admin/projects", color: "from-highlight-primary/20 to-highlight-primary/5", iconColor: "text-highlight-primary" },
  { name: "Experience", href: "/admin/experience", color: "from-highlight-secondary/20 to-highlight-secondary/5", iconColor: "text-highlight-secondary" },
  { name: "Testimonials", href: "/admin/testimonials", color: "from-green-500/20 to-green-500/5", iconColor: "text-green-400" },
  { name: "Settings", href: "/admin/settings", color: "from-purple-500/20 to-purple-500/5", iconColor: "text-purple-400" },
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
    { label: "Projects", value: stats.projects, href: "/admin/projects", icon: "📁", accent: "highlight-primary" },
    { label: "Experiences", value: stats.experiences, href: "/admin/experience", icon: "💼", accent: "highlight-secondary" },
    { label: "Testimonials", value: stats.testimonials, href: "/admin/testimonials", icon: "💬", accent: "green" },
    { label: "Enquiries", value: stats.enquiries, href: "/admin/enquiries", icon: "📬", accent: "purple" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="rounded-2xl border border-border bg-gradient-to-br from-highlight-primary/10 via-card to-highlight-secondary/5 p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-highlight-primary/5 rounded-full blur-3xl" />
        <div className="relative">
          <p className="text-xs uppercase tracking-widest text-highlight-primary font-semibold mb-2">Welcome back</p>
          <h2 className="text-3xl font-display font-semibold text-foreground mb-2">Admin Dashboard</h2>
          <p className="text-foreground/50 text-sm max-w-md">Manage your portfolio content, view enquiries, and update your settings from here.</p>
          <div className="flex items-center gap-3 mt-6">
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-highlight-primary/10 border border-highlight-primary/20 text-highlight-primary text-sm font-medium rounded-xl hover:bg-highlight-primary/20 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              View Live Site
            </a>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group p-6 bg-card border border-border rounded-2xl hover:border-highlight-primary/30 hover:shadow-lg hover:shadow-highlight-primary/5 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center text-xl">
                {card.icon}
              </div>
              <svg className="w-4 h-4 text-foreground/20 group-hover:text-highlight-primary group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <p className="text-3xl font-display font-bold text-foreground">{card.value}</p>
            <p className="text-xs text-foreground/50 mt-1 uppercase tracking-wider">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-widest mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`p-5 rounded-2xl border border-border bg-gradient-to-br ${link.color} hover:scale-105 hover:shadow-lg transition-all duration-200 group`}
            >
              <p className={`text-sm font-semibold ${link.iconColor} group-hover:underline`}>
                + Add {link.name}
              </p>
              <p className="text-xs text-foreground/40 mt-1">Manage →</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="p-5 rounded-2xl border border-border bg-card/50">
        <p className="text-xs font-semibold text-foreground/50 uppercase tracking-widest mb-3">💡 Tips</p>
        <ul className="space-y-2 text-sm text-foreground/60">
          <li>• Go to <strong className="text-foreground">Settings</strong> to upload your profile photo and resume.</li>
          <li>• Add your <strong className="text-foreground">GitHub, LinkedIn and Instagram</strong> links in Social Links (JSON).</li>
          <li>• <strong className="text-foreground">Featured projects</strong> appear in the animated stack sequence on your portfolio.</li>
          <li>• Image uploads support up to <strong className="text-foreground">10 MB</strong>.</li>
        </ul>
      </div>
    </div>
  );
}
