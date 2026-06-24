"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin" },
    { name: "Projects", href: "/admin/projects" },
    { name: "Experience", href: "/admin/experience" },
    { name: "Testimonials", href: "/admin/testimonials" },
    { name: "Enquiries", href: "/admin/enquiries" },
    { name: "Settings", href: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-900/50 p-6 flex flex-col">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-xl text-white font-light tracking-tight">
            Admin <span className="font-bold">Panel</span>
          </h2>
          <ThemeToggle />
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                pathname === item.href
                  ? "bg-white text-black font-medium"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="mt-auto px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-left"
        >
          Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 text-white overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
