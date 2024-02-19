import './styles/index.css'
import { Theme } from 'vitepress'
import Layout from './Layout.vue'
export { useSidebar } from './composables/sidebar'
export { useLocalNav } from './composables/local-nav'

const VPCarbon: Theme = {
  Layout: Layout
}

export { VPCarbon }

export type { ThemeConfig } from './config'
