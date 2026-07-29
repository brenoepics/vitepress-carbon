---
'vitepress-carbon': patch
---

Stop the footer's contribution-tile grid from being cut off.

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
