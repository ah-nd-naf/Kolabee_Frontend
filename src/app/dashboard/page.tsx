"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function DashboardOverview() {
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center rounded-2xl border border-dashed border-stone-200 bg-white text-center shadow-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center"
      >
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-50 text-cyan-600 ring-8 ring-cyan-50/50">
          <Sparkles className="h-8 w-8" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-cyan-950">Welcome to Kolabee</h2>
        <p className="mt-2 max-w-md text-stone-500">
          Use the sidebar to navigate to your Link Analytics or Partner Performance views to see the real data in action.
        </p>
      </motion.div>
    </div>
  );
}