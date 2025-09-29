import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/**/*.ts',
    '!src/**/*.test.ts',
    '!src/tests.ts',
    '!src/teardown.ts',
    '!src/generated/prisma/**'
  ],
  outDir: 'dist',
  format: ['cjs'],
  target: 'esnext',
  sourcemap: true,
  clean: true,
  dts: false,
  external: [
    '@prisma/client',
    'prisma',
    '.prisma',
    '.wasm'
  ],
})

