import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────
   Section — layout wrapper primitive
   Handles:
     • Consistent vertical padding
     • Optional dark background (cyan-950)
     • Optional container max-width + centering
     • Responsive horizontal padding
───────────────────────────────────────────── */

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Renders with the dark-section (#083344) background */
  dark?: boolean;
  /** Wraps children in a max-width container */
  contained?: boolean;
  /** Semantic HTML tag override */
  as?: "section" | "div" | "article" | "aside";
}

export function Section({
  dark = false,
  contained = true,
  as: Tag = "section",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn(
        "w-full py-16 md:py-24",
        dark ? "bg-dark-section text-white" : "bg-[var(--color-background)]",
        className
      )}
      {...props}
    >
      {contained ? (
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      ) : (
        children
      )}
    </Tag>
  );
}

/* ── Convenience: SectionHeader ── */
interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-12", centered && "text-center mx-auto max-w-2xl")}>
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)]">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold leading-tight text-[var(--color-foreground)] md:text-4xl font-[var(--font-heading)]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base text-[var(--color-muted)] md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
