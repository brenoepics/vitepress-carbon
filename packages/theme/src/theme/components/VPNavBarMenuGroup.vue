<script lang="ts" setup>
import type { CarbonTheme } from '../CarbonTheme.js'
import { computed } from 'vue'
import { useData } from '../composables/data'
import { isActive } from '../../shared'
import VPFlyout from './VPFlyout.vue'

const props = defineProps<{
  item: CarbonTheme.NavItemWithChildren
}>()

const { page } = useData()

const isChildActive = (navItem: CarbonTheme.NavItem) => {
  if ('component' in navItem) return false

  if ('link' in navItem) {
    return isActive(
      page.value.relativePath,
      navItem.link,
      !!props.item.activeMatch
    )
  }

  return navItem.items.some(isChildActive)
}

const childrenActive = computed(() => isChildActive(props.item))
</script>

<template>
  <VPFlyout
    :class="{
      VPNavBarMenuGroup: true,
      active:
        isActive(page.relativePath, item.activeMatch, !!item.activeMatch) ||
        childrenActive
    }"
    :button="item.text"
    :items="item.items"
  />
</template>
