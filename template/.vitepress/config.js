import { defineConfig } from 'vitepress'
import { VPCarbon } from 'vitepress-carbon'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  extends: VPCarbon,
  title: <%= title %>,
  description: <%= description %><% if (defaultTheme) { %>,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
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

    socialLinks: [
      { icon: 'github', link: 'https://github.com/brenoepics/vitepress-carbon' }
    ]
  }<% } %>
})
