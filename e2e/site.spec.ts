import { expect, gotoHydrated, test } from './fixtures'

// Survives client-side navigation, but not a full page load.
type MarkedWindow = Window & { __e2eMarker?: boolean }

test.describe('home page', () => {
  test('renders the hero and features and hydrates', async ({ page }) => {
    // gotoHydrated asserts that Vue mounted onto the server-rendered markup.
    await gotoHydrated(page, '/')

    await expect(page.locator('.VPHero')).toContainText('VitePress Carbon')
    await expect(page.locator('.VPHero')).toContainText('Streamlined Theme')
    await expect(page.locator('.VPFeature').first()).toContainText(
      'Responsive Design'
    )
  })

  test('hero action navigates client-side to the guide', async ({ page }) => {
    await gotoHydrated(page, '/')
    await page.getByRole('link', { name: 'Introduction' }).first().click()

    await expect(page).toHaveURL(/\/guide\/introduction/)
    await expect(page.locator('.vp-doc h1')).toHaveText(/VitePress Carbon/)
  })
})

test.describe('doc page', () => {
  test('shows sidebar, outline and prev/next', async ({ page }) => {
    await gotoHydrated(page, '/guide/introduction')

    await expect(page.locator('.VPSidebar')).toBeVisible()
    await expect(page.locator('.VPDocAsideOutline')).toHaveClass(/has-outline/)
    await expect(page.locator('.VPDocFooter .pager-link').first()).toBeVisible()
  })

  test('sidebar link navigates without a full reload', async ({ page }) => {
    await gotoHydrated(page, '/guide/introduction')
    await page.evaluate(() => {
      ;(window as MarkedWindow).__e2eMarker = true
    })

    await page
      .locator('.VPSidebar')
      .getByRole('link', { name: 'Getting Started' })
      .click()

    await expect(page).toHaveURL(/\/guide\/getting-started/)
    expect(
      await page.evaluate(() => (window as MarkedWindow).__e2eMarker)
    ).toBe(true)
  })

  test('components imported from vitepress-carbon/components render', async ({
    page
  }) => {
    await gotoHydrated(page, '/guide/components')
    const example = page.locator('.live-example')
    await expect(example.locator('a.VPButton')).toHaveText('Get Started')
    await expect(example.locator('.VPBadge')).toHaveText('new')
  })

  test('code blocks have a working copy button', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])
    await gotoHydrated(page, '/examples/markdown-examples')

    const block = page.locator('div[class*="language-"]').first()
    await block.hover()
    await block.locator('button.copy').click()
    await expect(block.locator('button.copy')).toHaveClass(/copied/)
  })

  test('math renders to SVG', async ({ page }) => {
    // Exercises the markdown-it-mathjax3 → mathjax-full → @xmldom/xmldom
    // chain that the security overrides pin.
    await gotoHydrated(page, '/examples/math-equations')

    await expect(page.locator('mjx-container svg').first()).toBeVisible()
  })
})

test.describe('local search', () => {
  test('finds a page and navigates to it', async ({ page }) => {
    await gotoHydrated(page, '/')
    await page.locator('.DocSearch-Button').click()

    // First open downloads the search box and index chunks.
    const input = page.locator('#localsearch-input')
    await expect(input).toBeFocused({ timeout: 15_000 })
    await input.fill('getting started')

    const result = page.locator('.VPLocalSearchBox .result').first()
    await expect(result).toBeVisible()
    await result.click()

    await expect(page.locator('.VPLocalSearchBox')).toBeHidden()
    await expect(page).toHaveURL(/\/guide\//)
  })

  test('opens with the keyboard shortcut and closes with Escape', async ({
    page
  }) => {
    await gotoHydrated(page, '/guide/introduction')
    await page.keyboard.press('ControlOrMeta+k')

    await expect(page.locator('.VPLocalSearchBox')).toBeVisible({
      timeout: 15_000
    })
    // useFocusTrap (@vueuse/integrations) keeps focus inside the dialog.
    await expect(page.locator('#localsearch-input')).toBeFocused()

    await page.keyboard.press('Escape')
    await expect(page.locator('.VPLocalSearchBox')).toBeHidden()
  })
})

test.describe('appearance', () => {
  test('toggles appearance and persists it across reloads', async ({
    page
  }) => {
    await gotoHydrated(page, '/')

    // Carbon defaults to dark (`appearance.initialValue` in baseConfig).
    const html = page.locator('html')
    await expect(html).toHaveClass(/\bdark\b/)

    await page
      .locator('.VPNavBar .VPSwitchAppearance')
      .filter({ visible: true })
      .click()
    await expect(html).not.toHaveClass(/\bdark\b/)

    await page.reload()
    await expect(html).not.toHaveClass(/\bdark\b/)
  })
})

test.describe('generated assets', () => {
  test('serves llms.txt from vitepress-plugin-llms', async ({ request }) => {
    const res = await request.get('/llms.txt')

    expect(res.ok()).toBe(true)
    expect(await res.text()).toContain('VitePress Carbon')
  })

  test('unknown routes render the 404 page', async ({ page }) => {
    const res = await gotoHydrated(page, '/this-page-does-not-exist')

    expect(res?.status()).toBe(404)
    await expect(page.locator('.NotFound')).toBeVisible()
  })
})
