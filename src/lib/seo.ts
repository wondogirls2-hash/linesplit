import type { Metadata } from "next";
import { OG_IMAGE_PATH, SITE_NAME, SITE_URL } from "@/lib/site";

type BuildMetadataInput = {
  title: string;
  description: string;
  keywords: string[];
  path?: string;
};

/** Shared metadata builder with OG image placeholder */
export function buildPageMetadata({
  title,
  description,
  keywords,
  path = "",
}: BuildMetadataInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title.includes(SITE_NAME)
    ? title
    : `${title} — ${SITE_NAME}`;

  return {
    title: {
      absolute: fullTitle,
    },
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      // Placeholder until a real OG asset is designed
      images: [
        {
          url: `${SITE_URL}${OG_IMAGE_PATH}`,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [`${SITE_URL}${OG_IMAGE_PATH}`],
    },
  };
}
