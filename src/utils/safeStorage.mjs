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
