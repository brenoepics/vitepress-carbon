declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<
    Record<string, never>,
    Record<string, never>,
    unknown
  >

  export default component
}

declare module 'vitepress-carbon' {
  export { VPCarbon } from '../../theme/src/theme/index.js'
  export type { ThemeConfig } from '../../theme/src/theme/config/baseConfig.js'
}

declare module 'vitepress-carbon/dist/theme/CarbonTheme.js' {
  export { CarbonTheme } from '../../theme/src/theme/CarbonTheme.js'
}

declare module 'vitepress-carbon/dist/theme/config/baseConfig.js' {
  export {
    baseConfig as default,
    baseConfig,
    type ThemeConfig
  } from '../../theme/src/theme/config/baseConfig.js'
}
