import { describe, expect, it } from "vitest";
import {
  groupSentencesPerParagraph,
  splitIntoNParagraphs,
} from "../paragraphSplitter";
import { convertText, convertTextWithMeta } from "../applyOptions";
import { DEFAULT_OPTIONS } from "@/types";
import { splitSentences } from "../sentenceSplitter";

describe("groupSentencesPerParagraph", () => {
  it("groups sentences by N", () => {
    const sentences = ["A.", "B.", "C.", "D.", "E."];
    expect(groupSentencesPerParagraph(sentences, 2)).toEqual([
      "A. B.",
      "C. D.",
      "E.",
    ]);
  });

  it("keeps a short final paragraph when remaining < N", () => {
    expect(groupSentencesPerParagraph(["One.", "Two.", "Three."], 2)).toEqual([
      "One. Two.",
      "Three.",
    ]);
  });

  it("returns empty for empty input", () => {
    expect(groupSentencesPerParagraph([], 3)).toEqual([]);
  });

  it("clamps N to at least 1", () => {
    expect(groupSentencesPerParagraph(["A.", "B."], 0)).toEqual(["A.", "B."]);
  });
});

describe("splitIntoNParagraphs", () => {
  it("splits into N roughly even paragraphs", () => {
    const sentences = [
      "Short one.",
      "Another short.",
      "This sentence is a bit longer than the others for balance.",
      "Tiny.",
      "Medium length sentence here.",
      "End.",
    ];
    const { paragraphs, notice } = splitIntoNParagraphs(sentences, 2);
    expect(paragraphs).toHaveLength(2);
    expect(notice).toBeUndefined();
    expect(paragraphs.join(" ")).toContain("Short one.");
    expect(paragraphs.join(" ")).toContain("End.");
  });

  it("notices when fewer sentences than requested paragraphs", () => {
    const { paragraphs, notice } = splitIntoNParagraphs(
      ["Only one.", "Two."],
      5
    );
    expect(paragraphs).toHaveLength(2);
    expect(notice).toMatch(/Only 2 sentences/);
  });

  it("handles a single sentence", () => {
    const { paragraphs, notice } = splitIntoNParagraphs(["Alone."], 3);
    expect(paragraphs).toEqual(["Alone."]);
    expect(notice).toMatch(/Only one sentence/);
  });

  it("returns empty for empty input", () => {
    expect(splitIntoNParagraphs([], 2)).toEqual({ paragraphs: [] });
  });

  it("respects abbreviation-aware sentence splits via convert pipeline", () => {
    const source =
      "Mr. Smith visited the U.S. office yesterday. He stayed an hour. Then he left.";
    const sentences = splitSentences(source);
    expect(sentences.length).toBeGreaterThanOrEqual(2);
    const { text } = convertTextWithMeta(source, {
      ...DEFAULT_OPTIONS,
      mode: "into-n-paragraphs",
      paragraphCount: 2,
    });
    expect(text).toContain("Mr. Smith");
    expect(text).toContain("\n\n");
  });
});

describe("convertText paragraph modes", () => {
  it("joins sentences-per-paragraph with blank lines", () => {
    // Use full sentences — single-word stubs like "One." are not reliable splits in sbd
    const source =
      "Hello there. How are you? Great to see you! Thanks for reading.";
    const text = convertText(source, {
      ...DEFAULT_OPTIONS,
      mode: "sentences-per-paragraph",
      sentencesPerParagraph: 2,
    });
    expect(text).toBe(
      "Hello there. How are you?\n\nGreat to see you! Thanks for reading."
    );
  });

  it("returns empty string for blank input", () => {
    expect(
      convertText("   ", {
        ...DEFAULT_OPTIONS,
        mode: "sentences-per-paragraph",
      })
    ).toBe("");
  });
});
