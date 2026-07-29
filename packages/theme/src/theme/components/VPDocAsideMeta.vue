<script setup lang="ts">
import { computed } from 'vue'
import { useData } from '../composables/data'
import { useEditLink } from '../composables/edit-link'
import VPDocFooterLastUpdated from './VPDocFooterLastUpdated.vue'
import VPLlmsPageActions from './VPLlmsPageActions.vue'
import VPLink from './VPLink.vue'

const { theme, page, frontmatter } = useData()

const editLink = useEditLink()

const hasEditLink = computed(
  () => theme.value.editLink && frontmatter.value.editLink !== false
)
const hasLastUpdated = computed(
  () => page.value.lastUpdated && frontmatter.value.lastUpdated !== false
)
const hasLlmsPageActions = computed(
  () => theme.value.llms?.pageActions !== false
)

const hasAnything = computed(
  () => hasEditLink.value || hasLastUpdated.value || hasLlmsPageActions.value
)
</script>

<template>
  <div v-if="hasAnything" class="VPDocAsideMeta">
    <div class="meta-title" role="heading" aria-level="2">About this page</div>

    <div class="meta-box">
      <div v-if="hasLlmsPageActions" class="meta-row">
        <VPLlmsPageActions />
      </div>

      <VPLink
        v-if="hasEditLink"
        class="meta-row meta-link"
        :href="editLink.url"
        :no-icon="true"
      >
        <svg
          class="meta-icon"
          viewBox="0 0 16 16"
          width="16"
          height="16"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 0 0-.064.108l-.558 1.953 1.953-.558a.253.253 0 0 0 .108-.064Zm1.238-3.763a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Z"
          />
        </svg>
        <span>{{ editLink.text }}</span>
      </VPLink>

      <div v-if="hasLastUpdated" class="meta-row meta-static">
        <svg
          class="meta-icon"
          viewBox="0 0 16 16"
          width="16"
          height="16"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm7-3.25v2.992l2.028.812a.75.75 0 0 1-.557 1.392l-2.5-1A.751.751 0 0 1 7 8.25v-3.5a.75.75 0 0 1 1.5 0Z"
          />
        </svg>
        <VPDocFooterLastUpdated />
      </div>
    </div>
  </div>
</template>

<style scoped>
.VPDocAsideMeta {
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.meta-title {
  margin-bottom: 8px;
  padding-left: 10px;
  line-height: 18px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
}

.meta-box {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 6px;
  min-height: 28px;
  padding: 4px 10px;
  font-size: 13px;
  line-height: 20px;
  color: var(--vp-c-text-2);
}

.meta-link {
  text-decoration: none;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

.meta-link:hover {
  background-color: var(--color-action-list-item-default-hover-bg);
  color: var(--vp-c-text-1);
}

.meta-icon {
  flex: 0 0 auto;
  width: 16px;
  height: 16px;
  color: var(--vp-c-text-3);
}

.meta-link:hover .meta-icon {
  color: var(--vp-c-brand-1);
}

.meta-static {
  cursor: default;
}

.meta-static :deep(.VPLastUpdated) {
  margin: 0;
  font-size: 13px;
  line-height: 20px;
  color: inherit;
}

/* The markdown-actions dropdown supplies its own trigger chrome, so this row
   is only a positioning shell for it. */
.meta-row:has(.VPLlmsPageActions) {
  padding: 0;
  min-height: 0;
}

.meta-row :deep(.VPLlmsPageActions) {
  width: 100%;
}

.meta-row :deep(.trigger) {
  width: 100%;
  justify-content: flex-start;
}

.meta-row :deep(.trigger-caret) {
  margin-left: auto;
}

.meta-row :deep(.menu) {
  left: 0;
  right: auto;
}

@media (prefers-reduced-motion: reduce) {
  .meta-link {
    transition: none;
  }
}
</style>
