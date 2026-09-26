import { expect, gotoHydrated, test } from './fixtures'

// Runs under the `mobile` project only (see playwright.config.ts).

test('hamburger opens the nav screen and locks body scroll', async ({
  page
}) => {
  await gotoHydrated(page, '/')

  const hamburger = page.locator('.VPNavBarHamburger')
  await expect(hamburger).toBeVisible()
  await hamburger.click()

  await expect(page.locator('#VPNavScreen')).toBeVisible()
  await expect(hamburger).toHaveAttribute('aria-expanded', 'true')
  // useScrollLock (@vueuse/core) sets overflow: hidden on the body.
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden')

  await hamburger.click()
  await expect(page.locator('#VPNavScreen')).toBeHidden()
})

test('doc sidebar opens from the local nav', async ({ page }) => {
  await gotoHydrated(page, '/guide/introduction')

  const sidebar = page.locator('.VPSidebar')
  await expect(sidebar).not.toHaveClass(/\bopen\b/)

  await page.locator('.VPLocalNav .menu').click()
  await expect(sidebar).toHaveClass(/\bopen\b/)
  await expect(
    sidebar.getByRole('link', { name: 'Getting Started' })
  ).toBeVisible()
})
