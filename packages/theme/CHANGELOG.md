# vitepress-carbon

## 1.7.0

### Minor Changes

- cd1b948: The nav bar now follows the colour scheme, and its icons are legible in light
  mode.

  `VPNav` and `VPNavBar` were painted with `--vp-c-bg-dark` and their text with
  `--vp-c-text-dark`. Both are declared once in `:root` holding dark-surface
  values with no `.dark` counterpart, so the header stayed a dark slab above white
  content in light mode. They now use `--vp-nav-bg-color` (`--vp-c-bg-alt`), the
  token the mobile nav screen already used, so the bar and the screen are one
  continuous surface in both schemes.

  That also fixes the mobile nav screen's social links, which inherited the same
  near-white foreground onto a near-white surface and rendered at 1.07:1 — below
  the 3:1 WCAG minimum for non-text contrast, and effectively invisible.

  The `--vp-c-nav-*` foreground tokens gained light values plus a `.dark` block
  carrying the previous ones, so **dark mode is unchanged**: nav background
  `#010409`, wordmark 17.4:1, icons 9.7:1, all identical to before. In light mode
  the wordmark is 14.6:1 and the icons 5.7:1.

  Adds `--vp-c-nav-title` for prominent nav text. It resolves to
  `--vp-c-text-dark` under `.dark`, so sites overriding that variable keep their
  customisation.

- 4ac70df: Add a `storybook` social-link icon.

  `themeConfig.socialLinks` now accepts `icon: 'storybook'` alongside the other
  built-in marks, so a site can link its component workbench from the nav bar
  without hand-rolling an `{ svg }` entry. The mark comes from
  [Simple Icons](https://simpleicons.org/) under CC0 1.0, like the rest of the set.

### Patch Changes

- 7f2295f: Refresh dependencies and patch transitive security advisories (`@xmldom/xmldom`, `js-yaml`, `brace-expansion`, `nanoid`, `svgo`).
- 4a3c5f5: Fix importing from `vitepress-carbon/components` in dev. Pages failed to load with a 404 and a "MIME type text/html" error, because the local search box imported `mark.js`'s UMD build. It now imports the ESM entry, and `mark.js` is declared as a dependency, pre-bundled, and bundled for SSR.
- 274e436: Stop the footer's contribution-tile grid from being cut off.

  The grid was a fixed 120x18 of 11px cells on a 3px gap — 1677x249px — centred
  inside a footer that is neither of those sizes. Below 1677px wide the extra was
  trimmed by `overflow: hidden`, and because the offset is arbitrary the cut
  landed mid-cell: across viewports from 320px to 2560px, 46% sliced a column in
  half, and the vertical cut sliced a row at almost every height. Above 1677px the
  grid instead stopped short of both edges, reading as a floating rectangle rather
  than texture.

  `VPContributionTiles` now takes a `fit` prop that sizes the grid to its own box
  in whole cells, and the footer fills its box (`inset: 0`) instead of centring a
  fixed grid. The leftover is always under one 14px pitch and is split between the
  opposite edges, so no tile is ever clipped at any viewport size.

- 6c70312: Keep long post titles inside the content column (#28).

  The title row in `VPDoc` sits in a chain of flex items — `.content-file`,
  `.content-ul`, `.content-box`, `.content-box-item`, `.content-box-text` — and a
  flex item's default `min-width: auto` refuses to shrink below its content width.
  With links in that chain still unshrinkable, a long or unbreakable title pushed
  past `.content-container` and gave the page a horizontal scrollbar. The whole
  chain can now shrink, so the title truncates with an ellipsis; the full text
  stays available through the link's `title` attribute, and the file icon is
  marked `aria-hidden`.

  Clipping is applied to the title link only, not to every `.content-box-item` —
  the trailing page actions share that class and host an absolutely positioned
  menu that has to escape its box.

  `VPDocFooter`'s prev/next pager had the same problem: its titles now wrap inside
  the pager instead of overflowing it.

- 764d67f: Import `markdown-it` as a type-only dependency in the theme so it is no longer a runtime dependency of the published package.
- 6fca7a5: Keep the mobile navbar search button borderless when DocSearch CSS loads after the theme, preserving the desktop search field and visible keyboard focus.

## 1.5.0

### Minor Changes

- d1da356: Fixed dist imports and navbar menu
