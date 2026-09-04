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

  it("respects case-insensitive mode", () => {
    const { result, removed } = removeDuplicateLines("Apple\napple\nPear", false);
    expect(result).toBe("Apple\nPear");
    expect(removed).toBe(1);
  });
});
