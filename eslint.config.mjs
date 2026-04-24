import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores([
    '.husky/**',
    'node_modules/**',
    'packages/*/dist/**',
    'packages/*/node_modules/**',
  ]),
]);
