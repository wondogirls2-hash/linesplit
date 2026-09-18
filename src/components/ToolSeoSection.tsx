import Link from "next/link";
import { FaqSection } from "@/components/FaqSection";
import type { ToolSeoContent } from "@/lib/toolSeoContent";

type ToolSeoSectionProps = {
  content: ToolSeoContent;
  /** Optional link back to the tools hub */
  showToolsHubLink?: boolean;
};

/**
 * Long-form SEO body for sister tool pages (why / use cases / how / FAQ).
 */
export function ToolSeoSection({
  content,
  showToolsHubLink = true,
}: ToolSeoSectionProps) {
  return (
    <div className="space-y-12">
      <section
        aria-label="About this tool"
        className="mx-auto max-w-3xl space-y-10 text-[15px] leading-relaxed text-muted-foreground"
      >
        <div className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            {content.whyHeading}
          </h2>
          <p>{content.whyBody}</p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            {content.useCasesHeading}
          </h2>
          <ul className="list-disc space-y-2.5 pl-5">
            {content.useCases.map((item) => (
              <li key={item.title}>
                <strong className="font-semibold text-foreground">
                  {item.title}:
                </strong>{" "}
                {item.body}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            How it works
          </h2>
          <ol className="list-decimal space-y-2.5 pl-5">
            {content.howSteps.map((step) => (
              <li key={step.title}>
                <strong className="font-semibold text-foreground">
                  {step.title}:
                </strong>{" "}
                {step.body}
              </li>
            ))}
          </ol>
          {showToolsHubLink ? (
            <p>
              Browse every utility on the{" "}
              <Link
                href="/tools"
                className="font-medium text-primary underline-offset-2 hover:underline"
              >
                tools hub
              </Link>{" "}
              or return to the{" "}
              <Link
                href="/"
                className="font-medium text-primary underline-offset-2 hover:underline"
              >
                Paragraph Splitter homepage
              </Link>
              .
            </p>
          ) : null}
        </div>
      </section>

      <FaqSection items={content.faqs} />
    </div>
  );
}
