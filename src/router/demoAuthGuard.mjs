export const protectedRoutePaths = Object.freeze([
  '/dashboard',
  '/perfil',
  '/questionario',
  '/resultados',
  '/salvos',
  '/testedons',
  '/testepersonalidade',
  '/descoberta'
])

export function createDemoAuthGuard(getSession) {
  if (typeof getSession !== 'function') {
    throw new TypeError('getSession must be a function')
  }

  return to => {
    if (!protectedRoutePaths.includes(to.path)) return true

    const currentUser = getSession()
    if (currentUser?.email) return true

    return {
      path: '/login',
      query: { redirect: to.fullPath }
    }
  }
}
