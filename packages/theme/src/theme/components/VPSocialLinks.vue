<script lang="ts" setup>
import type { CarbonTheme } from '../CarbonTheme.js'
import VPSocialLink from './VPSocialLink.vue'

defineProps<{
  links: CarbonTheme.SocialLink[]
}>()
</script>

<template>
  <div class="VPSocialLinks">
    <VPSocialLink
      v-for="{ link, icon, ariaLabel } in links"
      :key="link"
      :icon="icon"
      :link="link"
      :ariaLabel="ariaLabel"
    />
  </div>
</template>

<style scoped>
.VPSocialLinks {
  display: flex;
  justify-content: center;
}
</style>
