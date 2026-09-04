import { describe, expect, it } from "vitest";
import { wrapByLength } from "../charLimitSplitter";

describe("wrapByLength", () => {
  it("wraps near the SEO meta limit of 160", () => {
    const text =
      "ParagraphSplitter helps writers turn a long paragraph into clean lines for docs, slides, and social captions without changing a single word.";
    const lines = wrapByLength(text, 160);
    expect(lines.length).toBeGreaterThanOrEqual(1);
    for (const line of lines) {
      expect(line.length).toBeLessThanOrEqual(160);
    }
  });

  it("hard-breaks words longer than the limit", () => {
    const lines = wrapByLength("abcdefghijklmnopqrstuvwxyz", 10);
    expect(lines.every((l) => l.length <= 10)).toBe(true);
    expect(lines.join("")).toBe("abcdefghijklmnopqrstuvwxyz");
  });
});
