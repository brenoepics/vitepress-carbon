<script setup lang="ts">
import { useRoute } from 'vitepress'
import { computed } from 'vue'
import { useData } from '../composables/data'
import { useSidebar } from '../composables/sidebar'
import VPDocAside from './VPDocAside.vue'
import VPDocFooter from './VPDocFooter.vue'
import VPDocFooterLastUpdated from './VPDocFooterLastUpdated.vue'
import { useEditLink } from '../composables/edit-link'
import { usePrevNext } from '../composables/prev-next'
import VPLink from './VPLink.vue'

const { theme, page, frontmatter } = useData()

const editLink = useEditLink()
const control = usePrevNext()

const hasEditLink = computed(() => {
  return theme.value.editLink && frontmatter.value.editLink !== false
})
const hasLastUpdated = computed(() => {
  return page.value.lastUpdated && frontmatter.value.lastUpdated !== false
})
const route = useRoute()
const { hasSidebar, hasAside, leftAside } = useSidebar()


const pageName = computed(() =>
  route.path.replace(/[./]+/g, '_').replace(/_html$/, '')
)
</script>

<template>
  <div
    class="VPDoc"
    :class="{ 'has-sidebar': hasSidebar, 'has-aside': hasAside }"
  >
    <slot name="doc-top" />
    <div class="container">
      <div v-if="hasAside" class="aside" :class="{'left-aside': leftAside}">
        <div class="aside-container">
          <div class="aside-content">
            <VPDocAside>
              <template #aside-top>
                <slot name="aside-top" />
              </template>
              <template #aside-bottom>
                <slot name="aside-bottom" />
              </template>
              <template #aside-outline-before>
                <slot name="aside-outline-before" />
              </template>
              <template #aside-outline-after>
                <slot name="aside-outline-after" />
              </template>
              <template #aside-ads-before>
                <slot name="aside-ads-before" />
              </template>
              <template #aside-ads-after>
                <slot name="aside-ads-after" />
              </template>
            </VPDocAside>
          </div>
        </div>
      </div>

      <div class="content">
        <div class="content-container">
          <div class="content-top">
            <nav aria-label="Repository files" class="content-file">
              <ul role="list" class="content-ul">
                <li class="content-box">
                  <a href="#" class="content-box-item" v-if="route.data.title">
                    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" class="content-box-icon">
                      <path
                        d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Zm7.251 10.324.004-5.073-.002-2.253A2.25 2.25 0 0 0 5.003 2.5H1.5v9h3.757a3.75 3.75 0 0 1 1.994.574ZM8.755 4.75l-.004 7.322a3.752 3.752 0 0 1 1.992-.572H14.5v-9h-3.495a2.25 2.25 0 0 0-2.25 2.25Z"></path>
                    </svg>
                    <span class="content-box-text">{{ route.data.title }}</span>
                  </a>
                </li>
              </ul>
            </nav>
            <div v-if="hasLastUpdated" class="content-box-item no-hover">
              <div class="last-updated">
                <VPDocFooterLastUpdated />
              </div>
            </div>
            <div v-if="hasEditLink" class="content-box-item">
              <VPLink class="edit-link-button" :href="editLink.url" :no-icon="true">
                <svg v-if="hasEditLink" role="img" class="content-box-icon box-m-0" viewBox="0 0 16 16"
                     width="16" height="16" fill="currentColor">
                  <path
                    d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 0 0-.064.108l-.558 1.953 1.953-.558a.253.253 0 0 0 .108-.064Zm1.238-3.763a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Z"></path>
                </svg>
              </VPLink>
            </div>
          </div>
          <slot name="doc-before" />
          <main class="main">
            <Content
              class="vp-doc"
              :class="[
                pageName,
                theme.externalLinkIcon && 'external-link-icon-enabled'
              ]"
            />
          </main>
          <VPDocFooter>
            <template #doc-footer-before>
              <slot name="doc-footer-before" />
            </template>
          </VPDocFooter>
          <slot name="doc-after" />
        </div>
      </div>
    </div>
    <slot name="doc-bottom" />
  </div>
