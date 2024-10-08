import { computed } from 'vue'
import { ensureStartingSlash } from '../support/utils.js'
import { useData } from './data.js'
import { hashRef } from './hash.js'

export function useLanguages({
  removeCurrent = true,
  correspondingLink = false
} = {}) {
  const { site, localeIndex, page, theme } = useData()
  const currentLang = computed(() => ({
    label: site.value.locales[localeIndex.value]?.label,
    link:
      site.value.locales[localeIndex.value]?.link ??
      (localeIndex.value === 'root' ? '/' : `/${localeIndex.value}/`)
  }))

  const localeLinks = computed(() =>
    Object.entries(site.value.locales).flatMap(([key, value]) =>
      removeCurrent && currentLang.value.label === value.label
        ? []
        : {
            text: value.label,
            link:
              normalizeLink(
                value.link ?? (key === 'root' ? '/' : `/${key}/`),
                theme.value.i18nRouting !== false && correspondingLink,
                page.value.relativePath.slice(
                  currentLang.value.link.length - 1
                ),
                !site.value.cleanUrls
              ) + hashRef.value
          }
    )
  )

  return { localeLinks, currentLang }
}

function normalizeLink(
  link: string,
  addPath: boolean,
  path: string,
  addExt: boolean
) {
  if (addExt) {
    return addPath
      ? link.replace(/\/$/, '') +
          ensureStartingSlash(
            path.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '.html')
          )
      : link
  } else {
    return addPath
      ? link.replace(/\/$/, '') +
          ensureStartingSlash(
            path.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
          )
      : link
  }
}
