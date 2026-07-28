# Carbon Design Language

This document is the single source of truth for how **Carbon** looks and feels.
It defines the primitives — color, type, space, shape, elevation, and motion — that
every component in `packages/theme` is built from. Treat it as a specification:
new UI should compose these tokens rather than introduce ad‑hoc values.

Carbon is a **near‑monochrome, content‑first** system. A wide neutral gray scale
carries almost all of the interface; functional color is used sparingly and only
where it means something (a link, a success state, a danger). The result is calm,
high‑contrast, and legible in both light and dark modes.

> Implementation lives in [`packages/theme/src/theme/styles/vars.css`](packages/theme/src/theme/styles/vars.css)
> as `--vp-*` custom properties. This file describes the _system_; the appendix maps each
> role to the concrete variable. Agents working in this repo should also read [AGENTS.md](AGENTS.md).

---

## 1. Principles

1. **Neutral by default.** Structure comes from grays, spacing, and hairline borders — not from color or heavy shadows.
2. **Color carries meaning.** Reserve hue for interaction (accent) and status (success / attention / danger / done). Never decorate with it.
3. **One system, two modes.** Every token has a light and a dark value. Design once; both modes must pass contrast.
4. **Content sets the rhythm.** Text is the primary element. Line length, spacing, and a modest type scale keep reading comfortable.
5. **Accessible is non‑negotiable.** Body text meets WCAG AA (≥ 4.5:1); focus is always visible; motion is optional.
6. **Tokens over values.** If you are typing a hex, a px, or a font stack into a component, it belongs here first.

---

## 2. Color

Color is expressed as **semantic roles**, not raw swatches. Each role resolves to a
`foreground` (text/icon), an `emphasis` (solid fill), and a `muted` (subtle tint)
value, per mode. Build with the role; never reach past it to a raw scale.

### 2.1 Neutral foundation

The chassis of the entire interface.

| Role             | Purpose                   | Light       | Dark        |
| ---------------- | ------------------------- | ----------- | ----------- |
| `canvas.default` | Page background           | `#ffffff`   | `#0d1117`   |
| `canvas.muted`   | Inset / secondary surface | `#f6f8fa`   | `#151b23`   |
| `fg.default`     | Primary text              | `#1f2328`   | `#f0f6fc`   |
| `fg.muted`       | Secondary text, captions  | `#59636e`   | `#9198a1`   |
| `fg.onEmphasis`  | Text on a solid fill      | `#ffffff`   | `#ffffff`   |
| `border.default` | Dividers, control borders | `#d1d9e0`   | `#3d444d`   |
| `border.muted`   | Softer separators         | `#d1d9e0b3` | `#3d444db3` |

### 2.2 Functional roles

| Role          | Meaning                          | Mode  | `foreground` | `emphasis` | `muted`     |
| ------------- | -------------------------------- | ----- | ------------ | ---------- | ----------- |
| **Accent**    | Links, selection, primary action | Light | `#0969da`    | `#0969da`  | `#ddf4ff`   |
|               |                                  | Dark  | `#4493f8`    | `#1f6feb`  | `#388bfd1a` |
| **Success**   | Done, passing, positive          | Light | `#1a7f37`    | `#1f883d`  | `#dafbe1`   |
|               |                                  | Dark  | `#3fb950`    | `#238636`  | `#2ea04326` |
| **Attention** | Warning, needs review            | Light | `#9a6700`    | `#9a6700`  | `#fff8c5`   |
|               |                                  | Dark  | `#d29922`    | `#9e6a03`  | `#bb800926` |
| **Danger**    | Error, destructive               | Light | `#d1242f`    | `#cf222e`  | `#ffebe9`   |
|               |                                  | Dark  | `#f85149`    | `#da3633`  | `#f851491a` |
| **Done**      | Merged, completed (secondary)    | Light | `#8250df`    | `#8250df`  | `#fbefff`   |
|               |                                  | Dark  | `#ab7df8`    | `#8957e5`  | `#ab7df826` |
| **Neutral**   | Inactive, muted badge            | Light | `#59636e`    | `#59636e`  | `#818b981f` |
|               |                                  | Dark  | `#9198a1`    | `#656c76`  | `#656c7633` |

### 2.3 Usage rules

