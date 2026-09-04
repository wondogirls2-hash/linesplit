import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { TOOL_NAV_ORDER, TOOLS } from "@/lib/toolsCatalog";

/**
 * App Router sitemap — tool routes are derived from TOOLS so new tools
 * appear automatically when added to toolsCatalog.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const toolPaths = TOOL_NAV_ORDER.map((id) => TOOLS[id].href).filter(
    (href) => href !== "/"
  );

  const staticPaths = ["/privacy-policy", "/about", "/contact"];

  const routes = ["", ...toolPaths, ...staticPaths];
  const lastModified = new Date();

  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority:
      path === "" ? 1 : path.startsWith("/tools") ? 0.8 : 0.5,
  }));
}
