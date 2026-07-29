---
'vitepress-carbon': patch
---

Keep long post titles inside the content column (#28).

The title row in `VPDoc` sat in a chain of flex items that all defaulted to
`min-width: auto`, so a long or unbreakable title could not shrink and pushed
past `.content-container`, giving the whole page a horizontal scrollbar. The
chain can now shrink, and the title truncates with an ellipsis — the full text
stays available through the link's `title` attribute.

The row also no longer uses `justify-content: flex-end`, which sent overflow off
the unreachable left edge; the actions are right-aligned with an auto margin
that collapses when space runs out. `VPDocFooter`'s prev/next titles wrap
instead of overflowing their pager.
