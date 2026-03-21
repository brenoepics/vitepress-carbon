/* oxlint-disable @typescript-eslint/no-explicit-any */
import { defineCommand } from 'citty'
import vpcarPkg from '../package.json' with { type: 'json' }
import { commands } from './commands/index.js'
import { checkEngines } from './utils/engines.js'

export const main = defineCommand({
  meta: {
    name: vpcarPkg.name,
    version: vpcarPkg.version,
    description: vpcarPkg.description
  },
  subCommands: commands,
  async setup(ctx) {
    const command = ctx.args._[0]

    // Check Node.js version and CLI updates in background
    const backgroundTask: Promise<void> = checkEngines().catch((err) => {
      console.error(err)
    })

    // Avoid background check to fix prompt issues
    if (command === 'init') {
      await backgroundTask
    }
  }
}) as any /* TODO: Fix rollup type inline issue */
