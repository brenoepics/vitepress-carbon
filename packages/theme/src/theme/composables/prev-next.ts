/* oxlint-disable @typescript-eslint/no-explicit-any  */
import { computed } from 'vue'
import { useData } from './data.js'
import { isActive } from '../../shared.js'
import { getSidebar, getFlatSideBarLinks } from '../support/sidebar.js'

export function usePrevNext() {
  const { page, theme, frontmatter } = useData()
  return computed(() => handlePrevNext(page.value, theme.value, frontmatter.value))
}

function handlePrevNext(
  page: any,
  theme: any,
  frontmatter: any
) {
  const sidebar = getSidebar(theme.sidebar, page.relativePath)
  const candidates = getFlatSideBarLinks(sidebar)
  const index = findPageIndex(page.relativePath, candidates)

  const hidePrev = shouldHidePrev(
    theme.docFooter?.prev,
    frontmatter.prev
  )
  const hideNext = shouldHideNext(
    theme.docFooter?.next,
    frontmatter.next
  )

  const prevLink = constructLinkObject(
    frontmatter.prev,
    candidates[index - 1]
  )
  const nextLink = constructLinkObject(
    frontmatter.next,
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