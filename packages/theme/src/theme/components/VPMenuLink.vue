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
      :class="{
        active: isActive(
          page.relativePath,
          item.activeMatch || item.link,
          !!item.activeMatch
        )
      }"
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
  position: relative;
  display: block;
  border-radius: 6px;
  padding: 6px 8px 6px 12px;
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

/* Accent rail grows in from the left edge on hover. */
.link::before {
  content: '';
  position: absolute;
  left: 4px;
  top: 50%;
  width: 2px;
  height: 0;
  border-radius: 999px;
  background-color: var(--vp-c-brand-1);
  transform: translateY(-50%);
  transition: height 0.15s ease;
}

.link:hover {
  background-color: var(--color-action-list-item-default-hover-bg);
  color: var(--vp-c-text-1);
}

.link:hover::before,
.link.active::before {
  height: 16px;
}

.link:active {
  background-color: var(--color-action-list-item-default-active-bg);
}

.link.active {
  background-color: var(--color-action-list-item-default-selected-bg);
  color: var(--vp-c-text-1);
  font-weight: 600;
}

@media (prefers-reduced-motion: reduce) {
  .link,
  .link::before {
    transition: none;
  }
}
</style>
