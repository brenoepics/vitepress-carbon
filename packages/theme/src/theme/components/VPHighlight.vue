<script setup lang="ts">
import { type PropType } from 'vue'
import VPImage from './VPImage.vue'
import VPIconCode from './icons/VPIconCode.vue'

export type HighlightIcon =
  | string
  | {
  src: string
  alt?: string
  width?: string
  height?: string
  wrap?: boolean
}
  | {
  light: string
  dark: string
  alt?: string
  width?: string
  height?: string
  wrap?: boolean
}

defineProps({
  glowingActive: {
    type: Boolean,
    default: false
  },
  stringHighlightColors: {
    type: Array<string>,
    default: () => ['transparent', 'var(--vp-c-brand-1)', 'var(--vp-c-brand-3)']
  },
  icon: {
    type: [String, Object] as PropType<HighlightIcon>,
    default: VPIconCode
  }
})

</script>

<template>
  <div class="side-highlight">
    <div class="string-highlight"
         :style="{backgroundColor: `linear-gradient(${stringHighlightColors.join(', ')})`}" />
    <div class="icon" :class="{ 'glowing-active': glowingActive }">
      <div v-if="typeof icon === 'object' && icon.wrap" class="icon">
        <VPImage
          :image="icon"
          :alt="icon.alt"
          :height="icon.height || 24"
          :width="icon.width || 24"
        />
      </div>
      <VPImage
        v-else-if="typeof icon === 'object'"
        :image="icon"
        :alt="icon.alt"
        :height="icon.height || 24"
        :width="icon.width || 24"
      />
      <div v-else-if="icon" class="icon" v-html="icon"></div>
      <span
        class="glowing-icon-glow"
      ></span>
    </div>
    <div class="string-highlight"
         :style="{backgroundColor: `linear-gradient(${stringHighlightColors.reverse().join(', ')})`}" />
  </div>
</template>

<style scoped>

.side-highlight {
  display: flex;
  width: 8.3%;
  height: auto;
  flex-direction: column;
  gap: 5px;
  align-items: center;
}

.icon {
  height: 25px;
  width: 25px;
  position: relative;

  svg {
    fill: currentColor;
  }

  .glowing-icon-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    background: var(--vp-c-brand-3);
    width: 100%;
    height: 100%;
    filter: blur(200px);
  }

  .glowing-icon-glow:hover, .glowing-active {
    animation: glowing 2s infinite;
  }
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

.string-highlight {
  height: calc(100% / 2 - 10px);
  width: 3px;
  border-radius: 3px;
}

.string-highlight:first-child {
  background: linear-gradient(transparent, var(--vp-c-brand-1), var(--vp-c-brand-3));
}

.string-highlight:last-child {
  background: linear-gradient(var(--vp-c-brand-3), var(--vp-c-brand-1), transparent);
}
</style>
