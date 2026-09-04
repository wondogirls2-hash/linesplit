import {
  HISTORY_MAX,
  HISTORY_STORAGE_KEY,
  type HistoryItem,
} from "@/types";

function makePreview(source: string): string {
  const flat = source.replace(/\s+/g, " ").trim();
  return flat.length > 72 ? `${flat.slice(0, 72)}…` : flat;
}

export function historyStorageKey(toolId?: string): string {
  if (!toolId) return HISTORY_STORAGE_KEY;
  return `linesplit-history-${toolId}-v1`;
}

export function loadHistory(storageKey = HISTORY_STORAGE_KEY): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as HistoryItem[];
    return Array.isArray(parsed) ? parsed.slice(0, HISTORY_MAX) : [];
  } catch {
    return [];
  }
}

export function saveHistoryItem(
  source: string,
  storageKey = HISTORY_STORAGE_KEY
): HistoryItem[] {
  const trimmed = source.trim();
  if (!trimmed || typeof window === "undefined") return loadHistory(storageKey);

  const existing = loadHistory(storageKey).filter(
    (item) => item.source !== trimmed
  );
  const next: HistoryItem[] = [
    {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      source: trimmed,
      preview: makePreview(trimmed),
      savedAt: Date.now(),
    },
    ...existing,
  ].slice(0, HISTORY_MAX);

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(next));
  } catch {
    // quota / private mode — ignore
  }
  return next;
}

export function clearHistory(storageKey = HISTORY_STORAGE_KEY): HistoryItem[] {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
  }
  return [];
}
