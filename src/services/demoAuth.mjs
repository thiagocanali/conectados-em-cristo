const USERS_KEY = 'users'
const SESSION_KEY = 'currentUser'

function readJson(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || 'null')
    return value ?? fallback
  } catch {
    return fallback
  }
}

function withoutCredentials(user) {
  if (!user || typeof user !== 'object' || Array.isArray(user)) return null
  const profile = { ...user }
  delete profile.senha
  delete profile.password
  delete profile.passwordHash
  return profile
}

export function getDemoUsers() {
  const stored = readJson(USERS_KEY, [])
  if (!Array.isArray(stored)) return []
  const users = stored.map(withoutCredentials).filter(user => user?.email)
  try {
    // Remove legacy plaintext credentials from previously stored demo accounts.
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  } catch {
    // The prototype remains usable in memory when storage is unavailable.
  }
  return users
}

export function registerDemoUser(profile) {
  const email = String(profile?.email || '').trim().toLowerCase()
  if (!email) return { ok: false, reason: 'invalid-email' }
  const users = getDemoUsers()
  if (users.some(user => String(user.email).trim().toLowerCase() === email)) {
    return { ok: false, reason: 'email-exists' }
  }

  const user = withoutCredentials({
    ...profile,
    email,
    username: String(profile.username || profile.nome || '').trim(),
    nome: String(profile.nome || profile.username || '').trim(),
    respostas: Array.isArray(profile.respostas) ? profile.respostas : []
  })

  users.push(user)
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  } catch {
    return { ok: false, reason: 'storage-unavailable' }
  }
  if (!setDemoSession(user)) return { ok: false, reason: 'storage-unavailable' }
  return { ok: true, user }
}

export function loginDemoUser(email) {
  const normalizedEmail = String(email || '').trim().toLowerCase()
  const user = getDemoUsers().find(item => String(item.email).trim().toLowerCase() === normalizedEmail)
  if (!user) return { ok: false, reason: 'user-not-found' }
  if (!setDemoSession(user)) return { ok: false, reason: 'storage-unavailable' }
  return { ok: true, user }
}

export function getDemoSession() {
  const rawUser = readJson(SESSION_KEY, null)
  const user = withoutCredentials(rawUser)
  if (!user?.email) return null

  // Rewrite legacy sessions without credential fields as soon as they are read.
  if (JSON.stringify(rawUser) !== JSON.stringify(user)) {
    setDemoSession(user)
  }
  return user
}

export function setDemoSession(user) {
  const safeUser = withoutCredentials(user)
  if (!safeUser?.email) return false
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser))
    return true
  } catch {
    return false
  }
}

export function clearDemoSession() {
  try {
    localStorage.removeItem(SESSION_KEY)
  } catch {
    // No-op: storage may be unavailable.
  }
}
