/**
 * Stand-in for VitePress's `@localSearchIndex` virtual module, which is
 * generated from the built site's markdown. `VPLocalSearchBox` imports it at
 * module scope, so Storybook needs *something* here to resolve.
 *
 * The real module maps a locale to a loader whose resolved value carries the
 * serialised MiniSearch index on `.default` — `VPLocalSearchBox` reads
 * `(await loader())?.default` and hands it straight to `MiniSearch.loadJSON`.
 * That call is strict: `undefined` fails with "not valid JSON" and `'{}'` fails
 * with "incompatible version", so the payload has to be a genuinely serialised
 * index. Building it from MiniSearch itself keeps it valid across version
 * bumps, where a hardcoded blob would silently rot when `serializationVersion`
 * changes.
 */
import MiniSearch from 'minisearch'

/** The field configuration VPLocalSearchBox passes to `loadJSON`. */
const emptyIndex = JSON.stringify(
  new MiniSearch({
    fields: ['title', 'titles', 'text'],
    storeFields: ['title', 'titles']
  }).toJSON()
)

export default {
  root: () => Promise.resolve({ default: emptyIndex })
} as Record<string, () => Promise<{ default: string }>>
