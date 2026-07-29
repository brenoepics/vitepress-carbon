---
'vitepress-carbon': patch
---

Keep long post titles inside the content column (#28).

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
