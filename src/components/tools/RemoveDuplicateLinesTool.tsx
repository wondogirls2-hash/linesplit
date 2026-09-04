"use client";

import { useCallback, useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { removeDuplicateLines } from "@/lib/duplicateLineRemover";

function truncateLine(line: string, max = 48): string {
  const flat = line.replace(/\s+/g, " ").trim();
  if (!flat) return "(empty line)";
  return flat.length > max ? `${flat.slice(0, max)}…` : flat;
}

export function RemoveDuplicateLinesTool() {
  const [caseSensitive, setCaseSensitive] = useState(true);

  const transform = useCallback(
    (source: string) => removeDuplicateLines(source, caseSensitive).result,
    [caseSensitive]
  );

  const options = useMemo(
    () => (
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Switch
            id="case-sensitive"
            checked={caseSensitive}
            onCheckedChange={setCaseSensitive}
          />
          <Label htmlFor="case-sensitive" className="cursor-pointer">
            Case sensitive
          </Label>
        </div>
        <p className="text-xs text-muted-foreground">
          Off treats “Apple” and “apple” as the same line.
        </p>
      </div>
    ),
    [caseSensitive]
  );

  return (
    <ToolWorkspace
      options={options}
      transform={transform}
      convertLabel="Remove duplicates"
      adSlotId="dedupe-between"
      historyKey="remove-duplicate-lines"
      resultHint="Duplicates are removed from top to bottom — first occurrence is kept."
      resultMeta={(source) => {
        const { removed } = removeDuplicateLines(source, caseSensitive);
        return removed > 0
          ? `${removed} duplicate${removed === 1 ? "" : "s"} removed`
          : "No duplicates";
      }}
      resultSummary={(source) => {
        if (!source.trim()) return null;
        const { removed, duplicates } = removeDuplicateLines(
          source,
          caseSensitive
        );
        if (removed === 0) return null;

        const shown = duplicates.slice(0, 8);
        const more = duplicates.length - shown.length;

        return (
          <div className="mx-4 mb-2 mt-3 rounded-xl border border-primary/15 bg-primary/[0.04] px-3 py-2.5">
            <p className="text-xs font-semibold text-foreground">
              Removed {removed} duplicate
              {removed === 1 ? "" : "s"} across {duplicates.length} line
              {duplicates.length === 1 ? "" : "s"}
            </p>
            <ul className="mt-2 space-y-1.5">
              {shown.map((item) => (
                <li
                  key={`${item.line}-${item.occurrences}`}
                  className="flex items-baseline justify-between gap-3 text-xs"
                >
                  <span className="min-w-0 truncate font-medium text-foreground">
                    “{truncateLine(item.line)}”
                  </span>
                  <span className="shrink-0 text-muted-foreground">
                    appeared {item.occurrences}× ·{" "}
                    <span className="font-semibold text-primary">
                      {item.removed} removed
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            {more > 0 && (
              <p className="mt-2 text-[11px] text-muted-foreground">
                +{more} more duplicated line{more === 1 ? "" : "s"}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}
