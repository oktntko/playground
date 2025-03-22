// @ts-check

import eslint from '@eslint/js';
import prettier from 'eslint-config-prettier/flat';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.all,
  tseslint.configs.all,
  {
    files: ['**/*.{.js,ts,mjs,mts,cjs,cts}'],
    rules: {
      'no-undef': 'off', // When using TypeScript, we recommend to disable no-undef rule directly as TypeScript already check for them and you don't need to worry about this.
      '@typescript-eslint/ban-ts-ignore': 'off',
    },
  },
  { extends: [prettier] },
  { ignores: ['dist/*'] },
);
