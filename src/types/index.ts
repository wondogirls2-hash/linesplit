export type BulletStyle = "none" | "dash" | "bullet";
export type LineBreakStyle = "single" | "double";
export type SplitMode = "sentence" | "chars";

export type ConvertOptions = {
  mode: SplitMode;
  charLimit: number;
  fixDoubleSpacing: boolean;
  bullet: BulletStyle;
  lineBreak: LineBreakStyle;
  trimEmpty: boolean;
};

export const DEFAULT_OPTIONS: ConvertOptions = {
  mode: "sentence",
  charLimit: 160,
  fixDoubleSpacing: true,
  bullet: "none",
  lineBreak: "single",
  trimEmpty: true,
};

export type CharPreset = {
  id: string;
  label: string;
  limit: number;
};

/** One-click char-limit presets for common US content lengths */
export const CHAR_PRESETS: readonly CharPreset[] = [
  { id: "seo", label: "SEO Meta", limit: 160 },
  { id: "tweet", label: "Tweet / X", limit: 280 },
  { id: "code", label: "Code Line", limit: 80 },
] as const;

export type HistoryItem = {
  id: string;
  source: string;
  preview: string;
  savedAt: number;
};

export const HISTORY_STORAGE_KEY = "linesplit-history-v1";
export const HISTORY_MAX = 5;
