<script setup lang="ts">
import { nextTick, onMounted, onUnmounted } from 'vue'

const props = withDefaults(
  defineProps<{
    /** Elements matching this selector get `.is-visible` once they scroll in. */
    selector?: string
  }>(),
  { selector: '.home-reveal' }
)

let observer: IntersectionObserver | undefined

onMounted(async () => {
  // Wait a tick so sibling sections are in the DOM before we query for them.
  await nextTick()

  const targets = document.querySelectorAll(props.selector)
  if (!targets.length) return

  // Honour the OS setting: show everything at once, no motion.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    targets.forEach((el) => el.classList.add('is-visible'))
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-visible')
        // Reveal once — re-animating on every scroll-by is noise.
        observer?.unobserve(entry.target)
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  )

  targets.forEach((el) => observer!.observe(el))
})

onUnmounted(() => observer?.disconnect())
</script>

<template><span hidden /></template>
