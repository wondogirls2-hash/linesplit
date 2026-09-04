"use client";

import { useCallback, useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { toast } from "@/components/ui/sonner";
import {
  applyFindAndReplace,
  createEmptyRule,
  type ReplaceRule,
} from "@/lib/bulkFindReplace";

export function FindAndReplaceTool() {
  const [rules, setRules] = useState<ReplaceRule[]>([createEmptyRule()]);
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [useRegex, setUseRegex] = useState(false);

  const transform = useCallback(
    (source: string) => {
      const { result, error } = applyFindAndReplace(source, rules, {
        caseSensitive,
        useRegex,
      });
      if (error) {
        toast.error(error);
        return source;
      }
      return result;
    },
    [rules, caseSensitive, useRegex]
  );

  const updateRule = (id: string, patch: Partial<ReplaceRule>) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...patch } : r))
    );
  };

  const options = useMemo(
    () => (
      <div className="space-y-3">
        <div className="space-y-2">
          {rules.map((rule, index) => (
            <div
              key={rule.id}
              className="flex flex-wrap items-center gap-2 rounded-xl border border-border/60 bg-background/60 p-2"
            >
              <span className="w-5 text-center text-[10px] font-bold text-muted-foreground">
                {index + 1}
              </span>
              <input
                value={rule.find}
                onChange={(e) => updateRule(rule.id, { find: e.target.value })}
                placeholder="Find"
                className="h-8 min-w-[120px] flex-1 rounded-lg border border-border/70 bg-background px-2 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`Find ${index + 1}`}
              />
              <span className="text-xs text-muted-foreground">→</span>
              <input
                value={rule.replace}
                onChange={(e) =>
                  updateRule(rule.id, { replace: e.target.value })
                }
                placeholder="Replace"
                className="h-8 min-w-[120px] flex-1 rounded-lg border border-border/70 bg-background px-2 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`Replace ${index + 1}`}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                disabled={rules.length <= 1}
                onClick={() =>
                  setRules((prev) => prev.filter((r) => r.id !== rule.id))
                }
                aria-label="Remove rule"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setRules((prev) => [...prev, createEmptyRule()])}
          >
            <Plus className="h-3.5 w-3.5" />
            Add rule
          </Button>

          <div className="flex items-center gap-2">
            <Switch
              id="fr-case"
              checked={caseSensitive}
              onCheckedChange={setCaseSensitive}
            />
            <Label htmlFor="fr-case" className="cursor-pointer">
              Case sensitive
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="fr-regex"
              checked={useRegex}
              onCheckedChange={setUseRegex}
            />
            <Label htmlFor="fr-regex" className="cursor-pointer">
              Use regex
            </Label>
          </div>
        </div>
      </div>
    ),
    [rules, caseSensitive, useRegex]
  );

  return (
    <ToolWorkspace
      options={options}
      transform={transform}
      convertLabel="Replace all"
      adSlotId="replace-between"
      historyKey="find-and-replace"
      resultHint="Rules run top to bottom. Regex is off by default for safer edits."
    />
  );
}
