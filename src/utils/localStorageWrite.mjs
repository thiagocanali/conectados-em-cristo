/** Best-effort rollback only: localStorage has no transactions or cross-tab isolation. */
export function writeLocalValues(entries) {
  const previous = new Map()
  const written = []
  try {
    for (const [key] of entries) previous.set(key, localStorage.getItem(key))
    for (const [key, value] of entries) {
      if (value === null) localStorage.removeItem(key)
      else localStorage.setItem(key, value)
      written.push(key)
    }
    return { ok: true }
  } catch {
    let restored = true
    for (const key of written.reverse()) {
      try {
        if (previous.get(key) === null) localStorage.removeItem(key)
        else localStorage.setItem(key, previous.get(key))
      } catch { restored = false }
    }
    return { ok: false, reason: restored ? 'storage-unavailable' : 'rollback-failed' }
  }
}
