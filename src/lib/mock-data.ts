/**
 * mock-data.ts — Kolabee
 *
 * All hardcoded JSON data for the frontend-only application.
 * No backend or real database is used.
 *
 * Sections:
 *  1. Creator links
 *  2. Link analytics (time series + top links)
 *  3. Business partner performance
 *  4. Landing page content (features, testimonials, pricing)
 */

// ─────────────────────────────────────────────
// 1. CREATOR LINKS
// ─────────────────────────────────────────────

export type LinkStatus = "active" | "paused" | "expired";

export interface CreatorLink {
  id: string;
  title: string;
  url: string;
  shortUrl: string;
  clicks: number;
  conversions: number;
  ctr: number;       // 0–1 float
  revenue: number;   // USD
  status: LinkStatus;
  partner: string;
  createdAt: string; // ISO date string
  tags: string[];
}

export const creatorLinks: CreatorLink[] = [
  {
    id: "lnk_001",
    title: "Summer Tech Sale — GadgetHub",
    url: "https://gadgethub.com/sale/summer2025",
    shortUrl: "kolabee.link/gh-summer",
    clicks: 14200,
    conversions: 834,
    ctr: 0.0587,
    revenue: 4170,
    status: "active",
    partner: "GadgetHub",
    createdAt: "2025-06-01",
    tags: ["tech", "sale", "summer"],
  },
  {
    id: "lnk_002",
    title: "HealthPulse — 30-day Trial",
    url: "https://healthpulse.io/trial",
    shortUrl: "kolabee.link/hp-trial",
    clicks: 8900,
    conversions: 620,
    ctr: 0.0697,
    revenue: 3100,
    status: "active",
    partner: "HealthPulse",
    createdAt: "2025-05-15",
    tags: ["health", "trial", "fitness"],
  },
  {
    id: "lnk_003",
    title: "BookNest — Premium Membership",
    url: "https://booknest.com/premium",
    shortUrl: "kolabee.link/bn-premium",
    clicks: 5600,
    conversions: 210,
    ctr: 0.0375,
    revenue: 1260,
    status: "paused",
    partner: "BookNest",
    createdAt: "2025-04-20",
    tags: ["books", "reading", "subscription"],
  },
  {
    id: "lnk_004",
    title: "CloudDrive Pro — Annual Plan",
    url: "https://clouddrive.io/annual",
    shortUrl: "kolabee.link/cd-annual",
    clicks: 3200,
    conversions: 98,
    ctr: 0.0306,
    revenue: 2940,
    status: "active",
    partner: "CloudDrive",
    createdAt: "2025-03-10",
    tags: ["software", "cloud", "productivity"],
  },
  {
    id: "lnk_005",
    title: "StyleBox — Spring Collection",
    url: "https://stylebox.com/spring25",
    shortUrl: "kolabee.link/sb-spring",
    clicks: 1100,
    conversions: 22,
    ctr: 0.02,
    revenue: 330,
    status: "expired",
    partner: "StyleBox",
    createdAt: "2025-02-28",
    tags: ["fashion", "spring", "sale"],
  },
];

// ─────────────────────────────────────────────
// 2. LINK ANALYTICS
// ─────────────────────────────────────────────

export interface DailyClickData {
  date: string;   // "YYYY-MM-DD"
  clicks: number;
  conversions: number;
}

