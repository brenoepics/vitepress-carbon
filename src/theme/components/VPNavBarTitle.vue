<script setup lang="ts">
import { computed } from 'vue'
import { useData } from '../composables/data'
import { useLangs } from '../composables/langs'
import { useSidebar } from '../composables/sidebar'
import { normalizeLink } from '../support/utils'
import VPImage from './VPImage.vue'

const { site, theme } = useData()
const { hasSidebar } = useSidebar()
const { currentLang } = useLangs()

const link = computed(() =>
  typeof theme.value.logoLink === 'string'
    ? theme.value.logoLink
    : theme.value.logoLink?.link
)

const rel = computed(() =>
  typeof theme.value.logoLink === 'string'
    ? undefined
    : theme.value.logoLink?.rel
)

const target = computed(() =>
  typeof theme.value.logoLink === 'string'
    ? undefined
    : theme.value.logoLink?.target
)
</script>

<template>
  <div class="VPNavBarTitle" :class="{ 'has-sidebar': hasSidebar }">
    <a
      class="title"
      :href="link ?? normalizeLink(currentLang.link)"
      :rel="rel"
      :target="target"
    >
      <slot name="nav-bar-title-before" />
      <VPImage v-if="theme.logo" class="logo" :image="theme.logo" />
      <template v-if="theme.siteTitle"><span class="nav-bar-title-text">{{ theme.siteTitle }}</span></template>
      <template v-else-if="theme.siteTitle === undefined"><span class="nav-bar-title-text">{{ site.title }}</span></template>
      <slot name="nav-bar-title-after" />
    </a>
  </div>
</template>

<style scoped>
.title {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--vp-nav-height);
  line-height: 1.4285714286;
  transition: opacity 0.25s;
}

.nav-bar-title-text {
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 6px;
  padding-inline: 8px;
  padding-block: 6px;
  line-height: 1.4285714286;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  transition: opacity 0.25s;
}

.nav-bar-title-text:hover {
  background-color: var(--color-action-list-item-default-hover-bg);
  border-color: var(--color-action-list-item-default-hover-border);
}

.nav-bar-title-text:active {
  background-color: var(--color-action-list-item-default-active-bg);
  border-color: var(--color-action-list-item-default-active-border);
}

@media (min-width: 960px) {
  .title {
    flex-shrink: 0;
  }

  .VPNavBarTitle.has-sidebar .title {
    border-bottom-color: var(--vp-c-divider);
  }
}

:deep(.logo) {
  margin-right: 8px;
  height: var(--vp-nav-logo-height);
}
</style>
