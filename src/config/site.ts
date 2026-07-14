export const siteConfig = {
  name: "Sarion",
  description: "The operating system for modern agencies — CRM, projects, invoices, and client portals in one workspace.",
  // Fall back to the production domain — never localhost. A localhost fallback
  // here would poison metadataBase, canonical, OG and sitemap URLs if the env
  // var were ever missing in a production build.
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://trysarion.com",
  tagline: "Run Your Entire Agency From One Place.",
  // Public contact inbox. Contact-form submissions are sent here.
  // IMPORTANT: point this at a real, monitored mailbox before launch.
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@trysarion.com",
  // Public-facing addresses shown across the marketing site.
  salesEmail: "contact@trysarion.com",
  supportEmail: "support@trysarion.com",
  // Official social profiles. Surfaced in the footer + contact page via
  // <SocialLinks /> and exposed to search engines through the Organization
  // JSON-LD `sameAs` array. Order here drives display order.
  social: {
    linkedin: "https://www.linkedin.com/company/try-sarion/",
    facebook: "https://www.facebook.com/share/1EiEen8Pv4/",
    x: "https://x.com/tech_sarion_",
    instagram: "https://www.instagram.com/tech.sarion_/",
  },
} as const;
