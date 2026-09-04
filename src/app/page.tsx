import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";
import { FaqSection } from "@/components/FaqSection";
import { OppositeToolBanner } from "@/components/OppositeToolBanner";
import { RelatedToolsCard } from "@/components/RelatedToolsCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TextConverter } from "@/components/TextConverter";
import { WhyUseSection } from "@/components/WhyUseSection";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Sentence Splitter Online — Add Line Break After Period",
  description:
    "Free online sentence splitter. Format text sentence by sentence, add a line break after each period, and split paragraphs into sentences — 100% private, no AI, no upload.",
  keywords: [
    "Add line break after period",
    "Sentence splitter online",
    "Format text sentence by sentence",
    "Split paragraph into sentences",
  ],
  path: "",
});

const FAQ = [
  {
    question: "Does ParagraphSplitter send my text to a server?",
    answer:
      "No. All conversion runs in your browser. Your paragraph is never uploaded, stored on a server, or sent to an AI model.",
  },
  {
    question: "Will this rewrite or change my wording?",
    answer:
      "No. ParagraphSplitter only inserts line breaks (and optional formatting like bullets). Your original words stay intact — no AI alterations.",
  },
  {
    question: "How do I split a paragraph into sentences?",
    answer:
      "Paste your paragraph into the input box. The tool auto-splits on sentence boundaries (periods, question marks, exclamation points) with abbreviation-aware logic. Then copy the result.",
  },
  {
    question: "Can I wrap text by character count instead?",
    answer:
      "Yes. Switch to “By character limit” and use presets like SEO Meta (160), Tweet/X (280), or Code Line (80).",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-24 pt-6 sm:px-6 lg:px-8">
      <SiteHeader
        eyebrow="Paragraph Splitter"
        title="Paste a paragraph. Get one sentence per line."
        description="Built for Word, Google Docs, and slides — split text into clean lines without ChatGPT, without prompts, and without sending a single character to a server."
      />

      <OppositeToolBanner target="remove-line-breaks" />

      <AdSlot position="top-banner" slotId="paragraphsplitter-top" className="mb-6" />

      <main className="flex-1 space-y-12">
        <TextConverter />

        <RelatedToolsCard
          current="paragraph-splitter"
          heading="Related tools"
        />

        <WhyUseSection />

        <section className="glass-panel px-6 py-8">
          <h2 className="text-lg font-semibold text-foreground">
            How it works
          </h2>
          <ol className="mt-5 grid gap-4 text-sm text-muted-foreground sm:grid-cols-3">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                1
              </span>
              <span>
                <strong className="text-foreground">Paste</strong> your
                paragraph from Word, Docs, email, or notes.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                2
              </span>
              <span>
                <strong className="text-foreground">Convert</strong> instantly —
                smart sentence detection runs locally in your browser.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                3
              </span>
              <span>
                <strong className="text-foreground">Fine-tune &amp; copy</strong>{" "}
                — edit lines if needed, then paste into your document.
              </span>
            </li>
          </ol>
        </section>

        <FaqSection items={FAQ} />
      </main>

      <SiteFooter />
    </div>
  );
}
