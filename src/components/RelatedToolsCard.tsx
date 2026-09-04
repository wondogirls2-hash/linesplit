import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getRelatedTools, type ToolId } from "@/lib/toolsCatalog";

type RelatedToolsCardProps = {
  current: ToolId;
  /** Override default related list */
  limit?: number;
  heading?: string;
};

export function RelatedToolsCard({
  current,
  limit = 3,
  heading = "Related tools",
}: RelatedToolsCardProps) {
  const related = getRelatedTools(current, limit);

  return (
    <section className="space-y-3" aria-label={heading}>
      <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {heading}
      </h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((tool) => (
          <Link
            key={tool.id}
            href={tool.href}
            className="group flex flex-col rounded-2xl border border-border/60 bg-card/70 p-4 shadow-sm transition hover:border-primary/30 hover:bg-primary/5 hover:shadow-soft"
          >
            <span className="flex items-center gap-1 text-sm font-semibold text-foreground">
              {tool.navLabel}
              <ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
            </span>
            <span className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {tool.shortDescription}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
