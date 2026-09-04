import { AdSlot } from "@/components/AdSlot";
import { RelatedToolsCard } from "@/components/RelatedToolsCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { ToolId } from "@/lib/toolsCatalog";

type ToolPageShellProps = {
  toolId: ToolId;
  title: string;
  description: string;
  eyebrow?: string;
  adSlotPrefix: string;
  beforeTool?: React.ReactNode;
  children: React.ReactNode;
};

/**
 * Shared page chrome for sister tools — established by remove-duplicate-lines.
 * Reuse this shell so every tool stays visually identical.
 */
export function ToolPageShell({
  toolId,
  title,
  description,
  eyebrow,
  adSlotPrefix,
  beforeTool,
  children,
}: ToolPageShellProps) {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-24 pt-6 sm:px-6 lg:px-8">
      <SiteHeader title={title} description={description} eyebrow={eyebrow} />

      {beforeTool}

      <AdSlot
        position="top-banner"
        slotId={`${adSlotPrefix}-top`}
        className="mb-6"
      />

      <main className="flex-1 space-y-8">{children}</main>

      <div className="mt-10">
        <RelatedToolsCard current={toolId} />
      </div>

      <SiteFooter
        adSlotId={`${adSlotPrefix}-footer`}
        note="Runs 100% in your browser. No accounts. No uploads. Your text never leaves this device."
      />
    </div>
  );
}
