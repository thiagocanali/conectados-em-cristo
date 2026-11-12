import { test as base, expect } from '@playwright/test'

export const test = base.extend({
  publicJourneyChecks: [async ({ page, baseURL }, use) => {
    const errors = []
    const writes = []
    const origin = new URL(baseURL).origin
    page.on('pageerror', error => errors.push(error.message))
    // The suite tests our production bundle, not third-party font or Bible services.
    await page.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort())
    await page.exposeFunction('__recordPublicWrite', (method, key) => writes.push({ method, key }))
    await page.addInitScript(() => {
      for (const method of ['setItem', 'removeItem', 'clear']) {
        const original = Storage.prototype[method]
        Storage.prototype[method] = function (...args) {
          window.__recordPublicWrite(method, args[0] ?? null).catch(() => {})
          return original.apply(this, args)
        }
      }
    })
    await use()
    if (!page.isClosed() && new URL(page.url()).origin === origin) {
      await page.evaluate(() => window.__recordPublicWrite('flush', null))
      expect(writes.filter(item => item.method !== 'flush'), 'Public learning must not write to browser storage').toEqual([])
      expect(await page.evaluate(() => localStorage.length + sessionStorage.length)).toBe(0)
      expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), 'Page must fit the viewport').toBe(false)
    }
    expect(errors, 'Public journey must not raise uncaught page errors').toEqual([])
  }, { auto: true }]
})

export { expect }

export async function openRoute(page, path = '/') { await page.goto(`./#${path}`) }
