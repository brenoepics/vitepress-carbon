import './styles/index.css'
import { type Theme } from 'vitepress'
import Layout from './Layout.vue'

export { useSidebar } from './composables/sidebar.js'
export { useLocalNav } from './composables/local-nav.js'

const VPCarbon: Theme = {
  Layout: Layout
}

export { VPCarbon }

export type { ThemeConfig } from './config/baseConfig.js'
