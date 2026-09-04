export type LineBreakJoinMode = "space" | "none";

export function removeLineBreaks(
  text: string,
  joinMode: LineBreakJoinMode,
  keepParagraphs: boolean
): string {
  const normalized = text.replace(/\r\n/g, "\n").trim();
  if (!normalized) return "";

  const joiner = joinMode === "space" ? " " : "";

  if (!keepParagraphs) {
    return normalized
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .join(joiner)
      .replace(/[ \t]{2,}/g, " ")
      .trim();
  }

  // Keep blank-line paragraph boundaries; join lines within each paragraph
  return normalized
    .split(/\n{2,}/)
    .map((para) =>
      para
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
        .join(joiner)
        .replace(/[ \t]{2,}/g, " ")
        .trim()
    )
    .filter(Boolean)
    .join("\n\n");
}