- **Text** uses `foreground`. **Solid fills** (buttons, filled badges) use `emphasis` with `fg.onEmphasis` text.
- **Tints** (callout backgrounds, subtle highlights) use `muted`.
- Interactive text (links) uses `accent.foreground`. Do not use accent for non‑interactive emphasis — use weight or `fg.default`.
- A surface stack is at most three levels deep: `canvas.default` → `canvas.muted` → a bordered card. Prefer borders over shadow to separate surfaces.

---

## 3. Typography

### 3.1 Font families

| Token                   | Stack                                                                                                                                               |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `font.sans` (UI / body) | `-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"`                   |
| `font.display`          | **Mona Sans** — a bundled variable font (`weight 200–900`, `stretch 75%–125%`), layered ahead of the sans stack for headings and marketing surfaces |
| `font.mono`             | `ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace` (code favors `"JetBrains Mono"` first)                     |

Mona Sans ships in the theme (`packages/theme/src/theme/fonts/Mona-Sans.woff2`) and is
preloaded — never link it from a third‑party CDN.

### 3.2 Type scale

Sizes use `rem` so they respect the reader's browser zoom. Base is `16px`.

| Step  | rem     | px  | Typical use               |
| ----- | ------- | --- | ------------------------- |
| `xs`  | `0.75`  | 12  | Captions, metadata        |
| `sm`  | `0.875` | 14  | Secondary body, UI labels |
| `md`  | `1`     | 16  | **Body default**          |
| `lg`  | `1.25`  | 20  | Sub‑headings              |
| `xl`  | `2`     | 32  | Section titles            |
| `2xl` | `2.5`   | 40  | Page / hero titles        |

Role shortcuts: **body** — large 16 / medium 14 / small 12; **title** — large 32 / medium 20 / small 16.

### 3.3 Weight & line‑height

| Weight   | Value |     | Line‑height | Value   | Use              |
| -------- | ----- | --- | ----------- | ------- | ---------------- |
| Light    | `300` |     | Tight       | `1.25`  | Headings         |
| Normal   | `400` |     | Snug        | `1.375` | Dense UI         |
| Medium   | `500` |     | Normal      | `1.5`   | **Body default** |
| Semibold | `600` |     | Relaxed     | `1.625` | Long‑form prose  |

Bold copy is `600` (semibold), not `700`. Reserve `300` for large display sizes only.

---

## 4. Space & layout

### 4.1 Spacing scale

An **8px grid**, expressed in `rem`. Use scale steps for every margin, padding, and gap.

| px  | 2    | 4   | 6    | 8   | 12  | 16  | 20   | 24  | 28   | 32  | 36   | 40  | 48  | 64  | 80  | 96  | 112 | 128 |
| --- | ---- | --- | ---- | --- | --- | --- | ---- | --- | ---- | --- | ---- | --- | --- | --- | --- | --- | --- | --- |
| rem | .125 | .25 | .375 | .5  | .75 | 1   | 1.25 | 1.5 | 1.75 | 2   | 2.25 | 2.5 | 3   | 4   | 5   | 6   | 7   | 8   |

Common rhythm: `8` inside controls, `16` between related elements, `24`–`32` between sections.

### 4.2 Layout & containers

| Token                 | Value                         | Meaning                 |
| --------------------- | ----------------------------- | ----------------------- |
| Layout max width      | `1440px`                      | Outer shell             |
| Doc content max width | `800px`                       | Optimal reading measure |
| Sidebar width         | `272px` (→ `250px` on tablet) | Primary nav             |
| Aside width           | `240px`                       | In‑page outline         |
| Nav height            | `64px`                        | Top bar                 |
| Min supported width   | `320px`                       | Small mobile            |

### 4.3 Breakpoints

Mobile‑first. Layout shifts at **`768px`** (tablet), **`960px`** (desktop grid), and **`1279px`** (wide). Dark mode is **class‑driven**, never keyed off `prefers-color-scheme`.

---

## 5. Shape, border & elevation

### 5.1 Border width & radius

| Token                 | Value                |
| --------------------- | -------------------- |
| Border thin (default) | `1px`                |
| Border thick          | `2px`                |
| Border thicker        | `4px`                |
| Radius small          | `3px`                |
| **Radius default**    | **`6px`**            |
| Radius large          | `12px`               |
| Radius pill           | `100%` / fully round |

