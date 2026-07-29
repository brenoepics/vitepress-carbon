/**
 * Stand-in for VitePress's `@localSearchIndex` virtual module, which is
 * generated from the built site's markdown. `VPLocalSearchBox` imports it at
 * module scope, so Storybook needs *something* here to resolve.
 *
 * The real module maps a locale to a loader returning a serialised MiniSearch
 * index; an empty index is enough for the search box to mount.
 */
export default {
  root: () => Promise.resolve('')
} as Record<string, () => Promise<string>>
