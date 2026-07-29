<script setup lang="ts">
import { useData } from '../composables/data'
import { useSidebar } from '../composables/sidebar'
import VPButton from './VPButton.vue'
import VPContributionTiles from './VPContributionTiles.vue'

const { theme, frontmatter } = useData()
const { hasSidebar } = useSidebar()
</script>

<template>
  <footer
    v-if="theme.footer && frontmatter.footer !== false"
    class="VPFooter"
    :class="{ 'has-sidebar': hasSidebar }"
  >
    <VPContributionTiles
      class="tiles"
      mask="frame"
      fit
      :columns="120"
      :rows="18"
    />

    <div class="container">
      <div v-if="theme.footer.action" class="action">
        <VPButton
          tag="a"
          size="medium"
          :theme="theme.footer.action.theme ?? 'brand'"
          :text="theme.footer.action.text"
          :href="theme.footer.action.link"
        />
      </div>

      <p
        v-if="theme.footer.message"
        class="message"
        v-html="theme.footer.message"
      ></p>
      <p
        v-if="theme.footer.copyright"
        class="copyright"
        v-html="theme.footer.copyright"
      ></p>
    </div>
  </footer>
</template>

<style scoped>
.VPFooter {
  position: relative;
  z-index: var(--vp-z-index-footer);
  overflow: hidden;
  border-top: 1px solid var(--vp-c-divider);
  padding: 48px 24px;
  background-color: var(--vp-c-bg);
}

.VPFooter.has-sidebar {
  display: none;
}

@media (min-width: 768px) {
  .VPFooter {
    padding: 56px 32px;
  }
}

/* Tiles sit behind the content and span the whole footer.

   They used to be a fixed 120x18 grid centred with a transform, which is
   1677x249px against a footer that is neither. Wider than that and the grid
   stopped short of both edges; narrower and `overflow: hidden` sliced it
   mid-cell — across 320-2560px, 46% of widths cut a column in half. Filling
   the footer and letting the component size itself (`fit`) keeps whole cells
   at every edge, on every screen. */
.tiles {
  position: absolute;
  inset: 0;
}

/* Narrower viewports leave less room between the frame and the text, so pull
   the hollow wider and soften the grid. */
@media (max-width: 1099px) {
  .tiles {
    --vp-tiles-hollow-w: 58%;
    opacity: 0.55;
  }
}

@media (max-width: 767px) {
  .tiles {
    --vp-tiles-hollow-w: 76%;
    opacity: 0.35;
  }
}

.container {
  position: relative;
  margin: 0 auto;
  max-width: var(--vp-layout-max-width);
  text-align: center;
}

.action {
  margin-bottom: 24px;
}

/* Square-cornered like the nav bar's button rather than VPButton's pill, but
   sized up — this is the page's closing call to action. */
.action :deep(.VPButton) {
  display: inline-flex;
  align-items: center;
  height: 44px;
  border-radius: var(--vp-nav-control-radius);
  padding: 0 24px;
  line-height: 1;
  font-size: 15px;
}

.VPFooter :deep(a) {
  text-decoration-line: underline;
  text-underline-offset: 2px;
  transition: color 0.25s;
}

.VPFooter :deep(a:hover) {
  color: var(--vp-c-text-1);
}

/* The CTA is a button, not body copy — keep the link underline off it. */
.action :deep(a),
.action :deep(a:hover) {
  text-decoration-line: none;
}

.message,
.copyright {
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.copyright {
  margin-top: 4px;
}
</style>
