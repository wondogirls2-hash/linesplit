"use client";

import { useAdConsent } from "@/components/AdConsentProvider";
import { ADS_ENABLED, ADSENSE_CLIENT_ID } from "@/lib/site";
import { cn } from "@/lib/utils";

export type AdPosition =
  | "top-banner"
  | "between-panels"
  | "after-result"
  | "footer";

type AdSlotProps = {
  position: AdPosition;
  /** Future AdSense slot / unit id — swap placeholder for real ad when ready */
  slotId?: string;
  className?: string;
};

const SIZE_BY_POSITION: Record<
  AdPosition,
  { label: string; height: string; maxWidth: string }
> = {
  "top-banner": {
    label: "Top Banner",
    height: "min-h-[90px]",
    maxWidth: "max-w-6xl",
  },
  "between-panels": {
    label: "In-feed",
    height: "min-h-[100px] lg:min-h-[280px]",
    maxWidth: "w-full",
  },
  "after-result": {
    label: "After Result",
    height: "min-h-[90px]",
    maxWidth: "w-full",
  },
  footer: {
    label: "Footer Banner",
    height: "min-h-[90px]",
    maxWidth: "max-w-6xl",
  },
};

/**
 * AdSense slot. Hidden unless NEXT_PUBLIC_ADS_ENABLED=true.
 * Never shows "Ad Space" placeholder text (avoids unfinished look during review).
 */
export function AdSlot({
  position,
  slotId = "placeholder",
  className,
}: AdSlotProps) {
  const { ready, adsAllowed, status } = useAdConsent();
  const size = SIZE_BY_POSITION[position];

  if (!ADS_ENABLED) return null;
  if (ready && status === "rejected") return null;

  const showLiveUnit = adsAllowed && Boolean(ADSENSE_CLIENT_ID);

  if (!showLiveUnit) {
    // Reserve height for CLS only after consent is accepted but unit not live yet
    if (!adsAllowed) return null;
    return (
      <aside
        data-ad-position={position}
        data-ad-slot={slotId}
        aria-hidden
        className={cn(
          "mx-auto w-full",
          size.maxWidth,
          size.height,
          className
        )}
      />
    );
  }

  return (
    <aside
      data-ad-position={position}
      data-ad-slot={slotId}
      data-ad-consent={status}
      aria-label={`Advertisement ${size.label}`}
      className={cn(
        "mx-auto flex w-full items-center justify-center",
        size.maxWidth,
        className
      )}
    >
      <ins
        className={cn("adsbygoogle block w-full", size.height)}
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
