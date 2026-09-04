export type CaseMode = "upper" | "lower" | "title" | "sentence";

function toTitleCase(text: string): string {
  return text.replace(
    /\w\S*/g,
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
}

function toSentenceCase(text: string): string {
  const lower = text.toLowerCase();
  return lower.replace(/(^\s*[a-z])|([.!?…]\s+[a-z])/g, (m) => m.toUpperCase());
}

export function convertCase(text: string, mode: CaseMode): string {
  switch (mode) {
    case "upper":
      return text.toUpperCase();
    case "lower":
      return text.toLowerCase();
    case "title":
      return toTitleCase(text);
    case "sentence":
      return toSentenceCase(text);
    default:
      return text;
  }
}
