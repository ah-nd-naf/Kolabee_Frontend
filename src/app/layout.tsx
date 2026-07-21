import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { MotionProvider } from "@/components/ui/motion-provider";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Kolabee — Creator & Partner Collaboration Platform",
    template: "%s | Kolabee",
  },
  description:
    "Kolabee connects creators and business partners through transparent link analytics, performance tracking, and seamless collaboration tools.",
  keywords: ["creator platform", "link analytics", "business partners", "collaboration"],
  authors: [{ name: "Kolabee" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Kolabee — Creator & Partner Collaboration Platform",
    description:
      "Connects creators and business partners through transparent link analytics and performance tracking.",
    siteName: "Kolabee",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(spaceGrotesk.variable, dmSans.variable, "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <MotionProvider>
            {children}
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
