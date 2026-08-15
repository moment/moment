import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    pool: 'forks',
    projects: [
      {
        extends: true,
        test: {
          name: 'moment',
          include: ['test/moment/**/*.test.js'],
          setupFiles: ['test/setup.js', 'test/setup-all-locales.js'],
          sequence: {
            groupOrder: 0,
          },
        },
      },
      {
        extends: true,
        test: {
          name: 'locale',
          include: ['test/locale/**/*.test.js'],
          setupFiles: ['test/setup.js'],
          sequence: {
            groupOrder: 1,
          },
        },
      },
    ],
  },
});
