import { computed } from 'vue'
import { useData } from './data'
import { isActive } from '../../shared'
import { getSidebar, getFlatSideBarLinks } from '../support/sidebar'

export function usePrevNext() {
  const { page, theme, frontmatter } = useData()

  return computed(() => {
    const sidebar = getSidebar(theme.value.sidebar, page.value.relativePath)
    const candidates = getFlatSideBarLinks(sidebar)

    const index = candidates.findIndex((link) => {
      return isActive(page.value.relativePath, link.link)
    })

    const hidePrev =
      (theme.value.docFooter?.prev === false && !frontmatter.value.prev) ||
      frontmatter.value.prev === false

    const hideNext =
      (theme.value.docFooter?.next === false && !frontmatter.value.next) ||
      frontmatter.value.next === false

    if (typeof frontmatter.value.prev === 'object') {
      if (typeof frontmatter.value.next === 'object') {
        return {
          prev: hidePrev
            ? undefined
            : {
                text:
                  (typeof frontmatter.value.prev === 'string'
                    ? frontmatter.value.prev
                    : frontmatter.value.prev.text) ??
                  candidates[index - 1]?.docFooterText ??
                  candidates[index - 1]?.text,
                link:
                  (typeof frontmatter.value.prev === 'object'
                    ? frontmatter.value.prev.link
                    : undefined) ?? candidates[index - 1]?.link
              },
          next: hideNext
            ? undefined
            : {
                text:
                  (typeof frontmatter.value.next === 'string'
                    ? frontmatter.value.next
                    : frontmatter.value.next.text) ??
                  candidates[index + 1]?.docFooterText ??
                  candidates[index + 1]?.text,
                link:
                  (typeof frontmatter.value.next === 'object'
                    ? frontmatter.value.next.link
                    : undefined) ?? candidates[index + 1]?.link
              }
        } as {
          prev?: { text?: string; link?: string }
          next?: { text?: string; link?: string }
        }
      } else {
        return {
          prev: hidePrev
            ? undefined
            : {
                text:
                  (typeof frontmatter.value.prev === 'string'
                    ? frontmatter.value.prev
                    : frontmatter.value.prev.text) ??
                  candidates[index - 1]?.docFooterText ??
                  candidates[index - 1]?.text,
                link:
                  (typeof frontmatter.value.prev === 'object'
                    ? frontmatter.value.prev.link
                    : undefined) ?? candidates[index - 1]?.link
              },
          next: hideNext
            ? undefined
            : {
                text:
                  (typeof frontmatter.value.next === 'string'
                    ? frontmatter.value.next
                    : undefined) ??
                  candidates[index + 1]?.docFooterText ??
                  candidates[index + 1]?.text,
                link:
                  (typeof frontmatter.value.next === 'object'
                    ? frontmatter.value.next.link
                    : undefined) ?? candidates[index + 1]?.link
              }
        } as {
          prev?: { text?: string; link?: string }
          next?: { text?: string; link?: string }
        }
      }
    } else if (typeof frontmatter.value.next === 'object') {
      return {
        prev: hidePrev
          ? undefined
          : {
              text:
                (typeof frontmatter.value.prev === 'string'
                  ? frontmatter.value.prev
                  : undefined) ??
                candidates[index - 1]?.docFooterText ??
                candidates[index - 1]?.text,
              link:
                (typeof frontmatter.value.prev === 'object'
                  ? frontmatter.value.prev.link
                  : undefined) ?? candidates[index - 1]?.link
            },
        next: hideNext
          ? undefined
          : {
              text:
                (typeof frontmatter.value.next === 'string'
                  ? frontmatter.value.next
                  : frontmatter.value.next.text) ??
                candidates[index + 1]?.docFooterText ??
                candidates[index + 1]?.text,
              link:
                (typeof frontmatter.value.next === 'object'
                  ? frontmatter.value.next.link
                  : undefined) ?? candidates[index + 1]?.link
            }
      } as {
        prev?: { text?: string; link?: string }
        next?: { text?: string; link?: string }
      }
    } else {
      return {
        prev: hidePrev
          ? undefined
          : {
              text:
                (typeof frontmatter.value.prev === 'string'
                  ? frontmatter.value.prev
                  : undefined) ??
                candidates[index - 1]?.docFooterText ??
                candidates[index - 1]?.text,
              link:
                (typeof frontmatter.value.prev === 'object'
                  ? frontmatter.value.prev.link
                  : undefined) ?? candidates[index - 1]?.link
            },
        next: hideNext
          ? undefined
          : {
              text:
                (typeof frontmatter.value.next === 'string'
                  ? frontmatter.value.next
                  : undefined) ??
                candidates[index + 1]?.docFooterText ??
                candidates[index + 1]?.text,
              link:
                (typeof frontmatter.value.next === 'object'
                  ? frontmatter.value.next.link
                  : undefined) ?? candidates[index + 1]?.link
            }
      } as {
        prev?: { text?: string; link?: string }
        next?: { text?: string; link?: string }
      }
    }
  })
}
