<script setup lang="ts">
import { useData } from '../composables/data'
import VPDocAsideOutline from './VPDocAsideOutline.vue'
import VPDocAsideCarbonAds from './VPDocAsideCarbonAds.vue'

const { theme } = useData()
</script>

<template>
  <div class="VPDocAside">
    <slot name="aside-top" />

    <slot name="aside-outline-before" />
    <VPDocAsideOutline />
    <slot name="aside-outline-after" />
    <div class="VPDocAside-divider"></div>
    <slot name="aside-ads-before" />
    <VPDocAsideCarbonAds v-if="theme.carbonAds" :carbon-ads="theme.carbonAds" />
    <slot name="aside-ads-after" />

    <slot name="aside-bottom" />
  </div>
</template>

<style scoped>
.VPDocAside {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.VPDocAside-divider {
  width: 100%;
  height: 1px;
  background-color: var(--vp-c-border);
  margin-top: 15px;
  margin-bottom: 15px;
}

.spacer {
  flex-grow: 1;
}

.VPDocAside :deep(.spacer + .VPDocAsideSponsors),
.VPDocAside :deep(.spacer + .VPDocAsideCarbonAds) {
  margin-top: 24px;
}

.VPDocAside :deep(.VPDocAsideSponsors + .VPDocAsideCarbonAds) {
  margin-top: 16px;
}
</style>
