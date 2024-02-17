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
const marker = ref()

useActiveAnchor(container, marker)
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
        <div class="outline-marker" ref="marker" />
      <div class="content">
        <nav aria-labelledby="doc-outline-aria-label">
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

.VPAsideContent.has-outline {
  display: block;
}

.outline-marker {
  position: absolute;
  top: 32px;
  z-index: 0;
  opacity: 0;
  left: -1px;
  width: 0.25rem;
  height: 1.5rem;
  background-color: var(--vp-c-brand-1);
  border-radius: 6px;
  transition: top 0.25s cubic-bezier(0, 1, 0.5, 1),
  background-color 0.5s,
  opacity 0.25s;
}

.content {
  margin-left: 7px;
}

.outline-title {
  line-height: 32px;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1)
}
</style>
