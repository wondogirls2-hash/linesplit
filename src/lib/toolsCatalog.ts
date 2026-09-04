export type ToolId =
  | "paragraph-splitter"
  | "remove-line-breaks"
  | "remove-duplicate-lines"
  | "case-converter"
  | "find-and-replace";

export type ToolDef = {
  id: ToolId;
  href: string;
  navLabel: string;
  title: string;
  shortDescription: string;
  /** Tools to suggest from this page (2–3) */
  related: ToolId[];
};

export const TOOLS: Record<ToolId, ToolDef> = {
  "paragraph-splitter": {
    id: "paragraph-splitter",
    href: "/",
    navLabel: "Paragraph Splitter",
    title: "Paragraph Splitter",
    shortDescription: "Split paragraphs into one sentence per line.",
    related: [
      "remove-line-breaks",
      "remove-duplicate-lines",
      "case-converter",
    ],
  },
  "remove-line-breaks": {
    id: "remove-line-breaks",
    href: "/tools/remove-line-breaks",
    navLabel: "Remove Line Breaks",
    title: "Remove Line Breaks",
    shortDescription: "Join broken lines back into a clean paragraph.",
    related: ["paragraph-splitter", "find-and-replace", "case-converter"],
  },
  "remove-duplicate-lines": {
    id: "remove-duplicate-lines",
    href: "/tools/remove-duplicate-lines",
    navLabel: "Remove Duplicates",
    title: "Remove Duplicate Lines",
    shortDescription: "Delete repeated lines from pasted lists.",
    related: ["find-and-replace", "case-converter", "paragraph-splitter"],
  },
  "case-converter": {
    id: "case-converter",
    href: "/tools/case-converter",
    navLabel: "Case Converter",
    title: "Case Converter",
    shortDescription: "UPPER, lower, Title, and Sentence case.",
    related: ["find-and-replace", "remove-duplicate-lines", "paragraph-splitter"],
  },
  "find-and-replace": {
    id: "find-and-replace",
    href: "/tools/find-and-replace",
    navLabel: "Find & Replace",
    title: "Find & Replace",
    shortDescription: "Apply multiple find/replace rules at once.",
    related: ["remove-duplicate-lines", "case-converter", "remove-line-breaks"],
  },
};

/** Nav order as specified */
export const TOOL_NAV_ORDER: ToolId[] = [
  "paragraph-splitter",
  "remove-line-breaks",
  "remove-duplicate-lines",
  "case-converter",
  "find-and-replace",
];

export function getRelatedTools(current: ToolId, limit = 3): ToolDef[] {
  return TOOLS[current].related.slice(0, limit).map((id) => TOOLS[id]);
}
