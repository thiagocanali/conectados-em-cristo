import { getDemoSession } from './demoAuth.mjs'
import { writeLocalValues } from '../utils/localStorageWrite.mjs'

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
  try {
    const user = getDemoSession()
    const pending = Object.entries(updates).map(([base, update]) => {
      const key = scopedKey(base, user)
      const items = update(readDemoList(base, user))
      if (!Array.isArray(items)) throw new DemoListError('invalid-data')
      return [key, JSON.stringify(items)]
    })
    return writeLocalValues(pending)
  } catch (error) {
    return { ok: false, reason: error?.reason || 'storage-unavailable' }
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
