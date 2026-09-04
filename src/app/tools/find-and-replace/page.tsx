import type { Metadata } from "next";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { FindAndReplaceTool } from "@/components/tools/FindAndReplaceTool";
import { buildPageMetadata } from "@/lib/seo";
import { TOOLS } from "@/lib/toolsCatalog";

const tool = TOOLS["find-and-replace"];

export const metadata: Metadata = buildPageMetadata({
  title: "Bulk Find and Replace Text Online — Batch Text Replace Tool",
  description:
    "Multiple find and replace rules in one pass. Batch text replace tool with optional regex. Private — runs only in your browser.",
  keywords: [
    "Bulk find and replace text online",
    "Multiple find and replace",
    "Batch text replace tool",
  ],
  path: "/tools/find-and-replace",
});

export default function FindAndReplacePage() {
  return (
    <ToolPageShell
      toolId={tool.id}
      eyebrow={tool.title}
      title="Batch find and replace in one pass"
      description="Add as many A→B rules as you need. Regex is available but off by default so everyday edits stay safe."
      adSlotPrefix="replace"
    >
      <FindAndReplaceTool />
    </ToolPageShell>
  );
}