/** 30-day click & conversion time series */
export const clickTimeSeries: DailyClickData[] = [
  { date: "2025-06-01", clicks: 420,  conversions: 28 },
  { date: "2025-06-02", clicks: 510,  conversions: 34 },
  { date: "2025-06-03", clicks: 390,  conversions: 22 },
  { date: "2025-06-04", clicks: 610,  conversions: 41 },
  { date: "2025-06-05", clicks: 720,  conversions: 55 },
  { date: "2025-06-06", clicks: 680,  conversions: 48 },
  { date: "2025-06-07", clicks: 540,  conversions: 36 },
  { date: "2025-06-08", clicks: 810,  conversions: 63 },
  { date: "2025-06-09", clicks: 760,  conversions: 58 },
  { date: "2025-06-10", clicks: 930,  conversions: 74 },
  { date: "2025-06-11", clicks: 870,  conversions: 69 },
  { date: "2025-06-12", clicks: 640,  conversions: 44 },
  { date: "2025-06-13", clicks: 490,  conversions: 31 },
  { date: "2025-06-14", clicks: 560,  conversions: 38 },
  { date: "2025-06-15", clicks: 1020, conversions: 82 },
  { date: "2025-06-16", clicks: 890,  conversions: 71 },
  { date: "2025-06-17", clicks: 740,  conversions: 57 },
  { date: "2025-06-18", clicks: 620,  conversions: 42 },
  { date: "2025-06-19", clicks: 570,  conversions: 37 },
  { date: "2025-06-20", clicks: 830,  conversions: 66 },
  { date: "2025-06-21", clicks: 950,  conversions: 78 },
  { date: "2025-06-22", clicks: 1100, conversions: 91 },
  { date: "2025-06-23", clicks: 980,  conversions: 80 },
  { date: "2025-06-24", clicks: 860,  conversions: 68 },
  { date: "2025-06-25", clicks: 730,  conversions: 54 },
  { date: "2025-06-26", clicks: 690,  conversions: 49 },
  { date: "2025-06-27", clicks: 810,  conversions: 63 },
  { date: "2025-06-28", clicks: 1050, conversions: 87 },
  { date: "2025-06-29", clicks: 920,  conversions: 73 },
  { date: "2025-06-30", clicks: 780,  conversions: 60 },
];

export interface AnalyticsKPI {
  label: string;
  value: string;
  change: number;  // % change (positive = up, negative = down)
  icon: string;    // lucide icon name
}

export const analyticsKPIs: AnalyticsKPI[] = [
  { label: "Total Clicks",   value: "32,900", change: 18.4, icon: "MousePointerClick" },
  { label: "Conversions",    value: "1,784",  change: 12.1, icon: "ShoppingCart" },
  { label: "Avg. CTR",       value: "5.42%",  change: -2.3, icon: "TrendingUp" },
  { label: "Total Revenue",  value: "$11,600",change: 22.8, icon: "DollarSign" },
];

export interface GeoBreakdown {
  country: string;
  code: string;   // ISO 3166-1 alpha-2
  clicks: number;
  percent: number;
}

export const geoBreakdown: GeoBreakdown[] = [
  { country: "United States", code: "US", clicks: 14800, percent: 44.9 },
  { country: "United Kingdom",code: "GB", clicks: 5200,  percent: 15.8 },
  { country: "Canada",        code: "CA", clicks: 3900,  percent: 11.9 },
  { country: "Australia",     code: "AU", clicks: 2800,  percent: 8.5  },
  { country: "Germany",       code: "DE", clicks: 2100,  percent: 6.4  },
  { country: "Other",         code: "XX", clicks: 4100,  percent: 12.5 },
];

// ─────────────────────────────────────────────
// 3. BUSINESS PARTNER PERFORMANCE
// ─────────────────────────────────────────────

export type PartnerStatus = "active" | "pending" | "paused" | "terminated";
export type PartnerTier   = "bronze" | "silver" | "gold" | "platinum";

export interface BusinessPartner {
  id: string;
  name: string;
  logo: string;              // placeholder initials or emoji
  industry: string;
  tier: PartnerTier;
  status: PartnerStatus;
  totalLinks: number;
  totalClicks: number;
  conversions: number;
  conversionRate: number;    // 0–1 float
  revenue: number;           // USD generated
  commissionRate: number;    // 0–1 float
  commissionPaid: number;    // USD paid to creators
  joinedAt: string;          // ISO date
  lastActivityAt: string;    // ISO date
}

