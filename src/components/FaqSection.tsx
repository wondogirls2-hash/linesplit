import { SITE_NAME, SITE_URL } from "@/lib/site";

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqSectionProps = {
  items: FaqItem[];
  heading?: string;
};

/** Visible FAQ + JSON-LD FAQPage schema for SEO */
export function FaqSection({
  items,
  heading = "Frequently asked questions",
}: FaqSectionProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section aria-labelledby="faq-heading" className="space-y-5">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2
        id="faq-heading"
        className="text-lg font-semibold tracking-tight text-foreground sm:text-xl"
      >
        {heading}
      </h2>
      <dl className="space-y-4">
        {items.map((item) => (
          <div
            key={item.question}
            className="rounded-2xl border border-border/50 bg-card/40 px-5 py-4"
          >
            <dt className="text-sm font-semibold text-foreground">
              {item.question}
            </dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
      <p className="sr-only">
        {SITE_NAME} at {SITE_URL}
      </p>
    </section>
  );
}
