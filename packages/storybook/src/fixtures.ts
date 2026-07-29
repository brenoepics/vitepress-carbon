/**
 * Sample data shared by the stories. The oversized strings come from the same
 * module the overflow tests use, so a story and its test always show the same
 * text.
 */
export {
  CJK_TITLE,
  EMOJI_TITLE,
  LONG_PARAGRAPH,
  LONG_SENTENCE_TITLE,
  LONG_TEXTS,
  RTL_TITLE,
  UNBREAKABLE_TITLE,
  URL_TITLE
} from '../../../shared/vitepress-harness/long-text.js'

export const navItems = [
  {
    text: 'Guide',
    activeMatch: '^/guide/',
    items: [
      { text: 'Introduction', link: '/guide/introduction' },
      { text: 'Getting Started', link: '/guide/getting-started' },
      { text: 'Configuration', link: '/guide/configuration' }
    ]
  },
  { text: 'Examples', link: '/examples/markdown-examples' },
  { text: 'VitePress', link: 'https://vitepress.dev' }
]

export const sidebar = [
  {
    text: 'Guide',
    items: [
      { text: 'Introduction', link: '/guide/introduction' },
      { text: 'Getting Started', link: '/guide/getting-started' },
      { text: 'Configuration', link: '/guide/configuration' }
    ]
  },
  {
    text: 'Theme',
    collapsed: false,
    items: [
      { text: 'Extending', link: '/guide/extending-theme' },
      { text: 'LLM Markdown Actions', link: '/guide/llm-markdown-actions' }
    ]
  }
]

export const socialLinks = [
  { icon: 'github', link: 'https://github.com/brenoepics/vitepress-carbon' },
  { icon: 'x', link: 'https://x.com' },
  { icon: 'discord', link: 'https://discord.com' }
]

export const outlineHeaders = [
  {
    level: 2,
    title: 'Installation',
    link: '#installation',
    children: [
      { level: 3, title: 'With pnpm', link: '#with-pnpm', children: [] },
      { level: 3, title: 'With npm', link: '#with-npm', children: [] }
    ]
  },
  { level: 2, title: 'Configuration', link: '#configuration', children: [] },
  { level: 2, title: 'Deploying', link: '#deploying', children: [] }
]

export const teamMembers = [
  {
    avatar: 'https://www.github.com/brenoepics.png',
    name: 'Breno A.',
    title: 'Creator',
    org: 'vitepress-carbon',
    orgLink: 'https://github.com/brenoepics/vitepress-carbon',
    desc: 'Maintainer of the Carbon theme for VitePress.',
    links: [{ icon: 'github', link: 'https://github.com/brenoepics' }]
  },
  {
    avatar: 'https://www.github.com/vuejs.png',
    name: 'Vue.js',
    title: 'Framework',
    org: 'vuejs',
    orgLink: 'https://vuejs.org',
    desc: 'The progressive JavaScript framework Carbon is built on.'
  }
]

export const features = [
  {
    title: 'Streamlined Theme',
    details:
      'A near-monochrome palette that keeps the focus on your documentation.',
    icon: '🎨'
  },
  {
    title: 'Responsive Design',
    details: 'Looks right from a phone to an ultrawide display.',
    icon: '📱'
  },
  {
    title: 'Drop-in',
    details: 'Extends the VitePress default theme, so your config still works.',
    icon: '⚡'
  }
]

/** A theme config rich enough for the doc-chrome components. */
export const themeConfig = {
  nav: navItems,
  sidebar,
  socialLinks,
  outline: { level: [2, 3] as [number, number], label: 'On this page' },
  editLink: {
    pattern:
      'https://github.com/brenoepics/vitepress-carbon/edit/main/packages/demo/src/:path',
    text: 'Edit this page on GitHub'
  },
  docFooter: { prev: 'Previous page', next: 'Next page' },
  lastUpdated: { text: 'Last updated' }
}
