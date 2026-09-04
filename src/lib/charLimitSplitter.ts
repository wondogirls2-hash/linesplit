/**
 * Wrap text into lines of at most `limit` characters,
 * preferring word boundaries (hard-breaks overlong tokens).
 */
export function wrapByLength(raw: string, limit: number): string[] {
  const flattened = raw.replace(/\r\n/g, "\n").replace(/\s+/g, " ").trim();
  if (!flattened || limit < 1) return [];

  const words = flattened.split(" ");
  const lines: string[] = [];
  let current = "";

  const pushHard = (token: string) => {
    for (let i = 0; i < token.length; i += limit) {
      lines.push(token.slice(i, i + limit));
    }
  };

  for (const word of words) {
    if (word.length > limit) {
      if (current) {
        lines.push(current);
        current = "";
      }
      pushHard(word);
      continue;
    }

    const next = current ? `${current} ${word}` : word;
    if (next.length <= limit) {
      current = next;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }

  if (current) lines.push(current);
  return lines;
}
