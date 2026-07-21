// src/components/ui/skeleton.tsx

import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────
   Skeleton — shimmer loading placeholder
   Uses CSS animation for zero-dependency shimmer.
   Compose with cn() to override width/height/radius.
───────────────────────────────────────────── */

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Height shorthand */
  h?: string;
  /** Width shorthand */
  w?: string;
}

export function Skeleton({ className, h, w, style, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("skeleton-shimmer rounded-lg", className)}
      style={{ height: h, width: w, ...style }}
      aria-hidden="true"
      {...props}
    />
  );
}

/* ── Preset skeletons for common patterns ── */

/** KPI / Stat card skeleton */
export function StatCardSkeleton() {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-28 rounded-full" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <Skeleton className="h-9 w-24 rounded-lg" />
        <Skeleton className="h-4 w-14 rounded-full" />
      </div>
    </div>
  );
}

/** Link card skeleton */
export function LinkCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-36 rounded-full" />
            <Skeleton className="h-3 w-24 rounded-full" />
          </div>
        </div>
        <Skeleton className="h-5 w-5 rounded" />
      </div>
      <div className="mt-6 flex items-center justify-between border-y border-stone-100 py-4">
        <div className="flex flex-col items-center gap-2 w-1/2">
          <Skeleton className="h-3 w-14 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-lg" />
        </div>
        <div className="flex flex-col items-center gap-2 w-1/2">
          <Skeleton className="h-3 w-14 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-lg" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <Skeleton className="h-10 flex-1 rounded-lg" />
        <Skeleton className="h-10 flex-1 rounded-lg" />
      </div>
    </div>
  );
}

/** Table row skeleton */
export function TableRowSkeleton({ delay = 0 }: { delay?: number }) {
  return (
    <div
      className="flex items-center gap-4 px-4 py-3 border-b border-stone-100 last:border-0"
      style={{ animationDelay: `${delay}ms` }}
    >
      <Skeleton className="h-9 w-9 rounded-full shrink-0" />
      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
        <Skeleton className="h-4 w-32 rounded-full" />
        <Skeleton className="h-3 w-20 rounded-full" />
      </div>
      <Skeleton className="h-6 w-16 rounded-full hidden sm:block" />
      <Skeleton className="h-4 w-12 rounded-full" />
      <Skeleton className="h-4 w-12 rounded-full hidden md:block" />
    </div>
  );
}

/** Bar chart skeleton */
export function ChartSkeleton() {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <Skeleton className="h-5 w-40 rounded-full mb-6" />
      <div className="h-[400px] w-full flex flex-col justify-end gap-3 pt-8">
        {[80, 65, 45, 30, 22].map((w, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-3 w-24 rounded-full shrink-0" />
            <Skeleton
              className="h-10 rounded-r-lg"
              style={{ width: `${w}%`, animationDelay: `${i * 80}ms` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
