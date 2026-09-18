import type { Metadata } from "next";
import { OG_IMAGE_PATH, SITE_NAME, SITE_URL } from "@/lib/site";

type BuildMetadataInput = {
  title: string;
  description: string;
  keywords: string[];
  path?: string;
  /** Use `title` as-is (no `— SITE_NAME` suffix) */
  absoluteTitle?: boolean;
  /** Optional OG/Twitter title (defaults to page title) */
  openGraphTitle?: string;
  /** Optional OG/Twitter description (defaults to page description) */
  openGraphDescription?: string;
};

/** Shared metadata builder with OG image placeholder */
export function buildPageMetadata({
  title,
  description,
  keywords,
  path = "",
  absoluteTitle = false,
  openGraphTitle,
  openGraphDescription,
}: BuildMetadataInput): Metadata {
  // Prefer trailing slash only on the site root; strip elsewhere
  const normalizedPath =
    !path || path === "/"
      ? "/"
      : path.startsWith("/")
        ? path.replace(/\/$/, "")
        : `/${path.replace(/\/$/, "")}`;
  const url = `${SITE_URL}${normalizedPath === "/" ? "/" : normalizedPath}`;
  const fullTitle =
    absoluteTitle || title.includes(SITE_NAME)
      ? title
      : `${title} — ${SITE_NAME}`;
  const ogTitle = openGraphTitle ?? fullTitle;
  const ogDescription = openGraphDescription ?? description;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      absolute: fullTitle,
    },
    description,
    keywords,
    alternates: {
      canonical: url,
      // Explicit self-reference — helps when Google previously chose a foreign host
      languages: {
        "x-default": url,
      },
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: `${SITE_URL}${OG_IMAGE_PATH}`,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [`${SITE_URL}${OG_IMAGE_PATH}`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    other: {
      "og:site_name": SITE_NAME,
    },
  };
}