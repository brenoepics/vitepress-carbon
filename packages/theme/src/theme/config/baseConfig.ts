/* eslint-disable @typescript-eslint/no-unused-vars */

import type { UserConfig } from 'vitepress'
import type { ThemeConfig } from '../config.js'

/**
 * This file is intended to be required from VitePress
 * consuming project's baseConfig file.
 *
 * It runs in Node.js.
 */

// for local-linked development
const deps = ['vitepress/theme', '@vueuse/core', 'body-scroll-lock']

export const baseConfig: UserConfig<ThemeConfig> = {
  scrollOffset: ['header', '.VPLocalNav'],
  appearance: {
    initialValue: 'dark'
  },
  vite: {
    ssr: {
      noExternal: [...deps, /\.css$/]
    },
    optimizeDeps: {
      exclude: deps
    }
  },

  head: [],

  markdown: {
    headers: {
      level: [2, 3]
    },
    config(md) {}
  },

  transformHead({ assets }) {
    const font = assets.find((file) => /Mona-Sans\.\w+\.woff2/.test(file))
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

export type { ThemeConfig }
export default baseConfig
