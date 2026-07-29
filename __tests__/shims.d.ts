/// <reference types="vite-plus/client" />

// The component suites mount the theme's SFCs straight from source rather than
// through the built package, so they need the same `*.vue` shim the theme uses.
declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent
  export default component
}
