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
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground relative overflow-hidden p-4">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-highlight-primary/10 rounded-full blur-[100px] -z-10" />

      <div className="w-full max-w-md p-8 md:p-10 bg-card/60 backdrop-blur-xl border border-border rounded-3xl shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-highlight-primary to-highlight-secondary flex items-center justify-center shadow-lg shadow-highlight-primary/30">
            <span className="text-white text-lg font-bold font-display">A</span>
          </div>
        </div>
        <h1 className="text-3xl font-display font-semibold tracking-tight mb-8 text-center text-foreground">
          Admin <span className="bg-gradient-to-r from-highlight-primary to-highlight-secondary bg-clip-text text-transparent">Access</span>
        </h1>
        
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-foreground/50 mb-2 uppercase tracking-wide">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-highlight-primary/30 focus:border-highlight-primary/50 transition-all text-foreground text-sm"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground/50 mb-2 uppercase tracking-wide">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-highlight-primary/30 focus:border-highlight-primary/50 transition-all text-foreground text-sm"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 mt-2 bg-gradient-to-r from-highlight-primary to-highlight-primary/80 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-highlight-primary/20 hover:scale-[1.02] transition-all duration-200 text-sm"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
