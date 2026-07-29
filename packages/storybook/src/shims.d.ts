/// <reference types="vite-plus/client" />

// Stories import the theme's SFCs straight from source rather than through the
// built package, so they need the same `*.vue` shim the theme itself uses.
declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent
  export default component
}
