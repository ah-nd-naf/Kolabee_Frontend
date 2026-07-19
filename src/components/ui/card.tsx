import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────
   Card — Kolabee primitive
   Sub-components: Card, CardHeader, CardTitle,
                   CardDescription, CardContent, CardFooter
───────────────────────────────────────────── */

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Adds a subtle cyan glow on hover */
  hoverable?: boolean;
}

export function Card({ className, hoverable = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--color-border)]",
        "bg-[var(--color-surface)] shadow-[var(--shadow-md)]",
        "transition-all duration-300 ease-[var(--ease-smooth)]",
        hoverable && "hover:shadow-[var(--shadow-glow)] hover:-translate-y-0.5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-1.5 p-6", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold leading-tight tracking-tight text-[var(--color-foreground)]",
        "font-[var(--font-heading)]",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-[var(--color-muted)]", className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6 pt-0", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center p-6 pt-0", className)} {...props}>
      {children}
    </div>
  );
}
