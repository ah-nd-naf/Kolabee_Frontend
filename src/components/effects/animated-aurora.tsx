"use client";

import { useReducedMotion, m } from "framer-motion";

export function AnimatedAurora() {
  const prefersReduced = useReducedMotion();
  const sharedClass = "absolute will-change-transform";
  const easing = [0.45, 0, 0.55, 1] as [number, number, number, number];

  const blob1Style: React.CSSProperties = {
    top: "-25%", left: "-15%", width: "80vw", height: "80vw", maxWidth: 900, maxHeight: 900,
    borderRadius: "50%",
    background: "radial-gradient(circle at center, rgba(8,145,178,0.55) 0%, rgba(8,145,178,0.18) 45%, transparent 70%)",
    filter: "blur(90px)",
  };
  const blob2Style: React.CSSProperties = {
    top: "10%", right: "-20%", width: "75vw", height: "75vw", maxWidth: 850, maxHeight: 850,
    borderRadius: "50%",
    background: "radial-gradient(circle at center, rgba(34,211,238,0.45) 0%, rgba(34,211,238,0.14) 45%, transparent 70%)",
    filter: "blur(100px)",
  };
  const blob3Style: React.CSSProperties = {
    bottom: "-30%", left: "10%", width: "70vw", height: "70vw", maxWidth: 800, maxHeight: 800,
    borderRadius: "50%",
    background: "radial-gradient(circle at center, rgba(103,232,249,0.40) 0%, rgba(103,232,249,0.12) 45%, transparent 70%)",
    filter: "blur(110px)",
  };

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden" style={{ background: "#083344", zIndex: 0 }}>
      {prefersReduced ? (
        <>
          <div className={sharedClass} style={blob1Style} />
          <div className={sharedClass} style={blob2Style} />
          <div className={sharedClass} style={blob3Style} />
        </>
      ) : (
        <>
          <m.div className={sharedClass} style={blob1Style}
            animate={{ x: ["0%","18%","-6%","0%"], y: ["0%","-14%","10%","0%"], scale: [1, 1.15, 0.88, 1] }}
            transition={{ duration: 24, ease: easing, repeat: Infinity, repeatType: "mirror" }} />
          <m.div className={sharedClass} style={blob2Style}
            animate={{ x: ["0%","-14%","12%","0%"], y: ["0%","16%","-8%","0%"], scale: [1, 0.85, 1.12, 1] }}
            transition={{ duration: 30, ease: easing, repeat: Infinity, repeatType: "mirror" }} />
          <m.div className={sharedClass} style={blob3Style}
            animate={{ x: ["0%","10%","-18%","0%"], y: ["0%","8%","-12%","0%"], scale: [1, 1.2, 0.82, 1] }}
            transition={{ duration: 18, ease: easing, repeat: Infinity, repeatType: "mirror" }} />
        </>
      )}
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 55% at 50% 50%, transparent 30%, rgba(8,51,68,0.55) 100%)" }} />
    </div>
  );
}

