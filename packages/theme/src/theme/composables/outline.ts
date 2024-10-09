import { getScrollOffset } from 'vitepress'
import type { CarbonTheme } from '../CarbonTheme.js'
import { onMounted, onUnmounted, onUpdated, type Ref } from 'vue'
import type { Header } from 'vitepress'
import { throttleAndDebounce } from '../support/utils.js'
import { useAside } from './aside.js'

// cached list of anchor elements from resolveHeaders
const resolvedHeaders: { element: HTMLHeadElement; link: string }[] = []

export type MenuItem = Omit<Header, 'slug' | 'children'> & {
  element: HTMLHeadElement
  children?: MenuItem[]
}

export function resolveTitle(theme: CarbonTheme.Config) {
  return (
    (typeof theme.outline === 'object' &&
      !Array.isArray(theme.outline) &&
      theme.outline.label) ||
    'On this page'
  )
}

export function getHeaders(range: CarbonTheme.Config['outline']) {
  const headers: {
    level: number
    link: string
    title: string
    element: HTMLHeadElement
  }[] = [
    ...Array.from(document.querySelectorAll('.VPDoc :where(h1,h2,h3,h4,h5,h6)'))
  ]
    .filter((el) => el.id && el.hasChildNodes())
    .map((el) => {
      const level = Number(el.tagName[1])
      return {
        element: el as HTMLHeadElement,
        title: serializeHeader(el),
        link: '#' + el.id,
        level
      }
    })

  return resolveHeaders(headers, range)
}

function serializeHeader(h: Element): string {
  let ret = ''
  for (const node of Array.from(h.childNodes)) {
    if (node.nodeType === 1) {
      if (
        (node as Element).classList.contains('VPBadge') ||
        (node as Element).classList.contains('header-anchor') ||
        (node as Element).classList.contains('ignore-header')
      ) {
        continue
      }
      ret += node.textContent
    } else if (node.nodeType === 3) {
      ret += node.textContent
    }
  }
  return ret.trim()
}

export function resolveHeaders(
  headers: MenuItem[],
  range?: CarbonTheme.Config['outline']
): MenuItem[] {
  if (range === false) {
    return []
  }

  const levelsRange =
    (typeof range === 'object' && !Array.isArray(range)
      ? range.level
      : range) ?? 2

  let high: number, low: number
  if (levelsRange === 'deep') {
    ;[high, low] = [2, 6]
  } else {
    ;[high, low] =
      typeof levelsRange === 'number' ? [levelsRange, levelsRange] : levelsRange
  }

  headers = headers.filter((h) => h.level >= high && h.level <= low)
  // clear previous caches
  resolvedHeaders.length = 0
  // update global header list for active link rendering
  for (const { element, link } of headers) {
    resolvedHeaders.push({ element, link })
  }

  const ret: MenuItem[] = []
  outer: for (let i = 0; i < headers.length; i++) {
    const cur = headers[i]
    if (i === 0) {
      ret.push(cur)
    } else {
      for (let j = i - 1; j >= 0; j--) {
        const prev = headers[j]
        if (prev.level < cur.level) {
          ;(prev.children ?? (prev.children = [])).push(cur)
          continue outer
        }
      }
      ret.push(cur)
    }
  }

  return ret
}

