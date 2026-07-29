import { VPCarbon } from 'vitepress-carbon'

// uncomment to test CSS variables override
// import './override.css'
import { h, type App } from 'vue'
import CreateRepoComponent from './components/CreateRepoComponent.vue'
import ContributorWall from './components/ContributorWall.vue'
import ScrollReveal from './components/ScrollReveal.vue'

export default {
  ...VPCarbon,
  Layout: () => {
    return h(VPCarbon.Layout!, null, {
      'nav-bar-content-menu-after': () => h(CreateRepoComponent)
    })
  },
  enhanceApp({ app }: { app: App }) {
    app.component('ContributorWall', ContributorWall)
    app.component('ScrollReveal', ScrollReveal)
  }
}
