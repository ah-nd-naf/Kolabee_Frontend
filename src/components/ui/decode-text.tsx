"use client";

import { useEffect, useState, useMemo } from "react";
import { m, useReducedMotion } from "framer-motion";

interface DecodeTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  underlineWord?: string;
  delayMs?: number; // Delay before starting decode
}

type CharStatus = "hidden" | "scrambling" | "settled";
type CursorState = "hidden" | "typing" | "pulsing" | "finished";

const CHAR_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%";

export function DecodeText({ text, className, style, underlineWord, delayMs = 1000 }: DecodeTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const [charStates, setCharStates] = useState<{ char: string; status: CharStatus }[]>(
    text.split("").map(() => ({ char: "", status: "hidden" }))
  );
  const [cursorState, setCursorState] = useState<CursorState>("hidden");

  // Determine if we actually have an underline target
  const words = text.split(" ");

  useEffect(() => {
    if (prefersReducedMotion) {
      setCharStates(text.split("").map((c) => ({ char: c, status: "settled" })));
      setCursorState("finished");
      return;
    }

    let isMounted = true;
    const chars = text.split("");
    const staggerMs = 40;
    const scrambleDuration = 80;

    const startDecode = async () => {
      if (!isMounted) return;
      setCursorState("typing");

      // Start the decode loop for each character
      for (let i = 0; i < chars.length; i++) {
        if (!isMounted) return;

        // Skip spaces, settle immediately
        if (chars[i] === " ") {
          setCharStates((prev) => {
            const next = [...prev];
            next[i] = { char: " ", status: "settled" };
            return next;
          });
          // Small delay for space
          await new Promise((resolve) => setTimeout(resolve, staggerMs));
          continue;
        }

        // Start scrambling this char
        setCharStates((prev) => {
          const next = [...prev];
          next[i] = { char: CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)], status: "scrambling" };
          return next;
        });

        // Set up the interval for scrambling
        const scrambleInterval = setInterval(() => {
          if (!isMounted) return;
          setCharStates((prev) => {
            if (prev[i].status !== "scrambling") return prev;
            const next = [...prev];
            next[i] = { char: CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)], status: "scrambling" };
            return next;
          });
        }, 30);

        // Wait for the scramble duration, then settle
        setTimeout(() => {
          clearInterval(scrambleInterval);
          if (!isMounted) return;
          setCharStates((prev) => {
            const next = [...prev];
            next[i] = { char: chars[i], status: "settled" };
            return next;
          });

          // Check if this is the last character
          if (i === chars.length - 1) {
            setCursorState("pulsing");
            setTimeout(() => {
              if (isMounted) setCursorState("finished");
            }, 600); // Pulse for a bit before morphing
          }
        }, scrambleDuration);

        // Wait for stagger before starting the next char
        await new Promise((resolve) => setTimeout(resolve, staggerMs));
      }
    };

    const initialDelay = setTimeout(startDecode, delayMs);

    return () => {
      isMounted = false;
      clearTimeout(initialDelay);
    };
  }, [text, delayMs, prefersReducedMotion]);

  // Find where the cursor should currently sit
  const currentTypingIndex = useMemo(() => {
    for (let i = charStates.length - 1; i >= 0; i--) {
      if (charStates[i].status !== "hidden") return i;
    }
    return -1;
  }, [charStates]);

  // Reconstruct words for rendering
  const renderWords = () => {
    let globalCharIndex = 0;
    return words.map((word, wordIdx) => {
      const isUnderlineTarget = underlineWord && word === underlineWord;
      const wordChars = word.split("");
      
      const renderedWord = (
        <span key={wordIdx} className={isUnderlineTarget ? "relative inline-block" : "inline-block"}>
          {wordChars.map((char, charIdx) => {
            const i = globalCharIndex++;
            const state = charStates[i];
            const isScrambling = state.status === "scrambling";
            const isHidden = state.status === "hidden";
            
            return (
              <span key={i} className="inline-flex relative">
                {/* Character */}
                <m.span
                  initial={false}
                  animate={{
                    opacity: isHidden ? 0 : 1,
                    filter: isScrambling ? "blur(2px)" : "blur(0px)",
                    fontWeight: isScrambling ? 400 : 700,
                  }}
                  transition={{ duration: 0.15 }}
                  className="inline-block"
                >
                  {isHidden ? char : state.char}
                </m.span>
                
                {/* Typing Cursor (inline) */}
                {cursorState !== "finished" && currentTypingIndex === i && (
                  <m.span
                    layoutId="decode-cursor"
                    animate={{ opacity: cursorState === "pulsing" ? [1, 0.4, 1] : [1, 0.4] }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "mirror",
                      duration: 0.6,
                      ease: "easeInOut",
                    }}
                    className="absolute -right-[6px] top-[10%] bottom-[10%] w-[4px] rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)] z-10"
                  />
                )}
              </span>
            );
          })}

          {/* If there is a space after this word, add it to the global index and render it */}
          {wordIdx < words.length - 1 && (
            <span className="inline-block relative">
              &nbsp;
              {(() => {
                 const spaceIdx = globalCharIndex++;
                 return cursorState !== "finished" && currentTypingIndex === spaceIdx && (
                    <m.span
                      layoutId="decode-cursor"
                      animate={{ opacity: [1, 0.4] }}
                      transition={{ repeat: Infinity, repeatType: "mirror", duration: 0.6 }}
                      className="absolute right-0 top-[10%] bottom-[10%] w-[4px] rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)] z-10"
                    />
                 );
              })()}
            </span>
          )}

          {/* Final Morphing Underline */}
          {cursorState === "finished" && isUnderlineTarget && !prefersReducedMotion && (
            <m.span
              layoutId="decode-cursor"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0.35 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute left-0 -bottom-1 h-[3px] w-full rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)] z-0"
            />
          )}
        </span>
      );

      return renderedWord;
    });
  };

  return (
    <span className={`relative inline-block ${className || ""}`} style={style} aria-hidden="true">
      {/* Screen Reader Text */}
      <span className="sr-only">{text}</span>
      
      {/* Visual Animated Text */}
      {renderWords()}
      
      {/* Initial Cursor Position (before typing starts) */}
      {cursorState === "typing" && currentTypingIndex === -1 && (
        <m.span
          layoutId="decode-cursor"
          animate={{ opacity: [1, 0.4] }}
          transition={{ repeat: Infinity, repeatType: "mirror", duration: 0.6 }}
          className="absolute -left-[6px] top-[10%] bottom-[10%] w-[4px] rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)] z-10"
        />
      )}
    </span>
  );
}

