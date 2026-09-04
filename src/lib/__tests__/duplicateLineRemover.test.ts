import { describe, expect, it } from "vitest";
import { removeDuplicateLines } from "../duplicateLineRemover";

describe("removeDuplicateLines", () => {
  it("keeps first occurrence and drops later duplicates", () => {
    const { result, removed } = removeDuplicateLines(
      "apple\nbanana\napple\ncherry",
      true
    );
    expect(result).toBe("apple\nbanana\ncherry");
    expect(removed).toBe(1);
  });

  it("reports per-line duplicate stats", () => {
    const { duplicates, removed } = removeDuplicateLines(
      "apple\napple\napple\nbanana\nbanana",
      true
    );
    expect(removed).toBe(3);
    expect(duplicates).toEqual([
      { line: "apple", occurrences: 3, removed: 2 },
      { line: "banana", occurrences: 2, removed: 1 },
    ]);
  });
});
