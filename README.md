# ParagraphSplitter

Paste a paragraph. Get one sentence per line.

Live site: **https://paragraphsplitter.com**

## Structure

```
src/
  app/          # routes + sitemap/robots
  components/   # UI (TextConverter, AdSlot, FaqSection, …)
  lib/          # pure transform logic
  types/
```

## Develop

```bash
npm install
npm run dev
npm test
```

Set `NEXT_PUBLIC_SITE_URL=https://paragraphsplitter.com` in production (already the code default).
Add a real `public/og.png` (1200×630) when ready.
