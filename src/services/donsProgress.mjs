import { getDemoSession } from './demoAuth.mjs'
import { isValidDonsProgress } from '../utils/safeStorage.mjs'
import { writeLocalValues } from '../utils/localStorageWrite.mjs'

function keys() {
  const user = getDemoSession()
  if (typeof user?.email !== 'string' || !user.email.trim()) throw new Error('no-session')
  return [...new Set([
    `testeDonsProgress:${user.email.trim().toLowerCase()}`,
    `testeDonsProgress:${user.email}`
  ])]
}

export function createDonsProgressStore(questions, giftKeys) {
  const valid = progress => isValidDonsProgress(progress, questions.length, giftKeys, questions)
  return {
    load() {
      try {
        let raw = null
        for (const key of keys()) {
          raw = localStorage.getItem(key)
          if (raw !== null) break
        }
        if (raw === null) return { ok: true, progress: null }
        let progress
        try { progress = JSON.parse(raw) } catch { return { ok: false, reason: 'invalid-data' } }
        if (!valid(progress)) return { ok: false, reason: 'invalid-data' }
        return { ok: true, progress }
      } catch (error) {
        return { ok: false, reason: error.message === 'no-session' ? 'no-session' : 'storage-unavailable' }
      }
    },
    save(progress) {
      if (!valid(progress)) return { ok: false, reason: 'invalid-data' }
      try {
        return writeLocalValues([[keys()[0], JSON.stringify(progress)]])
      } catch (error) {
        return { ok: false, reason: error.message === 'no-session' ? 'no-session' : 'storage-unavailable' }
      }
    },
    remove() {
      try { return writeLocalValues(keys().map(key => [key, null])) } catch (error) {
        return { ok: false, reason: error.message === 'no-session' ? 'no-session' : 'storage-unavailable' }
      }
    }
  }
}

export function nextDonsAnswer(progress, value, questions) {
  if (progress.finished || ![0, 1, 2, 4].includes(value)) return null
  const question = questions[progress.index]
  if (!question || !Object.hasOwn(progress.scores, question.gift)) return null
  const finished = progress.index === questions.length - 1
  return {
    index: finished ? progress.index : progress.index + 1,
    scores: { ...progress.scores, [question.gift]: progress.scores[question.gift] + value },
    finished
  }
}
