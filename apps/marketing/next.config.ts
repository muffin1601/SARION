import path from "node:path";
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";
const appOrigin = (process.env.NEXT_PUBLIC_APP_URL ?? "https://app.trysarion.com").replace(/\/$/, "");

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://plausible.io https://www.googletagmanager.com https://*.posthog.com https://analytics.ahrefs.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.posthog.com https://plausible.io https://www.google-analytics.com https://*.ingest.sentry.io https://*.ahrefs.com",
  "frame-src 'self'",
  "form-action 'self'",
].join("; ");

const headers = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  { key: "Content-Security-Policy", value: csp },
];

const legacyAppRoutes = [
  "/login", "/signup", "/forgot-password", "/reset-password", "/verify-email",
  "/dashboard/:path*", "/activity/:path*", "/automations/:path*", "/clients/:path*",
  "/finance/:path*", "/invoices/:path*", "/projects/:path*", "/proposals/:path*",
  "/recurring/:path*", "/reports/:path*", "/settings/:path*", "/team/:path*",
  "/time/:path*", "/checkout/:path*", "/portal/:path*", "/p/:path*",
];

const config: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname, "../.."),
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/agency-management-software", destination: "/", permanent: true },
      { source: "/all-in-one-agency-software", destination: "/", permanent: true },
      ...legacyAppRoutes.map((source) => ({
        source,
        destination: `${appOrigin}${source}`,
        permanent: false,
      })),
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers }];
  },
};

export default config;

