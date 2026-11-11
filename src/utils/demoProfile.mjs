export function normalizeDemoProfileForm(value, defaultName = '') {
  const source = value && typeof value === 'object' && !Array.isArray(value) ? value : {}
  const profile = {
    nome: typeof source.nome === 'string' ? source.nome : typeof defaultName === 'string' ? defaultName : '',
    idade: null
  }
  const age = typeof source.idade === 'number' || typeof source.idade === 'string' ? Number(source.idade) : NaN
  if (Number.isInteger(age) && age >= 18 && age <= 99) profile.idade = age
  for (const field of ['cidade', 'denominacao', 'tempoFe', 'objetivo', 'sobre']) {
    profile[field] = typeof source[field] === 'string' ? source[field] : ''
  }
  return profile
}
