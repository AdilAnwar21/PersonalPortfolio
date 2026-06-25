"use client";

interface MarqueeTrackProps {
  items: string[];
  /** Reverse scroll direction */
  reverse?: boolean;
  /** Animation duration in seconds (lower = faster) */
  speed?: number;
  className?: string;
  /** Size variant */
  size?: "sm" | "md" | "lg";
}

export function MarqueeTrack({
  items,
  reverse = false,
  speed = 40,
  className = "",
  size = "sm",
}: MarqueeTrackProps) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  const sizeClass = {
    sm: "text-[10px] tracking-[0.2em]",
    md: "text-xs tracking-[0.15em]",
    lg: "text-sm tracking-[0.12em]",
  }[size];

  return (
    <div
      className={`overflow-hidden whitespace-nowrap ${className}`}
      aria-hidden="true"
    >
      <div
        className="inline-flex"
        style={{
          animation: `${reverse ? "marquee-right" : "marquee-left"} ${speed}s linear infinite`,
          willChange: "transform",
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`inline-flex items-center gap-5 px-5 font-mono uppercase text-foreground/50 ${sizeClass}`}
          >
            <span
              className="shrink-0 rounded-full"
              style={{
                width: 4,
                height: 4,
                backgroundColor: "var(--highlight-primary)",
                opacity: 0.7,
              }}
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
