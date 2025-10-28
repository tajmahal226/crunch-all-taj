import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, type UserConfig } from "vite"
import sourceIdentifierPlugin from 'vite-plugin-source-info'

type TestConfig = {
  environment?: string
  include?: string[]
}

const isProd = process.env.BUILD_MODE === 'prod'
const config = {
  plugins: [
    react(),
    sourceIdentifierPlugin({
      enabled: !isProd,
      attributePrefix: 'data-matrix',
      includeProps: true,
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'src/**/*.spec.ts', 'src/**/*.spec.tsx']
  }
} satisfies UserConfig & { test: TestConfig }

export default defineConfig(config)

