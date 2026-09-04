import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/tools/remove-line-breaks",
    "/tools/remove-duplicate-lines",
    "/tools/case-converter",
    "/tools/find-and-replace",
    "/privacy-policy",
    "/about",
    "/contact",
  ];

  const lastModified = new Date();

  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority:
      path === "" ? 1 : path.startsWith("/tools") ? 0.8 : 0.5,
  }));
}
