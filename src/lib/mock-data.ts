// src/lib/mock-data.ts

export type TrendDirection = "up" | "down" | "neutral";
export type Tier = "Bronze" | "Silver" | "Gold" | "Platinum";

export interface Partner {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  tier: Tier;
  commissionRateBps: number; // e.g., 200 = 2.00%
  orders: number;
  commissionPaid: number; // in BDT (Bangladesh Taka as per PRD)
  conversionRate: number; // percentage
  trend: TrendDirection;
  trendValue: number; // percentage change
  status: "Active" | "Invited" | "Ended";
}

// 1. Business View: Partner Performance Data
export const mockPartners: Partner[] = [
  {
    id: "p_1",
    name: "Aisha Rahman",
    handle: "@aishastyles",
    avatar: "https://i.pravatar.cc/150?u=aisha",
    tier: "Gold",
    commissionRateBps: 250, // 2.5%
    orders: 342,
    commissionPaid: 45000,
    conversionRate: 4.2,
    trend: "up",
    trendValue: 12.5,
    status: "Active",
  },
  {
    id: "p_2",
    name: "Tahmid Hasan",
    handle: "@tahmid.tech",
    avatar: "https://i.pravatar.cc/150?u=tahmid",
    tier: "Silver",
    commissionRateBps: 200, // 2.0%
    orders: 128,
    commissionPaid: 12500,
    conversionRate: 2.8,
    trend: "up",
    trendValue: 4.1,
    status: "Active",
  },
  {
    id: "p_3",
    name: "Nusrat Jahan",
    handle: "@nusrat_creates",
    avatar: "https://i.pravatar.cc/150?u=nusrat",
    tier: "Platinum",
    commissionRateBps: 300, // 3.0%
    orders: 890,
    commissionPaid: 135000,
    conversionRate: 5.6,
    trend: "neutral",
    trendValue: 0,
    status: "Active",
  },
  {
    id: "p_4",
    name: "Fahim Ahmed",
    handle: "@fahim.vlogs",
    avatar: "https://i.pravatar.cc/150?u=fahim",
    tier: "Bronze",
    commissionRateBps: 150, // 1.5%
    orders: 45,
    commissionPaid: 3200,
    conversionRate: 1.2,
    trend: "down",
    trendValue: 8.4,
    status: "Active",
  },
  {
    id: "p_5",
    name: "Sadia Islam",
    handle: "@sadia.ugc",
    avatar: "https://i.pravatar.cc/150?u=sadia",
    tier: "Silver",
    commissionRateBps: 200, // 2.0%
    orders: 0,
    commissionPaid: 0,
    conversionRate: 0,
    trend: "neutral",
    trendValue: 0,
    status: "Invited",
  },
];

// 2. Analytics View: Funnel Data
export const mockFunnelData = {
  totalVisits: 24500,
  viewedProduct: 18200,
  addedToCart: 5400,
  beganCheckout: 2100,
  orderConfirmed: 1405,
  
  // For the Recharts/Tremor visualization
  chartData: [
    { stage: "Visited", count: 24500 },
    { stage: "Viewed Product", count: 18200 },
    { stage: "Added to Cart", count: 5400 },
    { stage: "Began Checkout", count: 2100 },
    { stage: "Confirmed", count: 1405 },
  ],

  // Base number for the live ticking counter
  liveInCheckoutBase: 42, 
};

// 3. Creator View: My Links Data
export interface CreatorLink {
  id: string;
  title: string;
  code: string;
  destination: string;
  clicks: number;
  orders: number;
  status: "Active" | "Paused";
  createdAt: string;
}

export const mockCreatorLinks: CreatorLink[] = [
  {
    id: "l_1",
    title: "Summer Collection 2026",
    code: "KOLA-SUM26",
    destination: "https://brand.com/summer-26",
    clicks: 12450,
    orders: 423,
    status: "Active",
    createdAt: "2026-06-15",
  },
  {
    id: "l_2",
    title: "Tech Gadget Review Video",
    code: "KOLA-TECH99",
    destination: "https://brand.com/products/tech-99",
    clicks: 8320,
    orders: 112,
    status: "Active",
    createdAt: "2026-07-01",
  },
  {
    id: "l_3",
    title: "Old Winter Promo",
    code: "KOLA-WIN25",
    destination: "https://brand.com/winter-clearance",
    clicks: 4500,
    orders: 89,
    status: "Paused",
    createdAt: "2025-11-20",
  },
];

// 4. Creator View: Earnings & Tier Data
export const mockCreatorEarnings = {
  availableBalance: 28500,
  pendingCommissions: 6200,
  clearedThisMonth: 18400,
  currentTier: "Silver" as Tier,
  currentRateBps: 200,
  nextTier: "Gold" as Tier,
  nextTierThresholdBDT: 50000,
  progressTowardNextTier: 18400,
};

// 5. Creator View: Collaboration Invites
export interface CollabInvite {
  id: string;
  businessName: string;
  businessLogo: string;
  category: string;
  proposedRateBps: number;
  invitedAt: string;
}

export const mockCollabInvites: CollabInvite[] = [
  {
    id: "i_1",
    businessName: "GadgetHub",
    businessLogo: "https://i.pravatar.cc/150?u=gadgethub",
    category: "Product Promotion",
    proposedRateBps: 250,
    invitedAt: "2026-07-18",
  },
  {
    id: "i_2",
    businessName: "StyleNest",
    businessLogo: "https://i.pravatar.cc/150?u=stylenest",
    category: "UGC & Videography",
    proposedRateBps: 220,
    invitedAt: "2026-07-16",
  },
];