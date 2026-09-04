import {
  HISTORY_MAX,
  HISTORY_STORAGE_KEY,
  type HistoryItem,
} from "@/types";

function makePreview(source: string): string {
  const flat = source.replace(/\s+/g, " ").trim();
  return flat.length > 72 ? `${flat.slice(0, 72)}…` : flat;
}

export function loadHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as HistoryItem[];
    return Array.isArray(parsed) ? parsed.slice(0, HISTORY_MAX) : [];
  } catch {
    return [];
  }
}

export function saveHistoryItem(source: string): HistoryItem[] {
  const trimmed = source.trim();
  if (!trimmed || typeof window === "undefined") return loadHistory();

  const existing = loadHistory().filter((item) => item.source !== trimmed);
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
    window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // quota / private mode — ignore
  }
  return next;
}

export function clearHistory(): HistoryItem[] {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(HISTORY_STORAGE_KEY);
    } catch {
      // ignore
    }
  }
  return [];
}
