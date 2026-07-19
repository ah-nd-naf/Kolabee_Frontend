import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Links",
  description: "Manage all your creator affiliate and collaboration links in one place.",
};

/**
 * Creator My Links Page  →  /dashboard/creator/links
 *
 * Planned sections:
 *  - Add new link button / modal
 *  - Links grid / list (title, URL, clicks, status badge)
 *  - Copy-to-clipboard action
 *  - Link detail drawer / modal
 */
export default function CreatorLinksPage() {
  return (
    <div>
      {/* TODO: Build creator links management page */}
      <h1>My Links</h1>
    </div>
  );
}