</template>

<style scoped>
.VPDoc {
  padding: 32px 24px 96px;
  width: 100%;
}

@media (min-width: 768px) {
  .VPDoc {
    padding: 48px 32px 128px;
  }
}

@media (min-width: 960px) {
  .VPDoc {
    padding: 48px 32px 0;
  }

  .VPDoc:not(.has-sidebar) .container {
    display: flex;
    justify-content: center;
    max-width: 992px;
  }

  .VPDoc:not(.has-sidebar) .content {
    max-width: 752px;
  }
}

@media (min-width: 1280px) {
  .VPDoc .container {
    display: flex;
    justify-content: center;
  }

  .VPDoc .aside {
    display: block;
  }
}

@media (min-width: 1440px) {
  .VPDoc:not(.has-sidebar) .content {
    max-width: 784px;
  }

  .VPDoc:not(.has-sidebar) .container {
    max-width: 1104px;
  }
}

.container {
  width: 100%;
  margin: 0 auto 50px;
}

.aside {
  position: relative;
  display: none;
  order: 2;
  flex-grow: 1;
  padding-left: 32px;
  width: 100%;
  max-width: 256px;
}

.left-aside {
  order: 1;
  padding-left: unset;
  padding-right: 32px;
}

.aside-container {
  position: fixed;
  top: 0;
  padding-top: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + var(--vp-doc-top-height, 0px) + 10px);
  width: 224px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: none;
}

.aside-container::-webkit-scrollbar {
  display: none;
}

.aside-content {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - (var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 48px));
  padding-bottom: 32px;
}


.content {
  position: relative;
  margin: 0 auto;
  width: 100%;
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  background-color: var(--vp-c-bg)
}

.main {
  padding: 15px;
}

.content-top {
  display: flex;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: var(--vp-c-border);
  align-items: center;
  padding-right: 8px;
  position: sticky;
  top: 0;
  background-color: var(--vp-c-bg);
  z-index: 1;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  justify-content: flex-end;
}

.content-file {
  display: none;
  padding-left: 8px;
  padding-right: 8px;
  justify-content: flex-start;
  align-items: center;
  min-height: 48px;
  flex-grow: 1;
  max-width: 100%;
}


@media (min-width: 640px) {
  .content-file {
    display: flex;
  }
}
.content-ul {
  display: flex;
  list-style: none;
  white-space: nowrap;
  padding: 0;
  margin: 0 0 -1px;
  -webkit-box-align: center;
  align-items: center;
  gap: 8px;
  position: relative;
}

.content-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content-box-item {
  position: relative;
  display: inline-flex;
  color: var(--vp-color-fg-default);
  text-align: center;
  text-decoration: none;
  line-height: calc(1.42857);
  border-radius: 6px;
  font-size: 14px;
  padding: calc(0.375rem) 8px;
  align-items: flex-end;
}

.content-box-text {
  font-weight: 600;
}

.content-box-item:hover {
  background-color: var(--color-action-list-item-default-hover-bg);
  border-color: var(--color-action-list-item-default-hover-border);
}

.content-box-item:active {
  background-color: var(--color-action-list-item-default-active-bg);
  border-color: var(--color-action-list-item-default-active-border);
}

.no-hover {
  background-color: transparent!important;
  border-color: transparent!important;
}

.content-box-icon {
  align-items: center;
  display: inline-flex;
  margin-right: 8px;
  color: var(--vp-c-text-2);
}

.box-m-0 {
  margin: 0;
}

@media (min-width: 960px) {
  .main {
    padding: 32px 32px 128px;
  }
}

@media (min-width: 1280px) {
  .main {
    order: 1;
    margin: 0;
    max-width: 640px;
  }
}

.content-container {
  margin: 0 auto;
}

.VPDoc.has-aside .content-container {
  max-width: 98%;
}
</style>
