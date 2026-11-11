import { getDemoSession } from './demoAuth.mjs'

const bases = new Set(['perfisSalvos', 'interesses', 'denuncias', 'bloqueados'])

export class DemoListError extends Error {
  constructor(reason) {
    super(reason)
    this.reason = reason
  }
}

function scopedKey(base, user) {
  if (!bases.has(base)) throw new DemoListError('invalid-list')
  if (typeof user?.email !== 'string' || !user.email.trim()) throw new DemoListError('no-session')
  return `${base}:${user.email.trim().toLowerCase()}`
}

export function readDemoList(base, user = getDemoSession()) {
  const key = scopedKey(base, user)
  let raw
  try {
    raw = localStorage.getItem(key)
    const legacyKey = `${base}:${user.email}`
    if (raw === null && legacyKey !== key) raw = localStorage.getItem(legacyKey)
  } catch {
    throw new DemoListError('storage-unavailable')
  }
  if (raw === null) return []
  try {
    const items = JSON.parse(raw)
    if (!Array.isArray(items)) throw new Error('Expected a list')
    return items
  } catch {
    throw new DemoListError('invalid-data')
  }
}

/** Read every list before writing; restore completed writes if a later write fails. */
export function updateDemoLists(updates) {
  const previous = new Map()
  const written = []
  try {
    const user = getDemoSession()
    const pending = Object.entries(updates).map(([base, update]) => {
      const key = scopedKey(base, user)
      const items = update(readDemoList(base, user))
      if (!Array.isArray(items)) throw new DemoListError('invalid-data')
      return [key, JSON.stringify(items)]
    })
    for (const [key] of pending) previous.set(key, localStorage.getItem(key))
    for (const [key, value] of pending) {
      localStorage.setItem(key, value)
      written.push(key)
    }
    return { ok: true }
  } catch (error) {
    let restored = true
    for (const key of written.reverse()) {
      try {
        if (previous.get(key) === null) localStorage.removeItem(key)
        else localStorage.setItem(key, previous.get(key))
      } catch { restored = false }
    }
    return { ok: false, reason: restored ? (error?.reason || 'storage-unavailable') : 'rollback-failed' }
  }
}

export function demoListErrorMessage(reason) {
  if (reason === 'invalid-data') return 'Os dados locais desta lista estão corrompidos. Nenhuma alteração foi salva.'
  if (reason === 'no-session') return 'A sessão demonstrativa não está disponível. Entre novamente.'
  if (reason === 'rollback-failed') return 'Não foi possível concluir nem restaurar todas as alterações locais. Recarregue a página e confira os dados.'
  return 'Não foi possível acessar o armazenamento do navegador. Tente novamente.'
}

/** Only presentation fields may be copied to discovery/saved-profile cards. */
export function normalizeDemoProfile(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  if (typeof value.nome !== 'string' || !value.nome.trim()) return null
  const idade = typeof value.idade === 'number' || typeof value.idade === 'string' ? Number(value.idade) : NaN
  if (!Number.isInteger(idade) || idade < 18 || idade > 99) return null
  const profile = { nome: value.nome.trim(), idade }
  for (const field of ['cidade', 'denominacao', 'objetivo', 'sobre']) {
    profile[field] = typeof value[field] === 'string' ? value[field] : ''
  }
  if (typeof value.email === 'string' && value.email.trim()) profile.email = value.email.trim().toLowerCase()
  return profile
}
