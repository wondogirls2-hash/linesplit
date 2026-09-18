import type { Metadata } from "next";
import Link from "next/link";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { CaseConverterTool } from "@/components/tools/CaseConverterTool";
import { buildPageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { TOOLS } from "@/lib/toolsCatalog";

const tool = TOOLS["case-converter"];

export const metadata: Metadata = buildPageMetadata({
  title: "Case Converter Online — UPPERCASE, Title Case, Sentence Case",
  description:
    "Convert text to UPPERCASE, lowercase, Title Case, or Sentence case instantly. Private browser tool with no AI rewrite.",
  keywords: [
    "Case converter online",
    "Title case converter",
    "UPPERCASE lowercase tool",
    "Sentence case converter",
  ],
  path: "/tools/case-converter",
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
    {
      "@type": "ListItem",
      position: 3,
      name: tool.title,
      item: `${SITE_URL}/tools/case-converter`,
    },
  ],
};

export default function CaseConverterPage() {
  return (
    <ToolPageShell
      toolId={tool.id}
      eyebrow={tool.title}
      title="Change casing without changing your words"
      description="Pick a mode and paste. Spelling stays the same — only letter case updates. No account, no upload."
      adSlotPrefix="case"
      beforeTool={
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-primary hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/tools" className="hover:text-primary hover:underline">
                Tools
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-medium text-foreground">Case Converter</li>
          </ol>
        </nav>
      }
    >
      <script
        id="case-converter-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <CaseConverterTool />
      <section className="mx-auto max-w-3xl space-y-3 text-[15px] leading-relaxed text-muted-foreground">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Why use this case converter?
        </h2>
        <p>
          Need UPPERCASE titles, lowercase cleanup, or Title Case headings without
          rewriting meaning? This tool only changes letter case — nothing is sent
          to a server. After converting, jump back to the{" "}
          <Link
            href="/"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            Paragraph Splitter
          </Link>{" "}
          for one sentence per line, or browse{" "}
          <Link
            href="/tools"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            all tools
          </Link>
          .
        </p>
      </section>
    </ToolPageShell>
  );
}
