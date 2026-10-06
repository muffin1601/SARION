const stripTrailingSlash = (value: string) => value.replace(/\/+$/, "");

export const MARKETING_URL = stripTrailingSlash(
  process.env.NEXT_PUBLIC_MARKETING_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://trysarion.com",
);

export const APP_URL = stripTrailingSlash(
  process.env.NEXT_PUBLIC_APP_URL ?? "https://app.trysarion.com",
);

export function appUrl(pathname = "/"): string {
  return `${APP_URL}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

export function marketingUrl(pathname = "/"): string {
  return `${MARKETING_URL}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

