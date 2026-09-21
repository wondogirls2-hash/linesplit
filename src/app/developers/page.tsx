import type { Metadata } from "next";
import Link from "next/link";
import { EmbedSnippetCopy } from "@/components/EmbedSnippetCopy";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { buildPageMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Embed Widget & Chrome Extension — Free Paragraph Splitter",
  description:
    "Embed the free ParagraphSplitter sentence tool on your site with an iframe, or use the Chrome extension. Includes a Powered-by backlink. 100% browser-side.",
  keywords: [
    "embed paragraph splitter",
    "iframe text splitter widget",
    "chrome extension sentence splitter",
    "powered by paragraphsplitter",
  ],
  path: "/developers",
});

export default function DevelopersPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-24 pt-6 sm:px-6 lg:px-8">
      <SiteHeader
        eyebrow="Developers"
        title="Embed the splitter or ship a Chrome extension CTA"
        description="Add a private, browser-only sentence splitter to your blog or docs — and keep a dofollow-friendly Powered-by link back to ParagraphSplitter."
      />

      <main className="mx-auto max-w-3xl flex-1 space-y-12 text-[15px] leading-relaxed text-muted-foreground">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            1. Embed widget (iframe)
          </h2>
          <p>
            Drop the snippet below into any HTML page. The widget runs entirely
            in the visitor&apos;s browser — no API key, no server round-trip for
            the text they paste. A small{" "}
            <strong className="font-semibold text-foreground">
              Powered by {SITE_NAME}
            </strong>{" "}
            credit links back to{" "}
            <Link
              href="/"
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              {SITE_URL.replace(/^https?:\/\//, "")}
            </Link>
            .
          </p>
          <EmbedSnippetCopy />
          <div className="overflow-hidden rounded-2xl border border-border/60">
            <iframe
              src="/embed"
              title="ParagraphSplitter embed preview"
              className="h-[420px] w-full bg-background"
              loading="lazy"
            />
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            2. Chrome extension
          </h2>
          <p>
            A Manifest V3 popup extension ships in this repo under{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs text-foreground">
              chrome-extension/
            </code>
            . It splits text by sentence locally and includes a button:{" "}
            <em className="not-italic font-medium text-foreground">
              More features → paragraphsplitter.com
            </em>
            .
          </p>
          <ol className="list-decimal space-y-2 pl-5">
            <li>
              Open Chrome → <strong className="text-foreground">Extensions</strong>{" "}
              → enable Developer mode.
            </li>
            <li>
              Click <strong className="text-foreground">Load unpacked</strong> and
              select the <code className="text-xs">chrome-extension</code> folder
              from this project.
            </li>
            <li>
              To publish on the Chrome Web Store, zip that folder, pay the one-time
              developer fee, and submit for review (often 1–7 days).
            </li>
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            Rules of use
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Keep the Powered-by credit visible when you embed the widget.</li>
            <li>
              Do not proxy or re-upload user text through your servers — the tool
              is designed to stay client-side.
            </li>
            <li>
              Questions? See{" "}
              <Link
                href="/contact"
                className="font-medium text-primary underline-offset-2 hover:underline"
              >
                Contact
              </Link>
              .
            </li>
          </ul>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
