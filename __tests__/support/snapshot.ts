/**
 * Snapshot normalisation.
 *
 * The long-text fixtures run to hundreds or thousands of characters, which
 * would make the markup snapshots unreadable and impossible to review. Each
 * fixture is swapped for a token that records which fixture it was and how
 * long it is, so a snapshot still fails if text is truncated, duplicated, or
 * swapped for a different fixture — but the diff stays legible.
 */
import {
  LONG_PARAGRAPH,
  LONG_TEXTS
} from '../../shared/vitepress-harness/long-text.js'

const fixtures = Object.entries({ ...LONG_TEXTS, paragraph: LONG_PARAGRAPH })
  // Longest first so a fixture that contains another is matched whole.
  .sort(([, a], [, b]) => b.length - a.length)

function escapeRegExp(value: string): string {
  return value.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`)
}

export function normalizeSnapshot(markup: string): string {
  let output = markup

  for (const [name, text] of fixtures) {
    output = output.replaceAll(
      new RegExp(escapeRegExp(text), 'g'),
      `«${name}:${text.length}»`
    )
  }

  return (
    output
      // Vue's scope ids are not part of what these snapshots guard.
      .replaceAll(/ data-v-[a-z0-9]+=""/g, '')
      // VPFeaturePattern picks a decorative pattern at random on every render.
      .replaceAll(/ data-y="-?\d+"/g, ' data-y="[random]"')
      .replaceAll(/></g, '>\n<')
      .trim()
  )
}
