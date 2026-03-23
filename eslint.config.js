import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettier from 'eslint-config-prettier'
import vuePlugin from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'

const browserGlobals = {
  console: 'readonly',
  document: 'readonly',
  navigator: 'readonly',
  window: 'readonly',
}

export default [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  ...vuePlugin.configs['flat/recommended'],
  ...tsPlugin.configs['flat/recommended'],
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: browserGlobals,
    },
  },
  {
    files: ['src/**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: browserGlobals,
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  prettier,
  {
    files: ['src/**/*.vue'],
    rules: {
      'vue/no-multi-spaces': 'warn',
      'vue/html-closing-bracket-spacing': 'warn',
      'vue/multiline-html-element-content-newline': [
        'warn',
        { allowEmptyLines: false },
      ],
    },
  },
]
