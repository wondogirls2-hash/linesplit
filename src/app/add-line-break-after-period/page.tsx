import type { Metadata } from "next";
import { LongTailPageShell } from "@/components/LongTailPageShell";
import { LONG_TAIL_PAGES } from "@/lib/longTailPages";
import { buildPageMetadata } from "@/lib/seo";

const page = LONG_TAIL_PAGES["add-line-break-after-period"];

export const metadata: Metadata = buildPageMetadata({
  title: page.title,
  description: page.description,
  path: page.href,
  absoluteTitle: true,
  openGraphTitle: page.openGraphTitle,
});

export default function AddLineBreakAfterPeriodPage() {
  return <LongTailPageShell page={page} />;
}
