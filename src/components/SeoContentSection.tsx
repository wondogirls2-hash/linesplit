import Link from "next/link";

/**
 * Long-form SEO content for the homepage (below the tool).
 * Copy is limited to features the converter actually supports.
 */
export function SeoContentSection() {
  return (
    <section
      aria-label="About this paragraph splitter"
      className="mx-auto max-w-3xl space-y-10 text-[15px] leading-relaxed text-muted-foreground"
    >
      <div className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          Why Use an Online Paragraph Splitter?
        </h2>
        <p>
          Large blocks of unformatted text are hard to read and can hurt
          engagement. Whether you are publishing a blog post, formatting social
          captions, or structuring prompts for AI language models, clear text
          chunking helps. Our{" "}
          <strong className="font-semibold text-foreground">
            free Paragraph Splitter
          </strong>{" "}
          splits bulk text by sentence breaks or character counts in seconds —
          entirely in your browser, with no upload and no AI rewrite. Jump to
          focused guides:{" "}
          <Link
            href="/split-text-by-sentence"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            split by sentence
          </Link>
          ,{" "}
          <Link
            href="/split-text-by-line"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            split by line
          </Link>
          , or{" "}
          <Link
            href="/ai-prompt-splitter"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            AI prompt chunking
          </Link>
          .
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          Popular Use Cases
        </h2>
        <ul className="list-disc space-y-2.5 pl-5">
          <li>
            <strong className="font-semibold text-foreground">
              Content creators &amp; bloggers:
            </strong>{" "}
            Break long, dense paragraphs into bite-sized, mobile-friendly
            sentence lines to improve scanability.
          </li>
          <li>
            <strong className="font-semibold text-foreground">
              AI prompts &amp; data chunking:
            </strong>{" "}
            Split large articles into smaller segments that fit context windows
            for ChatGPT, Claude, or custom LLM pipelines — without sending your
            draft to our servers.
          </li>
          <li>
            <strong className="font-semibold text-foreground">
              Translators &amp; editors:
            </strong>{" "}
            Put one sentence per line for side-by-side comparison, review, or
            handoff to translation tools.
          </li>
          <li>
            <strong className="font-semibold text-foreground">
              Slides, captions &amp; teleprompters:
            </strong>{" "}
            Turn a paragraph into dash or bullet lines for decks, or one line
            per spoken sentence for notes and captions.
          </li>
          <li>
            <strong className="font-semibold text-foreground">
              PDF / OCR cleanup:
            </strong>{" "}
            If paste from a PDF is already broken mid-sentence, join it first
            with{" "}
            <Link
              href="/tools/remove-line-breaks"
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              Remove Line Breaks
            </Link>
            , then split by sentence here.
          </li>
        </ul>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          How It Works
        </h2>
        <ol className="list-decimal space-y-2.5 pl-5">
          <li>
            <strong className="font-semibold text-foreground">
              Paste your text:
            </strong>{" "}
            Copy raw text into the input box above from Word, Docs, email, or a
            PDF paste-up.
          </li>
          <li>
            <strong className="font-semibold text-foreground">
              Choose split criteria:
            </strong>{" "}
            Split by sentence (. ! ?) with abbreviation-aware detection, or by
            character count (SEO Meta 160, Tweet/X 280, Code Line 80, or a
            custom limit). Optionally add bullets and single or blank line
            spacing.
          </li>
          <li>
            <strong className="font-semibold text-foreground">
              Copy the result:
            </strong>{" "}
            Preview updates live, edit any line in the Result box, then copy to
            your clipboard in one click.
          </li>
        </ol>
      </div>
    </section>
  );
}
