/**
 * Pathological strings shared by the overflow tests and the Storybook stories.
 *
 * Issue #28: a long post title escaped `.content-container`. These fixtures
 * cover the shapes that break layouts in different ways — a single unbreakable
 * token, a very long but breakable sentence, CJK text with no spaces, and
 * emoji/combining characters where character count and rendered width diverge.
 */

/** ~340 chars, no whitespace at all — nothing for the browser to break on. */
export const UNBREAKABLE_TITLE = 'Supercalifragilisticexpialidocious'.repeat(10)

/** ~1.2k chars of ordinary prose: long, but full of break opportunities. */
export const LONG_SENTENCE_TITLE = Array.from(
  { length: 40 },
  (_, index) => `extraordinarily-verbose-heading-segment-number-${index + 1}`
).join(' ')

/** No spaces, and every glyph is full-width. */
export const CJK_TITLE = '这是一个非常非常长的中文标题用来测试溢出行为'.repeat(
  8
)

/** Right-to-left text, which also has to stay inside the column. */
export const RTL_TITLE = Array.from(
  { length: 12 },
  () => 'عنوان طويل جدا لاختبار تجاوز الحدود'
).join(' ')

/** Grapheme clusters: `.length` here is far larger than the visual width. */
export const EMOJI_TITLE = '🚀✨👩‍💻🏳️‍🌈'.repeat(40)

/** A URL-ish token, the most common real-world cause of a blown-out layout. */
export const URL_TITLE = `https://example.com/${'a-really-long-path-segment/'.repeat(20)}index.html`

/** Every fixture, for tests that want to sweep all of them. */
export const LONG_TEXTS: Record<string, string> = {
  unbreakable: UNBREAKABLE_TITLE,
  longSentence: LONG_SENTENCE_TITLE,
  cjk: CJK_TITLE,
  rtl: RTL_TITLE,
  emoji: EMOJI_TITLE,
  url: URL_TITLE
}

/** Long body copy for components that render markdown-ish content. */
export const LONG_PARAGRAPH = Array.from(
  { length: 12 },
  () =>
    'Carbon embraces GitHub monochromatic ethos, offering a theme for VitePress documentation that is sleek, modern, and effortlessly stylish.'
).join(' ')
