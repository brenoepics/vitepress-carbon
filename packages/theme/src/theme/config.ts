/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PageData } from 'vitepress'
import type { ComputedRef, Ref, ShallowRef } from 'vue'
import type { MenuItem } from './composables/outline.js'
import type { CarbonTheme } from './CarbonTheme.js'

export interface ThemeConfig {
  /**
   * The logo file of the site.
   *
   * @example '/logo.svg'
   */
  logo?: ThemeableImage

  /**
   * Overrides the link of the site logo.
   */
  logoLink?: string | { link?: string; rel?: string; target?: string }

  /**
   * Custom site title in navbar. If the value is undefined,
   * `config.title` will be used.
   */
  siteTitle?: string | false

  /**
   * Custom header levels of outline in the aside component.
   *
   * @default 2
   */
  outline?: Outline | Outline['level'] | false

  /**
   * @deprecated Use `outline.label` instead.
   *
   * @default 'On this page'
   */
  outlineTitle?: string

  /**
   * The nav items.
   */
  nav?: CarbonTheme.NavItem[]

  /**
   * The sidebar items.
   */
  sidebar?: Sidebar

  /**
   * Set to `false` to prevent rendering of aside container.
   * Set to `true` to render the aside to the right.
   * Set to `left` to render the aside to the left.
   *
   * @default true
   */
  aside?: boolean | 'left'

  /**
   * Info for the edit link. If it's undefined, the edit link feature will
   * be disabled.
   */
  editLink?: EditLink

  lastUpdated?: LastUpdatedOptions

  /**
   * Set custom prev/next labels.
   */
  docFooter?: DocFooter

  /**
   * The social links to be displayed at the end of the nav bar. Perfect for
   * placing links to social services such as GitHub, Twitter, Facebook, etc.
   */
  socialLinks?: SocialLink[]

  /**
   * The footer configuration.
   */
  footer?: Footer

  /**
   * @default 'Appearance'
   */
  darkModeSwitchLabel?: string

  /**
   * @default 'Switch to light theme'
   */
  lightModeSwitchTitle?: string

  /**
   * @default 'Switch to dark theme'
   */
  darkModeSwitchTitle?: string

  /**
   * @default 'Menu'
   */
  sidebarMenuLabel?: string

  /**
   * @default 'Return to top'
   */
  returnToTopLabel?: string

  /**
   * Set custom `aria-label` for language menu button.
   *
   * @default 'Change language'
   */
  langMenuLabel?: string

  search?:
    | { provider: 'local'; options?: CarbonTheme.LocalSearchOptions }
    | { provider: 'algolia'; options: CarbonTheme.AlgoliaSearchOptions }

  /**
   * The carbon ads options. Leave it undefined to disable the ads feature.
   */
  carbonAds?: CarbonAdsOptions

  /**
   * Changing locale when current url is `/foo` will redirect to `/locale/foo`.
   *
   * @default true
   */
  i18nRouting?: boolean

  /**
   * Show external link icon in Markdown links.
   *
   * @default false
   */
  externalLinkIcon?: boolean

  /**
   * Customize text of 404 page.
   */
  notFound?: NotFoundOptions
}

export interface NavItemWithLink {
  text: string
  link: string
  items?: never

  /**
   * `activeMatch` is expected to be a regex string. We can't use actual
   * RegExp object here because it isn't serializable
   */
  activeMatch?: string
  rel?: string
  target?: string
}

export interface NavItemChildren {
  text?: string
  items: NavItemWithLink[]
}

export interface NavItemWithChildren {
  text?: string
  items: (NavItemChildren | NavItemWithLink)[]

  /**
   * `activeMatch` is expected to be a regex string. We can't use actual
   * RegExp object here because it isn't serializable
   */
  activeMatch?: string
}

// image ---------------------------------------------------------------------

export type ThemeableImage =
  | string
  | { src: string; alt?: string; [prop: string]: any }
  | { light: string; dark: string; alt?: string; [prop: string]: any }

export type FeatureIcon =
  | string
  | {
      src: string
      alt?: string
      width?: string
      height?: string
      wrap?: boolean
    }
  | {
      light: string
      dark: string
      alt?: string
      width?: string
      height?: string
      wrap?: boolean
    }

// sidebar -------------------------------------------------------------------

export type Sidebar = SidebarItem[] | SidebarMulti

export interface SidebarMulti {
  [path: string]: SidebarItem[] | { items: SidebarItem[]; base: string }
}

