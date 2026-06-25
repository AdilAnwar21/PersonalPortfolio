"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom dual-element cursor for pointer:fine (desktop) devices.
 * All window/matchMedia access is inside useEffect to avoid SSR issues.
 */
export function CustomCursor() {
  const [ready, setReady] = useState(false);     // is desktop + mounted?
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const dotX  = useSpring(mouseX, { stiffness: 600, damping: 36, mass: 0.5 });
  const dotY  = useSpring(mouseY, { stiffness: 600, damping: 36, mass: 0.5 });
  const ringX = useSpring(mouseX, { stiffness: 140, damping: 22, mass: 0.8 });
  const ringY = useSpring(mouseY, { stiffness: 140, damping: 22, mass: 0.8 });

  useEffect(() => {
    // Only enable custom cursor on true pointer-fine (mouse) devices
    if (!window.matchMedia("(pointer: fine)").matches) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
  // mouseX / mouseY are stable MotionValues (never change identity)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!ready) return null;

  return (
    <>
      {/* Dot — tight, fast */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
        style={{
          x: dotX, y: dotY,
          translateX: "-50%", translateY: "-50%",
          backgroundColor: "var(--cursor-color, #ff2d78)",
          opacity: visible ? 1 : 0,
        }}
        animate={{ width: clicking ? 6 : hovering ? 10 : 7, height: clicking ? 6 : hovering ? 10 : 7 }}
        transition={{ duration: 0.12 }}
      />

      {/* Ring — lags, scales on hover */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full"
        style={{
          x: ringX, y: ringY,
          translateX: "-50%", translateY: "-50%",
          borderColor: "var(--cursor-color, #ff2d78)",
          borderWidth: "1px", borderStyle: "solid",
        }}
        animate={{
          width:   clicking ? 22 : hovering ? 50 : 30,
          height:  clicking ? 22 : hovering ? 50 : 30,
          opacity: visible ? (hovering ? 0.8 : 0.45) : 0,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </>
  );
}
