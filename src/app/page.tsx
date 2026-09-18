import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { OppositeToolBanner } from "@/components/OppositeToolBanner";
import { RelatedToolsCard } from "@/components/RelatedToolsCard";
import { SeoContentSection } from "@/components/SeoContentSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TextConverter } from "@/components/TextConverter";
import { WhyUseSection } from "@/components/WhyUseSection";
import { buildPageMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Text & Paragraph Splitter | Split Text by Sentences, Length, or Lines",
  description:
    "Free online text splitter. Break long essays, articles, and AI prompts into readable paragraphs, sentences, or character counts instantly — all in your browser.",
  keywords: [
    "paragraph splitter",
    "text splitter",
    "split text by line",
    "split sentences online",
    "bulk text chunker",
    "paragraph break generator",
  ],
  path: "",
  absoluteTitle: true,
  openGraphTitle: "Online Paragraph & Text Splitter - Fast, Free & Private",
  openGraphDescription:
    "Split large text chunks by characters or sentences. Perfect for copywriters, bloggers, and LLM prompt formatting.",
});

const FAQ: FaqItem[] = [
  {
    question: "Is my pasted text stored or sent to a server?",
    answer:
      "No. All text parsing happens directly inside your web browser using client-side JavaScript. Your text is never stored or transmitted to our servers.",
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
    question: "Can I split text by a specific character count?",
    answer:
      "Yes. Set your desired character limit (presets like SEO Meta 160, Tweet/X 280, Code Line 80, or a custom value), and the tool will split the text smoothly at word boundaries without truncating words.",
  },
  {
    question: "Does this tool support multiple languages?",
    answer:
      "Yes. Our tool is built with full UTF-8 support, making it compatible with global languages and special symbols — including Latin scripts and non-Latin scripts such as Korean, Japanese, Chinese, and Cyrillic.",
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

      <AdSlot
        position="top-banner"
        slotId="paragraphsplitter-top"
        className="mb-6"
      />

      <main className="flex-1 space-y-12">
        {/* Tool stays above the fold — SEO copy follows below */}
        <TextConverter />

        <RelatedToolsCard
          current="paragraph-splitter"
          heading="Related tools"
        />

        <WhyUseSection />

        <SeoContentSection />

        <FaqSection items={FAQ} />
      </main>

      <SiteFooter />
    </div>
  );
}
