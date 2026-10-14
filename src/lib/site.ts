function canonicalOrigin() {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL || "https://paragraphsplitter.com").trim();
  try {
    return new URL(raw).origin;
  } catch {
    return "https://paragraphsplitter.com";
  }
}

/** Canonical site URL for sitemap / OG / metadata */
export const SITE_URL = canonicalOrigin();

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

/** Google Analytics 4 measurement id (G-…) */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "G-Q201V9ER29";

/**
 * When false (default), ad containers are not rendered — avoids "Ad Space"
 * placeholders during AdSense review. Set NEXT_PUBLIC_ADS_ENABLED=true to show.
 */
export const ADS_ENABLED =
  process.env.NEXT_PUBLIC_ADS_ENABLED?.trim().toLowerCase() === "true";

export const FOOTER_LINKS = [
  { href: "/split-text-into-paragraphs", label: "Split into Paragraphs" },
  { href: "/split-paragraph-into-sentences", label: "Split into Sentences" },
  { href: "/ai-prompt-splitter", label: "ChatGPT Prompt Splitter" },
  { href: "/developers", label: "Embed / Extension" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
