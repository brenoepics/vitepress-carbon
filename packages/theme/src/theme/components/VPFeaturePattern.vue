<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  mouseX: number
  mouseY: number
}>()

const patterns: Array<{
  y: number
  squares: Array<[x: number, y: number]>
}> = [{
  y: 16,
  squares: [
    [0, 1],
    [1, 3],
  ],
}, {
  y: -6,
  squares: [
    [-1, 2],
    [1, 3],
  ],
}, {
  y: 32,
  squares: [
    [0, 2],
    [1, 4],
  ],
}, {
  y: 22,
  squares: [[0, 1]],
}]

const pattern = computed(() => patterns[Math.floor(Math.random() * patterns.length)])

const style = computed<{ maskImage: string, WebKitMaskImage: string}>(
  () => {
    const maskImage = `radial-gradient(180px at ${props.mouseX}px ${props.mouseY}px, white, transparent)`
    return { maskImage, WebKitMaskImage: maskImage }
  }
)
</script>

<template>
  <div class="pointer-events-none" :data-y="pattern.y">
    <div
      class="pattern-gradient"
      :style="style"></div>
    <div
      class="pattern-gradient-1"
      :style="style"
    >
    </div>
  </div>
</template>
<style scoped>
.pointer-events-none {
  pointer-events: none;
  opacity: 0;
}

.pattern-gradient-1, .pattern-gradient {
  position: absolute;
  inset: 0;
  background-color: var(--mktg-accent-primary);
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  filter: blur(100px);
  mix-blend-mode: soft-light;
  will-change: transform;
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  transition-duration: 1.2s;
}

.pattern-gradient-1 {
  border-radius: 0.75rem;
  transition-duration: 1.6s;
}

</style>
