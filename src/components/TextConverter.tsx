"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { convertText } from "@/lib/applyOptions";
import { useHistory } from "@/lib/useHistory";
import { DEFAULT_OPTIONS, type ConvertOptions } from "@/types";
import { AdSlot } from "@/components/AdSlot";
import { FloatingCopyButton } from "@/components/FloatingCopyButton";
import { HistoryPanel } from "@/components/HistoryPanel";
import { OptionsPanel } from "@/components/OptionsPanel";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";

const DEBOUNCE_MS = 250;

export function TextConverter() {
  const [source, setSource] = useState("");
  const [result, setResult] = useState("");
  const [resultDirty, setResultDirty] = useState(false);
  const [options, setOptions] = useState<ConvertOptions>(DEFAULT_OPTIONS);
  const [modKey, setModKey] = useState("Ctrl");
  const { items: history, push: pushHistory, clear: clearHistoryItems } =
    useHistory();

  const optionsRef = useRef(options);
  const resultDirtyRef = useRef(resultDirty);
  const sourceRef = useRef(source);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const historyDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  optionsRef.current = options;
  resultDirtyRef.current = resultDirty;
  sourceRef.current = source;

  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.platform)) setModKey("⌘");
  }, []);

  const regenerate = useCallback((text: string, opts: ConvertOptions) => {
    setResult(convertText(text, opts));
    setResultDirty(false);
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (resultDirtyRef.current) return;
      regenerate(source, optionsRef.current);
    }, DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [source, regenerate]);

  useEffect(() => {
    if (!source.trim()) return;
    if (historyDebounceRef.current) clearTimeout(historyDebounceRef.current);
    historyDebounceRef.current = setTimeout(() => {
      pushHistory(source);
    }, 1200);
    return () => {
      if (historyDebounceRef.current) clearTimeout(historyDebounceRef.current);
    };
  }, [source, pushHistory]);

  const handleOptionsChange = (next: ConvertOptions) => {
    setOptions(next);
    regenerate(source, next);
  };

  const handleConvert = useCallback(() => {
    regenerate(sourceRef.current, optionsRef.current);
    if (sourceRef.current.trim()) pushHistory(sourceRef.current);
  }, [regenerate, pushHistory]);

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
        toast.message("Converted");
      }
      if (e.key === "Escape") {
        e.preventDefault();
        handleClear();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClear, handleConvert]);

  const sentenceCount = result
    ? result.split(/\n+/).filter((l) => l.trim()).length
    : 0;

  return (
    <div className="space-y-4">
      <HistoryPanel
        items={history}
        onSelect={(text) => {
          setSource(text);
          setResultDirty(false);
          regenerate(text, options);
        }}
        onClear={clearHistoryItems}
      />

      <div className="glass-panel overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="flex min-h-[320px] flex-1 flex-col border-b border-border/50 lg:min-h-[440px] lg:border-b-0 lg:border-r">
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
              placeholder="Paste your paragraph here..."
              spellCheck
              className="min-h-[260px] flex-1 px-5 pb-5 pt-1 lg:min-h-[380px]"
              aria-label="Paragraph input"
            />
          </div>

          <div className="hidden border-border/50 p-3 lg:flex lg:w-auto lg:items-stretch lg:border-r">
            <AdSlot
              position="between-panels"
              slotId="linesplit-between"
              className="h-full"
            />
          </div>

          <div className="relative flex min-h-[320px] flex-1 flex-col border-b border-border/50 lg:min-h-[440px] lg:border-b-0">
            <div className="sticky top-0 z-10 flex items-center justify-between gap-2 border-b border-border/40 bg-card/90 px-4 py-2.5 backdrop-blur-md sm:px-5">
              <div className="flex items-center gap-2">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Result
                </h2>
                <span className="text-xs text-muted-foreground/80">
                  {sentenceCount} line{sentenceCount === 1 ? "" : "s"}
                </span>
              </div>
              <FloatingCopyButton text={result} />
            </div>

            <p className="mx-4 mt-2 rounded-xl bg-primary/5 px-3 py-2 text-xs text-muted-foreground">
              Auto-split may not be perfect —{" "}
              <span className="font-medium text-foreground">
                click here to fine-tune manually.
              </span>
            </p>

            <OptionsPanel options={options} onChange={handleOptionsChange} />

            <Textarea
              value={result}
              onChange={(e) => {
                setResult(e.target.value);
                setResultDirty(true);
              }}
              placeholder="Converted lines appear here…"
              spellCheck
              className="min-h-[200px] flex-1 px-5 pb-5 pt-3 lg:min-h-[240px]"
              aria-label="Editable conversion result"
            />
          </div>
        </div>

        <div className="border-t border-border/50 p-3 lg:hidden">
          <AdSlot position="between-panels" slotId="linesplit-between" />
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-border/50 bg-muted/20 px-4 py-3.5 sm:px-5">
          <Button type="button" variant="secondary" onClick={handleConvert}>
            Convert
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
              Manual edits active — Convert or {modKey}+Enter to re-split
            </span>
          )}
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
