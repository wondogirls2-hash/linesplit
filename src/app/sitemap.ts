import type { MetadataRoute } from "next";
import { LONG_TAIL_NAV_ORDER, LONG_TAIL_PAGES } from "@/lib/longTailPages";
import { SITE_URL } from "@/lib/site";
import { TOOL_NAV_ORDER, TOOLS } from "@/lib/toolsCatalog";

/**
 * App Router sitemap — tool routes + long-tail SEO landings.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  for (const id of TOOL_NAV_ORDER) {
    const href = TOOLS[id]?.href;
    if (!href || href === "/") continue;
    entries.push({
      url: `${SITE_URL}${href}`,
      lastModified,
      changeFrequency: "weekly",
      priority: id === "case-converter" ? 0.9 : 0.8,
    });
  }

  entries.push({
    url: `${SITE_URL}/tools`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.9,
  });

  for (const id of LONG_TAIL_NAV_ORDER) {
    const page = LONG_TAIL_PAGES[id];
    entries.push({
      url: `${SITE_URL}${page.href}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    });
  }

  for (const path of ["/privacy-policy", "/about", "/contact", "/developers"]) {
    entries.push({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: "monthly",
      priority: path === "/developers" ? 0.7 : 0.5,
    });
  }

  return entries;
}
