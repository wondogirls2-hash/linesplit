"use client";

import { useCallback, useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import {
  removeLineBreaks,
  type LineBreakJoinMode,
} from "@/lib/lineBreakRemover";
import { cn } from "@/lib/utils";

export function RemoveLineBreaksTool() {
  const [joinMode, setJoinMode] = useState<LineBreakJoinMode>("space");
  const [keepParagraphs, setKeepParagraphs] = useState(true);

  const transform = useCallback(
    (source: string) => removeLineBreaks(source, joinMode, keepParagraphs),
    [joinMode, keepParagraphs]
  );

  const options = useMemo(
    () => (
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          {(
            [
              { id: "space", label: "Replace breaks with spaces" },
              { id: "none", label: "Remove breaks (no spaces)" },
            ] as const
          ).map((opt) => (
            <label
              key={opt.id}
              className={cn(
                "inline-flex cursor-pointer items-center rounded-xl border px-3 py-2 text-xs font-medium transition",
                joinMode === opt.id
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-border/70 bg-background/70 text-muted-foreground hover:border-primary/30"
              )}
            >
              <input
                type="radio"
                name="join-mode"
                value={opt.id}
                checked={joinMode === opt.id}
                onChange={() => setJoinMode(opt.id)}
                className="sr-only"
              />
              {opt.label}
            </label>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Switch
            id="keep-paragraphs"
            checked={keepParagraphs}
            onCheckedChange={setKeepParagraphs}
          />
          <Label htmlFor="keep-paragraphs" className="cursor-pointer">
            Keep paragraph breaks (blank lines)
          </Label>
        </div>
      </div>
    ),
    [joinMode, keepParagraphs]
  );

  return (
    <ToolWorkspace
      options={options}
      transform={transform}
      convertLabel="Join lines"
      adSlotId="join-between"
      historyKey="remove-line-breaks"
      resultHint="Great for Excel cells, email signatures, and PDF copy-paste."
      resultMeta={(_, result) =>
        `${result.length.toLocaleString()} chars`
      }
    />
  );
}
