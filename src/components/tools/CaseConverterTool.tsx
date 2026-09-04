"use client";

import { useCallback, useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { convertCase, type CaseMode } from "@/lib/caseConverter";
import { cn } from "@/lib/utils";

const MODES: { id: CaseMode; label: string; sample: string }[] = [
  { id: "upper", label: "UPPERCASE", sample: "HELLO WORLD" },
  { id: "lower", label: "lowercase", sample: "hello world" },
  { id: "title", label: "Title Case", sample: "Hello World" },
  { id: "sentence", label: "Sentence case", sample: "Hello world" },
];

export function CaseConverterTool() {
  const [mode, setMode] = useState<CaseMode>("title");

  const transform = useCallback(
    (source: string) => convertCase(source, mode),
    [mode]
  );

  const options = useMemo(
    () => (
      <fieldset className="space-y-2">
        <legend className="text-xs font-medium text-muted-foreground">
          Case mode
        </legend>
        <div className="flex flex-wrap gap-2">
          {MODES.map((m) => (
            <label
              key={m.id}
              className={cn(
                "inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-xs transition",
                mode === m.id
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-border/70 bg-background/70 text-muted-foreground hover:border-primary/30"
              )}
            >
              <input
                type="radio"
                name="case-mode"
                value={m.id}
                checked={mode === m.id}
                onChange={() => setMode(m.id)}
                className="sr-only"
              />
              <span className="font-semibold">{m.label}</span>
              <span className="opacity-60">{m.sample}</span>
            </label>
          ))}
        </div>
        <Label className="sr-only">Selected case mode</Label>
      </fieldset>
    ),
    [mode]
  );

  return (
    <ToolWorkspace
      options={options}
      transform={transform}
      convertLabel="Convert case"
      adSlotId="case-between"
      historyKey="case-converter"
      resultHint="Only casing changes — spelling and punctuation stay intact."
    />
  );
}
