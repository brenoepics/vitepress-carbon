/**
 * A minimal, mutable stand-in for the VitePress client runtime.
 *
 * The theme's components read everything through `useData()` / `useRoute()`,
 * which VitePress only provides while a real site is running. Both the unit
 * tests and Storybook alias the `vitepress` module to `./module.ts`, which
 * serves its data from the store defined here.
 */
import { ref, type Ref } from 'vue'

export interface HarnessSite {
  base: string
  lang: string
  title: string
  description: string
  head: unknown[]
  appearance: boolean
  themeConfig: Record<string, unknown>
  locales: Record<string, unknown>
  scrollOffset: number
  cleanUrls: boolean
  contentProps?: Record<string, unknown>
}

export interface HarnessPage {
  title: string
  titleTemplate?: string | boolean
  description: string
  frontmatter: Record<string, unknown>
  headers: unknown[]
  relativePath: string
  filePath: string
  lastUpdated?: number
}

export interface HarnessRoute {
  path: string
  data: HarnessPage
  component: unknown
}

export interface HarnessState {
  site: HarnessSite
  theme: Record<string, unknown>
  page: HarnessPage
  frontmatter: Record<string, unknown>
  params: Record<string, unknown> | null
  route: HarnessRoute
}

export function createPage(overrides: Partial<HarnessPage> = {}): HarnessPage {
  return {
    title: 'Introduction',
    description: '',
    frontmatter: {},
    headers: [],
    relativePath: 'guide/introduction.md',
    filePath: 'guide/introduction.md',
    lastUpdated: 1_700_000_000_000,
    ...overrides
  }
}

export function createSite(overrides: Partial<HarnessSite> = {}): HarnessSite {
  return {
    base: '/',
    lang: 'en-US',
    title: 'VitePress Carbon',
    description: 'Carbon theme for VitePress',
    head: [],
    appearance: true,
    themeConfig: {},
    locales: {},
    scrollOffset: 90,
    cleanUrls: false,
    ...overrides
  }
}

function createState(): HarnessState {
  const page = createPage()

  return {
    site: createSite(),
    theme: {},
    page,
    frontmatter: page.frontmatter,
    params: null,
    route: {
      path: `/${page.relativePath.replace(/\.md$/, '.html')}`,
      data: page,
      component: null
    }
  }
}

/** The single reactive store backing the aliased `vitepress` module. */
export const harnessState: Ref<HarnessState> = ref(createState())

export interface HarnessOptions {
  site?: Partial<HarnessSite>
  theme?: Record<string, unknown>
  page?: Partial<HarnessPage>
  frontmatter?: Record<string, unknown>
  route?: Partial<HarnessRoute>
}

/**
 * Replaces the harness store. `frontmatter` defaults to the page's own
 * frontmatter so callers only have to set it in one place, and `route.data`
 * defaults to the page so `useRoute().data.title` stays in sync.
 */
export function setHarnessContext(options: HarnessOptions = {}): HarnessState {
  const page = createPage(options.page)
  const frontmatter = options.frontmatter ?? page.frontmatter

  harnessState.value = {
    site: createSite(options.site),
    theme: options.theme ?? {},
    page,
    frontmatter,
    params: null,
    route: {
      path: `/${page.relativePath.replace(/\.md$/, '.html')}`,
      data: page,
      component: null,
      ...options.route
    }
  }

  return harnessState.value
}

export function resetHarnessContext(): void {
  harnessState.value = createState()
}
