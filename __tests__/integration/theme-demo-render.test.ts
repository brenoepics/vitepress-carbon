import { execFile } from 'node:child_process'
import { access, readFile, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import { beforeAll, describe, expect, test } from 'vitest'

const execFileAsync = promisify(execFile)

const workspaceRoot = fileURLToPath(new URL('../../', import.meta.url))
const themeDistDir = path.join(workspaceRoot, 'packages/theme/dist')
const demoDistDir = path.join(workspaceRoot, 'packages/demo/.vitepress/dist')

async function runPnpm(args: string[]) {
  await execFileAsync('pnpm', args, {
    cwd: workspaceRoot,
    env: {
      ...process.env,
      CI: 'true'
    },
    maxBuffer: 10 * 1024 * 1024
  })
}

async function readBuiltFile(...segments: string[]) {
  return readFile(path.join(demoDistDir, ...segments), 'utf8')
}

beforeAll(async () => {
  await rm(themeDistDir, { recursive: true, force: true })
  await rm(demoDistDir, { recursive: true, force: true })

  await runPnpm(['--filter', 'vitepress-carbon', 'run', 'build'])
  await runPnpm(['--filter', 'vitepress-carbon-demo', 'run', 'demo-build'])
}, 600_000)

describe('theme and demo integration rendering', () => {
  test('builds the theme artifacts consumed by the demo', async () => {
    await expect(
      access(path.join(themeDistDir, 'index.js'))
    ).resolves.toBeUndefined()
    await expect(
      access(path.join(themeDistDir, 'theme/index.js'))
    ).resolves.toBeUndefined()
    await expect(
      access(path.join(themeDistDir, 'theme/config/baseConfig.js'))
    ).resolves.toBeUndefined()
  })

  test('renders the demo home page with theme chrome and custom content', async () => {
    const html = await readBuiltFile('index.html')

    expect(html).toContain('<div id="app"><div class="Layout"')
    expect(html).toContain('Create Repository')
    expect(html).toContain('Streamlined Theme')
    expect(html).toContain('Responsive Design')
    expect(html).toContain('DocSearch-Button-Placeholder">Search...')
    expect(html).toContain('Mona-Sans')
  })

  test('renders guide pages with markdown content, sidebar, and outline', async () => {
    const html = await readBuiltFile('guide', 'introduction.html')

    expect(html).toContain(
      'VitePress Carbon is a sleek and minimalistic theme for VitePress'
    )
    expect(html).toContain('VPDocAside')
    expect(html).toContain('On this page')
    expect(html).toContain('Getting Started')
    expect(html).toContain('Create Repository')
  })
})
