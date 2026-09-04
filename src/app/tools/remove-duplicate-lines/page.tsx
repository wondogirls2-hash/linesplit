import type { Metadata } from "next";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { RemoveDuplicateLinesTool } from "@/components/tools/RemoveDuplicateLinesTool";
import { buildPageMetadata } from "@/lib/seo";
import { TOOLS } from "@/lib/toolsCatalog";

const tool = TOOLS["remove-duplicate-lines"];

export const metadata: Metadata = buildPageMetadata({
  title: "Remove Duplicate Lines Online — Deduplicate Text List",
  description:
    "Remove duplicate lines from any pasted list. Case-sensitive toggle. Free, private browser tool — no upload.",
  keywords: [
    "Remove duplicate lines online",
    "Deduplicate text list",
    "Delete repeated lines",
  ],
  path: "/tools/remove-duplicate-lines",
});

export default function RemoveDuplicateLinesPage() {
  return (
    <ToolPageShell
      toolId={tool.id}
      eyebrow={tool.title}
      title="Remove duplicate lines from any list"
      description="Paste Excel columns, bullet lists, or email dumps. Keep the first occurrence of each line and drop the rest — no upload, no AI."
      adSlotPrefix="dedupe"
    >
      <RemoveDuplicateLinesTool />
    </ToolPageShell>
  );
}
