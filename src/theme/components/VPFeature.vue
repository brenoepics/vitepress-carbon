<script setup lang="ts">
import type { DefaultTheme } from 'vitepress/theme'
import VPImage from './VPImage.vue'
import VPLink from './VPLink.vue'
import { ref } from 'vue'
import VPFeaturePattern from './VPFeaturePattern.vue'

defineProps<{
  icon?: DefaultTheme.FeatureIcon
  title: string
  details?: string
  link?: string
  linkText?: string
  rel?: string
  target?: string
}>()

const mouseX = ref(0)
const mouseY = ref(0)
const x = ref(0)
const y = ref(0)
const verticalX = ref(0)
const verticalY = ref(0)

function onMouseMove(event: MouseEvent) {
  const { clientX, clientY } = event
  const { left, top } = (event.currentTarget as HTMLDivElement).getBoundingClientRect()
  mouseX.value = clientX - left
  mouseY.value = clientY - top

  const middleX = window.innerWidth / 2
  const middleY = window.innerHeight / 2

  const offsetX = ((clientX - middleX) / middleX)
  const offsetY = ((clientY - middleY) / middleY)

  y.value = mouseX.value > mouseY.value ? -1 * offsetY : offsetY
  x.value = mouseY.value > mouseX.value ? -1 * offsetX : offsetX

  // Calculate vertical movement
  const verticalOffsetX = ((clientX - middleX) / middleX)
  const verticalOffsetY = ((clientY - middleY) / middleY)

  verticalY.value = mouseX.value > mouseY.value ? -1 * verticalOffsetX * 4 : verticalOffsetX * 4
  verticalX.value = mouseY.value > mouseX.value ? -1 * verticalOffsetY * 4 : verticalOffsetY * 4
}

function onMouseLeave() {
  y.value = 0
  x.value = 0
  verticalY.value = 0
  verticalX.value = 0
}

</script>

<template>
  <div
    class="VPFeature"
    @mousemove="onMouseMove"
    @mouseout="onMouseLeave"
    :style="{ transform: `perspective(700px) rotateX(${verticalX}deg) rotateY(${verticalY}deg)` }">
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
        class="link-text">
        {{ linkText }}
        <svg xmlns="http://www.w3.org/2000/svg" class="link-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path fill="currentColor" d="M7.28033 3.21967C6.98744 2.92678 6.51256 2.92678 6.21967 3.21967C5.92678 3.51256 5.92678 3.98744 6.21967 4.28033L7.28033 3.21967ZM11 8L11.5303 8.53033C11.8232 8.23744 11.8232 7.76256 11.5303 7.46967L11 8ZM6.21967 11.7197C5.92678 12.0126 5.92678 12.4874 6.21967 12.7803C6.51256 13.0732 6.98744 13.0732 7.28033 12.7803L6.21967 11.7197ZM6.21967 4.28033L10.4697 8.53033L11.5303 7.46967L7.28033 3.21967L6.21967 4.28033ZM10.4697 7.46967L6.21967 11.7197L7.28033 12.7803L11.5303 8.53033L10.4697 7.46967Z"></path>
          <path class="link-arrow-icon" stroke="currentColor" d="M1.75 8H11" stroke-width="1.5" stroke-linecap="round"></path></svg>
      </VPLink>
    </VPLink>
  </div>
</template>

<style scoped>
.VPFeature {
  position: relative;
  display: block;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  padding: 24px;
  transition: border-color 0.25s, background-color 0.25s, transform 50ms;
  font-weight: 600;
}

.vp-link {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.header-box {
  display: flex;
  flex-direction: row;
  gap: 6px;
  align-items: center;
  margin-bottom: 10px;
}

.box {
  display: flex;
  flex-direction: column;
  padding-left: 5px;
  padding-bottom: 10px;
  padding-top: 5px;
}

.box > :deep(.VPImage) {
  margin-bottom: 20px;
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--vp-c-border);
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 22px;
  transition: background-color 0.25s;
}

.vp-link:not(.icon) .box {
  padding-left: 0;
}

.title {
  line-height: 21px;
  font-size: 16px;
  font-weight: 600;
}

.details {
  flex-grow: 1;
  line-height: 15px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-3);
}

.link-text {
  display: flex;
  align-self: end;
  align-items: center;
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
  background: linear-gradient(currentColor 0 0)
  bottom left/
    100% 0.1em
  no-repeat;
}

.link-arrow {
  transition: transform .2s;
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
  transition: stroke-dashoffset .2s;
}

.link-text:hover .link-arrow .link-arrow-icon {
  stroke-dashoffset: 20;
}

.VPFeature:hover .VPFeaturePN {
  opacity: 1;
}

</style>
