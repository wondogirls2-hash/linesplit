"use client";

import { useCallback, useEffect, useState } from "react";
import {
  clearHistory as clearHistoryStorage,
  loadHistory,
  saveHistoryItem,
} from "@/lib/history";
import type { HistoryItem } from "@/types";

/** Custom hook for localStorage conversion history */
export function useHistory() {
  const [items, setItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setItems(loadHistory());
  }, []);

  const push = useCallback((source: string) => {
    setItems(saveHistoryItem(source));
  }, []);

  const clear = useCallback(() => {
    setItems(clearHistoryStorage());
  }, []);

  return { items, push, clear, setItems };
}
