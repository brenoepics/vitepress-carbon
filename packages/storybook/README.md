# vitepress-carbon-storybook

Storybook workbench for the Carbon theme. Private — never published to npm; it
is built by the Pages workflow and served at `/storybook/` next to the demo
site.

```bash
pnpm storybook          # dev server on :6006
pnpm storybook-build    # static build into packages/storybook/dist
```

## How components render outside VitePress

The theme's components read their data through VitePress's `useData()` and
`useRoute()`, which only exist inside a running site. Both Storybook and the
component tests alias the `vitepress` module to
[`shared/vitepress-harness/`](../../shared/vitepress-harness), a small mutable
store with the same shape. A story declares the context it wants through the
`vitepress` parameter:

```ts
export const Introduction: StoryObj = {
  render: () => ({ components: { VPDoc }, template: '<VPDoc />' }),
  parameters: {
    vitepress: {
      page: { title: 'Getting Started' },
      theme: { editLink: { pattern: 'https://example.com/edit/:path' } }
    }
  }
}
```

`frameWidth` sets the width of the dashed wrapper the story renders inside,
which is what makes overflow visible.

Two other VitePress build-time things are stubbed in
[`.storybook/main.ts`](.storybook/main.ts): the `@localSearchIndex` virtual
module, and the `__VP_LOCAL_SEARCH__` / `__ALGOLIA__` / `__CARBON__` flags.

## Layout

| Path                        | What it holds                                                     |
| --------------------------- | ----------------------------------------------------------------- |
| `src/stories/Overflow.*`    | The regression showcase for issue #28.                            |
| `src/stories/*.stories.ts`  | Curated stories, grouped the way the theme is.                    |
| `src/stories/Catalog.*`     | Every component, discovered by glob.                              |
| `src/component-catalog.ts`  | The glob and the default props behind the catalog.                |
| `src/fixtures.ts`           | Sample nav, sidebar, team and feature data; re-exports long text.  |

## Adding a component

Nothing to register — `src/component-catalog.ts` globs
`packages/theme/src/theme/components/**/*.vue`, so a new component appears in
the catalog on its own. Add default props there if it cannot render without
them, and write a curated story if it deserves one.
