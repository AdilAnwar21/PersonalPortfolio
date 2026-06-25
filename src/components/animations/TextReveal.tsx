"use client";

import { motion, Variants } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  /** Seconds delay before stagger begins */
  delay?: number;
  /** Animate on mount (hero) or when scrolled into view (sections) */
  inView?: boolean;
  /** Stagger duration between each character in seconds */
  stagger?: number;
}

const container: Variants = {
  hidden: {},
  visible: ({ stagger, delay }: { stagger: number; delay: number }) => ({
    transition: { staggerChildren: stagger, delayChildren: delay },
  }),
};

const charVariant: Variants = {
  hidden: { y: "115%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function TextReveal({
  text,
  className = "",
  delay = 0,
  inView = false,
  stagger = 0.022,
}: TextRevealProps) {
  const chars = text.split("");

  const motionProps = inView
    ? {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-80px" },
      }
    : {
        initial: "hidden",
        animate: "visible",
      };

  return (
    <motion.div
      aria-label={text}
      variants={container}
      custom={{ stagger, delay }}
      {...motionProps}
      className={className}
    >
      {chars.map((char, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block" }}>
          <motion.span variants={charVariant} style={{ display: "inline-block" }}>
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}
