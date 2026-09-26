import { test as base, expect, type Page } from '@playwright/test'

// Every page is checked for runtime errors: an uncaught exception or a
// console error from our own origin fails the test. Third-party requests
// (analytics, fonts, GitHub) are blocked so the suite is hermetic and a
// flaky network can't hide or fake a regression.

export const test = base.extend<{ pageErrors: string[] }>({
  pageErrors: [
    async ({ page, baseURL }, use) => {
      const errors: string[] = []

      await page.route('**/*', (route) => {
        const url = route.request().url()
        return url.startsWith(baseURL!) || url.startsWith('data:')
          ? route.continue()
          : route.abort()
      })

      page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`))
      page.on('console', (msg) => {
        if (msg.type() !== 'error') return
        // Resource failures are reported with their URL by the `response`
        // handler below (the console text carries no URL), and aborted
        // third-party requests are expected.
        if (msg.text().startsWith('Failed to load resource')) return
        errors.push(`console: ${msg.text()}`)
      })
      // A missing same-origin asset (chunk, font, image) is a real break.
      // The document itself may legitimately 404 (the NotFound page).
      page.on('response', (res) => {
        const req = res.request()
        if (
          res.status() >= 400 &&
          res.url().startsWith(baseURL!) &&
          req.resourceType() !== 'document'
        ) {
          errors.push(`http ${res.status()}: ${res.url()}`)
        }
      })

      await use(errors)

      expect(errors, 'no runtime errors on the page').toEqual([])
    },
    { auto: true }
  ]
})

export { expect }

/**
 * `page.goto` resolves on `load`, but VitePress hydrates only after the
 * page's async chunk arrives. Clicking before that triggers a full browser
 * navigation instead of the client router, so interactive tests go through
 * this helper and wait for Vue to mount first.
 */
export async function gotoHydrated(page: Page, url: string) {
  const response = await page.goto(url)
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          !!(
            document.querySelector('#app') as
              | (Element & { __vue_app__?: unknown })
              | null
          )?.__vue_app__
      )
    )
    .toBe(true)
  return response
}
