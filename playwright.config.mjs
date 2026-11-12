import { defineConfig, devices } from '@playwright/test'

const basePath = process.env.E2E_BASE_PATH ?? '/'
if (!['/', '/conectados-em-cristo/'].includes(basePath)) {
  throw new Error('E2E_BASE_PATH must select the Vercel root or GitHub Pages path.')
}
const baseURL = `http://127.0.0.1:4173${basePath}`
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: '**/*.spec.mjs',
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    launchOptions: executablePath ? { executablePath } : {}
  },
  projects: [
    { name: 'chromium-desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'chromium-mobile', use: { ...devices['Pixel 7'], viewport: { width: 390, height: 844 } } }
  ],
  webServer: {
    command: 'npm run build && npm run preview -- --host 127.0.0.1 --port 4173 --strictPort',
    env: { VERCEL: basePath === '/' ? '1' : '' },
    url: baseURL,
    reuseExistingServer: false,
    timeout: 60_000
  }
})
