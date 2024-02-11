import { defineConfigWithTheme } from 'vitepress'
import path from 'path'
import baseConfig from '../../src/theme/config/baseConfig'
import type { Config as ThemeConfig } from '../../src/theme/config'

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,

  vite: {
    build: {
      minify: false
    },
    resolve: {
      alias: {
        'vitepress-mono': path.join(__dirname, '../../src')
      }
    }
  },

  lang: 'en-US',
  title: 'VitePress Mono',
  description: 'Your VitePress Theme',
  srcDir: 'src',
  base: '/vitepress-mono/',

  themeConfig: {
    search: {
      provider: "local"
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/brenoepics/vitepress-mono' },
    ],

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],
  }
})
