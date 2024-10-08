<script setup lang="ts">
import docsearch from '@docsearch/js'
import { useRoute, useRouter,  } from 'vitepress'
import type { CarbonTheme } from '../CarbonTheme.js'
import { nextTick, onMounted, watch } from 'vue'
import { useData } from '../composables/data'
import { type SitemapItem } from '../../vp-node'

const props = defineProps<{
  algolia: CarbonTheme.AlgoliaSearchOptions
}>()

const router = useRouter()
const route = useRoute()
const { site, localeIndex, lang } = useData()

type DocSearchProps = Parameters<typeof docsearch>[0]

onMounted(update)
watch(localeIndex, update)


async function update() {
  await nextTick()
  const options = {
    ...props.algolia,
    ...props.algolia.locales?.[localeIndex.value]
  }
  const rawFacetFilters = options.searchParameters?.facetFilters ?? []
  const facetFilters = [
    ...(Array.isArray(rawFacetFilters)
      ? rawFacetFilters
      : [rawFacetFilters]
    ).filter((f) => !f.startsWith('lang:')),
    `lang:${lang.value}`
  ]
  initialize({
    ...options,
    searchParameters: {
      ...options.searchParameters,
      facetFilters
    }
  })
}

function initialize(userOptions: CarbonTheme.AlgoliaSearchOptions) {
  const options = Object.assign<
    object,
    CarbonTheme.AlgoliaSearchOptions,
    Partial<DocSearchProps>
  >({}, userOptions, {
    container: '#docsearch',

    navigator: {
      navigate({ itemUrl }: { itemUrl: string }) {
        const { pathname: hitPathname } = new URL(
          window.location.origin + itemUrl
        )

        // router doesn't handle same-page navigation, so we use the native
        // browser location API for anchor navigation
        if (route.path === hitPathname) {
          window.location.assign(window.location.origin + itemUrl)
        } else {
          router.go(itemUrl)
        }
      }
    },

    transformItems(items: SitemapItem[]) {
      return items.map((item) => {
        return Object.assign({}, item, {
          url: getRelativePath(item.url)
        })
      })
    },

    hitComponent({ hit, children } : { hit: SitemapItem, children: string }) {
      return {
        __v: null,
        type: 'a',
        ref: undefined,
        constructor: undefined,
        key: undefined,
        props: { href: hit.url, children }
      }
    }
  }) as DocSearchProps

  docsearch(options)
}

function getRelativePath(url: string) {
  const { pathname, hash } = new URL(url, location.origin)
  return pathname.replace(/\.html$/, site.value.cleanUrls ? '' : '.html') + hash
}
</script>

<template>
  <div id="docsearch" />
</template>
