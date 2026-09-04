"use client";

import { ChevronDown, Clock, Trash2 } from "lucide-react";
import { useState } from "react";
import type { HistoryItem } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type HistoryPanelProps = {
  items: HistoryItem[];
  onSelect: (source: string) => void;
  onClear: () => void;
};

export function HistoryPanel({ items, onSelect, onClear }: HistoryPanelProps) {
  const [open, setOpen] = useState(false);

  if (items.length === 0) return null;

  return (
    <div className="glass-panel overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left transition hover:bg-muted/40"
        aria-expanded={open}
      >
        <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
          <Clock className="h-4 w-4 text-primary" />
          Recent ({items.length})
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="border-t border-border/50 px-2 pb-2 pt-1">
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onSelect(item.source)}
                  className="w-full rounded-xl px-3 py-2 text-left text-sm text-muted-foreground transition hover:bg-primary/5 hover:text-foreground"
                >
                  <span className="line-clamp-2">{item.preview}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-1 flex justify-end px-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="h-8 text-xs text-muted-foreground"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear history
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
