import type { ConvertOptions } from "@/types";

export type LongTailPageId =
  | "split-text-by-sentence"
  | "split-text-by-line"
  | "ai-prompt-splitter"
  | "split-text-into-paragraphs"
  | "split-paragraph-into-sentences"
  | "add-line-break-after-period";

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
  keywords?: string[];
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
  /** Optional before/after demo copy shown in the body */
  example?: {
    heading: string;
    beforeLabel: string;
    before: string;
    afterLabel: string;
    after: string;
  };
  useCases?: { title: string; body: string }[];
  relatedLinks?: { href: string; label: string; blurb: string }[];
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
    relatedLinks: [
      {
        href: "/split-paragraph-into-sentences",
        label: "Split paragraph into sentences",
        blurb: "Same job with a search-focused landing and examples.",
      },
      {
        href: "/add-line-break-after-period",
        label: "Add a line break after every period",
        blurb: "When you specifically want a newline after each full stop.",
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
    navLabel: "ChatGPT Prompt Splitter",
    title: "ChatGPT Prompt Splitter — Chunk Long Text for LLMs Free",
    description:
      "Free ChatGPT prompt splitter and long-text chunker. Split articles and prompts by sentence or character count in your browser — no upload, no AI rewrite.",
    openGraphTitle: "ChatGPT Prompt Splitter — Free On-Device Chunker",
    heading: "ChatGPT prompt splitter for long text",
    lead: "Break oversized articles, transcripts, and prompt bodies into paste-friendly chunks before you send them to ChatGPT, Claude, or another model — formatting only, still 100% on-device.",
    eyebrow: "ChatGPT Prompt Splitter",
    initialOptions: { mode: "chars", charLimit: 500 },
    sections: [
      {
        heading: "Why use a ChatGPT prompt splitter?",
        body: "Long pastes hit context limits, get cut mid-sentence, or make it hard to review what you actually sent. A local prompt splitter lets you pre-chunk by character count or sentence so each paste into ChatGPT (or Claude, Gemini, and similar tools) stays readable and complete. This page is built for the “chatgpt prompt splitter” search intent: chunking only — not rewriting your prompt with another model first.",
      },
      {
        heading: "What this tool does (and does not)",
        body: "It inserts line breaks and optional bullets so you can copy segments in order. It does not summarize, embed, call OpenAI, or rewrite wording. Your draft stays private in the browser while you decide what each chat turn should include.",
      },
      {
        heading: "Good defaults for LLM pastes",
        body: "Start with character-limit mode around 500–1500 characters depending on how large each chat message should be. Prefer sentence mode when you want whole thoughts on separate lines before you copy a block into ChatGPT. Abbreviation-aware splitting helps keep titles like Mr. and U.S. from creating false breaks.",
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
        title: "Copy each segment into ChatGPT",
        body: "Copy Result chunks into your chat or pipeline in order. Nothing leaves this page until you paste elsewhere yourself.",
      },
    ],
    example: {
      heading: "Before and after",
      beforeLabel: "Before (one huge paste)",
      before:
        "Here is a long research note that exceeds a comfortable chat paste. It covers background, method, and findings in one unbroken block that is hard to send in parts.",
      afterLabel: "After (character chunks)",
      after:
        "Here is a long research note that exceeds a comfortable chat paste.\n\nIt covers background, method, and findings in one unbroken block that is hard to send in parts.",
    },
    useCases: [
      {
        title: "ChatGPT long-article pastes",
        body: "Split a blog post or PDF extract into ordered chunks so each ChatGPT message stays under a size you can review.",
      },
      {
        title: "Claude and Gemini workflows",
        body: "Same on-device chunking works for any chat UI — the tool never calls a model for you.",
      },
      {
        title: "Prompt library prep",
        body: "Break a mega-prompt into labeled sections (context, rules, examples) on separate lines before you assemble the final paste.",
      },
      {
        title: "Transcript cleanup",
        body: "Turn a dense interview transcript into sentence lines, then copy segments into your LLM of choice.",
      },
    ],
    relatedLinks: [
      {
        href: "/split-text-into-paragraphs",
        label: "Split text into paragraphs",
        blurb: "Balance long drafts into N paragraphs before prompting.",
      },
      {
        href: "/split-text-by-line",
        label: "Split text by line",
        blurb: "Wrap by character presets when you need fixed-width chunks.",
      },
    ],
    faqs: [
      {
        question: "Does this ChatGPT prompt splitter send my text to OpenAI?",
        answer:
          "No. Chunking runs only in your browser. We never upload your text or call ChatGPT (or any other model) on your behalf.",
      },
      {
        question: "Is this the same as asking ChatGPT to split my prompt?",
        answer:
          "No. Asking ChatGPT to split text sends the draft to that service and may paraphrase it. This page only inserts line breaks locally so your wording stays intact.",
      },
      {
        question: "Can I split text by a specific character count?",
        answer:
          "Yes. Set a character limit that fits your workflow. Lines wrap at word boundaries so everyday words are not cut in half.",
      },
      {
        question: "Does this tool support multiple languages?",
        answer:
          "Yes. It uses full UTF-8 text handling, so most global languages and symbols work in the input and result boxes.",
      },
    ],
  },

  "split-text-into-paragraphs": {
    id: "split-text-into-paragraphs",
    href: "/split-text-into-paragraphs",
    navLabel: "Into Paragraphs",
    title: "Split Text into Paragraphs Online — Free Paragraph Breaker",
    description:
      "Free tool to split text into paragraphs. Break a long block into balanced paragraphs or N sentences per paragraph in your browser — no upload, no AI rewrite.",
    openGraphTitle: "Split Text into Paragraphs Online — Free & Private",
    heading: "Split text into paragraphs online",
    lead: "Turn one wall of text into readable paragraphs — by sentences per paragraph, or into a target number of balanced blocks. Everything runs locally.",
    eyebrow: "Paragraph Breaker",
    initialOptions: {
      mode: "sentences-per-paragraph",
      sentencesPerParagraph: 3,
    },
    sections: [
      {
        heading: "When you need to split text into paragraphs",
        body: "Search phrases like “split text into paragraphs,” “split to paragraph,” and “auto break text into paragraphs” usually mean the same job: a dense paste that should become several shorter blocks with blank lines between them. Writers hit this after AI drafts, OCR, or notes that arrived as one paragraph. This page starts in “By sentences / paragraph” mode so you can group a fixed number of sentences into each block. Switch to “Into N paragraphs” when you know you want exactly two, three, or more balanced sections.",
      },
      {
        heading: "Sentence boundaries, not random cuts",
        body: "Paragraphs are built from abbreviation-aware sentence detection. Titles like Mr. and patterns like U.S. are protected so you do not get false breaks. Cuts never happen in the middle of a sentence when you use the paragraph modes. Optional Fix double spacing and Trim empty lines still apply after grouping.",
      },
      {
        heading: "Private by design",
        body: "Your draft never leaves the browser for processing. There is no upload step and no AI rewrite — only formatting — so you can clean confidential notes before pasting them into Word, Docs, or a CMS.",
      },
    ],
    howSteps: [
      {
        title: "Paste the long block",
        body: "Put the wall of text into Input. Keep “By sentences / paragraph” selected, or switch to “Into N paragraphs.”",
      },
      {
        title: "Choose N",
        body: "For sentences per paragraph, try 2–4. For into-N mode, set 2 when you want a simple split into two paragraphs.",
      },
      {
        title: "Review blank lines",
        body: "Paragraphs are separated by a blank line. Edit any block in Result, then copy.",
      },
      {
        title: "Optional cleanup",
        body: "If the source had awkward mid-sentence wraps, run Remove Line Breaks first, then return here to split into paragraphs.",
      },
    ],
    example: {
      heading: "Before and after",
      beforeLabel: "Before (one paragraph)",
      before:
        "The team shipped the beta on Monday. Feedback arrived the same afternoon. Designers adjusted spacing overnight. Engineers fixed two edge cases. Marketing drafted the launch note.",
      afterLabel: "After (3 sentences per paragraph)",
      after:
        "The team shipped the beta on Monday. Feedback arrived the same afternoon. Designers adjusted spacing overnight.\n\nEngineers fixed two edge cases. Marketing drafted the launch note.",
    },
    useCases: [
      {
        title: "Blog and newsletter drafts",
        body: "Break AI or outline dumps into scannable paragraphs before you edit tone.",
      },
      {
        title: "Student and research notes",
        body: "Split a long reading summary into two or three balanced paragraphs for a report.",
      },
      {
        title: "Support and knowledge base articles",
        body: "Turn a single pasted answer into shorter paragraphs for help-center readability.",
      },
      {
        title: "Slide and script prep",
        body: "Group a few sentences per paragraph, then move each block onto a slide or speaker note.",
      },
      {
        title: "CMS paste cleanup",
        body: "Restore paragraph spacing when a CMS or email client flattened everything into one block.",
      },
    ],
    relatedLinks: [
      {
        href: "/split-paragraph-into-sentences",
        label: "Split paragraph into sentences",
        blurb: "Need one sentence per line instead of multi-sentence paragraphs.",
      },
      {
        href: "/ai-prompt-splitter",
        label: "ChatGPT prompt splitter",
        blurb: "Chunk long prompts by length before pasting into a model.",
      },
      {
        href: "/tools/remove-line-breaks",
        label: "Remove line breaks",
        blurb: "Join fragmented PDF lines first, then split into paragraphs.",
      },
    ],
    faqs: [
      {
        question: "How do I split a long paragraph into two paragraphs?",
        answer:
          "Choose “Into N paragraphs”, set the count to 2, and paste your text. The tool splits only at sentence boundaries and balances length as evenly as possible.",
      },
      {
        question: "What does “By sentences / paragraph” do?",
        answer:
          "It splits the text into sentences, then groups N sentences into each paragraph (default 3). The last paragraph may be shorter if sentences do not divide evenly.",
      },
      {
        question: "Will this rewrite my wording?",
        answer:
          "No. It only inserts blank lines between sentence groups. Your words stay the same.",
      },
      {
        question: "Is my text uploaded?",
        answer:
          "No. Splitting runs entirely in your browser with client-side JavaScript.",
      },
      {
        question: "Can I go back to one sentence per line?",
        answer:
          "Yes. Switch the mode to “By sentence”, or open the Split paragraph into sentences guide on this site.",
      },
    ],
  },

  "split-paragraph-into-sentences": {
    id: "split-paragraph-into-sentences",
    href: "/split-paragraph-into-sentences",
    navLabel: "Into Sentences",
    title: "Split Paragraph into Sentences Online — One Line Each",
    description:
      "Split a paragraph into sentences online. Get one sentence per line with abbreviation-aware breaks — free, private, and fully in your browser.",
    openGraphTitle: "Split Paragraph into Sentences — Free Online Tool",
    heading: "Split a paragraph into sentences",
    lead: "Paste one dense paragraph and receive one sentence per line — ideal for editing, translation, rehearsal, and slide scripts.",
    eyebrow: "Paragraph → Sentences",
    initialOptions: { mode: "sentence" },
    sections: [
      {
        heading: "From one paragraph to one sentence per line",
        body: "People search “split paragraph into sentences” when a single block needs to become a list of lines. Teachers use it for worksheets, writers for line-level edits, and presenters for speaker notes. This page opens the converter in By sentence mode so each detected sentence lands on its own line immediately.",
      },
      {
        heading: "Abbreviation-aware detection",
        body: "Periods inside Mr., Mrs., Dr., Prof., and patterns like U.S. or U.K. are protected whenever possible so titles do not create empty extra lines. Question marks and exclamation points also end sentences. You can still edit the Result box if an edge case appears.",
      },
      {
        heading: "Works with your existing workflow",
        body: "Copy from Word, Google Docs, email, Notion, or a cleaned PDF paste. After splitting, optionally add dash or bullet prefixes, choose single or double line breaks, then copy back. Nothing is uploaded and wording is never rewritten by an AI model.",
      },
    ],
    howSteps: [
      {
        title: "Paste the paragraph",
        body: "Put the full paragraph into Input. By sentence mode is already selected.",
      },
      {
        title: "Watch live preview",
        body: "As you type or paste, Result updates with one sentence per line.",
      },
      {
        title: "Tune spacing",
        body: "Use Line breaks for a blank line between sentences if you prefer more breathing room.",
      },
      {
        title: "Copy",
        body: "Copy Result into your document, sheet, or slide outline.",
      },
    ],
    example: {
      heading: "Before and after",
      beforeLabel: "Before",
      before:
        "We opened early. The queue was short. Everyone finished before noon.",
      afterLabel: "After",
      after: "We opened early.\nThe queue was short.\nEveryone finished before noon.",
    },
    useCases: [
      {
        title: "Line-level editing",
        body: "Review each sentence alone when tightening a draft or checking grammar.",
      },
      {
        title: "Translation prep",
        body: "Give translators one sentence per line so segments stay aligned.",
      },
      {
        title: "Presentation scripts",
        body: "Move each sentence onto a cue card or speaker-note line.",
      },
      {
        title: "Language learning",
        body: "Break a reading paragraph into sentences for drills or flashcards.",
      },
    ],
    relatedLinks: [
      {
        href: "/add-line-break-after-period",
        label: "Add line break after period",
        blurb: "Same sentence mode with period-focused wording and examples.",
      },
      {
        href: "/split-text-into-paragraphs",
        label: "Split text into paragraphs",
        blurb: "Group sentences back into multi-sentence paragraphs.",
      },
      {
        href: "/split-text-by-sentence",
        label: "Split text by sentence",
        blurb: "Alternate landing for sentence-per-line workflows.",
      },
    ],
    faqs: [
      {
        question: "Does splitting a paragraph into sentences upload my text?",
        answer:
          "No. Detection and formatting run only in your browser.",
      },
      {
        question: "Will Mr. or U.S. create extra lines?",
        answer:
          "Usually not. Common abbreviations and initialisms are protected. Edit Result if a rare case slips through.",
      },
      {
        question: "Can I split into paragraphs instead?",
        answer:
          "Yes. Open Split text into paragraphs and use sentences-per-paragraph or into-N mode.",
      },
      {
        question: "Does this change my words?",
        answer:
          "No. Only line breaks (and optional bullets) are added.",
      },
    ],
  },

  "add-line-break-after-period": {
    id: "add-line-break-after-period",
    href: "/add-line-break-after-period",
    navLabel: "Break After Period",
    title: "Add Line Break After Period — Split Sentences Online",
    description:
      "Add a line break after every period online. Split sentences onto new lines with abbreviation-aware detection — free, private, browser-only.",
    openGraphTitle: "Add Line Break After Every Period — Free Tool",
    heading: "Add a line break after every period",
    lead: "Insert a newline after each sentence ending so “one idea per line” is ready for Docs, slides, or scripts — without ChatGPT rewrites.",
    eyebrow: "Break After Period",
    initialOptions: { mode: "sentence" },
    sections: [
      {
        heading: "Why add a line break after every period?",
        body: "Writers search this phrase when they want a mechanical newline after each full stop — not a paraphrase. Chat tools often rewrite phrasing when you only asked for a line break. This page uses By sentence mode so periods, question marks, and exclamation points become line boundaries while your wording stays intact.",
      },
      {
        heading: "Smarter than a naive find-and-replace",
        body: "A raw replace of “. ” with “.\\n” breaks titles like Mr. Smith and decimals like 3.14. ParagraphSplitter’s sentence mode protects common abbreviations and initialisms first, then places the line break. You can still use Find & Replace on this site for other patterns, but sentence mode is the safer default for prose.",
      },
      {
        heading: "Pair with other cleanups",
        body: "If the paste arrived with mid-sentence wraps from a PDF, join lines with Remove Line Breaks first. If you later want multi-sentence paragraphs again, use Split text into paragraphs. All of these utilities stay on-device.",
      },
    ],
    howSteps: [
      {
        title: "Paste your prose",
        body: "Drop the paragraph into Input. By sentence mode is pre-selected.",
      },
      {
        title: "Confirm the breaks",
        body: "Result shows one sentence per line — effectively a line break after each period (and ! or ?).",
      },
      {
        title: "Optional blank lines",
        body: "Set Line breaks to double if you want a blank line between sentences.",
      },
      {
        title: "Copy back",
        body: "Paste into Word, Google Docs, or your slide notes.",
      },
    ],
    example: {
      heading: "Before and after",
      beforeLabel: "Before",
      before: "Pack light. Arrive early. Bring water.",
      afterLabel: "After (line break after each period)",
      after: "Pack light.\nArrive early.\nBring water.",
    },
    useCases: [
      {
        title: "Speaker notes",
        body: "Force a pause-friendly line after each period before rehearsal.",
      },
      {
        title: "Checklist conversion",
        body: "Turn short imperative sentences into one task per line.",
      },
      {
        title: "Caption and subtitle drafts",
        body: "Start from sentence lines before you time captions elsewhere.",
      },
      {
        title: "Avoid AI rewrites",
        body: "Get the break-after-period effect without sending the draft to a chatbot.",
      },
    ],
    relatedLinks: [
      {
        href: "/split-paragraph-into-sentences",
        label: "Split paragraph into sentences",
        blurb: "Same mode with paragraph-focused examples.",
      },
      {
        href: "/tools/find-and-replace",
        label: "Find and replace",
        blurb: "For custom delimiter swaps that are not sentence boundaries.",
      },
      {
        href: "/",
        label: "Paragraph Splitter homepage",
        blurb: "All split modes, including paragraphs and character limits.",
      },
    ],
    faqs: [
      {
        question: "Does this literally replace every period with a period plus newline?",
        answer:
          "It splits on sentence boundaries (. ! ?) with abbreviation protection, which is safer than a blind find-and-replace on every dot.",
      },
      {
        question: "What about Mr. or U.S.?",
        answer:
          "Common abbreviations and initialisms are protected so those dots usually do not start a new line.",
      },
      {
        question: "Can I add a blank line after each period?",
        answer:
          "Yes. After splitting, set Line breaks to double for a blank line between sentences.",
      },
      {
        question: "Is my text sent to a server?",
        answer:
          "No. Formatting runs entirely in your browser.",
      },
    ],
  },
};

export const LONG_TAIL_NAV_ORDER: LongTailPageId[] = [
  "split-text-into-paragraphs",
  "split-paragraph-into-sentences",
  "add-line-break-after-period",
  "split-text-by-sentence",
  "split-text-by-line",
  "ai-prompt-splitter",
];
