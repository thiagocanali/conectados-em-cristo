export function parseStoredJson(rawValue, fallbackValue = null) {
  if (typeof rawValue !== "string") return fallbackValue;

  try {
    return JSON.parse(rawValue);
  } catch {
    return fallbackValue;
  }
}

export function isValidDonsProgress(progress, totalQuestions, giftKeys, questions) {
  if (!progress || typeof progress !== "object" || Array.isArray(progress)) return false;
  if (!Number.isInteger(progress.index) || progress.index < 0 || progress.index >= totalQuestions) return false;
  if (typeof progress.finished !== "boolean") return false;
  if (progress.finished && progress.index !== totalQuestions - 1) return false;
  if (!progress.scores || typeof progress.scores !== "object" || Array.isArray(progress.scores)) return false;
  if (Object.keys(progress.scores).length !== giftKeys.length) return false;

  const limits = Object.fromEntries(giftKeys.map(key => [key, totalQuestions * 4]));
  if (questions) {
    if (questions.length !== totalQuestions) return false;
    giftKeys.forEach(key => { limits[key] = 0; });
    const answered = progress.finished ? totalQuestions : progress.index;
    for (const question of questions.slice(0, answered)) {
      if (!Object.hasOwn(limits, question.gift)) return false;
      limits[question.gift] += 4;
    }
  }

  return giftKeys.every(key => (
    Object.prototype.hasOwnProperty.call(progress.scores, key)
    && Number.isInteger(progress.scores[key])
    && progress.scores[key] >= 0
    && progress.scores[key] <= limits[key]
  ));
}
