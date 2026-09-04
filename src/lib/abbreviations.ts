/**
 * Custom abbreviations (without trailing dots).
 * Passed to the sentence tokenizer and used by the regex fallback.
 * Add new entries here as needed.
 */
export const CUSTOM_ABBREVIATIONS: readonly string[] = [
  "mr",
  "mrs",
  "ms",
  "dr",
  "prof",
  "sr",
  "jr",
  "vs",
  "approx",
  "etc",
  "eg",
  "e.g",
  "ie",
  "i.e",
  "inc",
  "ltd",
  "co",
  "st",
  "ave",
  "blvd",
  "dept",
  "fig",
  "vol",
  "no",
  "nos",
  "al",
  "ca",
  "cf",
  "est",
  "gen",
  "gov",
  "hon",
  "jan",
  "feb",
  "mar",
  "apr",
  "jun",
  "jul",
  "aug",
  "sep",
  "sept",
  "oct",
  "nov",
  "dec",
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
  "sun",
  "univ",
  "assn",
  "bros",
  "corp",
  "ph.d",
  "phd",
  "m.d",
  "md",
  "b.a",
  "m.a",
  "d.c",
  "a.m",
  "p.m",
] as const;

/** Placeholder used while protecting ellipses during split. */
export const ELLIPSIS_TOKEN = "\uE000ELLIPSIS\uE001";

/** Placeholder prefix for protected spans (decimals, initialisms). */
export const PROTECT_PREFIX = "\uE002";
export const PROTECT_SUFFIX = "\uE003";

/**
 * Patterns that look like sentence boundaries but should not split.
 * Applied as protect-restore around the tokenizer.
 */
export const PROTECT_PATTERNS: readonly RegExp[] = [
  // Currency / decimals: 3.14, $19.99, €12.50
  /(?:[$€£¥]\s*)?\d+\.\d+(?:%|k|m|b)?/gi,
  // Multi-initial names / codes: J.K. Rowling, U.S., U.K., E.U.
  /\b(?:[A-Z]\.){2,}(?:[A-Z])?/g,
  /\b(?:U\.S\.A?|U\.K\.|E\.U\.|U\.N\.)\b/g,
];
