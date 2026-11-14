import test from 'node:test'
import assert from 'node:assert/strict'
import { databasePoolConfig } from '../src/runtime.mjs'

test('a configured database CA enables TLS with certificate validation', () => {
  const options = databasePoolConfig('postgresql://reader@example.invalid/catalog', 1, 'trusted-ca')
  assert.deepEqual(options.ssl, { ca: 'trusted-ca', rejectUnauthorized: true })
  assert.equal(options.max, 1)
})

test('URL options cannot replace the configured CA or disable verification', () => {
  for (const option of ['sslmode=disable', 'sslmode=no-verify', 'sslmode=verify-full', 'ssl=true', 'sslrootcert=other', 'sslcert=other', 'sslkey=other', 'uselibpqcompat=true']) {
    assert.throws(
      () => databasePoolConfig(`postgresql://reader@example.invalid/catalog?${option}`, 1, 'trusted-ca'),
      { message: 'Remove URL SSL parameters when DATABASE_SSL_CA is configured.' }
    )
  }
})

test('local and URL-based TLS connections keep their existing configuration without an explicit CA', () => {
  for (const url of ['postgresql://localhost/catalog', 'postgresql://example.invalid/catalog?sslmode=verify-full']) {
    const options = databasePoolConfig(url, 10)
    assert.equal(options.connectionString, url)
    assert.equal(options.ssl, undefined)
  }
})
