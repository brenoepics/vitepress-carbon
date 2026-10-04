import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { expect, gotoHydrated, test } from './fixtures'

const themeRequire = createRequire(
  new URL('../packages/theme/package.json', import.meta.url)
)
const docSearchCss = readFileSync(
  themeRequire.resolve('@docsearch/css'),
  'utf8'
)

for (const width of [390, 1024]) {
  for (const appearance of ['light', 'dark']) {
    test(`search button survives late DocSearch CSS at ${width}px in ${appearance} mode`, async ({
      page
    }, testInfo) => {
      await page.setViewportSize({ width, height: 844 })
      await gotoHydrated(page, '/guide/introduction')
      await page.evaluate((mode) => {
        document.documentElement.classList.toggle('dark', mode === 'dark')
      }, appearance)

      // The provider stylesheet can arrive after the theme's overrides.
      await page.addStyleTag({ content: docSearchCss })
      const search = page.getByRole('button', { name: 'Search', exact: true })
      await expect(search).toBeVisible()
      const controlHeight = await search.evaluate((button) =>
        getComputedStyle(button)
          .getPropertyValue('--vp-nav-control-height')
          .trim()
      )
      await expect(search).toHaveCSS('height', controlHeight)
      if (width < 768) {
        await expect(search).toHaveCSS('width', controlHeight)
        await expect(search).toHaveCSS('border-top-color', 'rgba(0, 0, 0, 0)')
      } else {
        await expect(search).not.toHaveCSS(
          'border-top-color',
          'rgba(0, 0, 0, 0)'
        )
      }

      // Removing the resting border must not remove keyboard focus feedback.
      await page.keyboard.press('Tab')
      await search.focus()
      await expect(search).toBeFocused()
      await expect(search).toHaveCSS('outline-style', 'solid')
      await expect(search).toHaveCSS('outline-width', '2px')

      await page.screenshot({ path: testInfo.outputPath('keyboard-focus.png') })

      await search.click()
      await expect(page.locator('#localsearch-input')).toBeFocused({
        timeout: 15_000
      })
    })
  }
}
