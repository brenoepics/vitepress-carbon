# AGENTS.md

Operating guide for AI coding agents (and new contributors) working in this
repository. Read this before making changes. For anything visual, also read
[design.md](design.md) — the design‑system spec that all UI must follow.

## What this is

**vitepress-carbon** ("Carbon") is a sleek, near‑monochrome theme for
[VitePress](https://vitepress.dev) documentation sites. It is a **pnpm workspace
monorepo**:

| Path                 | Package                     | Purpose                                                                         |
| -------------------- | --------------------------- | ------------------------------------------------------------------------------- |
| `packages/theme`     | `vitepress-carbon`          | The published theme. **The main package.** Builds to `dist/`.                   |
| `packages/cli`       | `vpcar`                     | Published CLI (`vpcar init`) that scaffolds Carbon sites. Built with `unbuild`. |
| `packages/demo`      | `vitepress-carbon-demo`     | Demo docs site that consumes the theme via `link:../theme`. Not published.      |
| `packages/templates` | —                           | JSON starter descriptors used by the CLI's init flow.                           |
| `/` (root)           | `vitepress-carbon-monorepo` | Private root: shared scripts, tooling config, integration tests.                |

## Environment

- **Package manager: pnpm `9.9.0` only.** Every package has `preinstall: only-allow pnpm` — npm/yarn will fail. Do not add a `package-lock.json` or `yarn.lock`.
- **Node: `22.18.0`** (`.node-version`). Engines allow `^20.19.0 || >=22.18.0`.
- Install with `pnpm install` (use `--frozen-lockfile` in CI‑like runs).

## Commands

Run these from the repo root.

| Task                | Command                                    | Notes                                                  |
| ------------------- | ------------------------------------------ | ------------------------------------------------------ |
| Install             | `pnpm install`                             |                                                        |
| Dev                 | `pnpm dev`                                 | Builds the theme, then serves the demo.                |
| Build all           | `pnpm build`                               | Order: **theme → cli → demo**.                         |
| Build theme only    | `pnpm --filter vitepress-carbon run build` | `vue-tsc --noEmit` → `tsc` → copy assets.              |
| Test                | `pnpm test`                                | `vp test run` (Vitest).                                |
| Integration tests   | `pnpm test:integration`                    | `vp test run __tests__/integration`.                   |
| Lint (autofix)      | `pnpm lint`                                |                                                        |
| Lint (check only)   | `pnpm lint:check`                          |                                                        |
| Format (write)      | `pnpm format`                              |                                                        |
| Format (check only) | `pnpm format:check`                        |                                                        |
| Full check          | `pnpm check`                               | `lint:check && format:check`. Run before every commit. |

**Before opening a PR, `pnpm check`, `pnpm test`, and `pnpm build` must all pass.**

## Toolchain notes (important)

- Linting, formatting, and testing are handled by the **`vp` CLI** (Vite+ /
  `vite-plus`, pinned in the `pnpm-workspace.yaml` catalog to `@voidzero-dev/*`
  `0.1.24`). It bundles **oxlint + tsgolint** and a formatter.
- **There are no `.eslintrc`, `.prettierrc`, or `oxlint.json` files** — rules come
  from `vp` defaults. Don't add competing linters/formatters.
- The `vp` toolchain updates itself and can get stricter over time (e.g. it rejects
  removed TypeScript compiler options). If `pnpm check` fails on a `tsconfig-error`,
  fix the flagged `tsconfig.json`, don't pin around it.
- Git hooks are Vite+‑managed (`.vite-hooks/`); `pre-commit` runs `vp staged`.
  There is no husky or commitlint.

## Conventions

- **Formatting:** 2‑space indent, **single quotes**, no semicolons in `.mjs`
  scripts, UTF‑8, trailing newline, trim trailing whitespace (`.editorconfig`).
  Let `pnpm format` enforce it rather than hand‑formatting.
- **TypeScript:** `strict` everywhere; `module`/`moduleResolution` are `esnext` /
  `bundler`. The theme uses `verbatimModuleSyntax` — use `import type` for types.
- **Vue:** components live in `packages/theme/src/theme/components` as `VP*.vue`;
  logic goes in `composables/`. Match the existing file's style.
- **Styling:** never hardcode colors, spacing, radius, or font stacks. Use the
  `--vp-*` tokens in
  [`packages/theme/src/theme/styles/vars.css`](packages/theme/src/theme/styles/vars.css)
  and follow [design.md](design.md). Any new token needs **both** a `:root` (light)
  and a `.dark` (dark) value.

## Making changes

1. Branch off `main`.
2. Make the change; keep it scoped. Update the README if you change a public interface.
3. **Add a changeset** for anything user‑facing: `pnpm changeset` (this repo uses
   [Changesets](https://github.com/changesets/changesets); `baseBranch: main`,
   `access: public`, and `vitepress-carbon-demo` is ignored). Version bumps go
   through `pnpm bump:versions` (`--theme` / `--cli` / `--root`); the root version
   syncs to the theme by default.
4. Run `pnpm check && pnpm test && pnpm build`.
5. Open a PR.

## CI & review expectations

- **CI matrix:** Node `20.19.0`, `22.18.0`, `24`. CI runs `vp install --frozen-lockfile`,
  `vp check --fix` (skipped on `20.19.0`), `vp run test`, `vp run build`. Additional
  jobs: CodeQL, dependency‑review, OpenSSF Scorecard, Pages deploy.
- **Reviews:** per `CONTRIBUTING.md`, a PR needs sign‑off from **two** other
  developers and follows SemVer. Be conventional and descriptive in commit
  messages and PR descriptions.
- Publishing is automated on GitHub release (`pnpm publish --provenance` for the
  theme and CLI) — never publish manually.

## Guardrails for agents

- Don't weaken security: the root `package.json` `pnpm.overrides` and the
  `pnpm-workspace.yaml` catalog pins exist to patch CVEs. Don't remove or loosen
  them without a reason, and re‑run `pnpm audit` if you touch dependencies.
- Don't commit `dist/` (it's built) or lockfiles for other package managers.
- Prefer editing tokens/composables over duplicating logic or styles.
- When in doubt about a visual decision, defer to [design.md](design.md).
