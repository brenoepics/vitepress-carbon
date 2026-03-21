import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const packageFiles = {
  root: path.join(rootDir, 'package.json'),
  theme: path.join(rootDir, 'packages/theme/package.json'),
  cli: path.join(rootDir, 'packages/cli/package.json')
}

const releaseTypes = new Set(['major', 'minor', 'patch'])

function printHelp() {
  console.log(`Usage: node scripts/bump-versions.mjs [options]

Options:
  --theme <version|major|minor|patch>  Set or bump vitepress-carbon
  --cli <version|major|minor|patch>    Set or bump vpcar
  --root <version|major|minor|patch>   Set or bump root package.json
  --no-sync-root                       Do not sync root version with theme
  --help                               Show this help message

Examples:
  node scripts/bump-versions.mjs --theme 1.6.0 --cli minor
  node scripts/bump-versions.mjs --theme patch
  node scripts/bump-versions.mjs --root 1.6.0 --cli 2.0.0
`)
}

function parseArgs(argv) {
  const parsed = {
    syncRoot: true
  }

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]

    if (arg === '--help') {
      parsed.help = true
      continue
    }

    if (arg === '--no-sync-root') {
      parsed.syncRoot = false
      continue
    }

    if (!arg.startsWith('--')) {
      throw new Error(`Unknown argument: ${arg}`)
    }

    const key = arg.slice(2)
    if (!['theme', 'cli', 'root'].includes(key)) {
      throw new Error(`Unknown option: ${arg}`)
    }

    const value = argv[index + 1]
    if (!value || value.startsWith('--')) {
      throw new Error(`Missing value for ${arg}`)
    }

    parsed[key] = value
    index += 1
  }

  return parsed
}

function parseVersion(version) {
  const match = version.match(/^(\d+)\.(\d+)\.(\d+)$/)
  if (!match) {
    throw new Error(`Invalid version: ${version}`)
  }

  return match.slice(1).map((value) => Number(value))
}

function resolveVersion(currentVersion, nextValue) {
  if (releaseTypes.has(nextValue)) {
    const [major, minor, patch] = parseVersion(currentVersion)

    if (nextValue === 'major') {
      return `${major + 1}.0.0`
    }

    if (nextValue === 'minor') {
      return `${major}.${minor + 1}.0`
    }

    return `${major}.${minor}.${patch + 1}`
  }

  parseVersion(nextValue)
  return nextValue
}

async function readJson(filePath) {
  const raw = await readFile(filePath, 'utf8')
  return JSON.parse(raw)
}

async function writeJson(filePath, data) {
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`)
}

async function main() {
  const options = parseArgs(process.argv.slice(2))

  if (options.help) {
    printHelp()
    return
  }

  if (!options.theme && !options.cli && !options.root) {
    printHelp()
    throw new Error('Provide at least one package to bump.')
  }

  const packages = {
    root: await readJson(packageFiles.root),
    theme: await readJson(packageFiles.theme),
    cli: await readJson(packageFiles.cli)
  }

  const changes = []

  for (const key of ['root', 'theme', 'cli']) {
    const nextValue = options[key]
    if (!nextValue) continue

    const currentVersion = packages[key].version
    const nextVersion = resolveVersion(currentVersion, nextValue)
    packages[key].version = nextVersion
    changes.push({ key, currentVersion, nextVersion })
  }

  if (options.theme && !options.root && options.syncRoot) {
    const currentVersion = packages.root.version
    const nextVersion = packages.theme.version
    packages.root.version = nextVersion
    changes.push({
      key: 'root',
      currentVersion,
      nextVersion,
      syncedFromTheme: true
    })
  }

  await writeJson(packageFiles.root, packages.root)
  await writeJson(packageFiles.theme, packages.theme)
  await writeJson(packageFiles.cli, packages.cli)

  for (const change of changes) {
    const note = change.syncedFromTheme ? ' (synced with theme)' : ''
    console.log(
      `${change.key}: ${change.currentVersion} -> ${change.nextVersion}${note}`
    )
  }
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
