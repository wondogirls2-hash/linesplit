"use client";

import type { BulletStyle, ConvertOptions, LineBreakStyle } from "@/types";
import { PresetButtons } from "@/components/PresetButtons";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type OptionsPanelProps = {
  options: ConvertOptions;
  onChange: (next: ConvertOptions) => void;
};

const selectClass =
  "h-7 rounded-lg border border-border/70 bg-background/80 px-2 text-xs text-foreground outline-none transition focus-visible:ring-2 focus-visible:ring-ring";

export function OptionsPanel({ options, onChange }: OptionsPanelProps) {
  const isChars = options.mode === "chars";

  return (
    <div className="space-y-2.5 border-b border-border/50 bg-muted/30 px-4 py-3">
      <div className="flex flex-wrap items-center gap-2">
        <div
          className="inline-flex rounded-xl border border-border/70 bg-background/80 p-0.5"
          role="group"
          aria-label="Split mode"
        >
          <button
            type="button"
            onClick={() => onChange({ ...options, mode: "sentence" })}
            className={cn(
              "rounded-[10px] px-2.5 py-1 text-xs font-medium transition",
              options.mode === "sentence"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            By sentence
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...options, mode: "chars" })}
            className={cn(
              "rounded-[10px] px-2.5 py-1 text-xs font-medium transition",
              isChars
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            By character limit
          </button>
        </div>

        <PresetButtons options={options} onChange={onChange} />
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5">
        <div className="flex items-center gap-2">
          <Switch
            id="fix-double"
            checked={options.fixDoubleSpacing}
            onCheckedChange={(fixDoubleSpacing) =>
              onChange({ ...options, fixDoubleSpacing })
            }
          />
          <Label htmlFor="fix-double" className="cursor-pointer">
            Fix double spacing
          </Label>
        </div>

        <div className="flex items-center gap-2">
          <Switch
            id="trim-empty"
            checked={options.trimEmpty}
            onCheckedChange={(trimEmpty) => onChange({ ...options, trimEmpty })}
          />
          <Label htmlFor="trim-empty" className="cursor-pointer">
            Trim empty lines
          </Label>
        </div>

        <div className="flex items-center gap-1.5">
          <Label htmlFor="bullets">Bullets</Label>
          <select
            id="bullets"
            value={options.bullet}
            onChange={(e) =>
              onChange({ ...options, bullet: e.target.value as BulletStyle })
            }
            className={cn(selectClass)}
          >
            <option value="none">None</option>
            <option value="dash">- Dash</option>
            <option value="bullet">• Bullet</option>
          </select>
        </div>

        <div className="flex items-center gap-1.5">
          <Label htmlFor="linebreaks">Line breaks</Label>
          <select
            id="linebreaks"
            value={options.lineBreak}
            onChange={(e) =>
              onChange({
                ...options,
                lineBreak: e.target.value as LineBreakStyle,
              })
            }
            className={cn(selectClass)}
          >
            <option value="single">Single (↵)</option>
            <option value="double">Blank line (↵↵)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
