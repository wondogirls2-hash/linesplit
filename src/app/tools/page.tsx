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

      <main className="flex-1 space-y-12">
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

        <section className="mx-auto max-w-3xl space-y-8 text-[15px] leading-relaxed text-muted-foreground">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
              Private text utilities for everyday formatting
            </h2>
            <p>
              ParagraphSplitter is a small toolkit for writers, editors,
              translators, and anyone who pastes messy text from Word, PDFs, or
              spreadsheets. Each tool does one job well — split paragraphs,
              remove line breaks, drop duplicate lines, convert letter case, or
              run bulk find and replace — without accounts, uploads, or AI
              rewrites.
            </p>
            <p>
              Everything processes on-device in your browser. Close the tab and
              the draft is gone from our side, because it never left your
              device. Start on the{" "}
              <Link
                href="/"
                className="font-medium text-primary underline-offset-2 hover:underline"
              >
                homepage Paragraph Splitter
              </Link>{" "}
              for sentence-per-line formatting, or open a sister tool above when
              you need cleanup first.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
              Suggested workflows
            </h2>
            <ul className="list-disc space-y-2.5 pl-5">
              <li>
                PDF paste looks chopped mid-sentence →{" "}
                <Link
                  href="/tools/remove-line-breaks"
                  className="font-medium text-primary underline-offset-2 hover:underline"
                >
                  Remove Line Breaks
                </Link>
                , then split by sentence on the homepage.
              </li>
              <li>
                Long list with repeated rows →{" "}
                <Link
                  href="/tools/remove-duplicate-lines"
                  className="font-medium text-primary underline-offset-2 hover:underline"
                >
                  Remove Duplicate Lines
                </Link>
                .
              </li>
              <li>
                Headings need Title Case or UPPERCASE →{" "}
                <Link
                  href="/tools/case-converter"
                  className="font-medium text-primary underline-offset-2 hover:underline"
                >
                  Case Converter
                </Link>
                .
              </li>
              <li>
                Many find/replace rules at once →{" "}
                <Link
                  href="/tools/find-and-replace"
                  className="font-medium text-primary underline-offset-2 hover:underline"
                >
                  Find &amp; Replace
                </Link>
                .
              </li>
            </ul>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
