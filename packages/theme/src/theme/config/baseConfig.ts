/**
 * This file is intended to be required from VitePress
 * consuming project's config file.
 *
 * It runs in Node.js.
 */

// for local-linked development
const deps = ['@vue/theme', '@vueuse/core', 'body-scroll-lock']

import { type UserConfig } from 'vitepress'
import { type ThemeConfig } from '../config'

const config: UserConfig<ThemeConfig> = {
  scrollOffset: ['header', '.VPLocalNav'],
  appearance: {
    initialValue: 'dark'
  },
  vite: {
    ssr: {
      noExternal: deps
    },
    optimizeDeps: {
      exclude: deps
    }
  },

  head: [
  ],

  markdown: {
    headers: {
      level: [2, 3]
    },
    config(md) {

    }
  },

  transformHead({ assets }) {
    const font = assets.find((file) =>
      /Mona-Sans\.\w+\.woff2/.test(file)
    )
    if (font) {
      return [
        [
          'link',
          {
            rel: 'preload',
            href: font,
            as: 'font',
            type: 'font/woff2',
            crossorigin: ''
          }
        ]
      ]
    }
  },

  shouldPreload(link) {
    // make algolia chunk prefetch instead of preload
    return !link.includes('Algolia')
  }
}

export default config
