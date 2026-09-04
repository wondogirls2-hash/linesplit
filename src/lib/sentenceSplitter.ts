import tokenizer from "sbd";
import {
  CUSTOM_ABBREVIATIONS,
  PROTECT_PATTERNS,
  PROTECT_PREFIX,
  PROTECT_SUFFIX,
} from "./abbreviations";

type ProtectStore = { token: string; value: string }[];

function protectSpans(text: string): { text: string; store: ProtectStore } {
  const store: ProtectStore = [];
  let result = text;

  const push = (match: string) => {
    const token = `${PROTECT_PREFIX}${store.length}${PROTECT_SUFFIX}`;
    store.push({ token, value: match });
    return token;
  };

  // Normalize ellipsis to a single character so "..." isn't split on each dot,
  // while still allowing a sentence boundary after it (e.g. "done... Next.")
  result = result.replace(/\.{3,}|…+/g, "…");

  // Protect abbreviation dots (Mr. Mrs. Dr. …) — sbd still mishandles some of these
  const abbrPattern = CUSTOM_ABBREVIATIONS.map((a) =>
    a.replace(/\./g, "\\.")
  ).join("|");
  result = result.replace(
    new RegExp(`\\b(?:${abbrPattern})\\.`, "gi"),
    (match) => push(match)
  );

  for (const pattern of PROTECT_PATTERNS) {
    result = result.replace(pattern, (match) => push(match));
  }

  return { text: result, store };
}

function restoreSpans(text: string, store: ProtectStore): string {
  let result = text;
  for (let i = store.length - 1; i >= 0; i--) {
    const { token, value } = store[i];
    result = result.split(token).join(value);
  }
  return result;
}

/**
 * Regex fallback when the NPM tokenizer fails.
 * ~90–97% accuracy; abbreviations + protected spans improve this.
 */
function fallbackSplit(text: string): string[] {
  const abbrLookbehind = CUSTOM_ABBREVIATIONS.map((a) =>
    a.replace(/\./g, "\\.")
  ).join("|");

  const splitter = new RegExp(
    `(?<!(?:\\b(?:${abbrLookbehind})))(?<=[.!?])["')\\]]*\\s+(?=["'(]*[A-Z0-9])`,
    "g"
  );

  return text
    .split(splitter)
    .map((s) => s.trim())
    .filter(Boolean);
}

function tokenizeWithSbd(text: string): string[] | null {
  try {
    if (typeof tokenizer?.sentences !== "function") return null;

    return tokenizer.sentences(text, {
      abbreviations: [...CUSTOM_ABBREVIATIONS],
      preserve_whitespace: false,
      newline_boundaries: false,
    });
  } catch {
    return null;
  }
}

/**
 * Split plain text into sentences.
 * Primary: `sbd` tokenizer. Fallback: abbreviation-aware regex.
 * Always runs entirely in the browser — no network.
 */
export function splitSentences(raw: string): string[] {
  const trimmed = raw.replace(/\r\n/g, "\n").trim();
  if (!trimmed) return [];

  const flattened = trimmed.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();

  const { text: protectedText, store } = protectSpans(flattened);

  const fromLib = tokenizeWithSbd(protectedText);
  const parts =
    fromLib && fromLib.length > 0 ? fromLib : fallbackSplit(protectedText);

  return parts
    .map((s) => restoreSpans(s, store).trim())
    .filter(Boolean);
}
