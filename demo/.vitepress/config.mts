import { defineConfigWithTheme } from 'vitepress'
import path from 'path'
// @ts-ignore
import baseConfig from 'vitepress-carbon/config'
// @ts-ignore
import type { ThemeConfig } from 'vitepress-carbon/config'
import { DefaultTheme } from 'vitepress/theme'

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

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,

  lang: 'en-US',
  title: 'VitePress Carbon',
  description: 'Carbon embraces GitHub\'s monochromatic ethos, offering a theme for VitePress documentation that is sleek, modern, and effortlessly stylish.',
  srcDir: 'src',
  base: '/vitepress-carbon/',
  themeConfig: {
    nav,
    sidebar,
    outline: [2, 3],

    logo: {
      src: 'https://imgur.com/76Ls3no.png'
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
