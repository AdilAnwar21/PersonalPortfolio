"use client";

import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/login")) {
    return null;
  }

  return (
    <footer className="py-12 text-center text-foreground/50 text-sm border-t border-border mt-32">
      <p>© {new Date().getFullYear()} • Built with Next.js & Framer Motion</p>
    </footer>
  );
}
