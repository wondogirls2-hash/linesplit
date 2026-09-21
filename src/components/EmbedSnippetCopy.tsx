"use client";

import { useState } from "react";
import { SITE_URL } from "@/lib/site";
import { Button } from "@/components/ui/button";

const IFRAME_SNIPPET = `<iframe
  src="${SITE_URL}/embed"
  title="ParagraphSplitter — sentence splitter"
  width="100%"
  height="420"
  style="border:1px solid #e5e7eb;border-radius:12px;max-width:720px;"
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
></iframe>
<p style="font-size:12px;margin-top:8px;">
  <a href="${SITE_URL}/?utm_source=embed&utm_medium=referral&utm_campaign=powered_by" target="_blank" rel="noopener noreferrer">
    Powered by ParagraphSplitter
  </a>
</p>`;

export function EmbedSnippetCopy() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(IFRAME_SNIPPET);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-3">
      <pre className="overflow-x-auto rounded-2xl border border-border/60 bg-card/60 p-4 text-xs leading-relaxed text-muted-foreground">
        {IFRAME_SNIPPET}
      </pre>
      <Button type="button" onClick={handleCopy}>
        {copied ? "Copied embed code" : "Copy embed code"}
      </Button>
    </div>
  );
}
