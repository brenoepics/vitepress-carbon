---
'vitepress-carbon': patch
---

Fix importing from `vitepress-carbon/components` in dev. Pages failed to load with a 404 and a "MIME type text/html" error, because the local search box imported `mark.js`'s UMD build. It now imports the ESM entry, and `mark.js` is declared as a dependency, pre-bundled, and bundled for SSR.
