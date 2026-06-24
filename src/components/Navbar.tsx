"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  const pathname = usePathname();

  // Hide navbar on admin routes
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/login")) {
    return null;
  }

  const links = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-6 px-4"
    >
      <nav className="glass px-6 py-3 rounded-full flex gap-8 items-center shadow-2xl shadow-black/50">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            {link.name}
          </Link>
        ))}
        <div className="pl-4 border-l border-zinc-700">
          <ThemeToggle />
        </div>
      </nav>
    </motion.header>
  );
}
