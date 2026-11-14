/**
 * Auth middleware must still run when a client sends the internal
 * `x-middleware-subrequest` header (CVE-2025-29927).
 *
 * Built with demo mode off so Clerk's authMiddleware is the gate for /dashboard.
 */
import assert from 'node:assert/strict'
import { Buffer } from 'node:buffer'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { readFile } from 'node:fs/promises'
import { createServer } from 'node:net'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const appDir = path.dirname(fileURLToPath(import.meta.url))

function freePort() {
  return new Promise((resolve, reject) => {
    const server = createServer()
    server.once('error', reject)
    server.listen(0, '127.0.0.1', () => {
      const address = server.address()
      const port = typeof address === 'object' && address ? address.port : 0
      server.close(() => resolve(port))
    })
  })
}

function run(command, args, env) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: appDir,
      env,
      stdio: ['ignore', 'pipe', 'pipe'],
    })
    let output = ''
    child.stdout.on('data', (chunk) => {
      output += chunk
    })
    child.stderr.on('data', (chunk) => {
      output += chunk
    })
    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) resolve(output)
      else reject(new Error(`${command} ${args.join(' ')} exited ${code}\n${output.slice(-6000)}`))
    })
  })
}

async function waitForHttp(url, timeoutMs) {
  const start = Date.now()
  let lastError = 'no response'
  while (Date.now() - start < timeoutMs) {
    try {
      await fetch(url, { redirect: 'manual' })
      return
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error)
      await new Promise((resolve) => setTimeout(resolve, 300))
    }
  }
  throw new Error(`server did not accept connections: ${lastError}`)
}

test('x-middleware-subrequest does not skip auth middleware', { timeout: 300_000 }, async () => {
  const env = {
    ...process.env,
    NEXT_PUBLIC_DEMO_MODE: 'false',
    NEXT_TELEMETRY_DISABLED: '1',
    // Well-formed test key so Clerk can parse it. Not a real instance.
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: `pk_test_${Buffer.from('happy-fox-12.clerk.accounts.dev$').toString('base64')}`,
    CLERK_SECRET_KEY: 'sk_test_dummy',
  }

  await run('pnpm', ['exec', 'next', 'build'], env)

  const manifest = JSON.parse(
    await readFile(path.join(appDir, '.next/server/middleware-manifest.json'), 'utf8')
  )
  const middlewareName = manifest.middleware?.['/']?.name
  assert.equal(typeof middlewareName, 'string', 'root middleware name missing from manifest')
  assert.ok(middlewareName.length > 0)

  const port = await freePort()
  const server = spawn(
    'pnpm',
    ['exec', 'next', 'start', '-H', '127.0.0.1', '-p', String(port)],
    {
      cwd: appDir,
      env: { ...env, PORT: String(port) },
      stdio: ['ignore', 'pipe', 'pipe'],
    }
  )
  let logs = ''
  server.stdout.on('data', (chunk) => {
    logs += chunk
  })
  server.stderr.on('data', (chunk) => {
    logs += chunk
  })

  const base = `http://127.0.0.1:${port}`
  try {
    await waitForHttp(`${base}/dashboard`, 60_000)

    const plain = await fetch(`${base}/dashboard`, { redirect: 'manual' })
    const withHeader = await fetch(`${base}/dashboard`, {
      redirect: 'manual',
      headers: { 'x-middleware-subrequest': middlewareName },
    })
    const plainBody = await plain.text()
    const headerBody = await withHeader.text()
    const detail = `plain=${plain.status} header=${withHeader.status}\n${logs.slice(-2500)}`
    const blocked = plain.status === 401 || (plain.status >= 300 && plain.status < 400)

    assert.equal(blocked, true, `unauthenticated /dashboard was not blocked\n${detail}`)
    assert.equal(
      withHeader.status,
      plain.status,
      `x-middleware-subrequest changed the auth result\n${detail}`
    )
    assert.equal(
      withHeader.headers.get('location'),
      plain.headers.get('location'),
      `x-middleware-subrequest changed the redirect\n${detail}`
    )
    assert.equal(headerBody.includes('Welcome back'), false)
    assert.equal(plainBody.includes('Welcome back'), false)

    const apiPlain = await fetch(`${base}/api/metrics/hackernews`, { redirect: 'manual' })
    const apiHeader = await fetch(`${base}/api/metrics/hackernews`, {
      redirect: 'manual',
      headers: { 'x-middleware-subrequest': middlewareName },
    })
    assert.equal(apiPlain.status, 401, 'metrics API should require auth')
    assert.equal(apiHeader.status, 401, 'subrequest header must not authorize the metrics API')
  } finally {
    server.kill('SIGTERM')
    await Promise.race([once(server, 'close'), new Promise((resolve) => setTimeout(resolve, 5000))])
  }
})
