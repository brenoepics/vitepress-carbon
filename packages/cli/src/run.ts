/* eslint-disable @typescript-eslint/no-explicit-any */
import { fileURLToPath } from 'node:url'
import { runCommand as _runCommand, runMain as _runMain } from 'citty'

import { commands } from './commands/index.js'
import { main } from './main.js'
globalThis.__vp_cli__ = globalThis.__vp_cli__ || {
  // Programmatic usage fallback
  startTime: Date.now(),
  entry: fileURLToPath(
    new URL(
      import.meta.url.endsWith('.ts')
        ? '../bin/vpcar.mjs'
        : '../../bin/vpcar.mjs',
      import.meta.url
    )
  )
}

export const runMain = () => _runMain(main)

export async function runCommand(
  name: string,
  argv: string[] = process.argv.slice(2),
  data: { overrides?: Record<string, any> } = {}
) {
  argv.push('--no-clear') // Dev

  if (!(name in commands)) {
    throw new Error(`Invalid command ${name}`)
  }

  return await _runCommand(await commands[name as keyof typeof commands](), {
    rawArgs: argv,
    data: {
      overrides: data.overrides || {}
    }
  })
}
