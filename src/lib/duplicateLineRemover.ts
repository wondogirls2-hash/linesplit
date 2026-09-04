export type DuplicateStat = {
  /** First-kept display text for the line */
  line: string;
  /** How many times this line appeared in the input */
  occurrences: number;
  /** How many copies were deleted (occurrences - 1) */
  removed: number;
};

export function removeDuplicateLines(
  text: string,
  caseSensitive: boolean
): { result: string; removed: number; duplicates: DuplicateStat[] } {
  const normalized = text.replace(/\r\n/g, "\n");
  if (!normalized) return { result: "", removed: 0, duplicates: [] };

  const lines = normalized.split("\n");
  const seen = new Map<string, { display: string; occurrences: number }>();
  const kept: string[] = [];
  let removed = 0;

  for (const line of lines) {
    const key = caseSensitive ? line : line.toLowerCase();
    const existing = seen.get(key);
    if (existing) {
      existing.occurrences += 1;
      removed += 1;
      continue;
    }
    seen.set(key, { display: line, occurrences: 1 });
    kept.push(line);
  }

  const duplicates = Array.from(seen.values())
    .map((entry) => ({
      line: entry.display,
      occurrences: entry.occurrences,
      removed: entry.occurrences - 1,
    }))
    .filter((d) => d.removed > 0)
    .sort((a, b) => b.removed - a.removed);

  return { result: kept.join("\n"), removed, duplicates };
}
