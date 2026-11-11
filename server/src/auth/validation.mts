/** Runtime checks are required at adapter boundaries; TypeScript does not validate stored facts. */
export function isNonBlankString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

export function isIdentifierList(value: unknown): value is readonly string[] {
  return Array.isArray(value) && value.every(isNonBlankString)
}
