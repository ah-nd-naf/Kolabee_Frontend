"use client";

import { m } from "framer-motion";
import { Smartphone } from "lucide-react";
import Image from "next/image";
import { CreatorLink } from "@/lib/mock-data";

const EASE = [0.16, 1, 0.3, 1] as const;

interface LivePreviewPhoneProps {
  isLoading: boolean;
  activeLinks: CreatorLink[];
}

export function LivePreviewPhone({ isLoading, activeLinks }: LivePreviewPhoneProps) {
  return (
    <m.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
      className="hidden lg:flex w-[320px] shrink-0 flex-col items-center sticky top-24"
    >
      <div className="flex items-center gap-2 mb-4 text-cyan-900/50">
        <Smartphone className="h-4 w-4" />
        <span className="text-xs font-bold uppercase tracking-widest">Live Preview</span>
      </div>

      {/* Phone Hardware Frame */}
      <div className="relative h-[650px] w-full rounded-[3rem] border-[10px] border-stone-900 bg-stone-900 shadow-2xl overflow-hidden ring-1 ring-stone-900/20">
        
        {/* Phone Notch/Dynamic Island */}
        <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
          <div className="w-32 h-6 bg-stone-900 rounded-b-3xl"></div>
        </div>

        {/* Phone Screen UI */}
        <div className="relative h-full w-full bg-stone-50 overflow-y-auto overflow-x-hidden no-scrollbar">
          
          {/* Premium Background Mesh inside phone */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.15),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(8,51,68,0.1),transparent_50%)]" />

          <div className="relative z-10 flex flex-col px-6 pt-16 pb-10">
            
            {/* Creator Public Profile */}
            <m.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6, ease: EASE }}
              className="flex flex-col items-center text-center mb-8"
            >
              <Image 
                src="https://i.pravatar.cc/150?u=kolabee_admin" 
                alt="Alex Morgan" 
                width={96}
                height={96}
                className="h-24 w-24 rounded-full object-cover shadow-lg ring-4 ring-white mb-4"
              />
              <h2 className="font-heading text-xl font-bold text-cyan-950">Alex Morgan</h2>
              <p className="mt-1 text-sm font-medium text-stone-500">@kolabee.co</p>
              <p className="mt-3 text-xs text-stone-600 leading-relaxed px-2">
                Creating tech content & reviewing the best gadgets out there. Welcome to my storefront! 🚀
              </p>
            </m.div>

            {/* Simulated Public Links */}
            <div className="flex flex-col gap-3">
              {isLoading ? (
                // Phone Link Skeletons
                [1, 2].map((i) => (
                  <div key={i} className="h-14 w-full rounded-2xl bg-stone-200 animate-pulse" />
                ))
              ) : (
                activeLinks.map((link, index) => (
                  <m.a
                    key={link.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 + (index * 0.1), ease: EASE }}
                    href="#"
                    className="group flex items-center justify-center p-4 rounded-2xl bg-white text-sm font-semibold text-cyan-950 shadow-sm ring-1 ring-stone-200/50 hover:ring-cyan-300 hover:shadow-md transition-all active:scale-95 relative overflow-hidden"
                  >
                    <span className="relative z-10">{link.title}</span>
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-cyan-50 to-transparent transition-opacity" />
                  </m.a>
                ))
              )}
            </div>

            {/* Kolabee Watermark */}
            <div className="mt-12 flex justify-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 flex items-center gap-1">
                Powered by Kolabee
              </span>
            </div>
          </div>
        </div>
      </div>
    </m.div>
  );
}
