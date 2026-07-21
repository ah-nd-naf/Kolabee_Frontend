"use client";

import { m } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function PricingSection() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-dark-section px-6 py-24 sm:py-32 lg:px-8 text-center z-0">
      <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-[120px]" />

      <div className="mx-auto max-w-4xl relative z-10">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
            One simple fee. Only when a deal completes.
          </h2>
          <p className="mt-4 text-lg text-cyan-200">
            No subscriptions. No listing fees. We only make money when you do.
          </p>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: EASE, delay: 0.1 }}
          className="mt-16 mx-auto max-w-2xl rounded-3xl bg-gradient-to-b from-cyan-400 to-cyan-900 p-[1px] shadow-2xl shadow-cyan-900/50"
        >
          <div className="rounded-[23px] bg-cyan-950 p-8 sm:p-12">
            <div className="grid grid-cols-1 gap-8 divide-y divide-cyan-800 md:grid-cols-2 md:divide-y-0 md:divide-x">

              <div className="flex flex-col items-center md:pr-8">
                <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">Service Deals</span>
                <div className="mt-4 flex items-baseline text-6xl font-extrabold text-white">
                  10<span className="text-4xl">%</span>
                </div>
                <p className="mt-4 text-sm text-cyan-200 text-center leading-relaxed">
                  Deducted from escrow <strong className="text-white font-medium">only</strong> when funds are released to the creator.
                </p>
              </div>

              <div className="flex flex-col items-center pt-8 md:pl-8 md:pt-0">
                <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">Referral Programs</span>
                <div className="mt-4 flex items-baseline text-6xl font-extrabold text-white">
                  2<span className="text-4xl">%</span>
                </div>
                <p className="mt-4 text-sm text-cyan-200 text-center leading-relaxed">
                  Of the attributed order value. Deducted alongside the creator's commission.
                </p>
              </div>

            </div>

            <ul className="mt-10 flex flex-col justify-center gap-4 border-t border-cyan-800/50 pt-8 sm:flex-row sm:gap-10">
              <li className="flex items-center justify-center gap-2 text-sm font-medium text-cyan-100">
                <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                Zero Subscription Fees
              </li>
              <li className="flex items-center justify-center gap-2 text-sm font-medium text-cyan-100">
                <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                Zero Listing Fees
              </li>
            </ul>
          </div>
        </m.div>
      </div>
    </section>
  );
}
