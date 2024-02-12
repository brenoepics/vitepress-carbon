import './styles/index.css'
import { Theme } from 'vitepress'
import Layout from './Layout.vue'
export { useSidebar } from './composables/sidebar'
export { useLocalNav } from './composables/local-nav'

const VPMono: Theme = {
  Layout: Layout
}

export { VPMono }

export type { Config } from './config'
