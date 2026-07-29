/**
 * Every `.vue` file under the theme's `components/` directory, discovered at
 * build time so a newly added component shows up in Storybook without anyone
 * remembering to register it.
 *
 * Components that need props to render get them from `catalogProps` below;
 * anything not listed is rendered bare, which is fine for the many components
 * that read their data from the VitePress context.
 */
import { defineComponent, h, onErrorCaptured, ref, type Component } from 'vue'
import {
  features,
  navItems,
  outlineHeaders,
  sidebar,
  socialLinks,
  teamMembers
} from './fixtures.js'

const modules = import.meta.glob<{ default: Component }>(
  '../../theme/src/theme/components/**/*.vue',
  { eager: true }
)

export interface CatalogEntry {
  name: string
  /** `components` or `components/icons`. */
  group: string
  component: Component
  props: Record<string, unknown>
}

/** Props for the components that cannot render without them. */
const catalogProps: Record<string, Record<string, unknown>> = {
  VPAlgoliaSearchBox: {
    algolia: {
      appId: 'storybook',
      apiKey: 'storybook',
      indexName: 'storybook',
      locales: {}
    }
  },
  VPBackdrop: { show: true },
  VPBadge: { type: 'tip', text: 'badge' },
  VPButton: { text: 'Get Started', href: '/guide/introduction' },
  VPCarbonAds: {
    carbonAds: { code: 'storybook-placeholder', placement: 'storybook' }
  },
  VPDocOutlineItem: { headers: outlineHeaders, root: true },
  VPFeature: {
    icon: features[0].icon,
    title: features[0].title,
    details: features[0].details,
    link: '/guide/introduction',
    linkText: 'Read the guide'
  },
  VPFeaturePattern: { mouseX: 40, mouseY: 40 },
  VPFeatures: { features },
  VPFlyout: { button: 'Guide', label: 'Guide menu', items: navItems[0].items },
  VPHero: {
    name: 'VitePress Carbon',
    text: 'GitHub monochromatic ethos, for your docs',
    tagline: 'Sleek, modern, and effortlessly stylish.',
    actions: [
      { theme: 'brand', text: 'Get Started', link: '/guide/introduction' }
    ]
  },
  VPImage: {
    image: { src: 'https://www.github.com/brenoepics.png', alt: 'Avatar' }
  },
  VPLink: { href: '/guide/introduction' },
  VPLocalNav: { open: false },
  VPLocalNavOutlineDropdown: { headers: outlineHeaders, navHeight: 64 },
  VPMenu: { items: navItems[0].items },
  VPMenuGroup: { text: 'Guide', items: navItems[0].items },
  VPMenuLink: { item: navItems[0].items?.[0] },
  VPNavBar: { isScreenOpen: false },
  VPNavBarHamburger: { active: false },
  VPNavBarMenuGroup: { item: navItems[0] },
  VPNavBarMenuLink: { item: navItems[1] },
  VPNavScreen: { open: true },
  VPNavScreenMenuGroup: { text: 'Guide', items: navItems[0].items },
  VPNavScreenMenuGroupLink: { item: navItems[0].items?.[0] },
  VPNavScreenMenuGroupSection: { text: 'Guide', items: navItems[0].items },
  VPNavScreenMenuLink: { item: navItems[1] },
  // Left closed here: an open sidebar steals focus on mount and scrolls the
  // catalog away from the top. Its own story opens it.
  VPSidebar: { open: false },
  VPSidebarItem: { item: sidebar[0], depth: 0 },
  VPSocialLink: { icon: 'github', link: 'https://github.com' },
  VPSocialLinks: { links: socialLinks },
  VPSponsors: {
    tier: 'Platinum',
    size: 'big',
    data: [
      {
        name: 'Carbon',
        url: 'https://github.com/brenoepics/vitepress-carbon',
        img: 'https://www.github.com/brenoepics.png'
      }
    ]
  },
  VPSponsorsGrid: {
    size: 'medium',
    data: [
      {
        name: 'Carbon',
        url: 'https://github.com/brenoepics/vitepress-carbon',
        img: 'https://www.github.com/brenoepics.png'
      }
    ]
  },
  VPTeamMembers: { size: 'medium', members: teamMembers },
  VPTeamMembersItem: { size: 'medium', member: teamMembers[0] }
}

function toEntry(path: string, module: { default: Component }): CatalogEntry {
  const name = path
    .split('/')
    .pop()!
    .replace(/\.vue$/, '')
  const group = path.includes('/icons/') ? 'components/icons' : 'components'

  return {
    name,
    group,
    component: module.default,
    props: catalogProps[name] ?? {}
  }
}

export const catalog: CatalogEntry[] = Object.entries(modules)
  .map(([path, module]) => toEntry(path, module))
  .sort((a, b) => a.name.localeCompare(b.name))

export const componentEntries = catalog.filter(
  (entry) => entry.group === 'components'
)

export const iconEntries = catalog.filter(
  (entry) => entry.group === 'components/icons'
)

/**
 * Components that teleport to `<body>`. CSS containment cannot hold them, so
 * in the combined grid they would cover every other card. They get their own
 * stories instead.
 */
const teleporting = new Set(['VPLocalSearchBox'])

/**
 * Renders one catalog entry, replacing it with the error text if it throws.
 * Without this a single component that needs unavailable context would blank
 * the whole catalog page.
 */
export const CatalogItem = defineComponent({
  name: 'CatalogItem',
  props: {
    entry: { type: Object as () => CatalogEntry, required: true }
  },
  setup(props) {
    const error = ref<string | null>(null)

    onErrorCaptured((caught) => {
      error.value = caught instanceof Error ? caught.message : String(caught)
      return false
    })

    return () => {
      let body

      if (error.value) {
        body = h(
          'div',
          { class: 'sb-carbon-error' },
          `${props.entry.name} needs context Storybook does not provide:\n${error.value}`
        )
      } else if (teleporting.has(props.entry.name)) {
        body = h(
          'p',
          { class: 'sb-carbon-note' },
          'Renders a full-screen modal into <body>. See its own story under Navigation.'
        )
      } else {
        body = h(props.entry.component, props.entry.props)
      }

      return h('section', { class: 'sb-carbon-case' }, [
        h('h3', props.entry.name),
        body
      ])
    }
  }
})
