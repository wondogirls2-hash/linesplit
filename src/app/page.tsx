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
    question: "How does the tool auto break text into paragraphs?",
    answer:
      "Paste your text and choose split criteria: by sentence (. ! ?) with abbreviation-aware detection, or by character count with word-boundary wrapping. The tool inserts line breaks in your browser so you can copy clean, readable segments without manual reformatting.",
  },
  {
    question:
      "How does the smart sentence splitter handle punctuation and abbreviations?",
    answer:
      "The sentence splitter detects natural boundaries — periods (.), question marks (?), and exclamation points (!). It protects common abbreviations such as Mr., Mrs., Dr., Prof., and patterns like U.S., U.K., and E.U. so those dots usually do not start a new line. Edge cases can still appear — edit the Result box if needed.",
  },
  {
    question: "Can I merge fragmented lines into 1 paragraph?",
    answer:
      "Yes. If text copied from a PDF, email, or OCR scan has awkward mid-sentence wraps, use Remove Line Breaks on this site to strip unintended line breaks and recombine the text into one smooth paragraph, then return here if you need one sentence per line.",
    answerContent: (
      <>
        Yes. If text copied from a PDF, email, or OCR scan has awkward
        mid-sentence wraps, use{" "}
        <Link
          href="/tools/remove-line-breaks"
          className="font-medium text-primary underline-offset-2 hover:underline"
        >
          Remove Line Breaks
        </Link>{" "}
        on this site to strip unintended line breaks and recombine the text into
        one smooth paragraph, then return here if you need one sentence per
        line.
      </>
    ),
  },
  {
    question: "Is my text uploaded or stored on an external server?",
    answer:
      "No. All text manipulation, splitting, and formatting take place directly in your web browser via client-side JavaScript. None of your content is ever transmitted, logged, or saved to any server.",
  },
  {
    question: "Will this rewrite or change my wording?",
    answer:
      "No. ParagraphSplitter only inserts line breaks (and optional formatting like bullets). Your original words stay intact — no AI alterations.",
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

/** Single @graph JSON-LD — WebApplication + FAQPage (no duplicate FAQ script) */
const structuredDataJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}/#webapp`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "All",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      description:
        "Free online text tool to split paragraphs into sentences, wrap text by character count, or merge broken lines into one paragraph — instantly, in your browser.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Smart sentence splitter with punctuation detection",
        "Character-count wrapping at word boundaries",
        "Optional bullets and blank-line spacing",
        "Merge broken lines via Remove Line Breaks",
        "Client-side processing with 100% data privacy",
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-24 pt-6 sm:px-6 lg:px-8">
      <script
        id={`${SITE_NAME.toLowerCase()}-structured-data`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredDataJsonLd).replace(/</g, "\\u003c"),
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

        <FaqSection items={FAQ} includeJsonLd={false} />
      </main>

      <SiteFooter />
    </div>
  );
}
