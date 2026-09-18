import type { Metadata } from "next";
import { LongTailPageShell } from "@/components/LongTailPageShell";
import { LONG_TAIL_PAGES } from "@/lib/longTailPages";
import { buildPageMetadata } from "@/lib/seo";

const page = LONG_TAIL_PAGES["split-text-by-line"];

export const metadata: Metadata = buildPageMetadata({
  title: page.title,
  description: page.description,
  keywords: page.keywords,
  path: page.href,
  absoluteTitle: true,
  openGraphTitle: page.openGraphTitle,
});

export default function SplitTextByLinePage() {
  return <LongTailPageShell page={page} />;
}
