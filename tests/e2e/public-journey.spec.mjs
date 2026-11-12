import { readFile } from 'node:fs/promises'
import { test, expect, openRoute } from './public-test.mjs'

async function downloadedText(page, button) {
  const pending = page.waitForEvent('download')
  await button.click()
  const download = await pending
  expect(await download.failure()).toBeNull()
  return { filename: download.suggestedFilename(), text: await readFile(await download.path(), 'utf8') }
}

test('a visitor can move from the home to Scripture, questions, practice and a meeting', async ({ page }) => {
  await openRoute(page)
  await expect(page.locator('main')).toHaveCount(1)
  await page.getByRole('link', { name: 'Começar pelo convite de Jesus' }).click()
  await expect(page.getByRole('heading', { name: 'O convite de Jesus', exact: true })).toBeVisible()
  const passage = page.getByRole('link', { name: /Ler Marcos/ })
  const url = new URL(await passage.getAttribute('href'))
  expect(url.hostname).toBe('www.biblegateway.com')
  expect(url.searchParams.get('search')).toBe('Marcos 1:14-20')
  await expect(passage).toHaveAttribute('target', '_blank')
  await page.getByRole('button', { name: 'Ir para as perguntas', exact: true }).click()
  await expect(page.locator('.learning-questions li')).toHaveCount(3)
  await expect(page.locator('section[aria-labelledby="step-title"]')).toBeFocused()
  await page.getByRole('button', { name: 'Ir para a prática', exact: true }).click()
  await page.getByRole('link', { name: 'Preparar este estudo para um grupo', exact: true }).click()
  await expect(page.locator('#guide-study')).toHaveValue('o-convite-de-jesus')
})

test('meeting selections survive reload and the share link has a manual-copy fallback', async ({ page }) => {
  await openRoute(page, '/em-comunidade?estudo=aprender-a-orar&tempo=60&relato=not-for-sharing')
  await expect(page.locator('#guide-duration')).toHaveValue('60')
  await page.locator('#guide-study').selectOption('amar-o-proximo')
  await expect(page).toHaveURL(/estudo=amar-o-proximo/)
  await page.locator('#guide-duration').selectOption('30')
  await expect(page).toHaveURL(/tempo=30/)
  await page.reload()
  await expect(page.locator('#guide-study')).toHaveValue('amar-o-proximo')
  await expect(page.locator('#guide-duration')).toHaveValue('30')
  const link = await page.locator('#meeting-link').inputValue()
  expect(link).not.toContain('relato')
  expect(link).toContain('tempo=30')
  await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', {
    configurable: true, value: { writeText: async () => { throw new Error('Permission denied') } }
  }))
  await page.getByRole('button', { name: 'Copiar link do roteiro', exact: true }).click()
  await expect(page.getByRole('alert')).toContainText('Selecione o link')
  await page.locator('#meeting-link').focus()
  expect(await page.locator('#meeting-link').evaluate(input => input.selectionEnd - input.selectionStart)).toBe(link.length)
})

test('the four-session path exports a complete kit and keeps duration in the next meetings', async ({ page }) => {
  await openRoute(page, '/estudos')
  await page.getByRole('link', { name: 'Conhecer a caminhada', exact: true }).click()
  await expect(page.locator('.path-session')).toHaveCount(4)
  await page.locator('#path-duration').selectOption('60')
  await expect(page).toHaveURL(/tempo=60/)
  await page.reload()
  await expect(page.locator('#path-duration')).toHaveValue('60')
  const kit = await downloadedText(page, page.getByRole('button', { name: 'Baixar kit dos quatro encontros', exact: true }))
  expect(kit.filename).toContain('60min.txt')
  expect(kit.text.match(/Duração: 60 minutos/g)).toHaveLength(4)
  expect(kit.text.match(/CONTEXTO DA PASSAGEM/g)).toHaveLength(4)
  expect(kit.text.match(/ENTRE OS ENCONTROS/g)).toHaveLength(4)
  await page.getByRole('link', { name: 'Preparar encontro 1', exact: true }).click()
  for (const title of ['Permanecer em Cristo', 'Aprender a orar com Jesus', 'Quem se fez próximo?']) {
    await page.getByRole('link', { name: `Preparar próximo encontro: ${title}`, exact: true }).click()
    await expect(page.getByRole('heading', { name: title, exact: true })).toBeVisible()
    await expect(page.locator('#guide-duration')).toHaveValue('60')
  }
  await expect(page.getByRole('link', { name: /Preparar próximo encontro:/ })).toHaveCount(0)
  const individual = await downloadedText(page, page.getByRole('button', { name: 'Baixar roteiro em texto', exact: true }))
  expect(individual.text).toContain('ENCONTRO 4')
  expect(individual.text).toContain('PARA A PRÓXIMA CONVERSA')
})

