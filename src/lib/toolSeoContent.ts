import type { FaqItem } from "@/components/FaqSection";
import type { ToolId } from "@/lib/toolsCatalog";

export type ToolSeoContent = {
  whyHeading: string;
  whyBody: string;
  useCasesHeading: string;
  useCases: { title: string; body: string }[];
  howSteps: { title: string; body: string }[];
  faqs: FaqItem[];
};

/**
 * Long-form SEO copy for sister tool pages.
 * Limited to features each tool actually supports.
 */
export const TOOL_SEO: Partial<Record<ToolId, ToolSeoContent>> = {
  "remove-line-breaks": {
    whyHeading: "Why remove line breaks online?",
    whyBody:
      "PDF exports, Excel cells, and OCR scans often insert hard line breaks in the middle of sentences. Pasted text then looks chopped into short fragments. This free Remove Line Breaks tool joins those fragments back into one clean paragraph — entirely in your browser, with no upload and no AI rewrite of your wording.",
    useCasesHeading: "Popular use cases",
    useCases: [
      {
        title: "PDF / OCR paste cleanup",
        body: "Join mid-sentence wraps from PDF or scanner paste-ups so the draft reads as normal prose again.",
      },
      {
        title: "Excel and spreadsheet cells",
        body: "Merge cell values that arrived with forced line breaks when copied into email or Docs.",
      },
      {
        title: "Email signatures and tickets",
        body: "Flatten awkward signature or helpdesk text into a single paragraph before you reply or archive.",
      },
      {
        title: "Prep for sentence splitting",
        body: "Join broken lines first, then open the Paragraph Splitter if you need one sentence per line.",
      },
    ],
    howSteps: [
      {
        title: "Paste",
        body: "Drop the jagged text into the input box above.",
      },
      {
        title: "Join",
        body: "Conversion runs in your browser and merges lines into a continuous paragraph.",
      },
      {
        title: "Copy",
        body: "Review the result, then copy it back into Word, Docs, or email.",
      },
    ],
    faqs: [
      {
        question: "Is my pasted text uploaded when I remove line breaks?",
        answer:
          "No. Joining runs only in your browser with client-side JavaScript. Your text is never transmitted or stored on our servers.",
      },
      {
        question: "Will this change my wording?",
        answer:
          "No. The tool only removes or normalizes line breaks and spacing. It does not rewrite sentences or call an AI model.",
      },
      {
        question: "What if I need one sentence per line after joining?",
        answer:
          "After you have one clean paragraph, open the Paragraph Splitter on this site to break text by sentence or character count.",
      },
    ],
  },

  "remove-duplicate-lines": {
    whyHeading: "Why remove duplicate lines?",
    whyBody:
      "Lists copied from spreadsheets, CRM exports, or chat logs often repeat the same row. Scanning for duplicates by hand is slow and error-prone. This free Remove Duplicate Lines tool keeps the first occurrence of each line and drops the rest — privately in your browser, without uploading the list.",
    useCasesHeading: "Popular use cases",
    useCases: [
      {
        title: "Spreadsheet and CSV columns",
        body: "Deduplicate pasted columns of emails, SKUs, or names before you import them elsewhere.",
      },
      {
        title: "Bullet and checklist cleanup",
        body: "Strip repeated bullets from notes, meeting agendas, or slide outlines.",
      },
      {
        title: "Log and dump lists",
        body: "Clean repeated paths, URLs, or IDs from exported logs before sharing.",
      },
      {
        title: "Case-sensitive control",
        body: "Use the case-sensitive option when “Apple” and “apple” should stay as separate lines.",
      },
    ],
    howSteps: [
      {
        title: "Paste your list",
        body: "Put one item per line in the input box.",
      },
      {
        title: "Deduplicate",
        body: "The tool keeps the first occurrence of each line and removes later repeats locally.",
      },
      {
        title: "Copy the clean list",
        body: "Copy the result into Excel, Docs, or your next workflow step.",
      },
    ],
    faqs: [
      {
        question: "Does removing duplicates upload my list?",
        answer:
          "No. Deduplication runs entirely in your browser. Nothing is sent to our servers.",
      },
      {
        question: "Which duplicate is kept?",
        answer:
          "The first occurrence of each line is kept; later identical lines are removed from top to bottom.",
      },
      {
        question: "Can I ignore letter case when comparing lines?",
        answer:
          "Yes. Turn off case-sensitive matching if you want Apple and apple treated as the same line.",
      },
    ],
  },

  "case-converter": {
    whyHeading: "Why use this case converter?",
    whyBody:
      "Titles, headings, and pasted drafts often arrive in the wrong letter case. Fixing them manually is tedious, and chat AI tools may rewrite wording you wanted to keep. This free Case Converter changes only letter case — UPPERCASE, lowercase, Title Case, or Sentence case — in your browser with no upload.",
    useCasesHeading: "Popular use cases",
    useCases: [
      {
        title: "Slide and document titles",
        body: "Normalize headings to Title Case or Sentence case before you paste into PowerPoint or Docs.",
      },
      {
        title: "ALL CAPS cleanup",
        body: "Convert shouting ALL CAPS paste-ups into readable lowercase or sentence case.",
      },
      {
        title: "Filename and label lists",
        body: "Standardize casing on product names or labels without changing spelling.",
      },
      {
        title: "After sentence splitting",
        body: "Split paragraphs on the homepage, then convert case here when titles need a different style.",
      },
    ],
    howSteps: [
      {
        title: "Paste",
        body: "Put your text in the input box above.",
      },
      {
        title: "Choose a case mode",
        body: "Pick UPPERCASE, lowercase, Title Case, or Sentence case.",
      },
      {
        title: "Copy",
        body: "Preview updates live, then copy the result to your document.",
      },
    ],
    faqs: [
      {
        question: "Does the case converter upload my text?",
        answer:
          "No. Conversion runs only in your browser. Your text is never transmitted or stored on our servers.",
      },
      {
        question: "Will this rewrite my sentences?",
        answer:
          "No. Only letter case changes. Spelling and word order stay the same — there is no AI rewrite.",
      },
      {
        question: "What case modes are available?",
        answer:
          "UPPERCASE, lowercase, Title Case, and Sentence case. Pick the mode that matches your heading or body style.",
      },
    ],
  },

  "find-and-replace": {
    whyHeading: "Why use bulk find and replace?",
    whyBody:
      "Renaming a product, fixing a repeated typo, or swapping placeholders across a long draft is painful one search at a time. This free Find & Replace tool applies multiple A→B rules in one pass — optionally with regex — entirely in your browser so private drafts never leave your device.",
    useCasesHeading: "Popular use cases",
    useCases: [
      {
        title: "Brand and product renames",
        body: "Swap old names for new ones across an entire paste in a single run.",
      },
      {
        title: "Template placeholders",
        body: "Replace {{name}}, TBD markers, or draft tokens before you publish.",
      },
      {
        title: "Repeated typo fixes",
        body: "Apply several spelling corrections without reopening Find for each one.",
      },
      {
        title: "Optional regex power users",
        body: "Turn on regex when you need patterns; leave it off for safe everyday literal replaces.",
      },
    ],
    howSteps: [
      {
        title: "Paste the draft",
        body: "Put your source text in the input box.",
      },
      {
        title: "Add replace rules",
        body: "Enter one or more find → replace pairs. Enable regex only if you need it.",
      },
      {
        title: "Apply and copy",
        body: "Run the rules in your browser, review the result, then copy it out.",
      },
    ],
    faqs: [
      {
        question: "Is my text uploaded during find and replace?",
        answer:
          "No. All replacements run client-side in your browser. Nothing is sent to our servers.",
      },
      {
        question: "Can I run multiple replacements at once?",
        answer:
          "Yes. Add as many find → replace rules as you need; they apply in one pass on the pasted text.",
      },
      {
        question: "Is regex required?",
        answer:
          "No. Regex is optional and off by default so everyday literal replacements stay safe.",
      },
    ],
  },
};
