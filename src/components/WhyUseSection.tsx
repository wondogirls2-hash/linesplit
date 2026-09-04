const POINTS = [
  {
    title: "100% Data Privacy",
    body: "Your text never leaves this device. There is no server upload, no account, and no logging of content — everything runs in your browser.",
  },
  {
    title: "No AI Alterations",
    body: "We never rewrite, summarize, or “improve” your wording. Line breaks and formatting change — your sentences stay exactly as you wrote them.",
  },
  {
    title: "Zero Prompting",
    body: "No chat, no prompt engineering. Paste once and get instant results — Convert is optional thanks to live preview.",
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
      <div className="grid gap-4 sm:grid-cols-3">
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