test('conducting supports keyboard focus and prints the full guide, not only the active step', async ({ page }) => {
  await openRoute(page, '/em-comunidade?estudo=o-convite-de-jesus&tempo=30')
  await page.getByRole('button', { name: 'Conduzir encontro por etapas', exact: true }).click()
  await expect(page.locator('.meeting-conductor')).toBeFocused()
  await expect(page.getByRole('heading', { name: 'Acolher', exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Próxima etapa: Ler a passagem', exact: true }).click()
  await page.emulateMedia({ media: 'print' })
  await expect(page.locator('.meeting-conductor')).toBeHidden()
  await expect(page.locator('.meeting-print')).toBeVisible()
  await expect(page.locator('#preparation-title')).toBeVisible()
  await expect(page.locator('#between-title')).toBeVisible()
  await expect(page.locator('.navbar')).toBeHidden()
  await page.emulateMedia({ media: 'screen' })
  for (const title of ['Conversar sobre o texto', 'Levar à prática', 'Orar e encerrar']) {
    await page.getByRole('button', { name: `Próxima etapa: ${title}`, exact: true }).click()
  }
  await expect(page.getByRole('heading', { name: 'Uma proposta para a semana', exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Voltar ao roteiro completo', exact: true }).click()
  await expect(page.locator('.meeting-print')).toBeFocused()
})

test('filters, invalid studies and malformed duration links recover without false content', async ({ page }) => {
  await openRoute(page, '/estudos')
  await page.getByRole('button', { name: 'Servir com amor', exact: true }).click()
  await expect(page.locator('.learning-card')).toHaveCount(1)
  await page.getByRole('button', { name: 'Todos', exact: true }).click()
  await expect(page.locator('.learning-card')).toHaveCount(4)
  await openRoute(page, '/estudos/not-a-study')
  await expect(page.getByRole('heading', { name: 'Estudo não encontrado', exact: true })).toBeVisible()
  await openRoute(page, '/em-comunidade?estudo=unknown&tempo=30&tempo=60')
  await expect(page.locator('.meeting-advice')).toBeVisible()
  await expect(page.locator('#guide-study')).toHaveValue('o-convite-de-jesus')
  await expect(page.locator('#guide-duration')).toHaveValue('45')
  await openRoute(page, '/caminhada?tempo=invalid')
  await expect(page.locator('#path-duration')).toHaveValue('45')
})

test('keyboard skip navigation and responsive menu keep public studies accessible', async ({ page }) => {
  await openRoute(page)
  await page.keyboard.press('Tab')
  await expect(page.getByRole('button', { name: 'Pular para o conteúdo', exact: true })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('#main-content')).toBeFocused()
  const toggle = page.getByRole('button', { name: 'Abrir menu', exact: true })
  if (await toggle.isVisible()) {
    await toggle.click()
    await page.locator('#mobile-navigation').getByRole('link', { name: 'Estudos bíblicos', exact: true }).click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  } else {
    await page.getByRole('navigation', { name: 'Navegação principal', exact: true }).getByRole('link', { name: 'Estudos bíblicos', exact: true }).click()
  }
  await expect(page.getByRole('heading', { name: 'Conhecer Jesus. Caminhar com ele.', exact: true })).toBeVisible()
})
