<script lang="ts" setup>
import type { CarbonTheme } from '../CarbonTheme.js'
import { useData } from '../composables/data'
import { isActive } from '../../shared'
import VPLink from './VPLink.vue'

defineProps<{
  item: CarbonTheme.NavItemWithLink
}>()

const { page } = useData()
</script>

<template>
  <div class="VPMenuLink">
    <VPLink
      :class="{ active: isActive(page.relativePath, item.activeMatch || item.link, !!item.activeMatch) }"
      :href="item.link"
      :target="item.target"
      :rel="item.rel"
    >
      {{ item.text }}
    </VPLink>
  </div>
</template>

<style scoped>
.VPMenuLink {
  margin-top: 3px;
}

.VPMenuGroup + .VPMenuLink {
  margin: 12px -12px 0;
  border-top: 1px solid var(--vp-c-border);
  padding: 12px 12px 0;
}

.link {
  display: block;
  border-radius: 6px;
  padding: 6px 8px;
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  white-space: nowrap;
}

.link:hover {
  background-color: var(--color-action-list-item-default-hover-bg);
}

.link:active {
  background-color: var(--color-action-list-item-default-active-bg);
}

.link.active {
  background-color: var(--color-action-list-item-default-selected-bg);
}
</style>
