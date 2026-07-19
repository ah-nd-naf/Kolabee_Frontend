"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  // We define a consistent easing curve as requested in the roadmap
  const customEasing = [0.16, 1, 0.3, 1];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: customEasing },
    },
  };

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      {/* Hero Section - Using the dark #083344 (cyan-950) theme requested */}
      <section className="relative overflow-hidden bg-cyan-950 px-6 pt-32 pb-40 text-center sm:pt-40 sm:pb-48 lg:px-8">
        
        {/* Subtle background gradient mesh/noise representation */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.15),rgba(255,255,255,0))]" />

        <motion.div
          className="mx-auto max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-8 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-cyan-900/50 px-4 py-1.5 text-sm font-medium text-cyan-200 ring-1 ring-cyan-700/50">
              <Sparkles className="h-4 w-4" />
              <span>Matched to your brand, not just your budget.</span>
            </span>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h1 className="font-heading text-5xl font-bold tracking-tight text-white sm:text-7xl">
              Everything a product launch needs
            </h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="mt-6 text-lg leading-8 text-cyan-100 sm:text-xl">
              Kolabee connects businesses with top-tier creators for product promotion, photoshoots, and referral programs. One simple platform. Shared data.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-10 flex items-center justify-center gap-x-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/dashboard"
                className="group flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
              >
                Post a Brief
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/dashboard"
                className="text-sm font-semibold leading-6 text-cyan-100 hover:text-white transition-colors"
              >
                Join as a Creator <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Placeholder for the next section to ensure scrolling works */}
      <div className="h-32 bg-stone-50" />
    </main>
  );
}