`6px` is the house radius — buttons, inputs, cards, code blocks. Reach for `12px` only on large surfaces (modals, hero panels).

### 5.2 Elevation

Shadows are **quiet** and used sparingly; borders do most separation work. Five ramped levels:

| Level | Shadow                                                    |
| ----- | --------------------------------------------------------- |
| 1     | `0 1px 2px rgba(0,0,0,.04), 0 1px 2px rgba(0,0,0,.06)`    |
| 2     | `0 3px 12px rgba(0,0,0,.07), 0 1px 4px rgba(0,0,0,.07)`   |
| 3     | `0 12px 32px rgba(0,0,0,.1), 0 2px 6px rgba(0,0,0,.08)`   |
| 4     | `0 14px 44px rgba(0,0,0,.12), 0 3px 9px rgba(0,0,0,.12)`  |
| 5     | `0 18px 56px rgba(0,0,0,.16), 0 4px 12px rgba(0,0,0,.16)` |

Use 1–2 for resting cards, 3 for popovers/dropdowns, 4–5 for modals.

---

## 6. Focus, motion & accessibility

- **Focus.** Every interactive element shows a visible focus ring: `2px` outline, `-2px` offset (drawn just inside the control). Never remove focus styles without an equivalent replacement.
- **Contrast.** Body text ≥ 4.5:1; large text and UI borders ≥ 3:1. Verify both modes when adding or changing color.
- **Motion.** Transitions are short and subtle (opacity, small transforms). Honor `@media (prefers-reduced-motion: reduce)` — the theme already disables non‑essential animation there; keep it that way.
- **Targets & semantics.** Hit targets ≥ 24px; use real semantic elements (`<button>`, `<a>`, headings in order) so keyboard and screen‑reader users get correct behavior for free.

---

## 7. Theming model

- Light values are declared on `:root`; dark values override on `.dark` (VitePress toggles `html.dark`). Adding a token means defining **both**.
- Consume tokens as `var(--vp-*)`; do not hardcode hex, px, or font stacks in components or inline styles.
- To retheme, override the `--vp-*` custom properties in a consuming site's CSS — components should never need editing to change the palette.

---

## Appendix — role → implementation token

Concrete variables in [`vars.css`](packages/theme/src/theme/styles/vars.css). The theme applies
this system with a blue accent for links and a green accent for primary actions.

| System role      | `--vp-*` token                     | Light                 | Dark                  |
| ---------------- | ---------------------------------- | --------------------- | --------------------- |
| `canvas.default` | `--vp-c-bg`                        | `#ffffff`             | `#0d1117`             |
| `canvas.muted`   | `--vp-c-bg-alt` / `--vp-c-bg-soft` | `#f6f6f7`             | `#010409` / `#161b22` |
| `fg.default`     | `--vp-c-text-1`                    | `rgb(60 60 67)`       | `#c9d1d9`             |
| `fg.muted`       | `--vp-c-text-2`                    | `rgb(60 60 67 / .78)` | `#8b949e`             |
| `border.default` | `--vp-c-border`                    | `#576069`             | `#30363d`             |
| `border.muted`   | `--vp-c-divider`                   | `#e2e2e3`             | `#2e2e32`             |
| `accent`         | `--vp-c-brand-1`                   | `#2f81f7`             | `#58a6ff`             |
| `success`        | `--vp-c-success-*`                 | green                 | green                 |
| `attention`      | `--vp-c-warning-*`                 | yellow                | yellow                |
| `danger`         | `--vp-c-danger-*`                  | red                   | red                   |
| `done`           | `--vp-c-important-*`               | purple                | purple                |
| `font.sans`      | `--vp-font-family-base`            | —                     | —                     |
| `font.mono`      | `--vp-font-family-mono`            | —                     | —                     |
| elevation 1–5    | `--vp-shadow-1` … `--vp-shadow-5`  | —                     | —                     |
| layout width     | `--vp-layout-max-width`            | `1440px`              | —                     |
| doc width        | `--vp-doc-content-max-width`       | `800px`               | —                     |

When you touch UI, work top‑down: pick the **role** here, use the mapped **token**, and only edit `vars.css` if the value genuinely doesn't exist yet.
