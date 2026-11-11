import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const contractPath = fileURLToPath(new URL('../docs/api/openapi.json', import.meta.url))
const contract = JSON.parse(readFileSync(contractPath, 'utf8'))

function resolvePointer(root, ref) {
  if (!ref.startsWith('#/')) return undefined
  return ref.slice(2).split('/').reduce((value, part) => value?.[part.replaceAll('~1', '/').replaceAll('~0', '~')], root)
}

test('OpenAPI draft is valid JSON and declares version 3.1', () => {
  assert.equal(contract.openapi, '3.1.0')
  assert.equal(contract.info.version, '0.1.0-draft')
  assert.ok(Object.keys(contract.paths).length > 0)
})

test('all internal OpenAPI references resolve', () => {
  const refs = []
  const visit = value => {
    if (!value || typeof value !== 'object') return
    if (typeof value.$ref === 'string') refs.push(value.$ref)
    Object.values(value).forEach(visit)
  }
  visit(contract)
  assert.ok(refs.length > 0)
  for (const ref of refs) assert.ok(resolvePointer(contract, ref), `Unresolved reference: ${ref}`)
})

test('operation IDs are unique and path parameters are declared as required', () => {
  const ids = []
  for (const [path, pathItem] of Object.entries(contract.paths)) {
    const pathNames = [...path.matchAll(/\{([^}]+)\}/g)].map(match => match[1])
    for (const [method, operation] of Object.entries(pathItem)) {
      if (!['get', 'post', 'put', 'patch', 'delete'].includes(method)) continue
      ids.push(operation.operationId)
      const parameters = [...(pathItem.parameters || []), ...(operation.parameters || [])]
      for (const name of pathNames) {
        assert.ok(parameters.some(parameter => parameter.in === 'path' && parameter.name === name && parameter.required === true), `${method.toUpperCase()} ${path} must declare required path parameter ${name}`)
      }
    }
  }
  assert.equal(new Set(ids).size, ids.length)
  assert.ok(ids.every(Boolean))
})

test('all write operations require an authenticated session', () => {
  for (const [path, pathItem] of Object.entries(contract.paths)) {
    for (const [method, operation] of Object.entries(pathItem)) {
      if (!['post', 'put', 'patch', 'delete'].includes(method)) continue
      assert.ok(operation.security?.some(requirement => requirement.sessionCookie), `${method.toUpperCase()} ${path} must require a session`)
    }
  }
})

test('prayer request contract keeps requests private until sharing policy is approved', () => {
  assert.deepEqual(contract.components.schemas.PrayerRequestCreate.properties.visibility.enum, ['private'])
  assert.deepEqual(contract.components.schemas.PrayerRequest.properties.visibility.enum, ['private'])
})

test('public community metadata follows a strict privacy allowlist', () => {
  const schema = contract.components.schemas.CommunityPublicMetadata
  const allowed = ['id', 'slug', 'name', 'category', 'description', 'rulesSummary', 'joinMode']
  assert.deepEqual(Object.keys(schema.properties).sort(), [...allowed].sort())
  assert.deepEqual([...schema.required].sort(), [...allowed].sort())
  assert.equal(schema.additionalProperties, false)
  assert.deepEqual(schema.properties.joinMode.enum, ['open', 'approval'])
  assert.equal('memberCount' in schema.properties, false)
})

test('public community list and detail never require membership or reveal non-public state', () => {
  const list = contract.paths['/communities'].get
  const detailPath = contract.paths['/communities/{communityId}']
  const detail = detailPath.get
  assert.equal(list.security, undefined)
  assert.equal(detail.security, undefined)
  assert.ok(detail.responses['404'])
  assert.equal(detailPath.parameters?.[0]?.required, true)
  assert.equal(detailPath.parameters?.[0]?.in, 'path')
  assert.equal(detail.description.includes('não listada'), true)
})

test('public community pagination has bounded limits and no total count', () => {
  const list = contract.paths['/communities'].get
  const limit = list.parameters.find(parameter => parameter.name === 'limit')
  const cursor = list.parameters.find(parameter => parameter.name === 'cursor')
  const page = contract.components.schemas.CommunityPage
  assert.equal(limit.schema.minimum, 1)
  assert.equal(limit.schema.maximum, 50)
  assert.equal(limit.schema.default, 20)
  assert.equal(cursor.schema.maxLength, 1024)
  assert.equal('total' in page.properties, false)
})
