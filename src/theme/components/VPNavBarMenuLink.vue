<script lang="ts" setup>
import type { DefaultTheme } from 'vitepress/theme'
import { useData } from '../composables/data'
import { isActive } from '../../shared'
import VPLink from './VPLink.vue'

defineProps<{
  item: DefaultTheme.NavItemWithLink
}>()

const { page } = useData()
</script>

<template>
  <VPLink
    :class="{
      VPNavBarMenuLink: true,
      active: isActive(
        page.relativePath,
        item.activeMatch || item.link,
        !!item.activeMatch
      )
    }"
    :href="item.link"
    :target="item.target"
    :rel="item.rel"
    tabindex="0"
  >
    <span v-html="item.text"></span>
  </VPLink>
</template>

<style scoped>

.VPNavBarMenuLink {
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 6px;
  padding-inline: 8px;
  padding-block: 6px;
  line-height: 1.4285714286;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  transition: opacity 0.25s;
}

.VPNavBarMenuLink:hover, .active {
  background-color: var(--color-action-list-item-default-hover-bg);
  border-color: var(--color-action-list-item-default-hover-border);
}

.VPNavBarMenuLink:active {
  background-color: var(--color-action-list-item-default-active-bg);
  border-color: var(--color-action-list-item-default-active-border);
}
</style>
