"use client";

import { m } from "framer-motion";
import { ArrowRight, ArrowUpRight, Rocket, BadgeCheck, TrendingUp, Users2, Building2, Star } from "lucide-react";
import Link from "next/link";
import { CountUp } from "@/components/ui/count-up";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-white">

      {/* Decorative top divider — thin cyan line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-60" />

      {/* Soft radial colour bleed — top-right corner accent */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-cyan-50 opacity-80 blur-[80px]" />
        <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-stone-100 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">

          {/* — LEFT: Copy + CTAs — */}
          <m.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow chip */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-cyan-50 px-4 py-1.5 ring-1 ring-cyan-200">
              <Rocket className="h-3.5 w-3.5 text-cyan-600" />
              <span className="text-xs font-semibold uppercase tracking-widest text-cyan-600">Ready when you are</span>
            </div>

            {/* Headline — dark ink + cyan gradient accent */}
            <h2 className="font-heading text-4xl font-bold leading-tight tracking-tight text-cyan-950 sm:text-5xl lg:text-[3.25rem]">
              Your next deal<br />
              <span className="bg-gradient-to-r from-cyan-500 to-cyan-700 bg-clip-text text-transparent">
                is waiting.
              </span>
            </h2>

            {/* Body copy — warm stone */}
            <p className="mt-6 max-w-lg text-base leading-relaxed text-stone-500">
              Whether you're launching a new product or looking for your next brand partnership — Kolabee is where the work gets done, transparently.
            </p>

            {/* Trust badges — light cyan tints */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { icon: BadgeCheck, label: 'No subscription fees' },
                { icon: BadgeCheck, label: 'Escrow-protected payments' },
                { icon: BadgeCheck, label: 'Shared real-time analytics' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 rounded-full bg-cyan-50 px-3 py-1.5 ring-1 ring-cyan-200">
                  <Icon className="h-3.5 w-3.5 text-cyan-500" />
                  <span className="text-xs font-medium text-cyan-700">{label}</span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <m.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/dashboard"
                  className="group inline-flex items-center gap-2 rounded-full bg-cyan-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-600/20 transition-all hover:bg-cyan-500"
                >
                  Post a Brief
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </m.div>

              <m.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-7 py-3.5 text-sm font-semibold text-stone-700 ring-1 ring-stone-200 transition-all hover:bg-stone-200"
                >
                  Join as a Creator
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </m.div>
            </div>
          </m.div>

          {/* — RIGHT: Proof cards stack — white cards with shadows — */}
          <m.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="flex flex-col gap-4"
          >
            {/* Card 1: creator stat */}
            <m.div
              whileHover={{ y: -5, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, ease: EASE }}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-md shadow-stone-200/80 ring-1 ring-stone-200"
            >
              <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-cyan-100/60 blur-2xl transition-all group-hover:bg-cyan-200/60" />
              <div className="relative flex items-start justify-between">
                <div>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 ring-1 ring-cyan-100">
                    <Users2 className="h-5 w-5" />
                  </div>
                  <p className="font-heading text-3xl font-extrabold text-cyan-950">
                    <CountUp to={12000} duration={1600} formatter={(n) => `${Math.round(n).toLocaleString()}+`} />
                  </p>
                  <p className="mt-1 text-sm text-stone-500">Vetted creators across all niches</p>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600 ring-1 ring-emerald-200">
                  <TrendingUp className="h-3 w-3" /> +24%
                </div>
              </div>
            </m.div>

            {/* Card 2: brand stat — offset right for depth */}
            <m.div
              whileHover={{ y: -5, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, ease: EASE }}
              className="group relative ml-6 overflow-hidden rounded-2xl bg-white p-6 shadow-md shadow-stone-200/80 ring-1 ring-stone-200"
            >
              <div className="absolute -left-6 -bottom-6 h-28 w-28 rounded-full bg-stone-100/80 blur-2xl transition-all group-hover:bg-cyan-100/60" />
              <div className="relative flex items-start justify-between">
                <div>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 ring-1 ring-cyan-100">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <p className="font-heading text-3xl font-extrabold text-cyan-950">
                    <CountUp to={2400} duration={1400} delay={100} formatter={(n) => `${Math.round(n).toLocaleString()}+`} />
                  </p>
                  <p className="mt-1 text-sm text-stone-500">Brands running active campaigns</p>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600 ring-1 ring-emerald-200">
                  <TrendingUp className="h-3 w-3" /> +18%
                </div>
              </div>
            </m.div>

            {/* Card 3: rating strip */}
            <m.div
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-950 to-cyan-900 p-5"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* Avatar stack */}
                  <div className="flex -space-x-2">
                    {['#0891b2','#06b6d4','#67e8f9','#a5f3fc'].map((c, i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full ring-2 ring-cyan-950"
                        style={{ background: `radial-gradient(circle at 35% 35%, ${c}, ${c}88)` }}
                      />
                    ))}
                  </div>
                  <div>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="mt-0.5 text-xs text-cyan-400">4.9 / 5 from 3,200+ reviews</p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full bg-cyan-800/60 px-3 py-1.5 text-xs font-semibold text-cyan-200 ring-1 ring-cyan-700">
                  Trusted platform
                </span>
              </div>
            </m.div>
          </m.div>

        </div>
      </div>
    </section>
  );
}
