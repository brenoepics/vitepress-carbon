<script setup lang="ts">
import { onContentUpdated } from 'vitepress'
import { ref, shallowRef } from 'vue'
import { useData } from '../composables/data'
import {
  getHeaders,
  resolveTitle,
  useActiveAnchor,
  type MenuItem
} from '../composables/outline'
import VPDocOutlineItem from './VPDocOutlineItem.vue'

const { frontmatter, theme } = useData()

const headers = shallowRef<MenuItem[]>([])

onContentUpdated(() => {
  headers.value = getHeaders(frontmatter.value.outline ?? theme.value.outline)
})

const container = ref()

useActiveAnchor(container)
</script>

<template>
  <div
    class="VPAsideContent"
    :class="{ 'has-outline': headers.length > 0 }"
  >
    <div class="outline-title" role="heading" aria-level="2">{{ resolveTitle(theme) }}</div>
    <div
      class="VPDocAsideOutline"
      :class="{ 'has-outline': headers.length > 0 }"
      ref="container"
      role="navigation"
    >
      <div class="content">
        <nav
          aria-labelledby="doc-outline-aria-label"
          class="outline-nav"
        >
        <span class="visually-hidden" id="doc-outline-aria-label">
          Table of Contents for current page
        </span>
          <VPDocOutlineItem :headers="headers" :root="true" />
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped>
.VPAsideContent {
  display: none;
}

.VPDocAsideOutline {
  position: relative;
}

.outline-nav {
  position: relative;
}

.VPAsideContent.has-outline {
  display: block;
}

.outline-title {
  line-height: 32px;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1)
}
</style>
