import { useData as vitepressUseData } from 'vitepress'
import type { CarbonTheme } from '../CarbonTheme.js'

export const useData: typeof vitepressUseData<CarbonTheme.Config> =
  vitepressUseData
