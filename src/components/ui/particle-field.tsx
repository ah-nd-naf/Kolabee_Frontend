"use client";

import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────
   ParticleField — canvas-based ambient dot field.
   
   Props:
   - count:       base particle count (default 60)
   - color:       CSS hex colour string for dots (default cyan-300)
   - minOpacity:  min dot opacity 0-1 (default 0.08)
   - maxOpacity:  max dot opacity 0-1 (default 0.22)
   - minRadius:   min dot radius px (default 0.6)
   - maxRadius:   max dot radius px (default 1.4)
   - speedFactor: velocity multiplier (default 1.0)
   - mouseRadius: proximity radius in px for subtle brightening (default 100)
───────────────────────────────────────────────────── */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseOpacity: number;
  opacity: number;
}

interface ParticleFieldProps {
  count?: number;
  color?: string;
  minOpacity?: number;
  maxOpacity?: number;
  minRadius?: number;
  maxRadius?: number;
  speedFactor?: number;
  mouseRadius?: number;
  className?: string;
}

export function ParticleField({
  count = 60,
  color = "#67e8f9",
  minOpacity = 0.08,
  maxOpacity = 0.22,
  minRadius = 0.6,
  maxRadius = 1.4,
  speedFactor = 1.0,
  mouseRadius = 100,
  className = "",
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const hexToRgb = (hex: string): [number, number, number] => {
      const clean = hex.replace("#", "");
      const num = parseInt(clean, 16);
      return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
    };
    const [r, g, b] = hexToRgb(color);

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];

    const makeParticle = (): Particle => {
      const baseOpacity = minOpacity + Math.random() * (maxOpacity - minOpacity);
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18 * speedFactor,
        vy: (Math.random() - 0.5) * 0.18 * speedFactor,
        radius: minRadius + Math.random() * (maxRadius - minRadius),
        baseOpacity,
        opacity: baseOpacity,
      };
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.scale(dpr, dpr);

      const area = width * height;
      const scaledCount = Math.min(
        Math.round((area / (1536 * 864)) * count),
        count * 2
      );
      particles = Array.from({ length: Math.max(scaledCount, 20) }, makeParticle);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    let mouseX = -9999;
    let mouseY = -9999;
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onMouseLeave = () => { mouseX = -9999; mouseY = -9999; };
    const parent = canvas.parentElement;
    parent?.addEventListener("mousemove", onMouseMove, { passive: true });
    parent?.addEventListener("mouseleave", onMouseLeave, { passive: true });

    let paused = false;
    const onVisibilityChange = () => {
      paused = document.hidden;
      if (!paused) requestAnimationFrame(tick);
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    let raf = 0;
    const tick = () => {
      if (paused) return;
      raf = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        if (!prefersReduced) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -p.radius) p.x = width + p.radius;
          if (p.x > width + p.radius) p.x = -p.radius;
          if (p.y < -p.radius) p.y = height + p.radius;
          if (p.y > height + p.radius) p.y = -p.radius;

          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius) {
            const boost = 1 - dist / mouseRadius;
            p.opacity = p.baseOpacity + boost * (1 - p.baseOpacity) * 0.5;
          } else {
            p.opacity += (p.baseOpacity - p.opacity) * 0.04;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.opacity.toFixed(3)})`;
        ctx.fill();
      }
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      parent?.removeEventListener("mousemove", onMouseMove);
      parent?.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [color, count, maxOpacity, maxRadius, minOpacity, minRadius, mouseRadius, speedFactor]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
