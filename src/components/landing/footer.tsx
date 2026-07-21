"use client";

import { m } from "framer-motion";
import { Hexagon, Zap, AtSign, Share2, Globe, Mail, ArrowUp } from "lucide-react";
import Link from "next/link";
import { CountUp } from "@/components/ui/count-up";

export function LandingFooter() {
  return (
    <footer className="relative overflow-hidden bg-dark-section">

      {/* Pulsing shimmer border */}
      <m.div
        className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        animate={{ opacity: [0.25, 0.85, 0.25] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Ambient glow blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-64 -top-32 h-[600px] w-[600px] rounded-full bg-cyan-500/[0.07] blur-[140px]" />
        <div className="absolute -right-64 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-700/[0.06] blur-[120px]" />
      </div>

      {/* Giant KOLABEE watermark — anchored to the bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 flex select-none items-end justify-center overflow-hidden"
      >
        <span
          className="font-heading translate-y-[38%] whitespace-nowrap text-[20vw] font-black uppercase leading-none tracking-tighter"
          style={{ color: 'rgba(6, 40, 52, 0.9)' }}
        >
          KOLABEE
        </span>
      </div>

      {/* — Main content — */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-10 pt-20 lg:px-8">

        {/* Top grid: Brand + Nav */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-5">

          {/* — Brand column — */}
          <div className="lg:col-span-2">
            {/* Logo mark */}
            <div className="mb-5 flex items-center gap-3">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
                <Hexagon className="h-10 w-10 text-cyan-500" fill="currentColor" strokeWidth={0} />
                <Zap className="absolute h-[18px] w-[18px] fill-white text-white" strokeWidth={0} />
              </div>
              <span className="font-heading text-2xl font-bold tracking-tight text-white">Kolabee</span>
            </div>

            <p className="max-w-xs text-sm leading-relaxed text-cyan-300/80">
              The platform where brands and creators build real partnerships
              — with shared analytics, transparent payments, and zero friction.
            </p>

            {/* Live platform badge */}
            <div className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-cyan-900/70 px-4 py-2 ring-1 ring-cyan-800/80">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              </span>
              <span className="text-xs font-medium text-cyan-300">12,000+ active creators</span>
            </div>

            {/* Social icons */}
            <div className="mt-8 flex gap-3">
              {(
                [
                  { Icon: AtSign,  label: 'Instagram' },
                  { Icon: Share2,  label: 'LinkedIn'  },
                  { Icon: Globe,   label: 'Website'   },
                  { Icon: Mail,    label: 'Email'     },
                ] as const
              ).map(({ Icon, label }) => (
                <m.a
                  key={label}
                  href="#"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-900/80 text-cyan-400 ring-1 ring-cyan-800 transition-all duration-200 hover:bg-cyan-500 hover:text-white hover:ring-cyan-400"
                >
                  <Icon className="h-4 w-4" />
                </m.a>
              ))}
            </div>
          </div>

          {/* — Navigation columns — */}
          <div className="grid grid-cols-3 gap-8 lg:col-span-3">
            {([
              {
                heading: 'Product',
                links: ['How it works', 'Post a Brief', 'Creator Marketplace', 'Link Analytics', 'Pricing'],
                hrefs: ['#how-it-works', '/dashboard', '/dashboard', '/dashboard/analytics', '#pricing'],
              },
              {
                heading: 'Company',
                links: ['About', 'Blog', 'Careers', 'Press Kit', 'Contact'],
                hrefs: ['#', '#', '#', '#', '#'],
              },
              {
                heading: 'Legal',
                links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Licenses'],
                hrefs: ['#', '#', '#', '#'],
              },
            ]).map(({ heading, links, hrefs }) => (
              <div key={heading}>
                <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-500">
                  {heading}
                </p>
                <ul className="space-y-4">
                  {links.map((label, i) => (
                    <li key={label}>
                      <Link
                        href={hrefs[i]}
                        className="group flex items-center gap-2 text-sm text-white/60 transition-colors duration-200 hover:text-white"
                      >
                        <span className="h-px w-0 shrink-0 rounded-full bg-cyan-500 transition-all duration-300 ease-out group-hover:w-3" />
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* — Stats grid — */}
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-cyan-800/30 ring-1 ring-cyan-800/40 sm:grid-cols-4"
        >
          {([
            { label: 'Creators',             rawValue: 12000,  formatter: (n: number) => `${Math.round(n / 1000 * 10) / 10}K+`, delay: 0 },
            { label: 'Brands',               rawValue: 2400,   formatter: (n: number) => `${Math.round(n).toLocaleString()}+`, delay: 80 },
            { label: 'Campaigns Delivered',  rawValue: 38000,  formatter: (n: number) => `${Math.round(n / 1000 * 10) / 10}K+`, delay: 160 },
            { label: 'Paid Out to Creators', rawValue: 4.2,    formatter: (n: number) => `$${n.toFixed(1)}M+`, delay: 240 },
          ]).map(({ label, rawValue, formatter, delay }) => (
            <m.div
              key={label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: delay / 1000 }}
              className="flex flex-col items-center justify-center bg-cyan-950 px-6 py-10 text-center"
            >
              <span className="font-heading text-3xl font-extrabold text-white">
                <CountUp
                  to={rawValue}
                  duration={1500}
                  delay={delay + 200}
                  formatter={formatter}
                />
              </span>
              <span className="mt-1.5 text-xs text-cyan-500">{label}</span>
            </m.div>
          ))}
        </m.div>

        {/* — Bottom bar — */}
        <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-cyan-900 pt-8 sm:flex-row">
          <p className="text-xs text-cyan-800">
            © {new Date().getFullYear()} Kolabee Ltd. All rights reserved.
          </p>

          <m.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            className="group flex items-center gap-2 rounded-full bg-white/[0.02] backdrop-blur-2xl px-5 py-2.5 text-xs font-semibold text-cyan-50 border border-white/10 border-t-white/20 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_4px_24px_-4px_rgba(8,145,178,0.2)] transition-all hover:bg-white/[0.06] hover:border-white/15 hover:border-t-white/30 hover:text-white hover:shadow-[inset_0_1px_3px_rgba(255,255,255,0.2),0_8px_32px_-4px_rgba(8,145,178,0.4)]"
          >
            Back to top
            <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1" />
          </m.button>
        </div>
      </div>
    </footer>
  );
}
