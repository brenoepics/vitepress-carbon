import { defineConfigWithTheme } from 'vitepress'
import path from 'path'
import baseConfig from '../../src/theme/config/baseConfig'
import type { Config as ThemeConfig } from '../../src/theme/config'

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,

  lang: 'en-US',
  title: 'VitePress Carbon',
  description: 'Carbon embraces GitHub\'s monochromatic ethos, offering a theme for VitePress documentation that is sleek, modern, and effortlessly stylish.',
  srcDir: 'src',
  base: '/vitepress-carbon/',
  themeConfig: {

    logo: {
      src: 'https://imgur.com/76Ls3no.png'
    },

    search: {
      provider: 'local'
    },

    outline: [2, 3],
    editLink: {
      pattern: 'https://github.com/brenoepics/vitepress-carbon/edit/main/demo/src/:path',
      text: 'Edit this page on GitHub'
    },

    lastUpdated: {
      formatOptions: { dateStyle: 'short', timeStyle: 'short' }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/brenoepics/vitepress-carbon' }
    ],

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Introduction', link: `/introduction` },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: `Introduction`,
        items: [
          { text: 'Introduction', link: `/introduction` }
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
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
