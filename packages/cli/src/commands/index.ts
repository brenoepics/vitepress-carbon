/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CommandDef } from 'citty'

const _rDefault = (r: any) => (r.default || r) as Promise<CommandDef>

export const commands = {
  init: () => import('./init').then(_rDefault)
} as const
