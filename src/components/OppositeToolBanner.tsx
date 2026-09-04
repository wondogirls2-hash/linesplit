import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TOOLS, type ToolId } from "@/lib/toolsCatalog";

type OppositeToolBannerProps = {
  /** The opposite tool to promote */
  target: ToolId;
};

export function OppositeToolBanner({ target }: OppositeToolBannerProps) {
  const tool = TOOLS[target];

  return (
    <div className="mb-4 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-foreground">
      Looking for the opposite? Try{" "}
      <Link
        href={tool.href}
        className="inline-flex items-center gap-1 font-semibold text-primary underline-offset-2 hover:underline"
      >
        {tool.navLabel}
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
