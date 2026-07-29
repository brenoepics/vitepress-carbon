/**
 * Stand-in for the `vitepress` client module.
 *
 * Vitest and Storybook both alias `vitepress` here so the theme's components
 * can be mounted outside a running VitePress site. Only the surface the theme
 * actually imports is implemented — see `shared/vitepress-harness/context.ts`
 * for the store these helpers read from.
 */
import {
  computed,
  defineComponent,
  h,
  onMounted,
  ref,
  watch,
  type InjectionKey
} from 'vue'
import { harnessState } from './context.js'

export const dataSymbol: InjectionKey<unknown> = Symbol(
  'vitepress-harness-data'
)

export const inBrowser = typeof document !== 'undefined'

/** Writable, like VitePress's own — the appearance switch assigns to it. */
export const isDark = ref(false)

if (inBrowser) {
  watch(
    isDark,
    (dark) => document.documentElement.classList.toggle('dark', dark),
    { immediate: true }
  )
}

export function useData() {
  return {
    site: computed(() => harnessState.value.site),
    theme: computed(() => harnessState.value.theme),
    page: computed(() => harnessState.value.page),
    frontmatter: computed(() => harnessState.value.frontmatter),
    params: computed(() => harnessState.value.params),
    title: computed(() => harnessState.value.page.title),
    description: computed(() => harnessState.value.page.description),
    lang: computed(() => harnessState.value.site.lang),
    isDark,
    dir: computed(() => 'ltr'),
    localeIndex: computed(() => 'root'),
    hash: computed(() => '')
  }
}

export function useRoute() {
  return harnessState.value.route
}

export function useRouter() {
  return {
    route: harnessState.value.route,
    go: async () => {},
    onBeforeRouteChange: undefined,
    onBeforePageLoad: undefined,
    onAfterRouteChange: undefined
  }
}

export function withBase(path: string): string {
  const { base } = harnessState.value.site
  return path.startsWith('/') ? `${base.replace(/\/$/, '')}${path}` : path
}

export function getScrollOffset(): number {
  return harnessState.value.site.scrollOffset
}

/** VitePress runs the callback on mount and after every route change. */
export function onContentUpdated(fn: () => void): void {
  onMounted(fn)
}

/** The harness never resolves the loader; stories mount components directly. */
export function defineClientComponent(_loader: () => Promise<unknown>) {
  return defineComponent({
    setup: () => () => null
  })
}

/** Renders whatever markdown body the story or test injected, if any. */
export const Content = defineComponent({
  name: 'Content',
  setup(_, { attrs }) {
    return () =>
      h('div', {
        ...attrs,
        innerHTML: (harnessState.value.site.contentProps?.html as string) ?? ''
      })
  }
})
