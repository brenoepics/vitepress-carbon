import { onContentUpdated } from 'vitepress'
import type { CarbonTheme } from '../CarbonTheme.js'
import { computed, shallowRef } from 'vue'
import { getHeaders, type MenuItem } from './outline'
import { useData } from './data'

export function useLocalNav(): CarbonTheme.DocLocalNav {
  const { theme, frontmatter } = useData()

  const headers = shallowRef<MenuItem[]>([])

  const hasLocalNav = computed(() => {
    return headers.value.length > 0
  })

  onContentUpdated(() => {
    headers.value = getHeaders(frontmatter.value.outline ?? theme.value.outline)
  })

  return {
    headers,
    hasLocalNav
  }
}
