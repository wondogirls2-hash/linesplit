"use client";

import { useCallback, useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { removeDuplicateLines } from "@/lib/duplicateLineRemover";

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
      resultHint="Duplicates are removed from top to bottom — first occurrence is kept."
      resultMeta={(source) => {
        const { removed } = removeDuplicateLines(source, caseSensitive);
        return removed > 0
          ? `${removed} duplicate${removed === 1 ? "" : "s"} removed`
          : "No duplicates";
      }}
    />
  );
}
