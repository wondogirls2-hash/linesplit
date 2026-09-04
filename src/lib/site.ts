/** Canonical site URL for sitemap / OG / metadata */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://paragraphsplitter.com";

/** Display brand — matches production domain */
export const SITE_NAME = "ParagraphSplitter";

export const OG_IMAGE_PATH = "/og.png"; // placeholder until real asset is added

/** Public contact address — update when you have a dedicated inbox */
export const CONTACT_EMAIL = "contact@paragraphsplitter.com";

/**
 * AdSense client id (ca-pub-…). Leave empty until you paste your real publisher id.
 * Used only after the visitor accepts cookies/ads.
 */
export const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim() ?? "";

export const FOOTER_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
