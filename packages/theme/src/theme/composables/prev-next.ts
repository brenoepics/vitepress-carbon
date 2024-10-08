/* eslint-disable @typescript-eslint/no-explicit-any  */
import { computed, type Ref } from 'vue'
import { useData } from './data.js'
import { isActive } from '../../shared.js'
import { getSidebar, getFlatSideBarLinks } from '../support/sidebar.js'
import { type PageData } from 'vitepress'
import type { CarbonTheme } from '../CarbonTheme.js'

export function usePrevNext() {
  const { page, theme, frontmatter } = useData()
  return computed(() => handlePrevNext(page, theme, frontmatter))
}

function handlePrevNext(
  page: Ref<PageData>,
  theme: Ref<CarbonTheme.Config>,
  frontmatter: Ref<Record<string, any>>
) {
  const sidebar = getSidebar(theme.value.sidebar, page.value.relativePath)
  const candidates = getFlatSideBarLinks(sidebar)
  const index = findPageIndex(page.value.relativePath, candidates)

  const hidePrev = shouldHidePrev(
    theme.value.docFooter?.prev,
    frontmatter.value.prev
  )
  const hideNext = shouldHideNext(
    theme.value.docFooter?.next,
    frontmatter.value.next
  )

  const prevLink = constructLinkObject(
    frontmatter.value.prev,
    candidates[index - 1]
  )
  const nextLink = constructLinkObject(
    frontmatter.value.next,
    candidates[index + 1]
  )

  return {
    prev: hidePrev ? undefined : prevLink,
    next: hideNext ? undefined : nextLink
  }
}

function findPageIndex(relativePath: string, candidates: any[]) {
  return candidates.findIndex((link) => isActive(relativePath, link.link))
}

function shouldHidePrev(themePrevConfig: any, frontmatterPrev: any) {
  return (
    (themePrevConfig === false && !frontmatterPrev) || frontmatterPrev === false
  )
}

function shouldHideNext(themeNextConfig: any, frontmatterNext: any) {
  return (
    (themeNextConfig === false && !frontmatterNext) || frontmatterNext === false
  )
}

function constructLinkObject(frontmatterLink: any, candidateLink: any) {
  const text =
    frontmatterLink?.text || candidateLink?.docFooterText || candidateLink?.text
  const link = frontmatterLink?.link || candidateLink?.link

  return { text, link }
}
