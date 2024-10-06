import { withBase } from 'vitepress'
import { useData } from '../composables/data'
import { isExternal, treatAsHtml } from '../../shared'

export function throttleAndDebounce(fn: () => void, delay: number): () => void {
  let timeoutId: NodeJS.Timeout
  let called = false

  return () => {
    if (timeoutId) clearTimeout(timeoutId)

    if (!called) {
      fn()
      called = true
      setTimeout(() => (called = false), delay)
    } else timeoutId = setTimeout(fn, delay)
  }
}

export function ensureStartingSlash(path: string): string {
  return path.startsWith('/') ? path : `/${path}`
}

export function normalizeLink(url: string): string {
  const { pathname, search, hash, protocol } = new URL(url, 'https://a.com')

  if (
    isExternal(url) ||
    url.startsWith('#') ||
    !protocol.startsWith('http') ||
    !treatAsHtml(pathname)
  )
    return url

  const { site } = useData()

  let normalizedPath: string
  if (site.value.cleanUrls) {
    normalizedPath =
      pathname.endsWith('/') || pathname.endsWith('.html')
        ? url
        : url.replace(
            /(?:(^\.+)\/)?.*$/,
            `$1${pathname.replace(/(\.md)?$/, '')}${search}${hash}`
          )
  } else {
    normalizedPath =
      pathname.endsWith('/') || pathname.endsWith('.html')
        ? url
        : url.replace(
            /(?:(^\.+)\/)?.*$/,
            `$1${pathname.replace(/(\.md)?$/, '.html')}${search}${hash}`
          )
  }

  return withBase(normalizedPath)
}
