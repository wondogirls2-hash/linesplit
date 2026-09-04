import type { ConvertOptions } from "@/types";
import { splitSentences } from "./sentenceSplitter";
import { wrapByLength } from "./charLimitSplitter";

function fixDoubleSpacing(text: string): string {
  return text
    .replace(/([.!?…])[ \t]{2,}/g, "$1 ")
    .replace(/[ \t]{2,}/g, " ");
}

function applyBullet(line: string, bullet: ConvertOptions["bullet"]): string {
  if (bullet === "dash") return `- ${line}`;
  if (bullet === "bullet") return `• ${line}`;
  return line;
}

/**
 * Full convert pipeline: split/wrap → options → joined string.
 * Pure function; safe for client-only use.
 */
export function convertText(source: string, options: ConvertOptions): string {
  if (!source.trim()) return "";

  let working = source;
  if (options.fixDoubleSpacing) {
    working = fixDoubleSpacing(working);
  }

  let lines =
    options.mode === "chars"
      ? wrapByLength(working, options.charLimit)
      : splitSentences(working);

  if (options.trimEmpty) {
    lines = lines.filter((s) => s.trim().length > 0);
  }

  lines = lines.map((s) => applyBullet(s.trim(), options.bullet));

  const joiner = options.lineBreak === "double" ? "\n\n" : "\n";
  let result = lines.join(joiner);

  if (options.trimEmpty) {
    result = result.replace(/\n{3,}/g, "\n\n").replace(/^\n+|\n+$/g, "");
  }

  return result;
}