export const businessPartners: BusinessPartner[] = [
  {
    id: "bp_001",
    name: "GadgetHub",
    logo: "GH",
    industry: "Consumer Electronics",
    tier: "platinum",
    status: "active",
    totalLinks: 48,
    totalClicks: 142000,
    conversions: 8340,
    conversionRate: 0.0587,
    revenue: 417000,
    commissionRate: 0.1,
    commissionPaid: 41700,
    joinedAt: "2024-01-15",
    lastActivityAt: "2025-07-18",
  },
  {
    id: "bp_002",
    name: "HealthPulse",
    logo: "HP",
    industry: "Health & Wellness",
    tier: "gold",
    status: "active",
    totalLinks: 32,
    totalClicks: 89000,
    conversions: 6200,
    conversionRate: 0.0697,
    revenue: 310000,
    commissionRate: 0.12,
    commissionPaid: 37200,
    joinedAt: "2024-03-22",
    lastActivityAt: "2025-07-17",
  },
  {
    id: "bp_003",
    name: "BookNest",
    logo: "BN",
    industry: "Publishing & Media",
    tier: "silver",
    status: "paused",
    totalLinks: 18,
    totalClicks: 56000,
    conversions: 2100,
    conversionRate: 0.0375,
    revenue: 126000,
    commissionRate: 0.08,
    commissionPaid: 10080,
    joinedAt: "2024-06-10",
    lastActivityAt: "2025-06-30",
  },
  {
    id: "bp_004",
    name: "CloudDrive",
    logo: "CD",
    industry: "SaaS / Productivity",
    tier: "gold",
    status: "active",
    totalLinks: 25,
    totalClicks: 32000,
    conversions: 980,
    conversionRate: 0.0306,
    revenue: 294000,
    commissionRate: 0.15,
    commissionPaid: 44100,
    joinedAt: "2024-02-05",
    lastActivityAt: "2025-07-15",
  },
  {
    id: "bp_005",
    name: "StyleBox",
    logo: "SB",
    industry: "Fashion & Apparel",
    tier: "bronze",
    status: "terminated",
    totalLinks: 8,
    totalClicks: 11000,
    conversions: 220,
    conversionRate: 0.02,
    revenue: 33000,
    commissionRate: 0.07,
    commissionPaid: 2310,
    joinedAt: "2024-09-01",
    lastActivityAt: "2025-04-01",
  },
  {
    id: "bp_006",
    name: "FreshBrew",
    logo: "FB",
    industry: "Food & Beverage",
    tier: "silver",
    status: "pending",
    totalLinks: 0,
    totalClicks: 0,
    conversions: 0,
    conversionRate: 0,
    revenue: 0,
    commissionRate: 0.09,
    commissionPaid: 0,
    joinedAt: "2025-07-10",
    lastActivityAt: "2025-07-10",
  },
];

// ─────────────────────────────────────────────
// 4. LANDING PAGE CONTENT
// ─────────────────────────────────────────────

export interface Feature {
  id: string;
  icon: string;      // lucide icon name
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    id: "feat_01",
    icon: "Link2",
    title: "Smart Link Management",
    description:
      "Create, organise, and share trackable links with your business partners in seconds. Full URL control, custom slugs, and expiry settings included.",
  },
  {
    id: "feat_02",
    icon: "BarChart3",
    title: "Real-Time Analytics",
    description:
      "Visualise click-through rates, conversion funnels, and geographic reach with beautiful, interactive dashboards that update in real time.",
  },
  {
    id: "feat_03",
    icon: "Handshake",
    title: "Partner Performance Hub",
    description:
      "A transparent, sortable performance table so both creators and business partners always know exactly who is driving results.",
  },
  {
    id: "feat_04",
    icon: "ShieldCheck",
    title: "Trust & Transparency",
    description:
      "Shared metrics eliminate disputes. Both sides of every collaboration see the same numbers — no more black boxes.",
  },
  {
    id: "feat_05",
    icon: "Zap",
    title: "Instant Setup",
    description:
      "No technical expertise required. Connect your first partner campaign in under 5 minutes and start tracking immediately.",
  },
  {
    id: "feat_06",
    icon: "BellRing",
    title: "Smart Notifications",
    description:
      "Milestone alerts, weekly digests, and anomaly detection keep you informed without overwhelming your inbox.",
  },
];

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;    // initials fallback
  quote: string;
  rating: number;    // 1–5
}

