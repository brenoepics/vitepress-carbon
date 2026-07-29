/**
 * Mount helpers shared by the component suites.
 *
 * The `vitepress` module is aliased to `shared/vitepress-harness/module.ts`
 * (see the `resolve.alias` entry in `vite.config.ts`), so components can be
 * mounted with whatever page/theme data a test needs.
 */
import path from 'node:path'
import { mount, type VueWrapper } from '@vue/test-utils'
import type { Component } from 'vue'
import { Content } from '../../shared/vitepress-harness/module.js'
import {
  resetHarnessContext,
  setHarnessContext,
  type HarnessOptions
} from '../../shared/vitepress-harness/context.js'

// `import.meta.url` is not a file URL under the DOM environments, and Vitest
// runs with the workspace root as its cwd.
export const workspaceRoot = process.cwd()

export const themeComponentsDir = path.join(
  workspaceRoot,
  'packages/theme/src/theme/components'
)

export function componentPath(name: string): string {
  return path.join(themeComponentsDir, `${name}.vue`)
}

export interface MountWithContextOptions {
  context?: HarnessOptions
  props?: Record<string, unknown>
  slots?: Record<string, unknown>
  provide?: Record<string, unknown>
  global?: Record<string, unknown>
}

export function mountWithContext(
  component: Component,
  options: MountWithContextOptions = {}
): VueWrapper {
  setHarnessContext(options.context)

  return mount(component, {
    props: options.props,
    slots: options.slots as never,
    global: {
      // `Content` is registered globally by VitePress at runtime; the harness
      // supplies a stand-in so `<Content />` inside VPDoc resolves.
      components: { Content },
      stubs: { teleport: true },
      provide: options.provide,
      ...options.global
    },
    attachTo: document.body
  })
}

export { resetHarnessContext, setHarnessContext }
