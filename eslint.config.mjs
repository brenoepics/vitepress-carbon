import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import customRules from './rules/eslint-plugin-custom-rules.js'

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
      'custom-rules': customRules
    },
    rules: {
      'no-restricted-imports': [
        'error',
        {
          name: 'vitepress',
          importNames: ['DefaultTheme']
        }
      ],
      //'no-restricted-imports': [
      //  'error',
      //  {
      //    patterns: ['^(?!.*\\.[a-z]+$).*'],
      //  }
      //],
      'custom-rules/require-file-extension-in-exports': 'error',
      'vue/multi-word-component-names': 'off'
    }
  }
]
