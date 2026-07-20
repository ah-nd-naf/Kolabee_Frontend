"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft, Image as ImageIcon, Video, Package, CheckCircle2 } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

interface BriefWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BriefWizard({ isOpen, onClose }: BriefWizardProps) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  const nextStep = () => {
    setDirection(1);
    setStep((s) => s + 1);
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const resetAndClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setDirection(1);
    }, 300); // Reset after modal finishes exit animation
  };

  // Content for each step
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-cyan-950 font-heading">What kind of brief is this?</h3>
              <p className="text-sm text-stone-500">Select the primary deliverable you need from creators.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: "ugc", title: "Video & UGC", icon: Video, desc: "TikToks, Reels, Shorts" },
                { id: "photo", title: "Photoshoots", icon: ImageIcon, desc: "Product & Lifestyle" },
                { id: "seeding", title: "Product Seeding", icon: Package, desc: "Gifting & Unboxing" },
              ].map((type) => (
                <div 
                  key={type.id}
                  className="flex flex-col items-center text-center p-4 rounded-xl border-2 border-stone-100 hover:border-cyan-500 hover:bg-cyan-50 cursor-pointer transition-colors"
                >
                  <type.icon className="h-6 w-6 text-cyan-600 mb-2" />
                  <span className="text-sm font-bold text-cyan-950">{type.title}</span>
                  <span className="text-xs text-stone-500 mt-1">{type.desc}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-cyan-950 font-heading">Campaign Details</h3>
              <p className="text-sm text-stone-500">Give your campaign a name and set your budget.</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Campaign Name</label>
                <input
                  type="text"
                  placeholder="e.g., Summer Collection Launch"
                  className="w-full rounded-lg border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-900 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Budget (per creator)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 font-medium">৳</span>
                  <input
                    type="number"
                    placeholder="15,000"
                    className="w-full rounded-lg border border-stone-200 bg-white pl-8 pr-4 py-2.5 text-sm text-stone-900 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col items-center justify-center text-center py-8 space-y-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600"
            >
              <CheckCircle2 className="h-8 w-8" />
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-cyan-950 font-heading">Brief Posted!</h3>
              <p className="text-sm text-stone-500 mt-2 max-w-[250px] mx-auto">
                Your brief is now live. We'll notify matching creators immediately.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Variants for sliding content left/right
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-0">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE }}
            onClick={resetAndClose}
            className="absolute inset-0 bg-cyan-950/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-stone-100 bg-stone-50/50 px-6 py-4 z-10">
              <div className="flex items-center gap-3">
                <span className="font-heading text-lg font-bold text-cyan-950">Post a Brief</span>
                {step < 3 && (
                  <span className="rounded-full bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800">
                    Step {step} of 2
                  </span>
                )}
              </div>
              <button 
                onClick={resetAndClose}
                className="rounded-full p-1.5 text-stone-400 hover:bg-stone-200 hover:text-stone-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Progress Bar */}
            {step < 3 && (
              <div className="h-1 w-full bg-stone-100">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: `${(step / 2) * 100}%` }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="h-full bg-cyan-500"
                />
              </div>
            )}

            {/* Sliding Content Area */}
            <div className="relative overflow-hidden min-h-[250px] p-6">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={step}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: EASE }}
                  className="absolute inset-0 p-6"
                >
                  {renderStepContent()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer Navigation */}
            <div className="flex items-center justify-between border-t border-stone-100 bg-stone-50 px-6 py-4 z-10">
              {step === 1 ? (
                <div /> // Empty div to push 'Next' to the right
              ) : step < 3 ? (
                <button
                  onClick={prevStep}
                  className="flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-800 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
              ) : (
                <div />
              )}

              {step < 2 ? (
                <button
                  onClick={nextStep}
                  className="flex items-center gap-2 rounded-full bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-cyan-500 transition-colors shadow-sm"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              ) : step === 2 ? (
                <button
                  onClick={nextStep}
                  className="flex items-center gap-2 rounded-full bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-cyan-500 transition-colors shadow-sm"
                >
                  Publish Brief <CheckCircle2 className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={resetAndClose}
                  className="rounded-full bg-stone-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-stone-800 transition-colors"
                >
                  Done
                </button>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}