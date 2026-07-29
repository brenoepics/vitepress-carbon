#!/usr/bin/env node
/**
 * Builds the contributor roll for the demo home page.
 *
 * "Contribution" here is deliberately broad: opening an issue, leaving a
 * comment or reviewing a pull request counts the same as pushing a commit.
 * Anyone who showed up gets a face on the page.
 *
 * Usage:
 *   GITHUB_TOKEN=$(gh auth token) node scripts/fetch-contributors.mjs
 *
 * Without a token the GitHub API allows 60 requests/hour, which is not enough
 * for a repo of any size — the script will tell you rather than emit a
 * half-populated list.
 */

import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const REPO = process.env.CONTRIBUTORS_REPO ?? 'brenoepics/vitepress-carbon'
const TOKEN = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN ?? ''

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(
  __dirname,
  '../packages/demo/.vitepress/theme/data/contributors.json'
)

const API = 'https://api.github.com'

/** Contribution kinds, in the order they are surfaced in the UI legend. */
const KINDS = ['commits', 'pullRequests', 'issues', 'reviews', 'comments']

async function api(path) {
  const res = await fetch(`${API}${path}`, {
    headers: {
      accept: 'application/vnd.github+json',
      'user-agent': 'vitepress-carbon-contributors',
      ...(TOKEN ? { authorization: `Bearer ${TOKEN}` } : {})
    }
  })

  if (res.status === 403 || res.status === 429) {
    const reset = res.headers.get('x-ratelimit-reset')
    throw new Error(
      `GitHub rate limit hit${
        reset ? ` (resets ${new Date(reset * 1000).toISOString()})` : ''
      }. Set GITHUB_TOKEN=$(gh auth token) and retry.`
    )
  }

  if (!res.ok) {
    throw new Error(`GET ${path} -> ${res.status} ${res.statusText}`)
  }

  return res.json()
}

/** Walks every page of a list endpoint. */
async function* paginate(path) {
  const sep = path.includes('?') ? '&' : '?'

  for (let page = 1; ; page++) {
    const batch = await api(`${path}${sep}per_page=100&page=${page}`)
    if (!Array.isArray(batch) || batch.length === 0) return
    yield* batch
    if (batch.length < 100) return
  }
}

const people = new Map()
const skipped = new Set()

/**
 * Automation accounts that register as `type: "User"` and so can't be detected
 * from the API alone. Extend via CONTRIBUTORS_EXCLUDE (comma-separated).
 */
const DENYLIST = new Set(
  ['imgbotapp', 'dependabot', 'renovate', 'github-actions', 'codecov']
    .concat((process.env.CONTRIBUTORS_EXCLUDE ?? '').split(','))
    .map((n) => n.trim().toLowerCase())
    .filter(Boolean)
)

/** Bots contribute plenty, but they are not who this section is thanking. */
function isBot(user) {
  if (!user) return true

  const login = user.login.toLowerCase()
  const bot =
    user.type === 'Bot' ||
    login.endsWith('[bot]') ||
    // Boundary-anchored so real logins like "abbot" survive.
    /(^|[-_])bot$/.test(login) ||
    DENYLIST.has(login)

  if (bot) skipped.add(user.login)
  return bot
}

function credit(user, kind, amount = 1) {
  if (isBot(user)) return

  let person = people.get(user.login)
  if (!person) {
    person = {
      login: user.login,
      avatar: `${user.avatar_url.split('?')[0]}?s=96`,
      url: user.html_url,
      total: 0,
      ...Object.fromEntries(KINDS.map((k) => [k, 0]))
    }
    people.set(user.login, person)
  }

  person[kind] += amount
  person.total += amount
}

async function main() {
  if (!TOKEN) {
    console.warn(
      'No GITHUB_TOKEN set — falling back to anonymous requests (60/hour).'
    )
  }

  console.log(`Collecting contributors for ${REPO}…`)

  // Commit authors. This endpoint already aggregates per-author counts.
  for (const c of await api(`/repos/${REPO}/contributors?per_page=100`)) {
    credit(c, 'commits', c.contributions)
  }
  console.log(`  commits      ${people.size} authors`)

  // Issues and pull requests. The issues endpoint returns both; entries with
  // a `pull_request` key are PRs.
  let issues = 0
  for await (const issue of paginate(`/repos/${REPO}/issues?state=all`)) {
    credit(issue.user, issue.pull_request ? 'pullRequests' : 'issues')
    issues++
  }
  console.log(`  issues/PRs   ${issues}`)

  // Comments on issues and PRs, plus inline review comments on diffs.
  let comments = 0
  for (const path of [
    `/repos/${REPO}/issues/comments`,
    `/repos/${REPO}/pulls/comments`,
    `/repos/${REPO}/comments`
  ]) {
    for await (const comment of paginate(path)) {
      credit(comment.user, 'comments')
      comments++
    }
  }
  console.log(`  comments     ${comments}`)

  // Reviews are per-PR, so this is the expensive pass. An approval with no
  // body still counts — it is a real review.
  const prNumbers = []
  for await (const pr of paginate(`/repos/${REPO}/pulls?state=all`)) {
    prNumbers.push(pr.number)
  }

  let reviews = 0
  for (const number of prNumbers) {
    for (const review of await api(
      `/repos/${REPO}/pulls/${number}/reviews?per_page=100`
    )) {
      credit(review.user, 'reviews')
      reviews++
    }
  }
  console.log(`  reviews      ${reviews} across ${prNumbers.length} PRs`)

  const contributors = [...people.values()].sort(
    (a, b) => b.total - a.total || a.login.localeCompare(b.login)
  )

  if (skipped.size) {
    const names = [...skipped].sort((a, b) => a.localeCompare(b))
    console.log(`\nSkipped as automation: ${names.join(', ')}`)
  }

  // Only the people and their counts are material. `generatedAt` changes on
  // every run, so comparing whole files would make the weekly job open a PR
  // even when nobody new turned up — compare the roll itself and leave the
  // file untouched when it matches.
  const next = JSON.stringify(contributors)
  const previous = await readFile(OUT, 'utf8').then(
    (raw) => JSON.stringify(JSON.parse(raw).contributors),
    () => null
  )

  if (previous === next) {
    console.log(`\nNo change — ${contributors.length} people, file untouched.`)
    return
  }

  const payload = {
    repo: REPO,
    generatedAt: new Date().toISOString(),
    contributors
  }

  await writeFile(OUT, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
  console.log(`\n${contributors.length} people written to ${OUT}`)
}

main().catch((error) => {
  console.error(`\n${error.message}`)
  process.exitCode = 1
})
