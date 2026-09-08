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
    // Global regexes retain lastIndex — reset so repeated calls stay correct
    pattern.lastIndex = 0;
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
 * Lookahead only (no lookbehind) — safe on older mobile browsers.
 * Abbreviation / decimal dots are already removed by protectSpans.
 */
function fallbackSplit(text: string): string[] {
  const out: string[] = [];
  let last = 0;
  // After .!?… (+ optional closing quotes/brackets), whitespace, then a new sentence start
  const re =
    /[.!?…]["')\]]*(?=\s+["'(]*[A-Za-z0-9\u00C0-\u024F\uAC00-\uD7A3])/g;
  let m: RegExpExecArray | null;

  while ((m = re.exec(text)) !== null) {
    const end = m.index + m[0].length;
    const slice = text.slice(last, end).trim();
    if (slice) out.push(slice);
    let i = end;
    while (i < text.length && /\s/.test(text[i]!)) i += 1;
    last = i;
    re.lastIndex = i;
  }

  const tail = text.slice(last).trim();
  if (tail) out.push(tail);

  return out.length > 0 ? out : text.trim() ? [text.trim()] : [];
}

function tokenizeWithSbd(text: string): string[] | null {
  try {
    if (typeof tokenizer?.sentences !== "function") return null;

    const parts = tokenizer.sentences(text, {
      abbreviations: [...CUSTOM_ABBREVIATIONS],
      preserve_whitespace: false,
      newline_boundaries: false,
    });

    return Array.isArray(parts) && parts.length > 0 ? parts : null;
  } catch {
    return null;
  }
}

/**
 * Split plain text into sentences.
 * Primary: `sbd` tokenizer. Fallback: mobile-safe regex (no lookbehind).
 * Always runs entirely in the browser — no network.
 * Never throws — returns a safe best-effort result on failure.
 */
export function splitSentences(raw: string): string[] {
  try {
    const trimmed = raw.replace(/\r\n/g, "\n").trim();
    if (!trimmed) return [];

    const flattened = trimmed.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();

    const { text: protectedText, store } = protectSpans(flattened);

    const fromLib = tokenizeWithSbd(protectedText);
    let parts: string[];
    try {
      parts =
        fromLib && fromLib.length > 0
          ? fromLib
          : fallbackSplit(protectedText);
    } catch {
      parts = fallbackSplit(protectedText);
    }

    return parts
      .map((s) => restoreSpans(s, store).trim())
      .filter(Boolean);
  } catch {
    const flat = raw.replace(/\s+/g, " ").trim();
    return flat ? [flat] : [];
  }
}
