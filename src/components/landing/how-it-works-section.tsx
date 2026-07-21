"use client";

import { m, AnimatePresence } from "framer-motion";
import { ArrowRight, FileText, UserCheck, CreditCard, UserCircle, Briefcase, Banknote } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const flowData = {
  business: [
    { step: "01", title: "Post a brief", description: "Outline your requirements, deliverables, and budget in minutes.", icon: FileText },
    { step: "02", title: "Get matched & hire", description: "Review applications, compare performance data, and hire the best fit.", icon: UserCheck },
    { step: "03", title: "Pay on delivery", description: "Funds are held securely and only released when you approve the work.", icon: CreditCard },
  ],
  creator: [
    { step: "01", title: "Build your profile", description: "Showcase your portfolio, rates, and past performance metrics.", icon: UserCircle },
    { step: "02", title: "Get matched to briefs", description: "Apply to open campaigns or receive direct invites from top brands.", icon: Briefcase },
    { step: "03", title: "Deliver & get paid", description: "Submit your work and get paid reliably. No chasing invoices.", icon: Banknote },
  ],
};

interface HowItWorksSectionProps {
  activePersona: "business" | "creator";
  setActivePersona: (p: "business" | "creator") => void;
}

export function HowItWorksSection({ activePersona, setActivePersona }: HowItWorksSectionProps) {
  return (
    <section className="relative px-6 py-24 sm:py-32 lg:px-8 bg-white dark:bg-gradient-to-b dark:from-[#0f1923] dark:to-[#0a0f14] overflow-hidden">

      {/* Ambient blobs for dark mode depth */}
      <div className="absolute inset-0 z-0 pointer-events-none hidden dark:block">
        <div className="absolute top-[30%] left-[20%] w-[30%] h-[40%] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[20%] w-[40%] h-[50%] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: EASE }} className="mb-16 text-center relative flex flex-col items-center">

          {/* Glowing Orb Behind Text (Dark Mode Only) */}
          <m.div
            animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.9, 1.1, 0.9] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-48 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-[60px] rounded-full hidden dark:block pointer-events-none -z-10"
          />

          <h2 className="relative font-heading text-3xl font-bold tracking-tight text-cyan-950 sm:text-4xl">
            <span className="relative z-10 dark:drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]">How Kolabee works</span>
          </h2>
          <p className="relative mt-4 text-lg text-stone-600 dark:text-cyan-50 max-w-2xl mx-auto">
            <span className="relative z-10 dark:drop-shadow-[0_0_8px_rgba(103,232,249,0.5)] leading-relaxed">
              Built to make collaboration seamless, whichever side of the brief you are on.
            </span>
          </p>

          {/* Interactive Toggle */}
          <div className="mt-8 flex justify-center">
            <div className="relative flex space-x-1 rounded-full bg-stone-100 dark:bg-white/[0.05] p-1 ring-1 ring-stone-200 dark:ring-white/[0.05]">
              {(["business", "creator"] as const).map((persona) => (
                <button
                  key={persona}
                  onClick={() => setActivePersona(persona)}
                  className={`relative rounded-full px-6 py-2.5 text-sm font-semibold outline-none transition-colors ${
                    activePersona === persona ? "text-cyan-900 dark:text-cyan-50" : "text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300"
                  }`}
                >
                  {activePersona === persona && (
                    <m.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full bg-white dark:bg-cyan-900/60 shadow-sm ring-1 ring-stone-200/50 dark:ring-cyan-800/50"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 capitalize">For {persona === "business" ? "Businesses" : "Creators"}</span>
                </button>
              ))}
            </div>
          </div>
        </m.div>

        {/* Animated Steps Container */}
        <div className="relative mx-auto max-w-5xl">
          <AnimatePresence mode="wait">
            <m.div
              key={activePersona}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.4 } },
                exit: { opacity: 0, y: -15, transition: { duration: 0.3 } }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              exit="exit"
              className="grid grid-cols-1 gap-8 md:grid-cols-3"
            >
              {flowData[activePersona].map((step, index) => {
                const Icon = step.icon;
                return (
                  <m.div
                    key={step.step}
                    variants={{
                      hidden: { opacity: 0, x: -40 },
                      visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: EASE } }
                    }}
                    className="premium-glass relative flex flex-col items-center text-center p-8 rounded-3xl transition-all"
                  >
                    <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 ring-8 ring-transparent">
                      <Icon className="h-7 w-7" />
                    </div>
                    {/* Next Step Indicator */}
                    {index !== flowData[activePersona].length - 1 && (
                      <m.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="absolute top-1/2 -right-[20px] hidden md:flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white dark:bg-[#121c26] shadow-md ring-1 ring-stone-200/50 dark:ring-white/10 z-20 text-cyan-600 dark:text-cyan-500"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </m.div>
                    )}
                    <h3 className="font-heading text-xl font-bold text-cyan-950">
                      <span className="mb-2 block text-sm font-medium text-cyan-600">Step {step.step}</span>
                      {step.title}
                    </h3>
                    <p className="mt-3 text-stone-600">{step.description}</p>
                  </m.div>
                );
              })}
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
