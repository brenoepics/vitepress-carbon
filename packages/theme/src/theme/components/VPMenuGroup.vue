<script lang="ts" setup>
import VPMenuLink from './VPMenuLink.vue'
import type { CarbonTheme } from '../CarbonTheme.js'

defineProps<{
  text?: string
  items: CarbonTheme.NavItemWithLink[]
}>()
</script>

<template>
  <div class="VPMenuGroup">
    <p v-if="text" class="title">{{ text }}</p>

    <template v-for="item in items">
      <VPMenuLink v-if="'link' in item" :item="item" v-bind:key="item.link" />
    </template>
  </div>
</template>

<style scoped>
.VPMenuGroup {
  margin: 12px -12px 0;
  border-top: 1px solid var(--vp-c-border);
  padding: 12px 12px 0;
}

.VPMenuGroup:first-child {
  margin-top: 0;
  border-top: 0;
  padding-top: 0;
}

.VPMenuGroup + .VPMenuGroup {
  margin-top: 12px;
  border-top: 1px solid var(--vp-c-divider);
}

.title {
  padding: 0 12px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  transition: color 0.25s;
}
</style>
