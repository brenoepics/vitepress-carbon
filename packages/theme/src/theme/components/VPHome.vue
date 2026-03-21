<script setup lang="ts">
import VPHomeHero from './VPHomeHero.vue'
import VPHomeFeatures from './VPHomeFeatures.vue'
</script>

<template>
  <div class="VPHome">
    <slot name="home-hero-before" />
    <VPHomeHero>
      <template #home-hero-info-before
        ><slot name="home-hero-info-before"
      /></template>
      <template #home-hero-info><slot name="home-hero-info" /></template>
      <template #home-hero-info-after
        ><slot name="home-hero-info-after"
      /></template>
      <template #home-hero-actions-after
        ><slot name="home-hero-actions-after"
      /></template>
      <template #home-hero-image><slot name="home-hero-image" /></template>
    </VPHomeHero>
    <slot name="home-hero-after" />

    <slot name="home-features-before" />
    <VPHomeFeatures />
    <slot name="home-features-after" />

    <Content />
  </div>
</template>

<style scoped>
.VPHome {
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  min-height: 100%;
  padding-bottom: 96px;
  font-family: var(--vp-font-family-base);
  background-color: var(--vp-c-bg);
}

.VPHome :deep(.VPHomeSponsors) {
  margin-top: 112px;
  margin-bottom: -128px;
}

@media (min-width: 768px) {
  .VPHome {
    padding-bottom: 128px;
  }
}
</style>
