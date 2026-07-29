<script lang="ts" setup>
defineProps<{
  active: boolean
}>()

defineEmits<(e: 'click') => void>()
</script>

<template>
  <button
    type="button"
    class="VPNavBarHamburger"
    :class="{ active }"
    aria-label="mobile navigation"
    :aria-expanded="active"
    aria-controls="VPNavScreen"
    @click="$emit('click')"
  >
    <span class="container">
      <span class="top" />
      <span class="middle" />
      <span class="bottom" />
    </span>
  </button>
</template>

<style scoped>
.VPNavBarHamburger {
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
    border-color 0.15s ease;
}

.VPNavBarHamburger:hover {
  background-color: var(--vp-c-nav-hover-bg);
  border-color: var(--vp-c-nav-hover-border);
  color: var(--vp-c-nav-text-hover);
}

.VPNavBarHamburger:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 1px;
}

@media (min-width: 768px) {
  .VPNavBarHamburger {
    display: none;
  }
}

.container {
  position: relative;
  width: 16px;
  height: 14px;
  overflow: hidden;
}

.VPNavBarHamburger:hover .top {
  top: 0;
  left: 0;
  transform: translateX(4px);
}
.VPNavBarHamburger:hover .middle {
  top: 6px;
  left: 0;
  transform: translateX(0);
}
.VPNavBarHamburger:hover .bottom {
  top: 12px;
  left: 0;
  transform: translateX(8px);
}

.VPNavBarHamburger.active .top {
  top: 6px;
  transform: translateX(0) rotate(225deg);
}
.VPNavBarHamburger.active .middle {
  top: 6px;
  transform: translateX(16px);
}
.VPNavBarHamburger.active .bottom {
  top: 6px;
  transform: translateX(0) rotate(135deg);
}

.top,
.middle,
.bottom {
  position: absolute;
  width: 16px;
  height: 2px;
  /* Inherit the nav's foreground — --vp-c-text-1 is near-black in light mode
     and the nav bar is dark in both schemes. */
  background-color: currentColor;
  transition:
    top 0.25s,
    background-color 0.5s,
    transform 0.25s;
}

.top {
  top: 0;
  left: 0;
  transform: translateX(0);
}
.middle {
  top: 6px;
  left: 0;
  transform: translateX(8px);
}
.bottom {
  top: 12px;
  left: 0;
  transform: translateX(4px);
}
</style>
