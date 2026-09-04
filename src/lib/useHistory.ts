"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  clearHistory as clearHistoryStorage,
  historyStorageKey,
  loadHistory,
  saveHistoryItem,
} from "@/lib/history";
import type { HistoryItem } from "@/types";

/** Custom hook for localStorage conversion history (per-tool key supported) */
export function useHistory(toolId?: string) {
  const storageKey = useMemo(() => historyStorageKey(toolId), [toolId]);
  const [items, setItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setItems(loadHistory(storageKey));
  }, [storageKey]);

  const push = useCallback(
    (source: string) => {
      setItems(saveHistoryItem(source, storageKey));
    },
    [storageKey]
  );

  const clear = useCallback(() => {
    setItems(clearHistoryStorage(storageKey));
  }, [storageKey]);

  return { items, push, clear, setItems };
}
