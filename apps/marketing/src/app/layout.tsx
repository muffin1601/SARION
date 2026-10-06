import type { Metadata } from "next";
import { Inter, Geist, Fraunces } from "next/font/google";

import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/components/theme-provider";
import { PlausibleScript } from "@/components/plausible-script";
import { GoogleAnalytics } from "@/components/google-analytics";
import { AhrefsAnalytics } from "@/components/ahrefs-analytics";
import { ClarityAnalytics } from "@/components/clarity-analytics";
import { PostHogProvider } from "@/components/analytics/posthog-provider";
import { ServiceWorkerCleanup } from "@/components/sw-cleanup";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const geist = Geist({ subsets: ["latin"], variable: "--font-heading", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-serif", display: "swap", axes: ["opsz"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} · ${siteConfig.tagline}`, template: "%s" },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  robots: { index: siteConfig.isProduction, follow: siteConfig.isProduction },
};

export default function MarketingRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><PlausibleScript /><GoogleAnalytics /><AhrefsAnalytics /><ClarityAnalytics /></head>
      <body suppressHydrationWarning className={`${inter.variable} ${geist.variable} ${fraunces.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ServiceWorkerCleanup /><PostHogProvider />{children}
        </ThemeProvider>
      </body>
    </html>
  );
}

