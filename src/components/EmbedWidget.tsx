"use client";

import { useMemo, useState } from "react";
import { convertText } from "@/lib/applyOptions";
import { SITE_URL } from "@/lib/site";
import { DEFAULT_OPTIONS } from "@/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

/**
 * Compact sentence splitter for iframe embeds.
 * Keeps UI minimal and always shows a Powered-by backlink.
 */
export function EmbedWidget() {
  const [source, setSource] = useState("");
  const [copied, setCopied] = useState(false);

  const result = useMemo(
    () => convertText(source, DEFAULT_OPTIONS),
    [source]
  );

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore — host page permissions may block clipboard
    }
  };

  return (
    <div className="flex h-full min-h-[360px] flex-col bg-background text-foreground">
      <header className="border-b border-border/60 px-3 py-2">
        <p className="text-sm font-semibold tracking-tight">ParagraphSplitter</p>
        <p className="text-[11px] text-muted-foreground">
          Split a paragraph into one sentence per line — private, in-browser.
        </p>
      </header>

      <div className="grid flex-1 gap-2 p-3 sm:grid-cols-2">
        <label className="flex min-h-0 flex-col gap-1">
          <span className="text-[11px] font-medium text-muted-foreground">
            Input
          </span>
          <Textarea
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="Paste a paragraph…"
            className="min-h-[140px] flex-1 resize-none text-sm"
          />
        </label>
        <label className="flex min-h-0 flex-col gap-1">
          <span className="text-[11px] font-medium text-muted-foreground">
            Result
          </span>
          <Textarea
            value={result}
            readOnly
            placeholder="One sentence per line…"
            className="min-h-[140px] flex-1 resize-none text-sm"
          />
        </label>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-border/60 px-3 py-2">
        <Button
          type="button"
          size="sm"
          onClick={handleCopy}
          disabled={!result}
        >
          {copied ? "Copied" : "Copy result"}
        </Button>
        <a
          href={`${SITE_URL}/?utm_source=embed&utm_medium=widget&utm_campaign=powered_by`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-medium text-primary underline-offset-2 hover:underline"
        >
          Powered by paragraphsplitter.com
        </a>
      </div>
    </div>
  );
}
