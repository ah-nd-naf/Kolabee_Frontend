import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────
   Badge — Kolabee primitive
   Variants: default | primary | success | warning | danger | outline
───────────────────────────────────────────── */

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1 rounded-[var(--radius-full)]",
    "px-2.5 py-0.5 text-xs font-medium",
    "transition-colors duration-150",
    "select-none",
  ],
  {
    variants: {
      variant: {
        default: "bg-[var(--color-neutral-100)] text-[var(--color-neutral-700)]",
        primary: "bg-[var(--color-accent-100)] text-[var(--color-dark-bg)]",
        success: "bg-emerald-100 text-emerald-800",
        warning: "bg-amber-100  text-amber-800",
        danger:  "bg-red-100    text-red-700",
        outline: "border border-[var(--color-primary)] text-[var(--color-primary)] bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, className }))} {...props}>
      {children}
    </span>
  );
}

export { badgeVariants };
