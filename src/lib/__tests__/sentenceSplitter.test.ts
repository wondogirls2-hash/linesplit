import { describe, expect, it } from "vitest";
import { splitSentences } from "../sentenceSplitter";

describe("splitSentences", () => {
  it("does not split on Mr. / Mrs. / Dr. abbreviations", () => {
    const result = splitSentences(
      "Mr. Smith met Mrs. Jones and Dr. Lee at noon. They shook hands."
    );
    expect(result).toHaveLength(2);
    expect(result[0]).toContain("Mr. Smith");
    expect(result[0]).toContain("Dr. Lee");
    expect(result[1]).toMatch(/They shook hands/);
  });

  it("does not split on decimal numbers like 3.14", () => {
    const result = splitSentences(
      "Pi is about 3.14 in most textbooks. That is enough for school."
    );
    expect(result).toHaveLength(2);
    expect(result[0]).toContain("3.14");
    expect(result[1]).toMatch(/That is enough/);
  });

  it("does not split on currency decimals", () => {
    const result = splitSentences(
      "The ticket costs $19.99 today. Buy it before midnight."
    );
    expect(result).toHaveLength(2);
    expect(result[0]).toContain("$19.99");
  });

  it("splits on normal sentence endings . ! ?", () => {
    const result = splitSentences(
      "Hello there. How are you? Great to see you!"
    );
    expect(result.length).toBeGreaterThanOrEqual(3);
    expect(result[0]).toMatch(/Hello there/);
    expect(result[1]).toMatch(/How are you/);
  });

  it("keeps U.S. / J.K. style initialisms intact", () => {
    const result = splitSentences(
      "J.K. Rowling visited the U.S. last year. Fans were thrilled."
    );
    expect(result).toHaveLength(2);
    expect(result[0]).toMatch(/J\.K\./);
    expect(result[0]).toMatch(/U\.S\./);
  });

  it("treats ellipsis as a single unit and can continue after it", () => {
    const result = splitSentences("She paused\u2026 Then she smiled.");
    expect(result.length).toBeGreaterThanOrEqual(1);
    expect(result.join(" ")).toContain("\u2026");
  });

  it("returns empty array for blank input", () => {
    expect(splitSentences("")).toEqual([]);
    expect(splitSentences("   ")).toEqual([]);
  });
});
