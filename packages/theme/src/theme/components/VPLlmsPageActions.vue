<script setup lang="ts">
import { onClickOutside, onKeyStroke } from '@vueuse/core'
import { useRoute, withBase } from 'vitepress'
import { computed, ref, watch } from 'vue'
import { useData } from '../composables/data'

const { theme } = useData()
const route = useRoute()

const container = ref<HTMLElement>()
const open = ref(false)
const feedback = ref('')
const hasCheckedSiteWideFiles = ref(false)
const hasLlmsTxt = ref(false)
const hasLlmsFullTxt = ref(false)
let feedbackTimeout: ReturnType<typeof setTimeout> | undefined

onClickOutside(container, () => {
  open.value = false
})

onKeyStroke('Escape', () => {
  open.value = false
})

const llms = computed(() => theme.value.llms)
const isEnabled = computed(() => llms.value?.pageActions !== false)
const hasSiteWideLinks = computed(() => llms.value?.siteWideLinks !== false)

const normalizedPath = computed(() => {
  const cleanPath = route.path
    .split('#')[0]
    .split('?')[0]
    .replace(/\.html$/, '')

  if (cleanPath === '/' || cleanPath === '') {
    return 'index'
  }

  if (cleanPath.endsWith('/')) {
    return `${cleanPath.slice(1)}index`
  }

  return cleanPath.replace(/^\//, '')
})

const markdownPath = computed(() => {
  const pattern = llms.value?.pagePattern || '/:path.md'
  const resolved = pattern.replace(/:path\b/g, normalizedPath.value)

  return resolved.startsWith('/') ? resolved : `/${resolved}`
})

const markdownUrl = computed(() => withBase(markdownPath.value))
const llmsTxtUrl = computed(() => withBase('/llms.txt'))
const llmsFullTxtUrl = computed(() => withBase('/llms-full.txt'))
const showLlmsTxtLink = computed(
  () => hasSiteWideLinks.value && hasLlmsTxt.value
)
const showLlmsFullTxtLink = computed(
  () => hasSiteWideLinks.value && hasLlmsFullTxt.value
)
const showSiteWideSection = computed(
  () => showLlmsTxtLink.value || showLlmsFullTxtLink.value
)

const downloadName = computed(() => {
  const segments = normalizedPath.value.split('/').filter(Boolean)

  if (segments.length === 0) {
    return 'index.md'
  }

  const last = segments[segments.length - 1]
  const fallback = segments[segments.length - 2]
  const name = last === 'index' && fallback ? fallback : last

  return `${name || 'page'}.md`
})

const triggerLabel = computed(
  () => feedback.value || llms.value?.actionLabel || 'Markdown'
)
const copyLabel = computed(() => llms.value?.copyLabel || 'Copy as Markdown')
const copiedLabel = computed(() => llms.value?.copiedLabel || 'Copied')
const downloadLabel = computed(
  () => llms.value?.downloadLabel || 'Download as Markdown'
)
const llmsTxtLabel = computed(() => llms.value?.llmsTxtLabel || 'Open llms.txt')
const llmsFullTxtLabel = computed(
  () => llms.value?.llmsFullTxtLabel || 'Open llms-full.txt'
)

function setFeedback(label: string) {
  feedback.value = label

  if (feedbackTimeout) {
    clearTimeout(feedbackTimeout)
  }

  feedbackTimeout = setTimeout(() => {
    feedback.value = ''
  }, 1800)
}

function toggleMenu() {
  open.value = !open.value
}

async function fileExists(url: string) {
  try {
    const response = await fetch(url, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}

async function checkSiteWideFiles() {
  if (hasCheckedSiteWideFiles.value || !hasSiteWideLinks.value) {
    return
  }

  hasCheckedSiteWideFiles.value = true
  const [llmsTxtExists, llmsFullTxtExists] = await Promise.all([
    fileExists(llmsTxtUrl.value),
    fileExists(llmsFullTxtUrl.value)
  ])

  hasLlmsTxt.value = llmsTxtExists
  hasLlmsFullTxt.value = llmsFullTxtExists
}

watch(open, (isOpen) => {
  if (isOpen) {
    void checkSiteWideFiles()
  }
})

function fallbackCopy(text: string) {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'absolute'
  textarea.style.left = '-9999px'
  document.body.append(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
}

async function copyMarkdown() {
  open.value = false

  try {
    const response = await fetch(markdownUrl.value)

    if (!response.ok) {
      throw new Error('Unable to load markdown page')
    }

    const markdown = await response.text()

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(markdown)
    } else {
      fallbackCopy(markdown)
    }

    setFeedback(copiedLabel.value)
  } catch {
    setFeedback('Unavailable')
  }
}

function downloadMarkdown() {
  open.value = false

  const link = document.createElement('a')
  link.href = markdownUrl.value
  link.download = downloadName.value
  link.click()
}
</script>

<template>
  <div v-if="isEnabled" ref="container" class="VPLlmsPageActions">
    <button
      class="trigger"
      type="button"
      aria-haspopup="menu"
      :aria-expanded="open"
      @click="toggleMenu"
    >
      <svg
        aria-hidden="true"
        class="trigger-icon"
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <path
          d="M2.75 1h6.19c.2 0 .39.08.53.22l3.31 3.31c.14.14.22.33.22.53v8.19a1.75 1.75 0 0 1-1.75 1.75h-8.5A1.75 1.75 0 0 1 1 13.25v-10.5C1 1.78 1.78 1 2.75 1Zm0 1.5a.25.25 0 0 0-.25.25v10.5c0 .14.11.25.25.25h8.5c.14 0 .25-.11.25-.25V5.56L8.44 2.5H2.75Zm3 3.75a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75Zm0 3a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H6.5a.75.75 0 0 1-.75-.75Zm0 3a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5H6.5a.75.75 0 0 1-.75-.75Z"
        />
      </svg>
      <span class="trigger-label">{{ triggerLabel }}</span>
      <svg
        aria-hidden="true"
        class="trigger-caret"
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <path
          d="M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z"
        />
      </svg>
    </button>

    <Transition name="menu">
      <div v-if="open" class="menu" role="menu">
        <button
          class="menu-item"
          type="button"
          role="menuitem"
          @click="copyMarkdown"
        >
          <svg
            aria-hidden="true"
            class="menu-icon"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path
              d="M0 6.75C0 5.78.78 5 1.75 5h6.5C9.22 5 10 5.78 10 6.75v6.5A1.75 1.75 0 0 1 8.25 15h-6.5A1.75 1.75 0 0 1 0 13.25v-6.5Zm1.75-.25a.25.25 0 0 0-.25.25v6.5c0 .14.11.25.25.25h6.5a.25.25 0 0 0 .25-.25v-6.5a.25.25 0 0 0-.25-.25h-6.5Z"
            />
            <path
              d="M5 3.75C5 2.78 5.78 2 6.75 2h6.5C14.22 2 15 2.78 15 3.75v6.5A1.75 1.75 0 0 1 13.25 12H11.5v-1.5h1.75a.25.25 0 0 0 .25-.25v-6.5a.25.25 0 0 0-.25-.25h-6.5a.25.25 0 0 0-.25.25V4H5v-.25Z"
            />
          </svg>
          <span>{{ copyLabel }}</span>
        </button>

        <button
          class="menu-item"
          type="button"
          role="menuitem"
          @click="downloadMarkdown"
        >
          <svg
            aria-hidden="true"
            class="menu-icon"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path
              d="M7.25 1.75a.75.75 0 0 1 1.5 0v6.19l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72V1.75Z"
            />
            <path
              d="M2.5 10.75a.75.75 0 0 1 .75.75v1c0 .14.11.25.25.25h9a.25.25 0 0 0 .25-.25v-1a.75.75 0 0 1 1.5 0v1A1.75 1.75 0 0 1 12.5 14.25h-9A1.75 1.75 0 0 1 1.75 12.5v-1a.75.75 0 0 1 .75-.75Z"
            />
          </svg>
          <span>{{ downloadLabel }}</span>
        </button>

        <div
          v-if="showSiteWideSection"
          class="menu-divider"
          aria-hidden="true"
        ></div>

        <a
          v-if="showLlmsTxtLink"
          class="menu-item"
          :href="llmsTxtUrl"
          role="menuitem"
          @click="open = false"
        >
          <svg
            aria-hidden="true"
            class="menu-icon"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path
              d="M2.75 1h6.19c.2 0 .39.08.53.22l3.31 3.31c.14.14.22.33.22.53v8.19a1.75 1.75 0 0 1-1.75 1.75h-8.5A1.75 1.75 0 0 1 1 13.25v-10.5C1 1.78 1.78 1 2.75 1Zm0 1.5a.25.25 0 0 0-.25.25v10.5c0 .14.11.25.25.25h8.5c.14 0 .25-.11.25-.25V5.56L8.44 2.5H2.75Zm3 3.75a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75Zm0 3a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H6.5a.75.75 0 0 1-.75-.75Zm0 3a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5H6.5a.75.75 0 0 1-.75-.75Z"
            />
          </svg>
          <span>{{ llmsTxtLabel }}</span>
        </a>

        <a
          v-if="showLlmsFullTxtLink"
          class="menu-item"
          :href="llmsFullTxtUrl"
          role="menuitem"
          @click="open = false"
        >
          <svg
            aria-hidden="true"
            class="menu-icon"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path
              d="M2.75 2a.75.75 0 0 0-.75.75v8.5c0 .14.11.25.25.25h1V4.75c0-.97.78-1.75 1.75-1.75h6.75v-.25A.75.75 0 0 0 11 2H2.75Zm1.75 2.5a.25.25 0 0 0-.25.25v8.5c0 .14.11.25.25.25h8.75a.25.25 0 0 0 .25-.25v-8.5a.25.25 0 0 0-.25-.25H4.5Zm1.25 2a.75.75 0 0 1 .75-.75h4.75a.75.75 0 0 1 0 1.5H6.5a.75.75 0 0 1-.75-.75Zm0 3a.75.75 0 0 1 .75-.75h4.75a.75.75 0 0 1 0 1.5H6.5a.75.75 0 0 1-.75-.75Z"
            />
          </svg>
          <span>{{ llmsFullTxtLabel }}</span>
        </a>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.VPLlmsPageActions {
  position: relative;
}

.trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  padding: 6px 10px;
  min-height: 32px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 13px;
  font-weight: 500;
  transition:
    border-color 0.2s,
    background-color 0.2s,
    color 0.2s;
}

.trigger:hover {
  border-color: var(--vp-c-brand-1);
  background-color: var(--color-action-list-item-default-hover-bg);
}

.trigger-icon,
.trigger-caret,
.menu-icon {
  width: 14px;
  height: 14px;
  color: var(--vp-c-text-2);
  flex: 0 0 auto;
}

.trigger:hover .trigger-icon,
.trigger:hover .trigger-caret {
  color: var(--vp-c-brand-1);
}

.menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 30;
  display: grid;
  gap: 4px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 6px;
  min-width: 220px;
  background-color: var(--vp-c-bg);
  box-shadow: var(--vp-shadow-3);
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 6px;
  padding: 8px 10px;
  width: 100%;
  color: var(--vp-c-text-1);
  font-size: 13px;
  font-weight: 500;
  text-align: left;
  transition:
    background-color 0.2s,
    color 0.2s;
  text-decoration: none;
}

.menu-item:hover {
  background-color: var(--color-action-list-item-default-hover-bg);
  color: var(--vp-c-brand-1);
}

.menu-item:hover .menu-icon {
  color: var(--vp-c-brand-1);
}

.menu-divider {
  margin: 2px 4px;
  height: 1px;
  background-color: var(--vp-c-border);
}

.menu-enter-active,
.menu-leave-active {
  transition: all 0.16s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
