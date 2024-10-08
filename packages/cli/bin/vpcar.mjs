#!/usr/bin/env node

import { fileURLToPath } from 'node:url'
import { runMain } from '../dist/index.mjs'

global.__vp_cli__ = {
  startTime: Date.now(),
  entry: fileURLToPath(import.meta.url),
}

runMain()
