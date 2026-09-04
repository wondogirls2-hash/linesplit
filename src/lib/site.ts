/** Canonical site URL for sitemap / OG / metadata */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://paragraphsplitter.com";

/** Display brand — matches production domain */
export const SITE_NAME = "ParagraphSplitter";

export const OG_IMAGE_PATH = "/og.png"; // placeholder until real asset is added

/** Public contact address — update when you have a dedicated inbox */
export const CONTACT_EMAIL = "contact@paragraphsplitter.com";

/**
 * AdSense client id (ca-pub-…).
 * Also used for the site-verification snippet in <head>.
 */
export const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim() ||
  "ca-pub-1340602350988403";

export const FOOTER_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
