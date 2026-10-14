"use client";

import type { BulletStyle, ConvertOptions, LineBreakStyle, SplitMode } from "@/types";
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

const MODES: { id: SplitMode; label: string }[] = [
  { id: "sentence", label: "By sentence" },
  { id: "chars", label: "By character limit" },
  { id: "sentences-per-paragraph", label: "By sentences / paragraph" },
  { id: "into-n-paragraphs", label: "Into N paragraphs" },
];

export function OptionsPanel({ options, onChange }: OptionsPanelProps) {
  const isChars = options.mode === "chars";
  const isSentPerPara = options.mode === "sentences-per-paragraph";
  const isIntoN = options.mode === "into-n-paragraphs";
  const isParagraphMode = isSentPerPara || isIntoN;

  return (
    <div className="space-y-2.5 border-b border-border/50 bg-muted/30 px-4 py-3">
      <div className="flex flex-wrap items-center gap-2">
        <div
          className="inline-flex flex-wrap rounded-xl border border-border/70 bg-background/80 p-0.5"
          role="group"
          aria-label="Split mode"
        >
          {MODES.map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => onChange({ ...options, mode: mode.id })}
              className={cn(
                "rounded-[10px] px-2.5 py-1 text-xs font-medium transition",
                options.mode === mode.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {mode.label}
            </button>
          ))}
        </div>

        <PresetButtons options={options} onChange={onChange} />

        {isSentPerPara ? (
          <label className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            Sentences per paragraph
            <input
              type="number"
              min={1}
              max={20}
              value={options.sentencesPerParagraph}
              onChange={(e) =>
                onChange({
                  ...options,
                  sentencesPerParagraph: Math.min(
                    20,
                    Math.max(1, Number(e.target.value) || 1)
                  ),
                })
              }
              className="h-7 w-14 rounded-lg border border-border/70 bg-background/80 px-2 text-xs text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>
        ) : null}

        {isIntoN ? (
          <label className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            Paragraph count
            <input
              type="number"
              min={2}
              max={20}
              value={options.paragraphCount}
              onChange={(e) =>
                onChange({
                  ...options,
                  paragraphCount: Math.min(
                    20,
                    Math.max(2, Number(e.target.value) || 2)
                  ),
                })
              }
              className="h-7 w-14 rounded-lg border border-border/70 bg-background/80 px-2 text-xs text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>
        ) : null}
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

        {!isParagraphMode ? (
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
        ) : (
          <p className="text-[11px] text-muted-foreground">
            Paragraphs are separated by a blank line.
          </p>
        )}
      </div>
    </div>
  );
}