export const testimonials: Testimonial[] = [
  {
    id: "tm_01",
    name: "Priya Sharma",
    role: "Content Creator",
    company: "TechWithPriya",
    avatar: "PS",
    quote:
      "Kolabee completely changed how I work with sponsors. I can finally see exactly which links convert and prove my value to partners with real data.",
    rating: 5,
  },
  {
    id: "tm_02",
    name: "Marcus Webb",
    role: "Head of Partnerships",
    company: "GadgetHub",
    avatar: "MW",
    quote:
      "We've reduced creator reconciliation time by 80%. The performance table gives our team instant clarity on campaign ROI across all our creator relationships.",
    rating: 5,
  },
  {
    id: "tm_03",
    name: "Yuki Tanaka",
    role: "Lifestyle Influencer",
    company: "Yuki Creates",
    avatar: "YT",
    quote:
      "The analytics dashboard is beautiful and dead simple. I used to lose hours chasing reports from brands — now everything is just there.",
    rating: 5,
  },
  {
    id: "tm_04",
    name: "Sophie Laurent",
    role: "Marketing Director",
    company: "HealthPulse",
    avatar: "SL",
    quote:
      "Kolabee made it trivial to scale our creator programme from 5 to 50 creators without adding headcount. The shared dashboard is a game-changer.",
    rating: 4,
  },
];

export interface PricingPlan {
  id: string;
  name: string;
  price: number;   // monthly USD (0 = free)
  period: string;
  badge?: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "plan_free",
    name: "Starter",
    price: 0,
    period: "month",
    features: [
      "Up to 5 active links",
      "Basic click analytics",
      "1 business partner",
      "7-day data retention",
      "Email support",
    ],
    cta: "Get started free",
    highlighted: false,
  },
  {
    id: "plan_pro",
    name: "Pro",
    price: 29,
    period: "month",
    badge: "Most Popular",
    features: [
      "Unlimited active links",
      "Real-time analytics & charts",
      "Up to 10 business partners",
      "90-day data retention",
      "Conversion tracking",
      "Priority email support",
    ],
    cta: "Start 14-day trial",
    highlighted: true,
  },
  {
    id: "plan_business",
    name: "Business",
    price: 99,
    period: "month",
    features: [
      "Everything in Pro",
      "Unlimited partners",
      "1-year data retention",
      "Custom branded short links",
      "API access",
      "Dedicated account manager",
      "White-label reports",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
];

// ─────────────────────────────────────────────
// 5. NAVIGATION
// ─────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  icon?: string;   // lucide icon name
}

export const landingNav: NavItem[] = [
  { label: "Features",    href: "/#features" },
  { label: "How it works",href: "/#how-it-works" },
  { label: "Pricing",     href: "/#pricing" },
  { label: "Blog",        href: "/blog" },
];

export const dashboardCreatorNav: NavItem[] = [
  { label: "Overview",    href: "/dashboard",               icon: "LayoutDashboard" },
  { label: "My Links",    href: "/dashboard/creator/links", icon: "Link2" },
  { label: "Analytics",   href: "/dashboard/analytics",     icon: "BarChart3" },
];

export const dashboardPartnerNav: NavItem[] = [
  { label: "Overview",    href: "/dashboard",                        icon: "LayoutDashboard" },
  { label: "Performance", href: "/dashboard/business/performance",   icon: "TrendingUp" },
  { label: "Analytics",   href: "/dashboard/analytics",              icon: "BarChart3" },
];
