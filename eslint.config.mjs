import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import customRules from './rules/require-file-extension-plugin.js'

export default [
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  { ignores: ['**/*.d.ts'] },
  {
    plugins: {
      'brenoepics': customRules
    },
    rules: {
      'no-restricted-imports': [
        'error',
        {
          name: 'vitepress/theme',
          importNames: ['DefaultTheme'],
        }
      ],
      'brenoepics/require-file-extension-in-exports': 'error',
      'brenoepics/require-file-extension-in-imports': 'error',
      'vue/multi-word-component-names': 'off'
    }
  }
]
