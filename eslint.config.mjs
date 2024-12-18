import globals from 'globals'
import js from '@eslint/js'
import ts from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettier from 'eslint-plugin-prettier'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 12,
      sourceType: 'module',
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': ts,
      prettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...ts.configs.recommended.rules,
      'prettier/prettier': 'error',
      quotes: ['error', 'single'],
    },
  },
]
