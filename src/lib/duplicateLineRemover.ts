export function removeDuplicateLines(
  text: string,
  caseSensitive: boolean
): { result: string; removed: number } {
  const normalized = text.replace(/\r\n/g, "\n");
  if (!normalized) return { result: "", removed: 0 };

  const lines = normalized.split("\n");
  const seen = new Set<string>();
  const kept: string[] = [];
  let removed = 0;

  for (const line of lines) {
    const key = caseSensitive ? line : line.toLowerCase();
    if (seen.has(key)) {
      removed += 1;
      continue;
    }
    seen.add(key);
    kept.push(line);
  }

  return { result: kept.join("\n"), removed };
}
