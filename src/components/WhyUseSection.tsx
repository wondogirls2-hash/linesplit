const POINTS = [
  {
    title: "100% Data Privacy",
    body: "Need to split a paragraph into sentences without uploading a draft to the cloud? Everything runs in your browser — there is no server upload, no account, and no logging of what you paste. Close the tab and the text is gone from our side, because it never left your device.",
  },
  {
    title: "No AI Alterations",
    body: "Chat tools often rewrite phrasing when you only wanted a line break after each period. ParagraphSplitter never summarizes or “improves” your wording. It inserts line breaks, optional bullets, and spacing fixes — your sentences stay exactly as you wrote them.",
  },
  {
    title: "Zero Prompting",
    body: "No signup and no prompt engineering. Paste once and watch a live preview update as you type; Convert is optional. Prefer the keyboard? Ctrl/⌘+Enter re-runs the split, and Esc clears the workspace so you can move quickly through large blocks of text.",
  },
  {
    title: "Free & Offline-Capable",
    body: "The tool is free to use with no paywall on the converter. After the page loads, splitting continues to work even if your connection drops — useful when you are cleaning PDF paste-ups or Word paragraphs on the go.",
  },
  {
    title: "Built for Real Formatting Jobs",
    body: "Abbreviation-aware detection reduces false splits on titles like Mr. or places like U.S. Switch to character-limit mode with SEO Meta (160), Tweet/X (280), or Code Line (80) presets when you need length wrapping instead of sentence breaks.",
  },
] as const;

/** SEO / trust section for the main Paragraph Splitter page */
export function WhyUseSection() {
  return (
    <section aria-labelledby="why-use-heading" className="space-y-5">
      <h2
        id="why-use-heading"
        className="text-lg font-semibold tracking-tight text-foreground sm:text-xl"
      >
        Why use this tool?
      </h2>
      <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Built for people who copy text from Word, Google Docs, PDFs, or email and
        need one sentence per line — without ChatGPT, without accounts, and
        without sending a single character to a server.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {POINTS.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-border/50 bg-card/50 p-5 shadow-sm backdrop-blur-sm"
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
