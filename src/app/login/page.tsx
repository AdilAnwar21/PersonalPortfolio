"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid credentials.");
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="cursor-default-zone min-h-screen flex w-full bg-background text-foreground">
      
      {/* LEFT SIDE - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center relative p-6 md:p-12">
        {/* Brand logo top left */}
        <div className="absolute top-8 left-8 flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-highlight-primary flex items-center justify-center shadow-lg shadow-highlight-primary/20">
            <span className="text-white text-[10px] font-bold font-display">A</span>
          </div>
          <span className="font-display font-semibold text-sm tracking-tight text-foreground">Portfolio Admin</span>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-[400px] bg-card border border-border/40 rounded-3xl p-8 shadow-2xl relative z-10">
          <h1 className="text-2xl font-display font-semibold text-foreground mb-2">Welcome back</h1>
          <p className="text-sm text-foreground/60 mb-8">Sign in to manage your portfolio and blog.</p>
          
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-highlight-primary focus:border-highlight-primary transition-all text-foreground text-sm"
                placeholder="admin@example.com"
                required
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-foreground/80">Password</label>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-highlight-primary focus:border-highlight-primary transition-all text-foreground text-sm"
                placeholder="••••••••"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3.5 mt-2 font-semibold rounded-xl text-sm transition-all duration-200 border-2 border-highlight-primary bg-highlight-primary text-white hover:bg-transparent hover:text-highlight-primary shadow-lg shadow-highlight-primary/20"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-foreground/50">Return to <a href="/" className="text-highlight-primary hover:underline">main website</a></p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Showcase */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-center p-12 lg:p-24 overflow-hidden border-l border-border/40">
        {/* Soft background gradient adapted to our theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-highlight-primary/5 to-highlight-secondary/10 pointer-events-none" />
        
        {/* Glow orb */}
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-highlight-primary/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-lg">
          {/* Top pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-highlight-primary/20 bg-highlight-primary/5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-highlight-primary animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-highlight-primary uppercase">Portfolio Engine</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-display font-semibold leading-[1.1] tracking-tight text-foreground mb-6">
            Manage your content <span className="text-highlight-primary">as it's created</span> for your audience.
          </h2>
          
          <p className="text-foreground/70 text-lg mb-10 leading-relaxed max-w-md">
            Seamlessly publish blogs, update projects, and manage your professional presence with complete control.
          </p>

          {/* Code snippet mock */}
          <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 mb-12 shadow-2xl relative font-mono text-xs text-foreground/80 overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 text-[9px] text-foreground/30 group-hover:text-foreground/50 transition-colors">stream.log</div>
            <div className="flex gap-1.5 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="space-y-1">
              <div><span className="text-blue-400">event</span>: <span className="text-highlight-primary">blog.published</span></div>
              <div><span className="text-blue-400">data</span>: {'{'} "<span className="text-foreground">slug</span>": "<span className="text-highlight-secondary">new-design-system</span>", "<span className="text-foreground">status</span>": "<span className="text-green-400">live</span>" {'}'}</div>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-4 shadow-sm">
              <div className="text-xl font-semibold text-foreground mb-1"><span className="text-highlight-primary">Next</span>.js</div>
              <div className="text-[10px] text-foreground/50 uppercase tracking-wider font-mono">App Router</div>
            </div>
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-4 shadow-sm">
              <div className="text-xl font-semibold text-foreground mb-1">100<span className="text-highlight-primary">%</span></div>
              <div className="text-[10px] text-foreground/50 uppercase tracking-wider font-mono">Lighthouse</div>
            </div>
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-4 shadow-sm">
              <div className="text-xl font-semibold text-highlight-primary mb-1">Secure</div>
              <div className="text-[10px] text-foreground/50 uppercase tracking-wider font-mono">Admin Auth</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
