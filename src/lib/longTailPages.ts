import type { ConvertOptions } from "@/types";

export type LongTailPageId =
  | "split-text-by-sentence"
  | "split-text-by-line"
  | "ai-prompt-splitter";

export type LongTailFaq = {
  question: string;
  answer: string;
};

export type LongTailPageDef = {
  id: LongTailPageId;
  href: `/${LongTailPageId}`;
  /** Short label for header/footer nav */
  navLabel: string;
  /** Browser / SERP title */
  title: string;
  description: string;
  keywords: string[];
  openGraphTitle: string;
  /** H1 on the page */
  heading: string;
  /** Subhead under H1 */
  lead: string;
  eyebrow: string;
  /** Optional default converter options for this intent */
  initialOptions?: Partial<ConvertOptions>;
  sections: {
    heading: string;
    body: string;
  }[];
  howSteps: { title: string; body: string }[];
  faqs: LongTailFaq[];
};

/**
 * Long-tail SEO landings that reuse the homepage TextConverter.
 * Copy stays limited to features the tool actually supports.
 */
export const LONG_TAIL_PAGES: Record<LongTailPageId, LongTailPageDef> = {
  "split-text-by-sentence": {
    id: "split-text-by-sentence",
    href: "/split-text-by-sentence",
    navLabel: "Split by Sentence",
    title: "Split Text into Sentences Online — Free Paragraph Splitter",
    description:
      "Split a paragraph into one sentence per line online. Abbreviation-aware sentence breaks for Word, Docs, and slides — free, private, no upload.",
    keywords: [
      "split text into sentences",
      "split paragraph into sentences online",
      "sentence splitter",
      "one sentence per line",
      "add line break after period",
    ],
    openGraphTitle: "Split Text into Sentences Online — Free & Private",
    heading: "Split text into sentences online",
    lead: "Paste a dense paragraph and get one clean sentence per line — abbreviation-aware, no AI rewrite, nothing uploaded.",
    eyebrow: "Sentence Splitter",
    initialOptions: { mode: "sentence" },
    sections: [
      {
        heading: "Why split text by sentence?",
        body: "One sentence per line makes drafts easier to edit, translate, rehearse, and paste into slides or captions. Dense blocks are hard to scan on mobile and awkward to review line-by-line.",
      },
      {
        heading: "Built for real documents",
        body: "Copy from Word, Google Docs, email, or a cleaned PDF paste. The splitter detects . ! ? boundaries and protects common abbreviations like Mr., Dr., and U.S. so titles do not start false new lines.",
      },
    ],
    howSteps: [
      {
        title: "Paste",
        body: "Drop your paragraph into the input box above.",
      },
      {
        title: "Split by sentence",
        body: "Keep “By sentence” selected — conversion runs in your browser as you type.",
      },
      {
        title: "Copy",
        body: "Fine-tune any line in Result, then copy back into your document.",
      },
    ],
    faqs: [
      {
        question: "Is my pasted text stored or sent to a server?",
        answer:
          "No. All text parsing happens directly inside your web browser using client-side JavaScript. Your text is never stored or transmitted to our servers.",
      },
      {
        question: "Will abbreviations like Mr. or U.S. create extra line breaks?",
        answer:
          "Usually not. The splitter is abbreviation-aware for common titles and patterns. Edge cases can still appear — edit the Result box if needed.",
      },
      {
        question: "Can I add a blank line between sentences?",
        answer:
          "Yes. Use the Line breaks option to choose a single newline or a blank line between sentences after splitting.",
      },
    ],
  },

  "split-text-by-line": {
    id: "split-text-by-line",
    href: "/split-text-by-line",
    navLabel: "Split by Line",
    title: "Split Text by Line Breaks Online — Character & Sentence Lines",
    description:
      "Split long text into clean lines by sentence or character count. Wrap at word boundaries with SEO Meta, Tweet/X, and Code Line presets — free and private.",
    keywords: [
      "split text by line",
      "split text into lines online",
      "line break generator",
      "wrap text by character count",
      "split paragraph by lines",
    ],
    openGraphTitle: "Split Text by Line Breaks Online — Free Tool",
    heading: "Split text by line breaks online",
    lead: "Turn a long block into readable lines — split by sentence, or wrap by character count at natural word boundaries.",
    eyebrow: "Line Break Splitter",
    initialOptions: { mode: "chars", charLimit: 160 },
    sections: [
      {
        heading: "Two ways to make lines",
        body: "Use sentence mode when you want one thought per line. Switch to character-limit mode when you need length wrapping for meta descriptions, captions, or fixed-width paste targets.",
      },
      {
        heading: "Word-boundary wrapping",
        body: "Character mode prefers word boundaries so everyday words are not cut in half. Oversized tokens longer than the limit are hard-wrapped only when necessary.",
      },
    ],
    howSteps: [
      {
        title: "Paste",
        body: "Put your source text in the input box.",
      },
      {
        title: "Choose line criteria",
        body: "Pick “By sentence” or “By character limit,” then use a preset (160 / 280 / 80) or a custom character limit.",
      },
      {
        title: "Copy lines",
        body: "Optionally add dash or bullet prefixes, then copy the Result.",
      },
    ],
    faqs: [
      {
        question: "Can I split text by a specific character count?",
        answer:
          "Yes. Set your desired character limit (presets like SEO Meta 160, Tweet/X 280, Code Line 80, or a custom value), and the tool will split the text smoothly at word boundaries without truncating words.",
      },
      {
        question: "Does this support custom delimiters like commas?",
        answer:
          "Not as a dedicated delimiter mode. For comma-separated cleanup, use Find & Replace on this site, then return here if you still need sentence or character line breaks.",
      },
      {
        question: "Is my pasted text stored or sent to a server?",
        answer:
          "No. All text parsing happens directly inside your web browser using client-side JavaScript. Your text is never stored or transmitted to our servers.",
      },
    ],
  },

  "ai-prompt-splitter": {
    id: "ai-prompt-splitter",
    href: "/ai-prompt-splitter",
    navLabel: "AI Prompt Splitter",
    title: "Long Text Chunker for ChatGPT & LLMs — Free Prompt Splitter",
    description:
      "Chunk long articles and prompts for ChatGPT, Claude, and other LLMs. Split by sentence or character count in your browser — no upload, no AI rewrite of your text.",
    keywords: [
      "ai prompt splitter",
      "chatgpt text chunker",
      "split text for llm",
      "long text chunker",
      "prompt chunking tool",
    ],
    openGraphTitle: "Long Text Chunker for ChatGPT & LLMs — Free & Private",
    heading: "Long text chunker for ChatGPT & LLMs",
    lead: "Break oversized articles and drafts into paste-friendly chunks before you send them to a model — formatting only, still 100% on-device.",
    eyebrow: "AI Prompt Splitter",
    initialOptions: { mode: "chars", charLimit: 500 },
    sections: [
      {
        heading: "Why chunk prompts locally?",
        body: "Large pastes hit context limits and messy mid-sentence cuts. Pre-chunking by sentence or character count helps you feed cleaner segments into ChatGPT, Claude, or custom pipelines — without uploading the draft to our servers first.",
      },
      {
        heading: "What this tool does (and does not)",
        body: "It inserts line breaks and optional bullets. It does not summarize, embed, or call an LLM. Your wording stays intact so you stay in control of what each model sees.",
      },
    ],
    howSteps: [
      {
        title: "Paste the long draft",
        body: "Drop the article, transcript, or prompt body into Input.",
      },
      {
        title: "Chunk by length or sentence",
        body: "Use character-limit mode (try 500+ for larger segments) or sentence mode for one idea per line.",
      },
      {
        title: "Copy each segment",
        body: "Copy Result chunks into your chat or pipeline in order.",
      },
    ],
    faqs: [
      {
        question: "Does this send my prompt to ChatGPT or your servers?",
        answer:
          "No. Chunking runs only in your browser. We never upload your text or call an AI model on your behalf.",
      },
      {
        question: "Can I split text by a specific character count?",
        answer:
          "Yes. Set a character limit that fits your workflow. Lines wrap at word boundaries so everyday words are not cut in half.",
      },
      {
        question: "Does this tool support multiple languages?",
        answer:
          "Yes. Our tool is built with full UTF-8 support, making it compatible with global languages and special symbols.",
      },
    ],
  },
};

export const LONG_TAIL_NAV_ORDER: LongTailPageId[] = [
  "split-text-by-sentence",
  "split-text-by-line",
  "ai-prompt-splitter",
];
