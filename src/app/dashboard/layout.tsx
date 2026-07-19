import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Kolabee dashboard — manage your links, analytics, and partner performance.",
};

/**
 * Dashboard Shell Layout  →  /dashboard/*
 *
 * Renders:
 *  - Sidebar navigation (Creator / Business Partner tabs)
 *  - Top navbar (user avatar, notifications)
 *  - Main content area (<slot> → children)
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* TODO: <DashboardSidebar /> */}
      <div className="flex flex-col flex-1">
        {/* TODO: <DashboardNavbar /> */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
