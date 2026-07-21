"use client";

import { m } from "framer-motion";
import { Megaphone, Camera, Video, Users } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const servicesContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const serviceCardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const services = [
  { title: "Product Promotion", description: "Get your product in front of the right audience with authentic influencer campaigns.", icon: Megaphone },
  { title: "Product Photoshoots", description: "Commission high-quality, brand-aligned visual assets for your storefront and socials.", icon: Camera },
  { title: "Videography & UGC", description: "Source engaging user-generated content and professional video edits.", icon: Video },
  { title: "Ambassadorship & Referrals", description: "Turn top-performing creators into long-term partners with shared affiliate links.", icon: Users },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative px-6 py-24 sm:py-32 lg:px-8 bg-stone-50 dark:bg-gradient-to-b dark:from-cyan-950/40 dark:to-[#0f1923] overflow-hidden border-t border-stone-200 dark:border-white/5">

      {/* Ambient blobs for dark mode depth */}
      <div className="absolute inset-0 z-0 pointer-events-none hidden dark:block">
        <div className="absolute top-[20%] left-[10%] w-[40%] h-[50%] rounded-full bg-cyan-500/10 blur-[100px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[40%] rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: EASE }} className="mb-16 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-cyan-950 sm:text-4xl">One platform. Four ways to grow.</h2>
          <p className="mt-4 text-lg text-stone-600">Stop juggling spreadsheets and DMs. Handle every type of creator collaboration in one place.</p>
        </m.div>
        <m.div variants={servicesContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <m.div key={service.title} variants={serviceCardVariants} whileHover={{ y: -8 }} className="premium-glass group relative rounded-2xl p-8 transition-all">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 ring-1 ring-cyan-100 dark:ring-cyan-500/20 transition-colors group-hover:bg-cyan-600 group-hover:text-white dark:group-hover:bg-cyan-500">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-cyan-950">{service.title}</h3>
                <p className="mt-3 text-sm text-stone-600 leading-relaxed">{service.description}</p>
              </m.div>
            );
          })}
        </m.div>
      </div>
    </section>
  );
}
