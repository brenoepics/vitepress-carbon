import { VPCarbon } from 'vitepress-carbon'

// uncomment to test CSS variables override
// import './override.css'
import { h } from 'vue'
import CreateRepoComponent from './components/CreateRepoComponent.vue'

export default {
  ...VPCarbon,
  Layout: () => {
    return h(VPCarbon.Layout!, null, {
      'nav-bar-content-menu-after': () => h(CreateRepoComponent)
    })
  }
}
