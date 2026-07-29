---
'vitepress-carbon': minor
---

The nav bar now follows the colour scheme, and its icons are legible in light
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
