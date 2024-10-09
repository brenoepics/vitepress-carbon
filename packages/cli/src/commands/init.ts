import type { DownloadTemplateResult } from 'giget'
import { downloadTemplate, startShell } from 'giget'
import { dirname, join, relative, resolve } from 'pathe'
import { consola } from 'consola'
import type { PackageManagerName } from 'nypm'
import { installDependencies } from 'nypm'
import { defineCommand } from 'citty'

import { sharedArgs } from './_shared.js'
import { stringify } from 'yaml'
import { promises as fsp } from 'node:fs'
import { dependabotTemplate, githubPagesTemplate } from '../utils/templates'
import { Hyperlink } from '../utils/console'

const DEFAULT_REGISTRY =
  'https://raw.githubusercontent.com/brenoepics/vitepress-carbon/main/packages/templates/'
const repoLink = Hyperlink(
  'VitePress Carbon',
  'https://github.com/brenoepics/vitepress-carbon'
)
export default defineCommand({
  meta: {
    name: 'init',
    description: 'Initialize a fresh project'
  },
  args: {
    ...sharedArgs,
    dir: {
      type: 'positional',
      description: 'Project directory',
      default: ''
    },
    force: {
      type: 'boolean',
      alias: 'f',
      description: 'Override existing directory'
    },
    offline: {
      type: 'boolean',
      description: 'Force offline mode'
    },
    preferOffline: {
      type: 'boolean',
      description: 'Prefer offline mode'
    },
    install: {
      type: 'boolean',
      default: true,
      description: 'Skip installing dependencies'
    },
    gitInit: {
      type: 'boolean',
      description: 'Initialize git repository'
    },
    shell: {
      type: 'boolean',
      description: 'Start shell after installation in project directory'
    },
    language: {
      type: 'string',
      description: 'Choose the language (typescript, javascript)'
    },
    packageManager: {
      type: 'string',
      description: 'Package manager choice (npm, pnpm, yarn, bun)'
    },
    addGHActions: {
      type: 'string',
      description: 'Add GitHub Actions workflows'
    }
  },
  async run(ctx) {
    const cwd = resolve(ctx.args.cwd || '.')

    type SelectOption = {
      label: string
      value: string
      hint?: string
    }
    // Get template name
    const templateOptions: SelectOption[] = [
      {
        label: 'TypeScript',
        value: 'typescript',
        hint: 'Recommended'
      },
      {
        label: 'JavaScript',
        value: 'javascript'
      }
    ]
    const templateName =
      ctx.args.language &&
      templateOptions.some((value) => value.value === ctx.args.language)
        ? templateOptions.find((value) => value.value === ctx.args.language)!
            .value
        : ((await consola.prompt('Which template would you like to use?', {
            type: 'select',
            options: templateOptions
          })) as unknown as string)

    // Download template
    let template: DownloadTemplateResult

    try {
      template = await downloadTemplate(templateName, {
        dir: ctx.args.dir,
        cwd,
        force: Boolean(ctx.args.force),
        offline: Boolean(ctx.args.offline),
        preferOffline: Boolean(ctx.args.preferOffline),
        registry: process.env.vpcar_INIT_REGISTRY ?? DEFAULT_REGISTRY
      })
    } catch (err) {
      if (process.env.DEBUG) {
        throw err
      }
      consola.error((err as Error).toString())
      process.exit(1)
    }

    // Resolve package manager
    const packageManagerOptions: PackageManagerName[] = [
      'npm',
      'pnpm',
      'yarn',
      'bun'
    ]
    const packageManagerArg = ctx.args.packageManager as PackageManagerName
    const selectedPackageManager = packageManagerOptions.includes(
      packageManagerArg
    )
      ? packageManagerArg
      : await consola.prompt('Which package manager would you like to use?', {
          type: 'select',
          options: packageManagerOptions
        })

    const ghActionsOptions = ['dependabot', 'github-pages', 'none']
    const selectedGHActions = ctx.args.addGHActions
      ? ctx.args.addGHActions.split(',')
      : await consola.prompt(
          'Which GitHub Actions workflows would you like to add?',
          {
            type: 'multiselect',
            options: ghActionsOptions,
            required: false
          }
        )

    if (
      !selectedGHActions.includes('none') &&
      selectedGHActions.includes('dependabot')
    ) {
      consola.info('Adding Dependabot configuration...')
      const dependabotConfig = stringify(dependabotTemplate)
      const dependabotPath = join(template.dir, '.github', 'dependabot.yml')
      await fsp.mkdir(dirname(dependabotPath), { recursive: true })
      await fsp.writeFile(dependabotPath, dependabotConfig, 'utf8')
    }

    if (
      !selectedGHActions.includes('none') &&
      selectedGHActions.includes('github-pages')
    ) {
      consola.info('Adding GitHub Pages workflow...')
      const githubPagesConfig = stringify(
        githubPagesTemplate(selectedPackageManager)
      )
      const githubPagesPath = join(
        template.dir,
        '.github',
        'workflows',
        'deploy-pages.yml'
      )
      await fsp.mkdir(dirname(githubPagesPath), { recursive: true })
      await fsp.writeFile(githubPagesPath, githubPagesConfig, 'utf8')
    }

    // Install project dependencies
    // or skip installation based on the '--no-install' flag
    if (ctx.args.install === false) {
      consola.info('Skipping install dependencies step.')
    } else {
      consola.start('Installing dependencies...')

      try {
        await installDependencies({
          cwd: template.dir,
          packageManager: {
            name: selectedPackageManager,
            command: selectedPackageManager
          }
        })
      } catch (err) {
        if (process.env.DEBUG) {
          throw err
        }
        consola.error((err as Error).toString())
        process.exit(1)
      }

      consola.success('Installation completed.')
    }

    if (ctx.args.gitInit === undefined) {
      ctx.args.gitInit = await consola.prompt('Initialize git repository?', {
        type: 'confirm'
      })
    }
    if (ctx.args.gitInit) {
      consola.info('Initializing git repository...\n')
      const { execa } = await import('execa')
      await execa('git', ['init', template.dir], {
        stdio: 'inherit'
      }).catch((err) => {
        consola.warn(`Failed to initialize git repository: ${err}`)
      })
    }

    // Display next steps
    consola.log(
      `\n✨ ${repoLink} project has been created with the \`${template.name}\` template. Next steps:`
    )
    const relativeTemplateDir = relative(process.cwd(), template.dir) || '.'
    const nextSteps = [
      !ctx.args.shell &&
        relativeTemplateDir.length > 1 &&
        `\`cd ${relativeTemplateDir}\``,
      `Start development server with \`${selectedPackageManager} run docs:dev\``
    ].filter(Boolean)

    for (const step of nextSteps) {
      consola.log(` › ${step}`)
    }

    if (ctx.args.shell) {
      startShell(template.dir)
    }
  }
})
