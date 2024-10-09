import { useData as vitepressUseData } from 'vitepress'
import type { DefaultTheme } from 'vitepress/theme'

export const useData: typeof vitepressUseData<DefaultTheme.Config> = vitepressUseData
