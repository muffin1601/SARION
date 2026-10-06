import type { Metadata } from "next";

import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { siteGraph } from "@/lib/seo/schema";
import "./marketing.css";

export const metadata: Metadata = {
  title: {
    default: "Sarion — The Operating System for Modern Agencies",
    template: "%s · Sarion",
  },
  description:
    "Manage clients, projects, tasks, invoices, and a branded client portal in one agency management platform. Try Sarion free.",
  keywords: [
    "agency operating system",
    "agency CRM",
    "agency management software",
    "client portal software",
    "agency project management",
    "client management software",
  ],
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="marketingTheme">
      <JsonLd id="site-graph" data={siteGraph()} />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
