import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { FaqSection } from "@/components/FaqSection";
import { RelatedToolsCard } from "@/components/RelatedToolsCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TextConverter } from "@/components/TextConverter";
import type { LongTailPageDef } from "@/lib/longTailPages";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type LongTailPageShellProps = {
  page: LongTailPageDef;
};

/**
 * Shared chrome for long-tail SEO landings that embed the main converter.
 */
export function LongTailPageShell({ page }: LongTailPageShellProps) {
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    description: page.description,
    url: `${SITE_URL}${page.href}`,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-24 pt-6 sm:px-6 lg:px-8">
      <script
        id={`${page.id}-webpage-jsonld`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <SiteHeader
        eyebrow={page.eyebrow}
        title={page.heading}
        description={page.lead}
      />

      <AdSlot
        position="top-banner"
        slotId={`${page.id}-top`}
        className="mb-6"
      />

      <main className="flex-1 space-y-12">
        <TextConverter initialOptions={page.initialOptions} />

        <RelatedToolsCard
          current="paragraph-splitter"
          heading="Related tools"
        />

        <section
          aria-label="About this tool"
          className="mx-auto max-w-3xl space-y-8 text-[15px] leading-relaxed text-muted-foreground"
        >
          {page.sections.map((section) => (
            <div key={section.heading} className="space-y-2">
              <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                {section.heading}
              </h2>
              <p>{section.body}</p>
            </div>
          ))}

          <div className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
              How it works
            </h2>
            <ol className="list-decimal space-y-2.5 pl-5">
              {page.howSteps.map((step) => (
                <li key={step.title}>
                  <strong className="font-semibold text-foreground">
                    {step.title}:
                  </strong>{" "}
                  {step.body}
                </li>
              ))}
            </ol>
            <p>
              Prefer the main hub? Open the{" "}
              <Link
                href="/"
                className="font-medium text-primary underline-offset-2 hover:underline"
              >
                Paragraph Splitter homepage
              </Link>
              .
            </p>
          </div>
        </section>

        <FaqSection items={page.faqs} />
      </main>

      <SiteFooter adSlotId={`${page.id}-footer`} />
    </div>
  );
}
