import { promises as fsp } from 'node:fs'
import { dirname } from 'pathe'

// Check if a file exists
export async function exists(path: string) {
  try {
    await fsp.access(path)
    return true
  } catch {
    return false
  }
}

export function findup<T>(
  rootDir: string,
  fn: (dir: string) => T | undefined
): T | null {
  let dir = rootDir
  while (dir !== dirname(dir)) {
    const res = fn(dir)
    if (res) {
      return res
    }
    dir = dirname(dir)
  }
  return null
}
