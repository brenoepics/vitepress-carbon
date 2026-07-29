<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    /**
     * `fade` thins the grid out towards one edge; `frame` keeps the perimeter
     * and hollows out the centre so content can sit inside it; `none` leaves
     * the grid whole.
     */
    mask?: 'fade' | 'frame' | 'none'
    /** Edge the grid fades away from. Only meaningful when mask is `fade`. */
    side?: 'left' | 'right'
    columns?: number
    /**
     * GitHub's graph is seven rows — one per weekday. Pass more when the grid
     * is decorative and needs to fill a taller band.
     */
    rows?: number
    /**
     * Size the grid to its own box instead of using `columns`/`rows`, so it
     * covers the container in whole cells at any viewport. `columns`/`rows`
     * still seed the server-rendered markup, before a measurement exists.
     */
    fit?: boolean
  }>(),
  { mask: 'fade', side: 'left', columns: 16, rows: 7, fit: false }
)

/** Track geometry, mirrored by the grid rules in the style block below. */
const CELL = 11
const GAP = 3
const PITCH = CELL + GAP

/**
 * How many whole cells fit across `size`. `n` cells span `n * CELL + (n - 1) *
 * GAP`, so this is the largest `n` whose span still fits — the remainder is
 * always under one pitch and gets split by the centring in the style block.
 * Flooring is the whole point: a grid sized to *cover* its box would be clipped
 * mid-cell, which is what left sliced tiles along every footer edge.
 */
function fitCount(size: number) {
  return Math.max(1, Math.floor((size + GAP) / PITCH))
}

const root = ref<HTMLElement>()
const measured = ref<{ columns: number; rows: number } | null>(null)

let observer: ResizeObserver | undefined

onMounted(() => {
  // `onMounted` never runs during SSR, and the observer is only reached when a
  // caller opts into `fit`; the capability check covers test environments that
  // render with `fit` but stub out layout.
  if (!props.fit || !root.value || typeof ResizeObserver === 'undefined') return

  observer = new ResizeObserver((entries) => {
    const box = entries[0]?.contentRect
    if (!box) return

    measured.value = {
      columns: fitCount(box.width),
      rows: fitCount(box.height)
    }
  })

  observer.observe(root.value)
})

onBeforeUnmount(() => observer?.disconnect())

const columns = computed(() => measured.value?.columns ?? props.columns)
const rows = computed(() => measured.value?.rows ?? props.rows)

/**
 * Deterministic value in [0, 1) for a cell. Math.random() would produce a
 * different grid on the server than on the client and break hydration, so
 * this hashes the coordinates instead.
 */
function noise(col: number, row: number, seed: number) {
  const n = Math.sin(col * 12.9898 + row * 78.233 + seed * 37.719) * 43758.5453
  return n - Math.floor(n)
}

/**
 * Weighted towards the quieter levels, the way a real contribution graph is —
 * mostly empty with occasional bright days.
 */
function level(value: number) {
  if (value < 0.42) return 0
  if (value < 0.66) return 1
  if (value < 0.83) return 2
  if (value < 0.94) return 3
  return 4
}

const cells = computed(() => {
  const seed = props.side === 'left' ? 1 : 2
  const out: { key: string; level: number }[] = []

  for (let col = 0; col < columns.value; col++) {
    for (let row = 0; row < rows.value; row++) {
      out.push({ key: `${col}-${row}`, level: level(noise(col, row, seed)) })
    }
  }

  return out
})
</script>

<template>
  <div
    ref="root"
    class="VPContributionTiles"
    :class="[`mask-${mask}`, side, { fit }]"
    :style="{ '--columns': columns, '--rows': rows }"
    aria-hidden="true"
  >
    <span
      v-for="cell in cells"
      :key="cell.key"
      class="tile"
      :data-level="cell.level"
    />
  </div>
</template>

<style scoped>
.VPContributionTiles {
  display: grid;
  grid-template-columns: repeat(var(--columns), 11px);
  grid-template-rows: repeat(var(--rows), 11px);
  grid-auto-flow: column;
  gap: 3px;
  pointer-events: none;
  user-select: none;
}

/* Centres the tracks in the box so the sub-pitch remainder is split between
   the two edges rather than pooling at one of them. */
.VPContributionTiles.fit {
  justify-content: center;
  align-content: center;
}

.VPContributionTiles.mask-fade.left {
  -webkit-mask-image: linear-gradient(to right, #000 0%, transparent 88%);
  mask-image: linear-gradient(to right, #000 0%, transparent 88%);
}

.VPContributionTiles.mask-fade.right {
  -webkit-mask-image: linear-gradient(to left, #000 0%, transparent 88%);
  mask-image: linear-gradient(to left, #000 0%, transparent 88%);
}

/* One ellipse punched out of the middle. The grid stays continuous around
   every edge — top, bottom and both sides — so it reads as a closed frame
   rather than two blocks with the centre sliced out. */
.VPContributionTiles.mask-frame {
  --vp-tiles-ring: radial-gradient(
    ellipse var(--vp-tiles-hollow-w, 40%) var(--vp-tiles-hollow-h, 62%) at 50%
      50%,
    transparent 0%,
    transparent 52%,
    rgba(0, 0, 0, 0.55) 78%,
    #000 100%
  );

  -webkit-mask-image: var(--vp-tiles-ring);
  mask-image: var(--vp-tiles-ring);
}

.tile {
  border-radius: 2px;
  background-color: var(--vp-c-tile-0);
}

.tile[data-level='1'] {
  background-color: var(--vp-c-tile-1);
}

.tile[data-level='2'] {
  background-color: var(--vp-c-tile-2);
}

.tile[data-level='3'] {
  background-color: var(--vp-c-tile-3);
}

.tile[data-level='4'] {
  background-color: var(--vp-c-tile-4);
}
</style>
