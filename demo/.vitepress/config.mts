import { defineConfigWithTheme } from 'vitepress'
import path from 'path'
import baseConfig from '../../src/theme/config/baseConfig'
import type { ThemeConfig } from '../../src'
import { DefaultTheme } from 'vitepress/theme'

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,

  lang: 'en-US',
  title: 'VitePress Carbon',
  description: 'Carbon embraces GitHub\'s monochromatic ethos, offering a theme for VitePress documentation that is sleek, modern, and effortlessly stylish.',
  srcDir: 'src',
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  sitemap: {
    hostname: 'carbon.breno.tech',
    transformItems(items) {
      return items.filter((item) => !item.url.includes('migration'))
    }
  },
  themeConfig: {
    nav,
    sidebar,
    outline: [2, 3],

    logo: {
      src: './logo.svg'
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/brenoepics/vitepress-carbon/edit/main/demo/src/:path',
      text: 'Edit this page on GitHub'
    },

    lastUpdated: {
      formatOptions: { dateStyle: 'short', timeStyle: 'short' }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/brenoepics/vitepress-carbon' }
    ]
  },

  head: [
    ['link', { rel: 'icon', href: 'https://brenoepics.github.io/vitepress-carbon/logo.svg' }],
    ['meta', { name: 'description', content: 'Carbon embraces GitHub\'s monochromatic ethos, offering a theme for VitePress documentation that is sleek, modern, and effortlessly stylish.' }],
    ['meta', { property: 'og:url', content: 'https://brenoepics.github.io/vitepress-carbon/' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'VitePress Carbon' }],
    ['meta', { property: 'og:description', content: 'Carbon embraces GitHub\'s monochromatic ethos, offering a theme for VitePress documentation that is sleek, modern, and effortlessly stylish.' }],
    ['meta', { property: 'og:image', content: 'https://brenoepics.github.io/vitepress-carbon/site-card.jpg' }],
    ['meta', { property:'theme-color', name: 'theme-color', content: '#41ad4f' }],
    ['meta', { property:'twitter:card', name: 'twitter:card', content: 'summary_large_image' }],
  ],

  vite: {
    build: {
      minify: false
    },
    resolve: {
      alias: {
        'vitepress-carbon': path.join(__dirname, '../../src')
      }
    }
  }
})

const guideGroupItems = [
  { text: 'Introduction', link: '/guide/introduction' },
  { text: 'Getting Started', link: '/guide/getting-started' },
  { text: 'Configuration', link: '/guide/configuration' }
]

const themeGroupItems = [
  { text: 'Extending', link: '/guide/extending-theme' }
]

const componentGroupItems = [
  { text: 'Home', link: '/guide/home-component' }
]

const examplesItems = [
  { text: 'Markdown Examples', link: '/examples/markdown-examples' },
  { text: 'Runtime API Examples', link: '/examples/api-examples' }
]

const nav: DefaultTheme.NavItem[] = [
  {
    text: 'Guide',
    activeMatch: `^/guide/`,
    items: [
      { text: 'Guide', items: guideGroupItems },
      { text: 'Theme', items: themeGroupItems },
      { text: 'Components', items: componentGroupItems }
    ]
  },
  {
    text: 'Examples',
    activeMatch: `^/examples/`,
    items: examplesItems
  },  {
    text: 'VitePress',
    link: `https://vitepress.dev`
  }
]

const sidebar = [
  { text: 'Guide', items: guideGroupItems },
  { text: 'Theme', items: themeGroupItems },
  { text: 'Components', items: componentGroupItems },
  { text: 'Examples', items: examplesItems }
]

