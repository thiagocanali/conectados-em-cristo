const USERS_KEY = 'users'
const SESSION_KEY = 'currentUser'

function withoutCredentials(user) {
  if (!user || typeof user !== 'object' || Array.isArray(user)) return null
  const profile = { ...user }
  delete profile.senha
  delete profile.password
  delete profile.passwordHash
  return profile
}

export function getDemoUsers() {
  let stored
  try {
    stored = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  } catch {
    removeStoredValue(USERS_KEY)
    return []
  }

  if (!Array.isArray(stored)) {
    removeStoredValue(USERS_KEY)
    return []
  }

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
  let storedValue
  try {
    storedValue = localStorage.getItem(SESSION_KEY)
  } catch {
    return null
  }
  if (storedValue === null) return null

  let rawUser
  try {
    rawUser = JSON.parse(storedValue)
  } catch {
    clearDemoSession()
    return null
  }

  const user = withoutCredentials(rawUser)
  if (!user?.email) {
    clearDemoSession()
    return null
  }

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

function removeStoredValue(key) {
  try {
    localStorage.removeItem(key)
  } catch {
    // No-op: storage may be unavailable.
  }
}

export function clearDemoSession() {
  removeStoredValue(SESSION_KEY)
}
