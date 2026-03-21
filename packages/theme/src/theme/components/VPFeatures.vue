<script setup lang="ts">
import type { CarbonTheme } from '../CarbonTheme.js'
import { computed } from 'vue'
import VPFeature from './VPFeature.vue'

export interface Feature {
  icon?: CarbonTheme.FeatureIcon
  title: string
  details: string
  link?: string
  linkText?: string
  rel?: string
  target?: string
}

const props = defineProps<{
  features: Feature[]
}>()

const grid = computed(() => {
  const length = props.features.length

  if (!length) {
    return ''
  } else if (length === 2) {
    return 'grid-2'
  } else if (length === 3) {
    return 'grid-3'
  } else if (length % 3 === 0) {
    return 'grid-6'
  } else if (length > 3) {
    return 'grid-4'
  }

  return ''
})
</script>

<template>
  <div v-if="features" class="VPFeatures">
    <div class="container">
      <div class="items" :class="grid">
        <div v-for="feature in features" :key="feature.title" class="item">
          <VPFeature
            :icon="feature.icon"
            :title="feature.title"
            :details="feature.details"
            :link="feature.link"
            :link-text="feature.linkText"
            :rel="feature.rel"
            :target="feature.target"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.VPFeatures {
  position: relative;
  padding: 0 24px;
}

@media (min-width: 640px) {
  .VPFeatures {
    padding: 0 32px;
  }
}

@media (min-width: 1024px) {
  .VPFeatures {
    padding: 0 64px;
  }
}

.container {
  margin: 0 auto;
  max-width: 1152px;
}

.items {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.item {
  min-width: 0;
}

@media (min-width: 768px) {
  .items.grid-2,
  .items.grid-3,
  .items.grid-4,
  .items.grid-6 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .items.grid-3 .item:last-child {
    grid-column: 1 / -1;
  }
}

@media (min-width: 1024px) {
  .items.grid-3,
  .items.grid-6 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .items.grid-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
