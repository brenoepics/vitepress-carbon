<script lang="ts" setup>
import type { CarbonTheme } from '../CarbonTheme.js'
import { inject } from 'vue'
import VPLink from './VPLink.vue'

defineProps<{
  item: CarbonTheme.NavItemWithLink
}>()

const closeScreen = inject('close-screen') as () => void
</script>

<template>
  <VPLink
    class="VPNavScreenMenuLink"
    :href="item.link"
    :target="item.target"
    :rel="item.rel"
    @click="closeScreen"
  >
    {{ item.text }}
  </VPLink>
</template>

<style scoped>
.VPNavScreenMenuLink {
  display: block;
  border-bottom: 1px solid var(--vp-c-divider);
  padding: 12px 0 11px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  transition: border-color 0.25s, color 0.25s;
}

.VPNavScreenMenuLink:hover {
  color: var(--vp-c-brand-1);
}
</style>
