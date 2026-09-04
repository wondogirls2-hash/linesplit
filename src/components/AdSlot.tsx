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
 * AdSense-ready placeholder. Replace the inner placeholder with
 * the real ad unit when you have publisher credentials.
 */
export function AdSlot({
  position,
  slotId = "placeholder",
  className,
}: AdSlotProps) {
  const size = SIZE_BY_POSITION[position];

  return (
    <aside
      data-ad-position={position}
      data-ad-slot={slotId}
      aria-label={`Advertisement ${size.label}`}
      className={cn(
        "mx-auto flex w-full items-center justify-center",
        size.maxWidth,
        className
      )}
    >
      <div
        className={cn(
          "flex w-full items-center justify-center rounded-2xl border border-dashed border-border/70 bg-muted/40 text-muted-foreground",
          size.height,
          position === "between-panels" &&
            "lg:h-full lg:min-h-[320px] lg:w-[120px] lg:shrink-0 xl:w-[140px]"
        )}
      >
        <div className="flex flex-col items-center gap-1 px-3 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-widest opacity-70">
            Ad Space
          </span>
          <span className="text-[10px] opacity-50">
            {size.label} · {slotId}
          </span>
        </div>
      </div>
    </aside>
  );
}
