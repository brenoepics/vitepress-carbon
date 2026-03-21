<script setup lang="ts">
import { inject, type Ref } from 'vue'
import type { CarbonTheme } from '../CarbonTheme.js'
import VPButton from './VPButton.vue'
import VPImage from './VPImage.vue'
import VPHighlight, { type HighlightIcon } from './VPHighlight.vue'

export interface HeroAction {
  theme?: 'brand' | 'alt'
  text: string
  link: string
  target?: string
  rel?: string
}

defineProps<{
  name?: string
  text?: string
  tagline?: string
  image?: CarbonTheme.ThemeableImage
  actions?: HeroAction[]
  icon?: HighlightIcon
}>()

const heroImageSlotExists = inject('hero-image-slot-exists') as Ref<boolean>
</script>

<template>
  <div class="VPHero" :class="{ 'has-image': image || heroImageSlotExists }">
    <div class="container">
      <div class="main">
        <VPHighlight v-if="icon" class="git-highlight" :icon="icon" />
        <div class="home-hero">
          <slot name="home-hero-info-before" />
          <slot name="home-hero-info">
            <h1 v-if="name" class="name">
              <span v-html="name" class="clip"></span>
            </h1>
            <p v-if="text" v-html="text" class="text"></p>
            <p v-if="tagline" v-html="tagline" class="tagline"></p>
          </slot>
          <slot name="home-hero-info-after" />
          <div v-if="actions" class="actions">
            <div v-for="action in actions" :key="action.link" class="action">
              <VPButton
                tag="a"
                size="medium"
                :theme="action.theme"
                :text="action.text"
                :href="action.link"
                :target="action.target"
                :rel="action.rel"
              />
            </div>
          </div>
          <slot name="home-hero-actions-after" />
        </div>
      </div>

      <div v-if="image || heroImageSlotExists" class="image">
        <div class="image-container">
          <div class="image-bg" />
          <slot name="home-hero-image">
            <VPImage v-if="image" class="image-src" :image="image" />
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.VPHero {
  position: relative;
  isolation: isolate;
  margin-top: calc(
    (var(--vp-nav-height) + var(--vp-layout-top-height, 0px)) * -1
  );
  padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 48px)
    24px 48px;
  overflow: hidden;
}

.VPHero::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: var(--vp-home-hero-overlay);
  pointer-events: none;
}

@media (min-width: 640px) {
  .VPHero {
    padding: calc(
        var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 80px
      )
      48px 64px;
  }
}

