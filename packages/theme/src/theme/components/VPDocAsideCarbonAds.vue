<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import type { CarbonTheme } from '../CarbonTheme.js'

defineProps<{
  carbonAds: CarbonTheme.CarbonAdsOptions
}>()
/* eslint-disable no-undef */
const VPCarbonAds = __CARBON__
  ? defineAsyncComponent(() => import('./VPCarbonAds.vue'))
  : () => null
</script>

<template>
  <div class="VPDocAsideCarbonAds">
    <VPCarbonAds :carbon-ads="carbonAds" />
  </div>
</template>
