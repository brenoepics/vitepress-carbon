---
'vitepress-carbon': minor
---

The nav bar now follows the colour scheme instead of staying dark in light mode.

`VPNav` and `VPNavBar` were painted with `--vp-c-bg-dark` and their text with
`--vp-c-text-dark`, both `:root`-only values, so the header stayed a dark slab
above white content in light mode. They now use `--vp-nav-bg-color`
(`--vp-c-bg-alt`), which the mobile nav screen already used, so the bar and the
screen are one continuous surface in both modes.

The `--vp-c-nav-*` foreground tokens gained proper light values and a `.dark`
block carrying the previous ones, so **dark mode is unchanged**: nav background
`#010409`, wordmark 17.4:1, icons 9.7:1, all identical to before. Light mode goes
from a near-white foreground on a near-white screen to wordmark 14.6:1 and icons
5.7:1.

New token `--vp-c-nav-title` for prominent nav text; it resolves to
`--vp-c-text-dark` in dark mode, so existing overrides of that variable still
apply. This supersedes the `VPNavScreen` token override added alongside it —
the tokens are now correct for that surface without one.
