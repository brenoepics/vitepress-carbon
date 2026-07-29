<script lang="ts" setup>
/* oxlint-disable @typescript-eslint/no-explicit-any */
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
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  border-radius: var(--vp-nav-control-radius);
  padding-inline: 10px;
  line-height: 1.4285714286;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-nav-text);
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;
  height: var(--vp-nav-control-height);
}

.VPFlyout:hover,
.VPFlyout.active,
.VPFlyout:has(.button[aria-expanded='true']) {
  background-color: var(--vp-c-nav-hover-bg);
  border-color: var(--vp-c-nav-hover-border);
  color: var(--vp-c-nav-text-hover);
}

.VPFlyout:active {
  background-color: var(--vp-c-nav-active-bg);
}

/* `open` is owned by the component (mouseenter/mouseleave/click) and surfaced
   as aria-expanded; :focus-within adds the keyboard path. The closed state is
   the .menu base rule below. */
.button[aria-expanded='true'] + .menu,
.VPFlyout:focus-within .menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.button {
  display: flex;
  align-items: center;
  color: inherit;
  height: 100%;
}

.text {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: inherit;
  transition: color 0.15s ease;
}

.option-icon {
  margin-right: 0;
  width: 16px;
  height: 16px;
  fill: currentColor;
}

.text-icon {
  margin-left: 4px;
  width: 14px;
  height: 14px;
  fill: currentColor;
  transition: transform 0.2s ease;
}

/* Caret points up while the flyout is open. */
.VPFlyout:has(.button[aria-expanded='true']) .text-icon,
.VPFlyout:hover .text-icon {
  transform: rotate(180deg);
}

.icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
  transition: fill 0.15s ease;
}

@media (prefers-reduced-motion: reduce) {
  .VPFlyout,
  .text-icon {
    transition: none;
  }

  .VPFlyout:has(.button[aria-expanded='true']) .text-icon,
  .VPFlyout:hover .text-icon {
    transform: none;
  }
}

.menu {
  position: absolute;
  top: calc(var(--vp-nav-height) / 2 + 5px);
  right: 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px);
  transition:
    opacity 0.15s ease,
    visibility 0.15s ease,
    transform 0.15s ease;
}
</style>
