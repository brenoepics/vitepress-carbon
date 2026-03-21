<script setup lang="ts">
import type { MenuItem } from '../composables/outline'
import { reactive } from 'vue'

defineProps<{
  headers: MenuItem[]
  root?: boolean
}>()

const closedLinks = reactive(new Map([['', '']]))

function onClick({ target: el }: Event) {
  const id = (el as HTMLAnchorElement).href?.split('#')[1]
  const heading = document.getElementById(decodeURIComponent(id))
  heading?.focus({ preventScroll: true })
}

function handleClose(link: string, title: string) {
  if (closedLinks.get(link) && closedLinks.get(link) === title) {
    closedLinks.delete(link)
    return
  }

  closedLinks.set(link, title)
}
</script>

<template>
  <ul class="VPDocOutlineItem" :class="root ? 'root' : 'nested'">
    <li v-for="{ children, link, title } in headers" v-bind:key="link">
      <a :href="link" @click="onClick" class="vp-outline-li">
        <div class="vp-outline-item">
          <div class="outline-link">{{ title }}</div>
          <svg
            v-if="root && children?.length! > 0"
            @click="handleClose(link, title)"
            aria-hidden="true"
            focusable="false"
            role="img"
            :class="['folder-icon', closedLinks.has(link) ? 'reversed' : '']"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            fill="currentColor"
          >
            <path
              d="M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z"
            ></path>
          </svg>
        </div>
      </a>
      <template v-if="children?.length">
        <VPDocOutlineItem :headers="children" v-show="!closedLinks.has(link)" />
      </template>
    </li>
  </ul>
</template>

<style scoped>
.root {
  position: relative;
  z-index: 1;
  max-height: 36vh;
  overflow: auto;
  border-left: 1px solid var(--vp-c-border);
  padding-left: 12px;
}

@media (min-height: 900px) {
  .root {
    max-height: 50vh;
  }
}

/* scrollbar */
.root::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

.root::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-border-radius: 10px;
  border-radius: 10px;
}

.root::-webkit-scrollbar-thumb {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}

.root::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(255, 255, 255, 0.3);
}

.vp-outline-item {
  grid-area: content;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  min-height: 2rem;
  border-radius: 6px;
  height: 100%;
  padding: 6px 10px;
  gap: 8px;
}

.nested .vp-outline-item {
  padding: 6px 10px 6px 18px;
}

.outline-link {
  display: block;
  line-height: 20px;
  font-size: 13px;
  font-weight: 400;
  color: var(--vp-c-text-2);
  flex: 1 1 auto;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.folder-icon {
  color: var(--vp-color-fg-muted);
}
.folder-icon.reversed {
  transform: rotate(180deg);
}

.vp-outline-item:hover {
  background-color: var(--color-action-list-item-default-hover-bg);
}

.vp-outline-item:active {
  background-color: var(--color-action-list-item-default-active-bg);
}

.vp-outline-li.active .vp-outline-item {
  background-color: rgba(177, 186, 196, 0.08);
}

li {
  position: relative;
}

.vp-outline-li.active .vp-outline-item::after {
  content: '';
  position: absolute;
  left: -13px;
  width: 2px;
  height: 20px;
  background-color: var(--vp-c-brand-1);
  border-radius: 999px;
}

.vp-outline-li.active .outline-link {
  color: var(--vp-c-brand-1);
}

.vp-outline-item.nested {
  padding-left: 13px;
}
</style>
