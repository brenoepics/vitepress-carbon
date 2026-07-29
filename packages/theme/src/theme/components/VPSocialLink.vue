<script lang="ts" setup>
import type { CarbonTheme } from '../CarbonTheme.js'
import { computed } from 'vue'
import { icons } from '../support/socialIcons'

const props = defineProps<{
  icon: CarbonTheme.SocialLinkIcon
  link: string
  ariaLabel?: string
}>()

const svg = computed(() => {
  if (typeof props.icon === 'object') return props.icon.svg
  return icons[props.icon]
})
</script>

<template>
  <a
    class="VPSocialLink no-icon"
    :href="link"
    :aria-label="ariaLabel ?? (typeof icon === 'string' ? icon : '')"
    target="_blank"
    rel="noopener"
    v-html="svg"
  >
  </a>
</template>

<style scoped>
.VPSocialLink {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
  width: var(--vp-nav-control-height);
  height: var(--vp-nav-control-height);
  border: 1px solid transparent;
  border-radius: var(--vp-nav-control-radius);
  color: var(--vp-c-nav-text);
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;
}

.VPSocialLink:hover {
  background-color: var(--vp-c-nav-hover-bg);
  border-color: var(--vp-c-nav-hover-border);
  color: var(--vp-c-nav-text-hover);
}

.VPSocialLink:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 1px;
}

.VPSocialLink > :deep(svg) {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

@media (prefers-reduced-motion: reduce) {
  .VPSocialLink {
    transition: none;
  }
}
</style>
