import { watchEffect } from 'vue'
import { setup } from '@storybook/vue3-vite'
import type { Preview } from '@storybook/vue3-vite'
import {
  Content,
  isDark,
  useData
} from '../../../shared/vitepress-harness/module.js'
import {
  resetHarnessContext,
  setHarnessContext,
  type HarnessOptions
} from '../../../shared/vitepress-harness/context.js'
import '../../theme/src/theme/styles/index.css'
import './storybook.css'

setup((app) => {
  // VitePress registers `Content` globally; VPDoc renders it. Guarded because
  // HMR re-runs this against an app that already has it, which Vue warns about.
  if (!app.component('Content')) app.component('Content', Content)
})

declare module '@storybook/vue3-vite' {
  interface Parameters {
    /** VitePress site/page/theme data the story should be rendered with. */
    vitepress?: HarnessOptions
    /** Width of the wrapper, so overflow behaviour is visible at a fixed size. */
    frameWidth?: string
  }
}

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i } },
    a11y: { test: 'todo' },
    docs: { codePanel: true },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Overflow',
          'Doc',
          'Home',
          'Navigation',
          'Content',
          'Team',
          'Catalog'
        ]
      }
    }
  },
  globalTypes: {
    theme: {
      description: 'Carbon colour scheme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' }
        ],
        dynamicTitle: true
      }
    }
  },
  initialGlobals: { theme: 'dark' },
  decorators: [
    (story, context) => {
      resetHarnessContext()
      setHarnessContext(context.parameters.vitepress ?? {})

      return {
        components: { story },
        setup() {
          const { site } = useData()

          watchEffect(() => {
            // `isDark` mirrors itself onto the `dark` class, which is what the
            // theme's tokens key off.
            isDark.value = context.globals.theme === 'dark'
            document.documentElement.dataset.storyTitle = site.value.title
          })

          return {
            frameStyle: context.parameters.frameWidth
              ? { maxWidth: context.parameters.frameWidth }
              : undefined
          }
        },
        template:
          '<div class="sb-carbon-frame" :style="frameStyle"><story /></div>'
      }
    }
  ]
}

export default preview
