"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * DotSpotlight
 *
 * Renders a fixed canvas behind everything. On mouse move, it paints a soft
 * radial "spotlight" that brightens the dots nearest the cursor — exactly like
 * the Gemini AI background effect.
 *
 * How it works:
 *   • The canvas is transparent by default, sitting on top of the CSS dot grid.
 *   • On each animation frame we clear the canvas and draw:
 *       1. A large, feathered radial gradient (the "ambient" glow).
 *       2. Individual bright dots for every grid cell inside the spotlight radius.
 *   • The dots are snapped to the same 24 px grid as the CSS background so they
 *     overlay perfectly.
 */
export function DotSpotlight() {
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const activeRef = useRef(false);

  // Don't render on admin or login pages
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/login")) {
    return null;
  }

  useEffect(() => {
    // Only on pointer:fine (desktop) devices
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GRID = 24;          // must match globals.css background-size
    const RADIUS = 100;       // spotlight radius in px — kept small & subtle
    const DOT_R = 1.0;        // radius of each lit dot
    const FADE_START = 0.4;   // start fading at this fraction of RADIUS

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function getColor() {
      // Read the CSS custom property so we respect light / dark mode
      return getComputedStyle(document.documentElement)
        .getPropertyValue("--highlight-primary")
        .trim() || "#ff2d78";
    }

    function draw() {
      rafRef.current = requestAnimationFrame(draw);
      if (!ctx || !canvas) return;

      const { x, y } = mouseRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!activeRef.current) return;

      const color = getColor();

      // ── Ambient glow blob — very faint ────────────────────────────────
      const grad = ctx.createRadialGradient(x, y, 0, x, y, RADIUS * 1.2);
      grad.addColorStop(0,   hexToRgba(color, 0.03));
      grad.addColorStop(0.6, hexToRgba(color, 0.015));
      grad.addColorStop(1,   "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(x - RADIUS * 1.3, y - RADIUS * 1.3, RADIUS * 2.6, RADIUS * 2.6);

      // ── Individual lit dots (snapped to CSS grid) ──────────────────────
      // Find the grid cells that fall inside the spotlight circle
      const startCol = Math.floor((x - RADIUS) / GRID);
      const endCol   = Math.ceil( (x + RADIUS) / GRID);
      const startRow = Math.floor((y - RADIUS) / GRID);
      const endRow   = Math.ceil( (y + RADIUS) / GRID);

      for (let col = startCol; col <= endCol; col++) {
        for (let row = startRow; row <= endRow; row++) {
          const dx = col * GRID - x;
          const dy = row * GRID - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > RADIUS) continue;

          // Ease-out opacity that fades at the edge
          const t = dist / RADIUS;
          const opacity = t < FADE_START
            ? 1
            : 1 - (t - FADE_START) / (1 - FADE_START);

          ctx.beginPath();
          ctx.arc(col * GRID, row * GRID, DOT_R + opacity * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = hexToRgba(color, opacity * 0.45);
          ctx.fill();
        }
      }
    }

    function onMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      activeRef.current = true;
    }

    function onMouseLeave() {
      activeRef.current = false;
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      aria-hidden="true"
    />
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Convert a CSS hex colour like `#ff2d78` to `rgba(r,g,b,a)`. */
function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const full = h.length === 3
    ? h.split("").map((c) => c + c).join("")
    : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
