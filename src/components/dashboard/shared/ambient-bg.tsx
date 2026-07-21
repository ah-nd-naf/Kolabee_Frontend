// src/components/dashboard/shared/ambient-bg.tsx
// The 3 ambient glassmorphism blob divs used as the dashboard background.
// Purely decorative — no props needed.

export function AmbientBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[50%] rounded-full bg-cyan-400/30 dark:bg-cyan-500/10 blur-[100px]" />
      <div className="absolute top-[30%] -right-[5%] w-[35%] h-[50%] rounded-full bg-blue-500/20 dark:bg-blue-600/10 blur-[120px]" />
      <div className="absolute -bottom-[10%] left-[15%] w-[50%] h-[40%] rounded-full bg-purple-400/20 dark:bg-purple-600/10 blur-[100px]" />
    </div>
  );
}