export type SidebarItem = {
  /**
   * The text label of the item.
   */
  text?: string

  /**
   * The link of the item.
   */
  link?: string

  /**
   * The children of the item.
   */
  items?: SidebarItem[]

  /**
   * If not specified, group is not collapsible.
   *
   * If `true`, group is collapsible and collapsed by default
   *
   * If `false`, group is collapsible but expanded by default
   */
  collapsed?: boolean

  /**
   * Base path for the children items.
   */
  base?: string

  /**
   * Customize text that appears on the footer of previous/next page.
   */
  docFooterText?: string

  rel?: string
  target?: string
}

/**
 * ReturnType of `useSidebar`
 */
export interface DocSidebar {
  isOpen: Ref<boolean>
  sidebar: ComputedRef<SidebarItem[]>
  sidebarGroups: ComputedRef<SidebarItem[]>
  hasSidebar: ComputedRef<boolean>
  hasAside: ComputedRef<boolean>
  leftAside: ComputedRef<boolean>
  isSidebarEnabled: ComputedRef<boolean>
  open: () => void
  close: () => void
  toggle: () => void
}

// edit link -----------------------------------------------------------------

export interface EditLink {
  /**
   * Pattern for edit link.
   *
   * @example 'https://github.com/vuejs/vitepress/edit/main/docs/:path'
   * @example ({ filePath }) => { ... }
   */
  pattern: string | ((payload: PageData) => string)

  /**
   * Custom text for edit link.
   *
   * @default 'Edit this page'
   */
  text?: string
}

// prev-next -----------------------------------------------------------------

export interface DocFooter {
  /**
   * Custom label for previous page button. Can be set to `false` to disable.
   *
   * @default 'Previous page'
   */
  prev?: string | boolean

  /**
   * Custom label for next page button. Can be set to `false` to disable.
   *
   * @default 'Next page'
   */
  next?: string | boolean
}

// social link ---------------------------------------------------------------

export interface SocialLink {
  icon: SocialLinkIcon
  link: string
  ariaLabel?: string
}

export type SocialLinkIcon =
  | 'discord'
  | 'facebook'
  | 'github'
  | 'instagram'
  | 'linkedin'
  | 'mastodon'
  | 'npm'
  | 'slack'
  | 'twitter'
  | 'x'
  | 'youtube'
  | { svg: string }

// footer --------------------------------------------------------------------

export interface Footer {
  message?: string
  copyright?: string
}

// team ----------------------------------------------------------------------

export interface TeamMember {
  avatar: string
  name: string
  title?: string
  org?: string
  orgLink?: string
  desc?: string
  links?: SocialLink[]
  sponsor?: string
  actionText?: string
}

// local nav -----------------------------------------------------------------

/**
 * ReturnType of `useLocalNav`.
 */
export interface DocLocalNav {
  /**
   * The outline headers of the current page.
   */
  headers: ShallowRef<MenuItem[]>

  /**
   * Whether the current page has a local nav. Local nav is shown when the
   * "outline" is present in the page. However, note that the actual
   * local nav visibility depends on the screen width as well.
   */
  hasLocalNav: ComputedRef<boolean>
}

// outline -------------------------------------------------------------------

export interface Outline {
  level?: number | [number, number] | 'deep'
  label?: string
}

// carbon ads ----------------------------------------------------------------

export interface CarbonAdsOptions {
  code: string
  placement: string
}

// last updated --------------------------------------------------------------

export interface LastUpdatedOptions {
  /**
   * Set custom last updated text.
   *
   * @default 'Last updated'
   */
  text?: string

  /**
   * Set options for last updated time formatting.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_options
   *
   * @default
   * { dateStyle: 'short', timeStyle: 'short' }
   */
  formatOptions?: Intl.DateTimeFormatOptions & { forceLocale?: boolean }
}

// not found -----------------------------------------------------------------

export interface NotFoundOptions {
  /**
   * Set custom not found message.
   *
   * @default 'PAGE NOT FOUND'
   */
  title?: string

  /**
   * Set custom not found description.
   *
   * @default "But if you don't change your direction, and if you keep looking, you may end up where you are heading."
   */
  quote?: string

  /**
   * Set aria label for home link.
   *
   * @default 'go home'
   */
  linkLabel?: string

  /**
   * Set custom home link text.
   *
   * @default 'Take me home'
   */
  linkText?: string

  /**
   * @default '404'
   */
  code?: string
}