import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    reporters: ['default'],
    globalSetup: './tests/globalSetup.ts'
  },
});
