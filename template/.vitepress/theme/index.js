// https://vitepress.dev/guide/custom-theme
<% if (!defaultTheme) { %>import Layout from './Layout.vue'<% if (useTs) { %>
import type { ThemeConfig } from 'vitepress-carbon/config'<% } %>
import './style.css'

<% if (!useTs) { %>/** @type {import('vitepress-carbon').ThemeConfig} */
<% } %>export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    // ...
  }
}<% if (useTs) { %> satisfies ThemeConfig<% } %>
<% } else { %>import { h } from 'vue'<% if (useTs) { %>
import type { ThemeConfig } from 'vitepress-carbon/config'<% } %>
import { VPCarbon } from 'vitepress-carbon'
import './style.css'

<% if (!useTs) { %>/** @type {import('vitepress-carbon').ThemeConfig} */
<% } %>export default {
  extends: VPCarbon,
  Layout: () => {
    return h(VPCarbon.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  }
}<% if (useTs) { %> satisfies ThemeConfig<% } %><% } %>
