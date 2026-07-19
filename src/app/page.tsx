"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Sparkles, 
  Megaphone, 
  Camera, 
  Video, 
  Users,
  FileText,
  UserCheck,
  CreditCard,
  UserCircle,
  Briefcase,
  Banknote
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const [activePersona, setActivePersona] = useState<"business" | "creator">("business");

  // Consistent easing curve applied across all animations
  const customEasing = [0.16, 1, 0.3, 1];

  // --- Hero Animations ---
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: customEasing } },
  };

  // --- Service Category Animations ---
  const servicesContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const serviceCardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: customEasing } },
  };

  const services = [
    { title: "Product Promotion", description: "Get your product in front of the right audience with authentic influencer campaigns.", icon: Megaphone },
    { title: "Product Photoshoots", description: "Commission high-quality, brand-aligned visual assets for your storefront and socials.", icon: Camera },
    { title: "Videography & UGC", description: "Source engaging user-generated content and professional video edits.", icon: Video },
    { title: "Ambassadorship & Referrals", description: "Turn top-performing creators into long-term partners with shared affiliate links.", icon: Users },
  ];

  // --- How It Works Data ---
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
    ]
  };

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-cyan-950 px-6 pt-32 pb-40 text-center sm:pt-40 sm:pb-48 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.15),rgba(255,255,255,0))]" />
        <motion.div className="mx-auto max-w-3xl" variants={heroContainerVariants} initial="hidden" animate="visible">
          <motion.div variants={heroItemVariants} className="mb-8 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-cyan-900/50 px-4 py-1.5 text-sm font-medium text-cyan-200 ring-1 ring-cyan-700/50">
              <Sparkles className="h-4 w-4" />
              <span>Matched to your brand, not just your budget.</span>
            </span>
          </motion.div>
          <motion.div variants={heroItemVariants}>
            <h1 className="font-heading text-5xl font-bold tracking-tight text-white sm:text-7xl">Everything a product launch needs</h1>
          </motion.div>
          <motion.div variants={heroItemVariants}>
            <p className="mt-6 text-lg leading-8 text-cyan-100 sm:text-xl">Kolabee connects businesses with top-tier creators for product promotion, photoshoots, and referral programs. One simple platform. Shared data.</p>
          </motion.div>
          <motion.div variants={heroItemVariants} className="mt-10 flex items-center justify-center gap-x-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/dashboard" className="group flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400">
                Post a Brief <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/dashboard" className="text-sm font-semibold leading-6 text-cyan-100 hover:text-white transition-colors">
                Join as a Creator <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Service Categories Section */}
      <section className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: customEasing }} className="mb-16 text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-cyan-950 sm:text-4xl">One platform. Four ways to grow.</h2>
            <p className="mt-4 text-lg text-stone-600">Stop juggling spreadsheets and DMs. Handle every type of creator collaboration in one place.</p>
          </motion.div>
          <motion.div variants={servicesContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div key={service.title} variants={serviceCardVariants} whileHover={{ y: -8 }} className="group relative rounded-2xl bg-white p-8 ring-1 ring-stone-200/50 shadow-sm transition-shadow hover:shadow-xl">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 ring-1 ring-cyan-100 transition-colors group-hover:bg-cyan-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-cyan-950">{service.title}</h3>
                  <p className="mt-3 text-sm text-stone-600 leading-relaxed">{service.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section className="bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: customEasing }} className="mb-16 text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-cyan-950 sm:text-4xl">How Kolabee works</h2>
            <p className="mt-4 text-lg text-stone-600">Built to make collaboration seamless, whichever side of the brief you are on.</p>
            
            {/* Interactive Toggle */}
            <div className="mt-8 flex justify-center">
              <div className="relative flex space-x-1 rounded-full bg-stone-100 p-1 ring-1 ring-stone-200">
                {(["business", "creator"] as const).map((persona) => (
                  <button
                    key={persona}
                    onClick={() => setActivePersona(persona)}
                    className={`relative rounded-full px-6 py-2.5 text-sm font-semibold outline-none transition-colors ${
                      activePersona === persona ? "text-cyan-900" : "text-stone-500 hover:text-stone-700"
                    }`}
                  >
                    {activePersona === persona && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 rounded-full bg-white shadow-sm ring-1 ring-stone-200/50"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 capitalize">For {persona === "business" ? "Businesses" : "Creators"}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Animated Steps Container */}
          <div className="relative mx-auto max-w-5xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePersona}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: customEasing }}
                className="grid grid-cols-1 gap-8 md:grid-cols-3"
              >
                {flowData[activePersona].map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.step} className="relative flex flex-col items-center text-center">
                      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-50 text-cyan-600 ring-8 ring-white">
                        <Icon className="h-7 w-7" />
                      </div>
                      {/* Connecting Line (hidden on mobile, visible on md+) */}
                      {index !== flowData[activePersona].length - 1 && (
                        <div className="absolute top-8 left-[60%] hidden h-[2px] w-[80%] bg-stone-100 md:block" />
                      )}
                      <h3 className="font-heading text-xl font-bold text-cyan-950">
                        <span className="mb-2 block text-sm font-medium text-cyan-600">Step {step.step}</span>
                        {step.title}
                      </h3>
                      <p className="mt-3 text-stone-600">{step.description}</p>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

    </main>
  );
}