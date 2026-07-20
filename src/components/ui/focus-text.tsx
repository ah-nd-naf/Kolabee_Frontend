"use client";

import { motion, useReducedMotion } from "framer-motion";

interface FocusTextProps {
  text: string;
  className?: string;
  delayMs?: number;
  staggerMs?: number;
}

export function FocusText({ text, className = "", delayMs = 0, staggerMs = 30 }: FocusTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const characters = text.split("");

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={`inline-block ${className}`} aria-hidden="true">
      <span className="sr-only">{text}</span>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ filter: "blur(8px)", opacity: 0, scale: 0.95 }}
          animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: delayMs / 1000 + index * (staggerMs / 1000),
            ease: [0.16, 1, 0.3, 1], // Standard snap curve
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}
