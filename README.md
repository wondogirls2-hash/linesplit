# LineSplit

Paste a paragraph. Get one sentence per line.

## Structure (aligned with product spec)

```
src/
  app/
    page.tsx                 # Paragraph Splitter
    layout.tsx
    sitemap.ts
    robots.ts
    tools/
      remove-duplicate-lines/
      case-converter/
      remove-line-breaks/
      find-and-replace/
  components/
    TextConverter.tsx
    OptionsPanel.tsx
    PresetButtons.tsx
    AdSlot.tsx
    FloatingCopyButton.tsx
    WhyUseSection.tsx
    RelatedToolsCard.tsx
    HistoryPanel.tsx
    Nav.tsx
    FaqSection.tsx
    ...
  lib/
    sentenceSplitter.ts
    abbreviations.ts
    charLimitSplitter.ts
    duplicateLineRemover.ts
    caseConverter.ts
    lineBreakRemover.ts
    bulkFindReplace.ts
    useHistory.ts
    ...
  types/
    index.ts
```

## Develop

```bash
npm install
npm run dev
npm test
```

Set `NEXT_PUBLIC_SITE_URL` for production sitemap/OG URLs (defaults to `https://linesplit.app`).
Add a real `public/og.png` (1200×630) when ready — meta tags already point to it.
