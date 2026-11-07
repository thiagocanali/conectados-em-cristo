export function parseStoredJson(rawValue, fallbackValue = null) {
  if (typeof rawValue !== "string") return fallbackValue;

  try {
    return JSON.parse(rawValue);
  } catch {
    return fallbackValue;
  }
}

export function isValidDonsProgress(progress, totalQuestions, giftKeys) {
  if (!progress || typeof progress !== "object" || Array.isArray(progress)) return false;
  if (!Number.isInteger(progress.index) || progress.index < 0 || progress.index >= totalQuestions) return false;
  if (typeof progress.finished !== "boolean") return false;
  if (!progress.scores || typeof progress.scores !== "object" || Array.isArray(progress.scores)) return false;

  return giftKeys.every(key => (
    Object.prototype.hasOwnProperty.call(progress.scores, key)
    && Number.isFinite(progress.scores[key])
    && progress.scores[key] >= 0
  ));
}

export function removeLegacyPasswords(storage) {
  let changed = false;

  const removePassword = user => {
    if (!user || typeof user !== "object" || Array.isArray(user)
      || !Object.prototype.hasOwnProperty.call(user, "senha")) {
      return user;
    }

    const safeUser = { ...user };
    delete safeUser.senha;
    return safeUser;
  };

  for (const key of ["users", "currentUser"]) {
    try {
      const value = parseStoredJson(storage.getItem(key), null);
      let sanitized = value;
      if (key === "users" && Array.isArray(value)) {
        sanitized = value.map(removePassword);
        if (sanitized.some((user, index) => user !== value[index])) {
          storage.setItem(key, JSON.stringify(sanitized));
          changed = true;
        }
      } else if (key === "currentUser") {
        sanitized = removePassword(value);
        if (sanitized !== value) {
          storage.setItem(key, JSON.stringify(sanitized));
          changed = true;
        }
      }
    } catch {
      continue;
    }
  }

  return changed;
}