export function useActiveAnchor(container: Ref<HTMLElement>) {
  const { isAsideEnabled } = useAside()

  const onScroll = throttleAndDebounce(setActiveLink, 100)

  let prevActiveLink: HTMLAnchorElement | null = null
  let prevActiveRoot: Element | null | undefined = null

  onMounted(() => {
    requestAnimationFrame(setActiveLink)
    window.addEventListener('scroll', onScroll)
  })

  onUpdated(() => {
    // sidebar update means a route change
    activateLink(location.hash)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })

  function setActiveLink() {
    if (!isAsideEnabled.value) {
      return
    }

    const scrollY = window.scrollY
    const innerHeight = window.innerHeight
    const offsetHeight = document.body.offsetHeight
    const isBottom = Math.abs(scrollY + innerHeight - offsetHeight) < 1

    // resolvedHeaders may be repositioned, hidden or fix positioned
    const headers = resolvedHeaders
      .map(({ element, link }) => ({
        link,
        top: getAbsoluteTop(element)
      }))
      .filter(({ top }) => !Number.isNaN(top))
      .sort((a, b) => a.top - b.top)

    // no headers available for active link
    if (!headers.length) {
      activateLink(null)
      return
    }

    // page top
    if (scrollY < 1) {
      activateLink(null)
      return
    }

    // page bottom - highlight last link
    if (isBottom) {
      activateLink(headers[headers.length - 1].link)
      return
    }

    // find the last header above the top of viewport
    let activeLink: string | null = null
    for (const { link, top } of headers) {
      if (top > scrollY + getScrollOffset() + 4) {
        break
      }
      activeLink = link
    }
    activateLink(activeLink)
  }

  function activateLink(hash: string | null) {
    prevActiveLink?.classList.remove('active')
    prevActiveRoot?.classList.remove('active')

    prevActiveLink = null

    if (hash != null) {
      prevActiveLink = container.value.querySelector(
        `a[href="${decodeURIComponent(hash)}"]`
      )
    }

    const activeLink = prevActiveLink

    if (!activeLink) return

    // Check if activeLink is within the visible area of its parent
    const parentFinal = activeLink.parentElement
    let parentItem = parentFinal

    let parentList = parentItem?.parentElement
    if (!parentItem || !parentList || !parentFinal) return

    if (parentList.classList.contains('nested')) {
      parentItem = parentList.parentElement
      parentList = parentList.parentElement?.parentElement
    }

    if (!parentItem || !parentList || !parentList.classList.contains('root')) {
      return
    }

    if (parentFinal.parentElement?.style.display === 'none') {
      prevActiveRoot =
        parentFinal.parentElement?.parentElement?.firstElementChild
      prevActiveRoot?.classList.add('active')
    } else {
      activeLink.classList.add('active')
    }

    const parentTop = parentList.clientHeight
    const nestedTop = parentFinal === parentItem ? 0 : parentFinal.offsetTop
    const linkScrollTop = parentItem.offsetTop + nestedTop

    // If activeLink is above the visible area, scroll up
    if (parentTop + 64 > linkScrollTop) {
      scrollUp(parentList, linkScrollTop)
    }

    // If activeLink is below the visible area, scroll down
    if (linkScrollTop + activeLink.clientHeight + 64 > parentTop) {
      scrollDown(parentList, linkScrollTop, parentTop, activeLink.clientHeight)
    }
  }

  function scrollUp(parentList: HTMLElement, linkScrollTop: number) {
    const scrollAmount = 64 // Adjust this value to change scroll speed
    const currentScroll = parentList.scrollTop + 64
    if (currentScroll > linkScrollTop) {
      parentList.scrollTop -= scrollAmount
    }
  }

  function scrollDown(
    parentList: HTMLElement,
    linkScrollTop: number,
    parentTop: number,
    linkHeight: number
  ) {
    const scrollAmount = 64 // Adjust this value to change scroll speed
    const currentScroll = parentList.scrollTop
    if (currentScroll < linkScrollTop - parentTop + linkHeight + 64) {
      parentList.scrollTop += scrollAmount
    }
  }
}

function getAbsoluteTop(element: HTMLElement): number {
  let offsetTop = 0
  while (element !== document.body) {
    if (element === null) {
      // child element is:
      // - not attached to the DOM (display: none)
      // - set to fixed position (not scrollable)
      // - body or html element (null offsetParent)
      return NaN
    }
    offsetTop += element.offsetTop
    element = element.offsetParent as HTMLElement
  }
  return offsetTop
}
