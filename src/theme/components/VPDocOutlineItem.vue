<script setup lang="ts">
import type { MenuItem } from '../composables/outline'

defineProps<{
  headers: MenuItem[]
  root?: boolean
}>()

function onClick({ target: el }: Event) {
  const id = (el as HTMLAnchorElement).href!.split('#')[1]
  const heading = document.getElementById(decodeURIComponent(id))
  heading?.focus({ preventScroll: true })
}
</script>

<template>
  <ul class="VPDocOutlineItem" :class="root ? 'root' : 'nested'">
    <li v-for="{ children, link, title } in headers">
    <a :href="link" @click="onClick" class="vp-outline-li">
      <div class="vp-outline-item">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="folder-icon">
          <path
            d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path>
        </svg>
        <div class="outline-link">{{ title }}</div>
      </div>
    </a>
      <template v-if="children?.length">
        <VPDocOutlineItem :headers="children" />
      </template>
    </li>
  </ul>
</template>

<style scoped>
.root {
  position: relative;
  z-index: 1;
}

.nested {
  padding-left: 8px;
}

.outline-link {
  display: block;
  line-height: 21px;
  font-size: 14px;
  font-weight: 400;
  color: var(--vp-c-text-1);
  flex: 1 1 auto;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: background-color 0.25s;
}

.vp-outline-item {
  grid-area: content;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  min-height: 2rem;
  border-radius: 6px;
  height: 100%;
  padding: 0 8px;
  gap: 8px;
  margin-top: 8px;
}

.folder-icon {
  color: var(--vp-color-fg-muted);
}

.vp-outline-item:hover {
  background-color: var(--color-action-list-item-default-hover-bg);
}

.vp-outline-item:active {
  background-color: var(--color-action-list-item-default-active-bg);
}

.vp-outline-li.active .vp-outline-item {
  background-color: var(--color-action-list-item-default-selected-bg);
}

.vp-outline-item.nested {
  padding-left: 13px;
}
</style>
