<script setup lang="ts">
import type { CarbonTheme } from '../CarbonTheme.js'
import VPImage from './VPImage.vue'
import VPLink from './VPLink.vue'
import { ref } from 'vue'
import VPFeaturePattern from './VPFeaturePattern.vue'

defineProps<{
  icon?: CarbonTheme.FeatureIcon
  title: string
  details?: string
  link?: string
  linkText?: string
  rel?: string
  target?: string
}>()

// Cursor position within the card, driving the radial spotlight mask in
// VPFeaturePattern. Parked off-card until the pointer actually enters.
const mouseX = ref(-9999)
const mouseY = ref(-9999)

function onMouseMove(event: MouseEvent) {
  const { left, top } = (
    event.currentTarget as HTMLDivElement
  ).getBoundingClientRect()
  mouseX.value = event.clientX - left
  mouseY.value = event.clientY - top
}

function onMouseLeave() {
  mouseX.value = -9999
  mouseY.value = -9999
}
</script>

<template>
  <div class="VPFeature" @mousemove="onMouseMove" @mouseleave="onMouseLeave">
    <VPFeaturePattern :mouse-x="mouseX" :mouse-y="mouseY" class="VPFeaturePN" />
    <VPLink
      :href="link"
      :rel="rel"
      :target="target"
      :no-icon="true"
      :tag="link && !linkText ? 'a' : 'div'"
      class="vp-link"
    >
      <div class="header-box">
        <div v-if="typeof icon === 'object' && icon.wrap" class="icon">
          <VPImage
            :image="icon"
            :alt="icon.alt"
            :height="icon.height || 40"
            :width="icon.width || 40"
          />
        </div>
        <VPImage
          v-else-if="typeof icon === 'object'"
          :image="icon"
          :alt="icon.alt"
          :height="icon.height || 40"
          :width="icon.width || 40"
        />
        <div v-else-if="icon" class="icon" v-html="icon"></div>
        <h2 class="title" v-html="title"></h2>
      </div>
      <article class="box">
        <p v-if="details" class="details" v-html="details"></p>
      </article>
      <VPLink
        v-if="linkText"
        :href="link"
        :rel="rel"
        :target="target"
        :no-icon="true"
        :tag="link ? 'a' : 'div'"
        class="link-text"
      >
        {{ linkText }}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="link-arrow"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            fill="currentColor"
            d="M7.28033 3.21967C6.98744 2.92678 6.51256 2.92678 6.21967 3.21967C5.92678 3.51256 5.92678 3.98744 6.21967 4.28033L7.28033 3.21967ZM11 8L11.5303 8.53033C11.8232 8.23744 11.8232 7.76256 11.5303 7.46967L11 8ZM6.21967 11.7197C5.92678 12.0126 5.92678 12.4874 6.21967 12.7803C6.51256 13.0732 6.98744 13.0732 7.28033 12.7803L6.21967 11.7197ZM6.21967 4.28033L10.4697 8.53033L11.5303 7.46967L7.28033 3.21967L6.21967 4.28033ZM10.4697 7.46967L6.21967 11.7197L7.28033 12.7803L11.5303 8.53033L10.4697 7.46967Z"
          ></path>
          <path
            class="link-arrow-icon"
            stroke="currentColor"
            d="M1.75 8H11"
            stroke-width="1.5"
            stroke-linecap="round"
          ></path>
        </svg>
      </VPLink>
    </VPLink>
  </div>
</template>

<style scoped>
.VPFeature {
  position: relative;
  display: block;
  overflow: hidden;
  border: 1px solid var(--vp-home-card-border-color);
  border-radius: 12px;
  height: 100%;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.015), transparent 38%),
    var(--vp-home-card-bg);
  padding: 20px;
  box-shadow: inset 0 1px 0 rgba(240, 246, 252, 0.03);
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.vp-link {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 12px;
}

.header-box {
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
}

.box {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
}

.box > :deep(.VPImage) {
  margin-bottom: 20px;
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
  border: 1px solid rgba(240, 246, 252, 0.08);
  background-color: var(--vp-home-card-icon-bg);
  border-radius: 8px;
  width: 32px;
  height: 32px;
  color: var(--vp-home-card-icon-color);
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.icon :deep(svg) {
  width: 16px;
  height: 16px;
}

.VPFeature:hover .icon {
  border-color: var(--vp-home-card-border-hover-color);
  transform: scale(1.06);
}

.vp-link:not(.icon) .box {
  padding-left: 0;
}

.title {
  line-height: 1.35;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  transition: color 0.2s ease;
}

.VPFeature:hover .title {
  color: var(--vp-c-brand-1);
}

.details {
  font-weight: 400;
  font-size: 14px;
  line-height: 1.55;
  flex-grow: 1;
  color: var(--vp-home-card-text-color);
}

.link-text {
  display: flex;
  align-self: flex-start;
  align-items: center;
  gap: 6px;
  padding: 0 0.1em 0.1em;
  background: linear-gradient(currentColor 0 0) bottom left/ 0 0.1em no-repeat;
  transition: background-size 0.5s;
  color: var(--vp-c-text-1);
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
}

.link-text:hover {
  text-decoration: underline;
  background: linear-gradient(currentColor 0 0) bottom left/ 100% 0.1em
    no-repeat;
}

.link-arrow {
  transition: transform 0.2s;
  transform: translateX(0);
}

.link-text:hover .link-arrow {
  transform: translateX(4px);
}
.link-text:active .link-arrow {
  transform: translateX(6px);
}
.link-arrow-icon {
  stroke-dasharray: 10;
  stroke-dashoffset: 10;
  transition: stroke-dashoffset 0.2s;
}

.link-text:hover .link-arrow .link-arrow-icon {
  stroke-dashoffset: 20;
}

.VPFeature:hover .VPFeaturePN {
  opacity: 1;
}

.VPFeature:hover {
  border-color: var(--vp-home-card-border-hover-color);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(1, 4, 9, 0.24);
}

.VPFeature:has(.vp-link:focus-visible) {
  border-color: var(--vp-home-card-border-hover-color);
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

@media (max-width: 767px) {
  .VPFeature {
    padding: 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .VPFeature,
  .icon,
  .link-arrow {
    transition: none;
  }

  .VPFeature:hover {
    transform: none;
  }

  .VPFeature:hover .icon {
    transform: none;
  }
}
</style>
