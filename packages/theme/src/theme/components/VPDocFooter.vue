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
  return (hasEditLink.value ?? hasLastUpdated.value) ?? control.value.prev ?? control.value.next
})
</script>

<template>
  <footer v-if="showFooter" class="VPDocFooter">
    <slot name="doc-footer-before" />
    <nav v-if="control.prev?.link || control.next?.link" class="prev-next">
      <div class="pager">
        <VPLink v-if="control.prev?.link" class="pager-link prev" :href="control.prev.link">
          <span class="desc" v-html="theme.docFooter?.prev || 'Previous page'"></span>
          <span class="title" v-html="control.prev.text"></span>
        </VPLink>
        <div v-else class="pager-link prev disabled-pager">
          <span class="desc" v-html="theme.docFooter?.prev || 'Previous page'"></span>
          <span class="title"></span>
        </div>
      </div>
      <div class="pager">
        <VPLink v-if="control.next?.link" class="pager-link next" :href="control.next.link">
          <span class="desc" v-html="theme.docFooter?.next || 'Next page'"></span>
          <span class="title" v-html="control.next.text"></span>
        </VPLink>
        <div v-else class="pager-link prev disabled-pager">
          <span class="desc" v-html="theme.docFooter?.next || 'Previous page'"></span>
          <span class="title"></span>
        </div>
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
  display: grid;
  grid-row-gap: 8px;
}

@media (min-width: 640px) {
  .prev-next {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 16px;
  }
}

.pager-link {
  display: block;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 11px 16px 13px;
  width: 100%;
  height: 100%;
  transition: border-color 0.25s;
}

.pager-link:hover {
  border-color: var(--color-action-list-item-default-active-border);
}

.pager-link.next {
  margin-left: auto;
  text-align: right;
}

.disabled-pager {
  opacity: 0.7;
}
.disabled-pager:hover {
  border-color: var(--vp-c-border);
}

.desc {
  display: block;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.title {
  display: block;
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}
</style>
