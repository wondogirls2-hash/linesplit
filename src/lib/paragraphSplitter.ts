/**
 * Group sentences into paragraphs of `n` sentences each.
 * Paragraphs are separated by a blank line. The last group may be shorter.
 */
export function groupSentencesPerParagraph(
  sentences: string[],
  n: number
): string[] {
  const size = Math.max(1, Math.min(20, Math.floor(n) || 1));
  if (sentences.length === 0) return [];

  const paragraphs: string[] = [];
  for (let i = 0; i < sentences.length; i += size) {
    const chunk = sentences.slice(i, i + size).map((s) => s.trim()).filter(Boolean);
    if (chunk.length) paragraphs.push(chunk.join(" "));
  }
  return paragraphs;
}

/**
 * Split sentences into exactly `n` paragraphs (or fewer if not enough sentences),
 * balancing total character length as evenly as possible at sentence boundaries.
 */
export function splitIntoNParagraphs(
  sentences: string[],
  n: number
): { paragraphs: string[]; notice?: string } {
  const target = Math.max(2, Math.min(20, Math.floor(n) || 2));
  const cleaned = sentences.map((s) => s.trim()).filter(Boolean);

  if (cleaned.length === 0) {
    return { paragraphs: [] };
  }

  if (cleaned.length === 1) {
    return {
      paragraphs: [cleaned[0]!],
      notice:
        "Only one sentence was found, so the text could not be split into multiple paragraphs.",
    };
  }

  const parts = Math.min(target, cleaned.length);
  let notice: string | undefined;
  if (cleaned.length < target) {
    notice = `Only ${cleaned.length} sentences were found, so the text was split into ${parts} paragraph${parts === 1 ? "" : "s"} instead of ${target}.`;
  }

  if (parts === 1) {
    return { paragraphs: [cleaned.join(" ")], notice };
  }

  const lengths = cleaned.map((s) => s.length);
  const total = lengths.reduce((a, b) => a + b, 0);
  const ideal = total / parts;

  const paragraphs: string[] = [];
  let start = 0;

  for (let p = 0; p < parts; p++) {
    const remainingParts = parts - p;
    const remainingSentences = cleaned.length - start;

    if (remainingParts === 1) {
      paragraphs.push(cleaned.slice(start).join(" "));
      break;
    }

    // Leave at least one sentence for each remaining paragraph
    const maxEnd = cleaned.length - (remainingParts - 1);
    let bestEnd = start + 1;
    let bestScore = Number.POSITIVE_INFINITY;
    let run = 0;

    for (let end = start + 1; end <= maxEnd; end++) {
      run += lengths[end - 1]!;
      const score = Math.abs(run - ideal);
      // Prefer the cut closest to the ideal length; slight bias to not undershoot
      if (score < bestScore || (score === bestScore && end > bestEnd)) {
        bestScore = score;
        bestEnd = end;
      }
    }

    paragraphs.push(cleaned.slice(start, bestEnd).join(" "));
    start = bestEnd;
  }

  return { paragraphs, notice };
}
