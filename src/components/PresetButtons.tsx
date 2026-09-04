"use client";

import type { ConvertOptions } from "@/types";
import { CHAR_PRESETS } from "@/types";
import { cn } from "@/lib/utils";

type PresetButtonsProps = {
  options: ConvertOptions;
  onChange: (next: ConvertOptions) => void;
};

/** Character count presets (160 / 280 / 80) */
export function PresetButtons({ options, onChange }: PresetButtonsProps) {
  if (options.mode !== "chars") return null;

  return (
    <>
      {CHAR_PRESETS.map((preset) => (
        <button
          key={preset.id}
          type="button"
          onClick={() =>
            onChange({
              ...options,
              mode: "chars",
              charLimit: preset.limit,
            })
          }
          className={cn(
            "rounded-full border px-2.5 py-1 text-[11px] font-medium transition",
            options.charLimit === preset.limit
              ? "border-primary/40 bg-primary/10 text-primary"
              : "border-border/70 bg-background/70 text-muted-foreground hover:border-primary/30 hover:text-foreground"
          )}
        >
          {preset.label} ({preset.limit})
        </button>
      ))}
      <label className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
        Custom
        <input
          type="number"
          min={10}
          max={2000}
          value={options.charLimit}
          onChange={(e) =>
            onChange({
              ...options,
              mode: "chars",
              charLimit: Math.max(10, Number(e.target.value) || 10),
            })
          }
          className="h-7 w-16 rounded-lg border border-border/70 bg-background/80 px-2 text-xs text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </label>
    </>
  );
}
