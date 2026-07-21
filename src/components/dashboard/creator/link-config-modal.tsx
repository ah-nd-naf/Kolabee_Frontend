"use client";

import { m, AnimatePresence } from "framer-motion";
import { Link2, X } from "lucide-react";
import { CreatorLink } from "@/lib/mock-data";

const EASE = [0.16, 1, 0.3, 1] as const;

interface LinkConfigModalProps {
  selectedLink: CreatorLink | null;
  onClose: () => void;
}

export function LinkConfigModal({ selectedLink, onClose }: LinkConfigModalProps) {
  return (
    <AnimatePresence>
      {selectedLink && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
          />
          
          {/* Modal Content */}
          <m.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl premium-glass shadow-2xl shadow-cyan-900/20 ring-1 ring-stone-200/50 dark:ring-white/10"
          >
            <div className="border-b border-stone-100/50 dark:border-white/10 bg-white/40 dark:bg-[#0a0f14]/40 px-6 py-4 flex items-center justify-between">
              <h3 className="font-heading text-lg font-bold text-cyan-950 dark:text-white">Link Configuration</h3>
              <m.button 
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="rounded-full p-1.5 text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
              >
                <X className="h-5 w-5" />
              </m.button>
            </div>
            
            <div className="p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300">
                  <Link2 className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-stone-900 dark:text-white">{selectedLink.title}</h4>
                  <p className="text-sm text-stone-500 dark:text-stone-400 line-clamp-1">kolabee.com/l/{selectedLink.code}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">Destination URL</label>
                  <div className="flex rounded-lg shadow-sm ring-1 ring-inset ring-stone-300 dark:ring-stone-700 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-600 sm:max-w-md bg-white/50 dark:bg-black/20">
                    <span className="flex select-none items-center pl-3 text-stone-500 dark:text-stone-400 sm:text-sm">https://</span>
                    <input
                      type="text"
                      defaultValue={selectedLink.destination.replace('https://', '')}
                      className="block flex-1 border-0 bg-transparent py-2.5 pl-1 text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:ring-0 sm:text-sm sm:leading-6 outline-none"
                    />
                  </div>
                  <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
                    This is where traffic will be redirected after hitting the Kolabee resolver.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-stone-50/50 dark:bg-stone-900/50 px-6 py-4 flex items-center justify-end gap-3 border-t border-stone-100/50 dark:border-white/10">
              <m.button 
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.15, ease: EASE }}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
              >
                Cancel
              </m.button>
              <m.button 
                onClick={onClose}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15, ease: EASE }}
                className="rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 transition-colors"
              >
                Save Changes
              </m.button>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}
