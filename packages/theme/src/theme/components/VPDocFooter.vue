<script setup lang="ts">
import { computed } from 'vue'
import { useData } from '../composables/data'
import { usePrevNext } from '../composables/prev-next'
import VPLink from './VPLink.vue'

const { theme, page, frontmatter } = useData()

const control = usePrevNext()

const hasEditLink = computed(() => {
  return theme.value.editLink && frontmatter.value.editLink !== false
})
const hasLastUpdated = computed(() => {
  return page.value.lastUpdated && frontmatter.value.lastUpdated !== false
})
const showFooter = computed(() => {
  return (
    hasEditLink.value ??
    hasLastUpdated.value ??
    control.value.prev ??
    control.value.next
  )
})
</script>

<template>
  <footer v-if="showFooter" class="VPDocFooter">
    <slot name="doc-footer-before" />
    <nav
      v-if="control.prev?.link || control.next?.link"
      class="prev-next"
      :class="{
        'has-prev': !!control.prev?.link,
        'has-next': !!control.next?.link
      }"
    >
      <div v-if="control.prev?.link" class="pager">
        <VPLink class="pager-link prev" :href="control.prev.link">
          <span class="desc-row">
            <span
              class="desc"
              v-html="theme.docFooter?.prev || 'Previous page'"
            ></span>
          </span>
          <span class="title-row">
            <svg
              aria-hidden="true"
              class="pager-icon"
              viewBox="0 0 16 16"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path
                d="M7.78 12.78a.75.75 0 0 1-1.06 0L2.47 8.53a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 1 1 1.06 1.06L4.81 7.25H13.5a.75.75 0 0 1 0 1.5H4.81l2.97 2.97a.75.75 0 0 1 0 1.06Z"
              />
            </svg>
            <span class="title" v-html="control.prev.text"></span>
          </span>
        </VPLink>
      </div>
      <div v-if="control.next?.link" class="pager">
        <VPLink class="pager-link next" :href="control.next.link">
          <span class="desc-row">
            <span
              class="desc"
              v-html="theme.docFooter?.next || 'Next page'"
            ></span>
          </span>
          <span class="title-row">
            <span class="title" v-html="control.next.text"></span>
            <svg
              aria-hidden="true"
              class="pager-icon"
              viewBox="0 0 16 16"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path
                d="M8.22 12.78a.75.75 0 0 0 1.06 0l4.25-4.25a.75.75 0 0 0 0-1.06L9.28 3.22a.75.75 0 1 0-1.06 1.06l2.97 2.97H2.5a.75.75 0 0 0 0 1.5h8.69l-2.97 2.97a.75.75 0 0 0 0 1.06Z"
              />
            </svg>
          </span>
        </VPLink>
      </div>
    </nav>
  </footer>
</template>

<style scoped>
.VPDocFooter {
  margin-top: 64px;
  margin-bottom: 20px;
}

.prev-next {
  border-top: 1px solid var(--vp-c-border);
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@media (min-width: 768px) {
  .prev-next {
    flex-direction: row;
    gap: 24px;
  }
}

.pager {
  display: flex;
  flex: 1 1 0;
}

.pager-link {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 10px;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  padding: 16px;
  width: 100%;
  height: 100%;
  transition:
    border-color 0.2s,
    background-color 0.2s;
}

.pager-link:hover {
  border-color: var(--vp-c-brand-1);
  background-color: rgba(177, 186, 196, 0.04);
}

.pager-link.next {
  align-items: flex-end;
  text-align: right;
}

.prev-next.has-next:not(.has-prev) .pager {
  margin-left: auto;
}

@media (min-width: 768px) {
  .prev-next.has-next:not(.has-prev) .pager {
    max-width: calc(50% - 12px);
  }
}

.desc-row,
.title-row {
  display: flex;
  align-items: center;
  width: 100%;
}

.title-row {
  gap: 10px;
}

.pager-link.next .desc-row,
.pager-link.next .title-row {
  justify-content: flex-end;
}

.desc {
  display: block;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.pager-icon {
  flex: 0 0 auto;
  color: var(--vp-c-text-2);
}

.title {
  display: block;
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

.pager-link:hover .title,
.pager-link:hover .pager-icon {
  color: var(--vp-c-brand-1);
}

@media (max-width: 767px) {
  .pager-link.next {
    align-items: flex-start;
    text-align: left;
  }

  .pager-link.next .desc-row {
    justify-content: flex-start;
  }

  .pager-link.next .title-row {
    justify-content: space-between;
  }
}
</style>
