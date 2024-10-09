<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue'
import { useFlyout } from '../composables/flyout'
import VPIconChevronDown from './icons/VPIconChevronDown.vue'
import VPIconMoreHorizontal from './icons/VPIconMoreHorizontal.vue'
import VPMenu from './VPMenu.vue'

defineProps<{
  icon?: any
  button?: string
  label?: string
  items?: any[]
}>()

const open = ref(false)
const el = ref<HTMLElement>()

useFlyout({ el, onBlur })

function onBlur() {
  open.value = false
}
</script>

<template>
  <div
    class="VPFlyout"
    ref="el"
    @mouseenter="open = true"
    @mouseleave="open = false"
  >
    <button
      type="button"
      class="button"
      aria-haspopup="true"
      :aria-expanded="open"
      :aria-label="label"
      @click="open = !open"
    >
      <span v-if="button || icon" class="text">
        <component v-if="icon" :is="icon" class="option-icon" />
        <span v-if="button" v-html="button"></span>
        <VPIconChevronDown class="text-icon" />
      </span>

      <VPIconMoreHorizontal v-else class="icon" />
    </button>

    <div class="menu">
      <VPMenu :items="items">
        <slot />
      </VPMenu>
    </div>
  </div>
</template>

<style scoped>
.VPFlyout {
  position: relative;
  align-items: center;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  padding-inline: 8px;
  padding-block: 6px;
  line-height: 1.4285714286;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-dark);
  transition: opacity 0.25s;
  height: 100%;
}

.VPFlyout:hover, .active {
  background-color: var(--color-action-list-item-default-hover-bg);
}

.VPFlyout:active {
  background-color: var(--color-action-list-item-default-active-bg);
}

.VPFlyout:hover .menu,
.button[aria-expanded="true"] + .menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.button[aria-expanded="false"] + .menu {
  opacity: 0;
  visibility: hidden;
  transform: translateY(0);
}

.button {
  display: flex;
  align-items: center;
  color: var(--vp-c-text-dark);
  height: 100%;
}

.text {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-dark);
  transition: color 0.25s;
}

.option-icon {
  margin-right: 0;
  width: 16px;
  height: 16px;
  fill: var(--vp-c-text-dark)
}

.text-icon {
  margin-left: 4px;
  width: 14px;
  height: 14px;
  fill: var(--vp-c-text-dark)
}

.icon {
  width: 20px;
  height: 20px;
  fill: var(--vp-c-text-dark);
  transition: fill 0.25s;
}

.menu {
  position: absolute;
  top: calc(var(--vp-nav-height) / 2 + 20px);
  right: 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.25s, visibility 0.25s, transform 0.25s;
}
</style>
