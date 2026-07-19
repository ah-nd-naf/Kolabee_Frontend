import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Link Analytics",
  description: "Track click-through rates, geographic reach, and conversion trends for your shared links.",
};

/**
 * Link Analytics Page  →  /dashboard/analytics
 *
 * Planned sections:
 *  - KPI summary cards (total clicks, CTR, conversions)
 *  - Click-over-time line chart
 *  - Top performing links table
 *  - Geographic breakdown map
 */
export default function AnalyticsPage() {
  return (
    <div>
      {/* TODO: Build analytics dashboard */}
      <h1>Link Analytics</h1>
    </div>
  );
}
