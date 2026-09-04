export type ReplaceRule = {
  id: string;
  find: string;
  replace: string;
};

export type FindReplaceOptions = {
  caseSensitive: boolean;
  useRegex: boolean;
};

export function applyFindAndReplace(
  text: string,
  rules: ReplaceRule[],
  options: FindReplaceOptions
): { result: string; error?: string } {
  let result = text;

  for (const rule of rules) {
    if (!rule.find) continue;

    try {
      if (options.useRegex) {
        const flags = options.caseSensitive ? "g" : "gi";
        const re = new RegExp(rule.find, flags);
        result = result.replace(re, rule.replace);
      } else {
        if (options.caseSensitive) {
          // Split/join for global literal replace
          result = result.split(rule.find).join(rule.replace);
        } else {
          const escaped = rule.find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          result = result.replace(new RegExp(escaped, "gi"), rule.replace);
        }
      }
    } catch {
      return {
        result: text,
        error: `Invalid regex in rule: ${rule.find}`,
      };
    }
  }

  return { result };
}

export function createEmptyRule(): ReplaceRule {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    find: "",
    replace: "",
  };
}
