import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { buildPageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { TOOL_NAV_ORDER, TOOLS } from "@/lib/toolsCatalog";

export const metadata: Metadata = buildPageMetadata({
  title: "All Text Tools — Split, Join, Convert & Clean",
  description:
    "Browse every ParagraphSplitter utility: sentence splitter, remove line breaks, case converter, find & replace, and more — all private, browser-only tools.",
  keywords: [
    "text tools",
    "paragraph splitter tools",
    "case converter",
    "remove line breaks",
    "online text utilities",
  ],
  path: "/tools",
});

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${SITE_URL}/`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Tools",
      item: `${SITE_URL}/tools`,
    },
  ],
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "ParagraphSplitter text tools",
  itemListElement: TOOL_NAV_ORDER.map((id, index) => {
    const tool = TOOLS[id];
    return {
      "@type": "ListItem",
      position: index + 1,
      name: tool.title,
      url: `${SITE_URL}${tool.href}`,
      description: tool.shortDescription,
    };
  }),
};

export default function ToolsIndexPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-24 pt-6 sm:px-6 lg:px-8">
      <script
        id="tools-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        id="tools-itemlist-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <SiteHeader
        eyebrow="Tools"
        title="All text tools in one place"
        description="Every utility runs in your browser — split sentences, join broken lines, convert case, and clean lists without uploading a draft."
      />

      <main className="flex-1">
        <ul className="grid gap-4 sm:grid-cols-2">
          {TOOL_NAV_ORDER.map((id) => {
            const tool = TOOLS[id];
            return (
              <li key={tool.id}>
                <Link
                  href={tool.href}
                  className="block rounded-2xl border border-border/60 bg-card/70 p-5 shadow-sm transition hover:border-primary/30 hover:bg-primary/5"
                >
                  <span className="text-base font-semibold text-foreground">
                    {tool.title}
                  </span>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {tool.shortDescription}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>

      <SiteFooter />
    </div>
  );
}
