import { defineCommand } from 'citty'
import vpcarPkg from '../package.json' assert { type: 'json' }
import { commands } from './commands'
import { checkEngines } from './utils/engines'

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
    let backgroundTasks: Promise<any> | undefined
    backgroundTasks = Promise.all([
      checkEngines()
      // checkForUpdates(),
    ]).catch((err) => console.error(err))

    // Avoid background check to fix prompt issues
    if (command === 'init') {
      await backgroundTasks
    }
  }
}) as any /* TODO: Fix rollup type inline issue */
