import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { OppositeToolBanner } from "@/components/OppositeToolBanner";
import { RelatedToolsCard } from "@/components/RelatedToolsCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TextConverter } from "@/components/TextConverter";
import { WhyUseSection } from "@/components/WhyUseSection";
import { buildPageMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Sentence Splitter Online — Add Line Break After Period",
  description:
    "Stop adding a line break after every period by hand. Split a paragraph into sentences online — free, private, no signup, no AI rewrite. Works in your browser with Word, Docs, and PDF paste-ups.",
  keywords: [
    "Add line break after period",
    "Sentence splitter online",
    "Format text sentence by sentence",
    "Split paragraph into sentences",
    "How to split a paragraph into sentences",
    "Line break after every period",
  ],
  path: "",
});

const FAQ: FaqItem[] = [
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
      "Yes. Switch to “By character limit” and use presets like SEO Meta (160), Tweet/X (280), or Code Line (80). You can also set a custom limit between 10 and 2000 characters.",
  },
  {
    question: "How do I add a line break after every period?",
    answer:
      "Paste the paragraph and leave the mode on “By sentence.” The splitter places a line break after each sentence-ending period, question mark, or exclamation point. Use the Line breaks option for a single newline or a blank line between sentences.",
  },
  {
    question: "How do I split a paragraph into sentences in Word or Google Docs?",
    answer:
      "Copy the paragraph from Word or Docs, paste it here, convert, then copy the result and paste it back. The tool does not open Word itself — it prepares one-sentence-per-line text you can drop into any document.",
  },
  {
    question: "Why does copy-pasting from a PDF break my paragraph formatting?",
    answer:
      "PDFs often insert hard line breaks mid-sentence, so pasted text looks chopped into short lines. Use ParagraphSplitter when you already have one long paragraph to split by sentence. If the paste is already broken into jagged lines, use Remove Line Breaks first to join them, then split again if you need one sentence per line.",
    answerContent: (
      <>
        PDFs often insert hard line breaks mid-sentence, so pasted text looks
        chopped into short lines. Use ParagraphSplitter when you already have
        one long paragraph to split by sentence. If the paste is already broken
        into jagged lines, use{" "}
        <Link
          href="/tools/remove-line-breaks"
          className="font-medium text-primary underline-offset-2 hover:underline"
        >
          Remove Line Breaks
        </Link>{" "}
        first to join them, then split again if you need one sentence per line.
      </>
    ),
  },
  {
    question: "What happens to abbreviations like Mr., Dr., or U.S.?",
    answer:
      "The splitter is abbreviation-aware. Common titles (Mr., Mrs., Dr., Prof.) and patterns like U.S., U.K., and E.U. are protected so their dots usually do not start a new line. Edge cases can still appear — edit the Result box manually, or click “fine-tune” to jump there.",
  },
  {
    question: "Does this sentence splitter work on mobile?",
    answer:
      "Yes. The page is mobile-friendly: paste, adjust options, and copy from your phone or tablet. Processing still stays on-device — nothing is uploaded when you convert on mobile.",
  },
  {
    question: "Can I undo a split or go back to the original paragraph?",
    answer:
      "The Input box keeps your original text until you Clear it or press Esc. Edit the Result freely if a line looks wrong; Ctrl/⌘+Enter re-runs the split from the current Input. Recent history (saved in your browser only) can reload a previous paste.",
  },
  {
    question: "How do I turn sentences into bullet points for slides?",
    answer:
      "After splitting, set Bullets to “- Dash” or “• Bullet,” then copy the Result into PowerPoint, Google Slides, or Docs. For ALL CAPS titles or mixed case cleanup afterward, use Case Converter. To strip repeated lines from a list, use Remove Duplicates.",
    answerContent: (
      <>
        After splitting, set Bullets to “- Dash” or “• Bullet,” then copy the
        Result into PowerPoint, Google Slides, or Docs. For ALL CAPS titles or
        mixed case cleanup afterward, use{" "}
        <Link
          href="/tools/case-converter"
          className="font-medium text-primary underline-offset-2 hover:underline"
        >
          Case Converter
        </Link>
        . To strip repeated lines from a list, use{" "}
        <Link
          href="/tools/remove-duplicate-lines"
          className="font-medium text-primary underline-offset-2 hover:underline"
        >
          Remove Duplicates
        </Link>
        .
      </>
    ),
  },
  {
    question: "Can I find and replace text while I format sentences?",
    answer:
      "ParagraphSplitter focuses on line breaks and bullets. For multi-rule find and replace on the same text, open Find & Replace, then come back here if you still need one sentence per line.",
    answerContent: (
      <>
        ParagraphSplitter focuses on line breaks and bullets. For multi-rule
        find and replace on the same text, open{" "}
        <Link
          href="/tools/find-and-replace"
          className="font-medium text-primary underline-offset-2 hover:underline"
        >
          Find &amp; Replace
        </Link>
        , then come back here if you still need one sentence per line.
      </>
    ),
  },
];

const softwareAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  url: SITE_URL,
  description:
    "Free browser-based sentence splitter: add a line break after each period, split paragraphs into sentences, and format text without uploading content or using AI.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Split paragraph into one sentence per line",
    "Abbreviation-aware sentence detection",
    "Character-limit wrapping presets",
    "Optional bullets and line-break styles",
    "Runs 100% in the browser — no upload",
  ],
};

export default function HomePage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-24 pt-6 sm:px-6 lg:px-8">
      <script
        id={`${SITE_NAME.toLowerCase()}-software-jsonld`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareAppJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <SiteHeader
        eyebrow="Paragraph Splitter"
        title="Paste a paragraph. Get one sentence per line."
        description="Built for Word, Google Docs, and slides — split text into clean lines without ChatGPT, without prompts, and without sending a single character to a server."
      />

      <OppositeToolBanner target="remove-line-breaks" />

      <AdSlot position="top-banner" slotId="paragraphsplitter-top" className="mb-6" />

      <main className="flex-1 space-y-12">
        {/* Tool stays above the fold — SEO copy follows below */}
        <TextConverter />

        <RelatedToolsCard
          current="paragraph-splitter"
          heading="Related tools"
        />

        <WhyUseSection />

        <section
          aria-labelledby="how-it-works-heading"
          className="glass-panel px-6 py-8"
        >
          <h2
            id="how-it-works-heading"
            className="text-lg font-semibold text-foreground"
          >
            How it works
          </h2>
          <ol className="mt-5 grid gap-4 text-sm text-muted-foreground sm:grid-cols-3">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                1
              </span>
              <span>
                <strong className="text-foreground">Paste</strong> text copied
                from a PDF, Word doc, Google Doc, or email that is one long
                unbroken paragraph — or any block you want sentence-per-line.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                2
              </span>
              <span>
                <strong className="text-foreground">Convert</strong> instantly —
                abbreviation-aware sentence detection runs locally. Or switch
                to character-limit mode when you need length wrapping instead.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                3
              </span>
              <span>
                <strong className="text-foreground">Fine-tune &amp; copy</strong>{" "}
                — edit any line in the Result box, optionally add bullets, then
                paste into your document, slides, or caption tool.
              </span>
            </li>
          </ol>

          <div className="mt-8 border-t border-border/50 pt-6">
            <h3 className="text-sm font-semibold text-foreground">
              Common use cases
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
              <li>
                Formatting paragraphs for teleprompters or speaker notes (one
                sentence per line)
              </li>
              <li>
                Cleaning OCR or PDF paste-ups — join broken lines with{" "}
                <Link
                  href="/tools/remove-line-breaks"
                  className="font-medium text-primary underline-offset-2 hover:underline"
                >
                  Remove Line Breaks
                </Link>
                , then split by sentence here
              </li>
              <li>
                Prepping text for translation tools that work better
                sentence-by-sentence
              </li>
              <li>
                Turning a dense paragraph into dash or bullet lines for slides
              </li>
              <li>
                Subtitle or caption drafting where each spoken sentence needs
                its own line
              </li>
              <li>
                Deduping pasted lists afterward with{" "}
                <Link
                  href="/tools/remove-duplicate-lines"
                  className="font-medium text-primary underline-offset-2 hover:underline"
                >
                  Remove Duplicates
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <FaqSection items={FAQ} />
      </main>

      <SiteFooter />
    </div>
  );
}
