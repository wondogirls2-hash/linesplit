/**
 * Lightweight sentence splitter for the Chrome extension popup.
 * Abbreviation-aware enough for common cases; full tool lives on the website.
 */
const ABBREVIATIONS = [
  "Mr",
  "Mrs",
  "Ms",
  "Dr",
  "Prof",
  "Sr",
  "Jr",
  "vs",
  "etc",
  "e.g",
  "i.e",
  "U.S",
  "U.K",
  "E.U",
];

function protectAbbreviations(text) {
  let out = text;
  const store = [];
  ABBREVIATIONS.forEach((abbr, i) => {
    const token = `__ABBR${i}__`;
    const re = new RegExp(`\\b${abbr.replace(/\./g, "\\.")}\\.`, "gi");
    out = out.replace(re, (match) => {
      store.push({ token, value: match });
      return token;
    });
  });
  // decimals like 3.14
  out = out.replace(/\b\d+\.\d+\b/g, (match) => {
    const token = `__NUM${store.length}__`;
    store.push({ token, value: match });
    return token;
  });
  return { text: out, store };
}

function restore(text, store) {
  let out = text;
  for (let i = store.length - 1; i >= 0; i -= 1) {
    out = out.split(store[i].token).join(store[i].value);
  }
  return out;
}

function splitSentences(raw) {
  const trimmed = (raw || "").replace(/\s+/g, " ").trim();
  if (!trimmed) return "";

  const { text, store } = protectAbbreviations(trimmed);
  const parts = [];
  let last = 0;
  const re = /[.!?…]["')\]]*(?=\s+["'(]*[A-Za-z0-9])/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const end = m.index + m[0].length;
    const slice = text.slice(last, end).trim();
    if (slice) parts.push(slice);
    let i = end;
    while (i < text.length && /\s/.test(text[i])) i += 1;
    last = i;
    re.lastIndex = i;
  }
  const tail = text.slice(last).trim();
  if (tail) parts.push(tail);

  const lines = (parts.length ? parts : [trimmed]).map((p) =>
    restore(p, store).trim()
  );
  return lines.filter(Boolean).join("\n");
}

const input = document.getElementById("input");
const output = document.getElementById("output");
const splitBtn = document.getElementById("split");
const copyBtn = document.getElementById("copy");
const clearBtn = document.getElementById("clear");

function refresh() {
  const result = splitSentences(input.value);
  output.value = result;
  copyBtn.disabled = !result;
}

splitBtn.addEventListener("click", refresh);
input.addEventListener("input", () => {
  // live preview keeps the extension feeling instant
  refresh();
});

copyBtn.addEventListener("click", async () => {
  if (!output.value) return;
  try {
    await navigator.clipboard.writeText(output.value);
    copyBtn.textContent = "Copied";
    setTimeout(() => {
      copyBtn.textContent = "Copy";
    }, 1200);
  } catch {
    output.select();
  }
});

clearBtn.addEventListener("click", () => {
  input.value = "";
  output.value = "";
  copyBtn.disabled = true;
  input.focus();
});
