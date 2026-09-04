import type { Metadata } from "next";
import { OppositeToolBanner } from "@/components/OppositeToolBanner";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { RemoveLineBreaksTool } from "@/components/tools/RemoveLineBreaksTool";
import { buildPageMetadata } from "@/lib/seo";
import { TOOLS } from "@/lib/toolsCatalog";

const tool = TOOLS["remove-line-breaks"];

export const metadata: Metadata = buildPageMetadata({
  title: "Remove Line Breaks Online Free — Merge Lines into Paragraph",
  description:
    "Remove line breaks from text and merge lines into a clean paragraph. Free online tool for Excel paste, email signatures, and PDF copy — 100% private.",
  keywords: [
    "Remove line breaks from text",
    "Merge lines into paragraph",
    "Remove line breaks online free",
  ],
  path: "/tools/remove-line-breaks",
});

export default function RemoveLineBreaksPage() {
  return (
    <ToolPageShell
      toolId={tool.id}
      eyebrow={tool.title}
      title="Turn broken lines into a clean paragraph"
      description="Paste Excel cells, PDF copy, or email signatures with awkward line breaks — join them instantly without sending text anywhere."
      adSlotPrefix="join"
      beforeTool={<OppositeToolBanner target="paragraph-splitter" />}
    >
      <RemoveLineBreaksTool />
    </ToolPageShell>
  );
}
