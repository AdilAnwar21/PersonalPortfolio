"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Custom dual-element cursor for pointer:fine (desktop) devices.
 * Hidden on /admin and /login routes.
 */
export function CustomCursor() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Dot tracks tightly
  const dotX  = useSpring(mouseX, { stiffness: 700, damping: 38, mass: 0.4 });
  const dotY  = useSpring(mouseY, { stiffness: 700, damping: 38, mass: 0.4 });
  // Ring lags behind pleasantly
  const ringX = useSpring(mouseX, { stiffness: 120, damping: 20, mass: 1 });
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 20, mass: 1 });

  // Don't activate on admin / login
  const isExcluded = pathname?.startsWith("/admin") || pathname?.startsWith("/login");

  useEffect(() => {
    if (isExcluded) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setReady(true);

    const onMove  = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY); setVisible(true); };
    const onOver  = (e: MouseEvent) => { if ((e.target as Element).closest("a,button,[data-cursor-hover],label,input,textarea,select")) setHovering(true); };
    const onOut   = (e: MouseEvent) => { if ((e.target as Element).closest("a,button,[data-cursor-hover],label,input,textarea,select")) setHovering(false); };
    const onDown  = () => setClicking(true);
    const onUp    = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener("mousemove",  onMove);
    document.addEventListener("mouseover",  onOver);
    document.addEventListener("mouseout",   onOut);
    document.addEventListener("mousedown",  onDown);
    document.addEventListener("mouseup",    onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mouseout",   onOut);
      document.removeEventListener("mousedown",  onDown);
      document.removeEventListener("mouseup",    onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExcluded]);

  if (!ready || isExcluded) return null;

  return (
    <>
      {/* ── Dot — snappy, filled ── */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "var(--cursor-color, #ff2d78)",
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width:  clicking ? 5 : hovering ? 12 : 8,
          height: clicking ? 5 : hovering ? 12 : 8,
          scale:  clicking ? 0.7 : 1,
        }}
        transition={{ duration: 0.1 }}
      />

      {/* ── Ring — laggy, expressive ── */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: "var(--cursor-color, #ff2d78)",
          borderWidth: "1.5px",
          borderStyle: "solid",
          backgroundColor: hovering ? "color-mix(in srgb, var(--cursor-color) 10%, transparent)" : "transparent",
        }}
        animate={{
          width:   clicking ? 20 : hovering ? 56 : 34,
          height:  clicking ? 20 : hovering ? 56 : 34,
          opacity: visible ? (hovering ? 0.9 : 0.55) : 0,
          rotate:  hovering ? 45 : 0,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
    </>
  );
}
