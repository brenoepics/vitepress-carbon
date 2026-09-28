import { defineConfig, devices } from '@playwright/test'

// End-to-end suite: drives the *built* demo site in a real browser, so a
// dependency bump that only breaks at runtime (hydration, search, client
// composables, math rendering) fails here even when types and unit tests pass.
//
// Build first (`pnpm build` or `pnpm e2e:build`), then run `pnpm test:e2e`.

const port = Number(process.env.E2E_PORT ?? 4173)

export default defineConfig({
  testDir: '.',
  testMatch: '**/*.spec.ts',
  // Resolved relative to this file, so artifacts stay in e2e/ (gitignored).
  outputDir: 'test-results',
  fullyParallel: true,
  // The demo is built unminified and the local search box and its index are
  // lazy chunks, so first paint of those can exceed the 5s default on a busy
  // CI runner.
  expect: { timeout: 10_000 },
  forbidOnly: !!process.env.CI,
  // One `vitepress preview` process serves every worker; more than two
  // browsers on a 4-vCPU runner starves it and turns load into flakes.
  workers: process.env.CI ? 2 : undefined,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI
    ? [
        ['github'],
        ['html', { open: 'never', outputFolder: 'playwright-report' }]
      ]
    : 'list',
  use: {
    baseURL: `http://localhost:${port}`,
    trace: 'retain-on-failure',
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE }
      : {}
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: '**/mobile.spec.ts'
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 7'] },
      testMatch: '**/mobile.spec.ts'
    }
  ],
  webServer: {
    command: `vitepress preview packages/demo --port ${port} --strictPort`,
    cwd: '..',
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000
  }
})