@media (min-width: 1024px) {
  .VPHero {
    padding: calc(
        var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 80px
      )
      64px 64px;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .VPHero {
    padding: calc(
        var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 56px
      )
      40px 56px;
  }
}

.VPHero:hover .git-highlight ::v-deep(.glowing-icon-glow) {
  animation: glowing 2s infinite;
}

@keyframes glowing {
  0% {
    filter: blur(18px);
  }

  50% {
    filter: blur(12px);
  }

  100% {
    filter: blur(18px);
  }
}

.container {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin: 0 auto;
  max-width: 1152px;
}

@media (max-width: 1023px) {
  .git-highlight {
    display: none;
  }
}

@media (min-width: 1024px) {
  .container {
    flex-direction: row;
    align-items: center;
    gap: 56px;
  }
}

.main {
  display: flex;
  position: relative;
  z-index: 10;
  justify-content: center;
  order: 2;
  flex-grow: 1;
  flex-shrink: 0;
  gap: 18px;
}

.VPHero.has-image .container {
  text-align: center;
}

@media (min-width: 1024px) {
  .VPHero.has-image .container {
    text-align: left;
  }
}

@media (min-width: 1024px) {
  .main {
    order: 1;
    width: calc((100% / 3) * 2);
    justify-content: flex-start;
  }

  .VPHero.has-image .main {
    max-width: 592px;
  }
}

.home-hero {
  width: 100%;
}

.git-highlight {
  margin-top: 14px;
}

.name,
.text {
  max-width: 392px;
  letter-spacing: -0.03em;
  line-height: 1.1;
  font-size: 36px;
  font-weight: 700;
  white-space: pre-wrap;
}

.VPHero.has-image .name,
.VPHero.has-image .text {
  margin: 0 auto;
}

.name {
  color: var(--vp-home-hero-name-color);
}

.clip {
  background: var(--vp-home-hero-name-background);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: var(--vp-home-hero-name-color);
}

@media (min-width: 640px) {
  .name,
  .text {
    max-width: 576px;
    line-height: 1.08;
    font-size: 48px;
  }
}

@media (min-width: 1024px) {
  .name,
  .text {
    line-height: 1.05;
    font-size: 60px;
  }

  .VPHero.has-image .name,
  .VPHero.has-image .text {
    margin: 0;
  }
}

.tagline {
  padding-top: 14px;
  max-width: 392px;
  line-height: 1.7;
  font-size: 18px;
  font-weight: 400;
  white-space: pre-wrap;
  color: var(--vp-home-hero-muted-color);
}

.VPHero.has-image .tagline {
  margin: 0 auto;
}

@media (min-width: 640px) {
  .tagline {
    padding-top: 16px;
    max-width: 576px;
    line-height: 1.7;
    font-size: 20px;
  }
}

@media (min-width: 1024px) {
  .tagline {
    max-width: 620px;
    font-size: 22px;
  }

  .VPHero.has-image .tagline {
    margin: 0;
  }
}

.actions {
  display: flex;
  flex-wrap: wrap;
  margin: -6px;
  padding-top: 24px;
  gap: 0;
}

.VPHero.has-image .actions {
  justify-content: center;
}

@media (min-width: 640px) {
  .actions {
    padding-top: 32px;
  }
}

@media (min-width: 1024px) {
  .VPHero.has-image .actions {
    justify-content: flex-start;
  }
}

@media (max-width: 639px) {
  .actions {
    flex-direction: column;
    align-items: stretch;
  }

  .action {
    width: 100%;
  }

  .action :deep(.VPButton) {
    display: block;
    width: 100%;
  }
}

.action {
  flex-shrink: 0;
  padding: 6px;
}

.image {
  order: 1;
  margin: -76px -24px -48px;
}

@media (min-width: 640px) {
  .image {
    margin: -108px -24px -48px;
  }
}

@media (min-width: 1024px) {
  .image {
    flex-grow: 1;
    order: 2;
    margin: 0;
    min-height: 100%;
  }
}

.image-container {
  position: relative;
  margin: 0 auto;
  width: min(100%, 288px);
  height: 288px;
}

@media (min-width: 640px) {
  .image-container {
    width: min(100%, 360px);
    height: 360px;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .image-container {
    width: min(100%, 320px);
    height: 320px;
  }
}

@media (min-width: 1024px) {
  .image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    /*rtl:ignore*/
    transform: translate(-16px, -16px);
  }
}

.image-bg {
  position: absolute;
  top: 50%;
  /*rtl:ignore*/
  left: 50%;
  border-radius: 50%;
  width: 192px;
  height: 192px;
  background-image: var(--vp-home-hero-image-background-image);
  filter: var(--vp-home-hero-image-filter);
  /*rtl:ignore*/
  transform: translate(-50%, -50%);
}

@media (min-width: 640px) {
  .image-bg {
    width: 256px;
    height: 256px;
  }
}

@media (min-width: 1024px) {
  .image-bg {
    width: 320px;
    height: 320px;
  }
}

:deep(.image-src) {
  position: absolute;
  top: 50%;
  /*rtl:ignore*/
  left: 50%;
  max-width: 192px;
  max-height: 192px;
  /*rtl:ignore*/
  transform: translate(-50%, -50%);
}

@media (min-width: 640px) {
  :deep(.image-src) {
    max-width: 256px;
    max-height: 256px;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  :deep(.image-src) {
    max-width: 224px;
    max-height: 224px;
  }
}

@media (min-width: 1024px) {
  :deep(.image-src) {
    max-width: 320px;
    max-height: 320px;
  }
}
</style>
