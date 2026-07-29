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
  /* Transparent border keeps the box metrics stable between rest and hover. */
  border: 1px solid transparent;
  border-radius: var(--vp-nav-control-radius);
  padding-inline: 10px;
  line-height: 1.4285714286;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-nav-text);
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;
  height: var(--vp-nav-control-height);
}

.VPNavBarMenuLink:hover,
.VPNavBarMenuLink.active {
  background-color: var(--vp-c-nav-hover-bg);
  border-color: var(--vp-c-nav-hover-border);
  color: var(--vp-c-nav-text-hover);
}

.VPNavBarMenuLink:active {
  background-color: var(--vp-c-nav-active-bg);
}

.VPNavBarMenuLink:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 1px;
}

@media (prefers-reduced-motion: reduce) {
  .VPNavBarMenuLink {
    transition: none;
  }
}
</style>
