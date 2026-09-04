"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AdSlot } from "@/components/AdSlot";
import { FloatingCopyButton } from "@/components/FloatingCopyButton";
import { HistoryPanel } from "@/components/HistoryPanel";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useHistory } from "@/lib/useHistory";

const DEBOUNCE_MS = 250;
const HISTORY_DEBOUNCE_MS = 1200;

type ToolWorkspaceProps = {
  options: ReactNode;
  transform: (source: string) => string;
  resultHint?: string;
  resultMeta?: (source: string, result: string) => string;
  resultSummary?: (source: string, result: string) => ReactNode;
  adSlotId?: string;
  convertLabel?: string;
  historyKey?: string;
};

/** Shared workspace: Input | Options+Convert → Result → Ad */
export function ToolWorkspace({
  options,
  transform,
  resultHint = "Edit the result freely before copying.",
  resultMeta,
  resultSummary,
  adSlotId = "tool-after-result",
  convertLabel = "Convert",
  historyKey = "tool",
}: ToolWorkspaceProps) {
  const [source, setSource] = useState("");
  const [result, setResult] = useState("");
  const [resultDirty, setResultDirty] = useState(false);
  const [modKey, setModKey] = useState("Ctrl");
  const { items: history, push: pushHistory, clear: clearHistoryItems } =
    useHistory(historyKey);

  const historyDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.platform)) setModKey("⌘");
  }, []);

  const regenerate = useCallback(
    (text: string) => {
      setResult(transform(text));
      setResultDirty(false);
    },
    [transform]
  );

  useEffect(() => {
    const t = setTimeout(() => {
      if (resultDirty) return;
      regenerate(source);
    }, DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [source, resultDirty, regenerate]);

  useEffect(() => {
    if (resultDirty) return;
    regenerate(source);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only when transform changes
  }, [transform]);

  useEffect(() => {
    if (!source.trim()) return;
    if (historyDebounceRef.current) clearTimeout(historyDebounceRef.current);
    historyDebounceRef.current = setTimeout(() => {
      pushHistory(source);
    }, HISTORY_DEBOUNCE_MS);
    return () => {
      if (historyDebounceRef.current) clearTimeout(historyDebounceRef.current);
    };
  }, [source, pushHistory]);

  const handleConvert = useCallback(() => {
    regenerate(source);
    if (source.trim()) pushHistory(source);
  }, [regenerate, source, pushHistory]);

  const handleClear = useCallback(() => {
    setSource("");
    setResult("");
    setResultDirty(false);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        handleConvert();
      }
      if (e.key === "Escape") {
        e.preventDefault();
        handleClear();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClear, handleConvert]);

  const meta = resultMeta?.(source, result);
  const lineCount = result ? result.split(/\n/).length : 0;

  return (
    <div className="space-y-4">
      <HistoryPanel
        items={history}
        onSelect={(text) => {
          setSource(text);
          setResultDirty(false);
          regenerate(text);
        }}
        onClear={clearHistoryItems}
      />

      <div className="glass-panel overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex min-h-[260px] flex-col border-b border-border/50 lg:min-h-[400px] lg:border-b-0 lg:border-r">
            <div className="flex items-center justify-between px-5 py-3">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Input
              </h2>
              <span className="text-xs text-muted-foreground/80">
                {source.length.toLocaleString()} chars
              </span>
            </div>
            <Textarea
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="Paste your text here..."
              spellCheck
              className="min-h-[220px] flex-1 px-5 pb-5 pt-1 lg:min-h-[340px]"
              aria-label="Input text"
            />
          </div>

          <div className="flex flex-col border-b border-border/50 lg:border-b-0">
            <div className="flex items-center justify-between gap-2 px-4 py-2.5 sm:px-5">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Options
              </h2>
              <FloatingCopyButton text={result} />
            </div>

            <p className="mx-4 mt-1 rounded-xl bg-primary/5 px-3 py-2 text-xs text-muted-foreground">
              {resultHint}
            </p>

            <div className="border-b border-border/50 bg-muted/30 px-4 py-3">
              {options}
            </div>

            <div className="flex flex-wrap items-center gap-2 bg-muted/20 px-4 py-3 sm:px-5">
              <Button type="button" onClick={handleConvert}>
                {convertLabel}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={handleClear}
                disabled={!source && !result}
              >
                Clear
              </Button>
              {resultDirty && (
                <span className="text-xs text-muted-foreground sm:ml-auto">
                  Manual edits — {convertLabel} or {modKey}+Enter
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-border/50">
          <div className="flex items-center justify-between px-5 py-3">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Result
              </h2>
              <span className="text-xs text-muted-foreground/80">
                {meta ?? `${lineCount} line${lineCount === 1 ? "" : "s"}`}
              </span>
            </div>
          </div>

          {resultSummary?.(source, result)}

          <Textarea
            value={result}
            onChange={(e) => {
              setResult(e.target.value);
              setResultDirty(true);
            }}
            placeholder="Converted text appears here…"
            spellCheck
            className="min-h-[180px] w-full px-5 pb-4 pt-1 lg:min-h-[240px]"
            aria-label="Result text"
          />

          <div className="border-t border-border/50 p-3">
            <AdSlot position="after-result" slotId={adSlotId} />
          </div>
        </div>
      </div>

      <p className="text-center text-[11px] text-muted-foreground/80">
        <kbd className="rounded border border-border/70 bg-muted/50 px-1.5 py-0.5 font-sans text-[10px]">
          {modKey}
        </kbd>
        {" + "}
        <kbd className="rounded border border-border/70 bg-muted/50 px-1.5 py-0.5 font-sans text-[10px]">
          Enter
        </kbd>
        {" re-run · "}
        <kbd className="rounded border border-border/70 bg-muted/50 px-1.5 py-0.5 font-sans text-[10px]">
          Esc
        </kbd>
        {" clear all"}
      </p>
    </div>
  );
}
