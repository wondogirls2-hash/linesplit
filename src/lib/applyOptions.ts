import type { ConvertOptions } from "@/types";
import { splitSentences } from "./sentenceSplitter";
import { wrapByLength } from "./charLimitSplitter";
import {
  groupSentencesPerParagraph,
  splitIntoNParagraphs,
} from "./paragraphSplitter";

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

export type ConvertResult = {
  text: string;
  notice?: string;
};

/**
 * Full convert pipeline: split/wrap → options → joined string.
 * Pure function; safe for client-only use. Never throws to the UI.
 */
export function convertTextWithMeta(
  source: string,
  options: ConvertOptions
): ConvertResult {
  try {
    if (!source.trim()) return { text: "" };

    let working = source;
    if (options.fixDoubleSpacing) {
      working = fixDoubleSpacing(working);
    }

    let lines: string[];
    let notice: string | undefined;

    if (options.mode === "chars") {
      lines = wrapByLength(working, options.charLimit);
    } else if (options.mode === "sentences-per-paragraph") {
      const sentences = splitSentences(working);
      lines = groupSentencesPerParagraph(
        sentences,
        options.sentencesPerParagraph
      );
    } else if (options.mode === "into-n-paragraphs") {
      const sentences = splitSentences(working);
      const result = splitIntoNParagraphs(sentences, options.paragraphCount);
      lines = result.paragraphs;
      notice = result.notice;
    } else {
      lines = splitSentences(working);
    }

    if (options.trimEmpty) {
      lines = lines.filter((s) => s.trim().length > 0);
    }

    lines = lines.map((s) => applyBullet(s.trim(), options.bullet));

    // Paragraph modes always use a blank line between blocks
    const isParagraphMode =
      options.mode === "sentences-per-paragraph" ||
      options.mode === "into-n-paragraphs";
    const joiner =
      isParagraphMode || options.lineBreak === "double" ? "\n\n" : "\n";
    let text = lines.join(joiner);

    if (options.trimEmpty) {
      text = text.replace(/\n{3,}/g, "\n\n").replace(/^\n+|\n+$/g, "");
    }

    return { text, notice };
  } catch {
    return { text: source };
  }
}

/** Convenience wrapper used by most call sites */
export function convertText(source: string, options: ConvertOptions): string {
  return convertTextWithMeta(source, options).text;
}
