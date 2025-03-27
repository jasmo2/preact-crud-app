import { defineConfig } from "vitest/config"
import preact from "@preact/preset-vite"
import { configDefaults } from "vitest/config"

export default defineConfig({
  //@ts-ignore
  plugins: [preact()],
  test: {
    ...configDefaults,
    environment: "jsdom",
    globals: true,
    setupFiles: [".src/test/setup.ts"],
  },
})
