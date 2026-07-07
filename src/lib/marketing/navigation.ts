/**
 * Marketing site navigation data.
 * Edit links here — never inline in Navbar/Footer components.
 */
export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Products", href: "/products" },
  { label: "Pricing", href: "/pricing" },
  { label: "Free Scorecard", href: "/scorecard" },
  { label: "Portal Demo", href: "/portal-demo" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Product column in the footer. */
export const PRODUCT_LINKS: NavLink[] = [
  { label: "Features", href: "/features" },
  { label: "Products", href: "/products" },
  { label: "Pricing", href: "/pricing" },
  { label: "Portal Demo", href: "/portal-demo" },
  { label: "Free Scorecard", href: "/scorecard" },
];

/** Content column in the footer. */
export const CONTENT_LINKS: NavLink[] = [
  { label: "Blog", href: "/blog" },
  { label: "Resources", href: "/resources" },
  { label: "Tools", href: "/tools" },
];

/** Solutions column in the footer. */
export const SOLUTIONS_LINKS: NavLink[] = [
  { label: "By Industry", href: "/solutions" },
  { label: "Enterprise", href: "/enterprise" },
  { label: "Customers", href: "/customers" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Partners", href: "/partners" },
  { label: "Affiliate Program", href: "/affiliate" },
];

/** Compare column in the footer. */
export const COMPARE_LINKS: NavLink[] = [
  { label: "All Comparisons", href: "/compare" },
  { label: "Sarion vs. Spreadsheets", href: "/compare/agency-crm-vs-spreadsheets" },
];

/** Developers column in the footer. */
export const DEVELOPER_LINKS: NavLink[] = [
  { label: "Integrations", href: "/integrations" },
  { label: "API", href: "/integrations#api" },
  { label: "Changelog", href: "/changelog" },
];

/** Trust column in the footer. */
export const TRUST_LINKS: NavLink[] = [
  { label: "Trust Center", href: "/trust" },
  { label: "Security", href: "/security" },
  { label: "Status", href: "/status" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Startup Program", href: "/startup-program" },
];

/** Legal column in the footer. */
export const LEGAL_LINKS: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

/** Company / contact column in the footer. */
export const COMPANY_LINKS: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Why Sarion", href: "/why-sarion" },
  { label: "Contact", href: "/contact" },
  { label: "Log in", href: "/login" },
];
