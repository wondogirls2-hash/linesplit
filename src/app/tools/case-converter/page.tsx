import type { Metadata } from "next";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { CaseConverterTool } from "@/components/tools/CaseConverterTool";
import { buildPageMetadata } from "@/lib/seo";
import { TOOLS } from "@/lib/toolsCatalog";

const tool = TOOLS["case-converter"];

export const metadata: Metadata = buildPageMetadata({
  title: "Case Converter Online — UPPERCASE, Title Case, Sentence Case",
  description:
    "Convert text to UPPERCASE, lowercase, Title Case, or Sentence case instantly. Private browser tool with no AI rewrite.",
  keywords: [
    "Case converter online",
    "Title case converter",
    "UPPERCASE lowercase tool",
    "Sentence case converter",
  ],
  path: "/tools/case-converter",
});

export default function CaseConverterPage() {
  return (
    <ToolPageShell
      toolId={tool.id}
      eyebrow={tool.title}
      title="Change casing without changing your words"
      description="Pick a mode and paste. Spelling stays the same — only letter case updates. No account, no upload."
      adSlotPrefix="case"
    >
      <CaseConverterTool />
    </ToolPageShell>
  );
}
