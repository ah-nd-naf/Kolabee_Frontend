import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Partner Performance",
  description: "Detailed performance metrics table for all business partner campaigns and link conversions.",
};

/**
 * Business Partner Performance Table  →  /dashboard/business/performance
 *
 * Planned sections:
 *  - Filter / search bar (date range, partner, status)
 *  - Sortable data table (partner name, clicks, conversions, revenue, status)
 *  - Export CSV button
 *  - Pagination
 */
export default function BusinessPerformancePage() {
  return (
    <div>
      {/* TODO: Build business partner performance table */}
      <h1>Business Partner Performance</h1>
    </div>
  );
}
