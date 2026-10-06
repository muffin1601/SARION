import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";

import { APP_URL } from "@/config/urls";
import { ThemeProvider } from "@/components/theme-provider";
import { PostHogProvider } from "@/components/analytics/posthog-provider";
import { ServiceWorkerCleanup } from "@/components/sw-cleanup";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const geist = Geist({ subsets: ["latin"], variable: "--font-heading", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: { default: "Sarion", template: "%s · Sarion" },
  description: "Sarion agency workspace",
  robots: { index: false, follow: false, nocache: true },
};

export default function AppRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.variable} ${geist.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ServiceWorkerCleanup /><PostHogProvider />{children}
        </ThemeProvider>
      </body>
    </html>
  );
}

