<script setup lang="ts">
import type { DefaultTheme } from 'vitepress/theme'
import VPImage from './VPImage.vue'
import VPLink from './VPLink.vue'
import VPIconArrowRight from './icons/VPIconArrowRight.vue'

defineProps<{
  icon?: DefaultTheme.FeatureIcon
  title: string
  details?: string
  link?: string
  linkText?: string
  rel?: string
  target?: string
}>()
</script>

<template>
  <VPLink
    class="VPFeature"
    :href="link"
    :rel="rel"
    :target="target"
    :no-icon="true"
    :tag="link ? 'a' : 'div'"
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
      <div v-if="linkText" class="link-text">
        <p class="link-text-value">
          {{ linkText }}
        </p>
      </div>
  </div>
    <article class="box">
      <p v-if="details" class="details" v-html="details"></p>
    </article>
  </VPLink>
</template>

<style scoped>
.VPFeature {
  display: block;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  height: 100%;
  background-color: var(--vp-c-bg);
  padding: 12px;
  transition: border-color 0.25s, background-color 0.25s;
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
  background-color: var(--vp-c-bg-soft);
  border-radius: 4px;
  padding: 14px;
  transition: border-color 0.25s, background-color 0.25s;
}

.box > :deep(.VPImage) {
  margin-bottom: 20px;
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--vp-c-border);
  background-color: rgba(255,255,255,0.1);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 22px;
  transition: background-color 0.25s;
}

.title {
  line-height: 21px;
  font-size: 14px;
  font-weight: 600;
}

.details {
  flex-grow: 1;
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.link-text {
  color: var(--vp-c-text-2);
  font-weight:400;
  transition: background-color 0.25s;
}

.link-text-value {
  font-size: 13px;
  font-weight: 400;
  color: var(--vp-c-text-2);
  transition: background-color 0.25s;
}

.VPFeature.link:hover {
  border-color: #6e7681;
  background-color: rgba(177,186,196,0.12);
}

.VPFeature.link:hover .link-text, .VPFeature.link:hover .link-text-value {
  color: #6e7681;
}
.VPFeature.link:hover .box {
  background-color: var(--vp-c-bg-soft-2);
}
</style>
