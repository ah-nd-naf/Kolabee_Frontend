# Kolabee

**Kolabee** is a premium Creator & Partner Collaboration Platform designed to connect businesses with top-tier creators for product promotion, photoshoots, and referral programs. 

It features a state-of-the-art web interface built with **Next.js**, leveraging advanced animation techniques, premium glassmorphism aesthetics, and a flawless Light/Dark mode experience.

---

## ✨ Key Features

### 🚀 Stunning Landing Page
- **Immersive Hero Section:** Features a dynamic aurora glow background, animated grain texture, and an interactive particle canvas that reacts to mouse movement.
- **Premium Glassmorphism:** Service cards and process steps utilize a highly customized, unified 3D glassmorphism design system (`.premium-glass`) that dynamically adapts to both light and dark themes.
- **Scroll-Triggered Animations:** Smooth, step-by-step staggered slide-in animations as the user scrolls down the page.
- **Interactive Persona Toggle:** Instantly switch between "For Businesses" and "For Creators" views with seamless layout animations via `framer-motion`.

### 📊 Powerful Dashboard
- **Role-Based Workspaces:** Dedicated views for Businesses and Creators with customized sidebar navigation.
- **Overview & Tracking:** Glassmorphism stat cards with live data indicators, alongside an interactive multi-step "Active Deal Tracker".
- **Advanced UI Components:**
  - **Command Palette:** Global search and quick actions via `Ctrl+K` / `Cmd+K`.
  - **Brief Wizard:** A multi-step animated modal for posting new collaboration briefs.
  - **Analytics:** Data visualization using Recharts for tracking campaign performance.
- **Flawless Dark Mode:** The entire platform meticulously supports Dark Mode, with custom gradient bridging, subtle ambient lighting blobs, and optimized contrast to ensure a premium feel regardless of the user's system preference.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Charts:** [Recharts](https://recharts.org/)
- **Theming:** `next-themes`

---

## 💻 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/kolabee.git
   cd kolabee
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📂 Project Structure

```text
Kolabee/
├── src/
│   ├── app/
│   │   ├── dashboard/       # Dashboard routes (business/creator workspaces)
│   │   ├── globals.css      # Global styles, including the .premium-glass utility
│   │   ├── layout.tsx       # Root layout and theme provider
│   │   └── page.tsx         # Premium landing page entrypoint
│   ├── components/
│   │   ├── dashboard/       # Extracted dashboard shell and pages logic
│   │   ├── effects/         # Reusable Framer Motion animation effects
│   │   ├── landing/         # Extracted landing page sections
│   │   └── ui/              # Reusable UI components (Command Palette, Wizard, etc.)
│   └── lib/                 # Utility functions and mock data
├── public/                  # Static assets
├── package.json
└── tailwind.config.ts       # Tailwind CSS configuration
```

---

## 🎨 Design Philosophy

Kolabee prioritizes **Visual Excellence**. The UI avoids flat, generic designs in favor of curated harmonious color palettes, subtle micro-animations, and dynamic glassmorphism. It uses asymmetrical specular lighting and refractive gradients to create an interface that feels highly responsive, interactive, and alive.

---

