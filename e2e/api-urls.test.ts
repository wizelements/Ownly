const BASE_URL = process.env.E2E_BASE_URL || 'https://ownly-kit.vercel.app'

interface TestResult {
  name: string
  passed: boolean
  status?: number
  error?: string
  duration?: number
}

const results: TestResult[] = []

async function testUrl(name: string, path: string, expectedStatus = 200): Promise<void> {
  const start = Date.now()
  try {
    const response = await fetch(`${BASE_URL}${path}`)
    const passed = response.status === expectedStatus
    results.push({
      name,
      passed,
      status: response.status,
      duration: Date.now() - start,
      error: passed ? undefined : `Expected ${expectedStatus}, got ${response.status}`
    })
  } catch (error) {
    results.push({
      name,
      passed: false,
      duration: Date.now() - start,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

async function testContent(name: string, path: string, expectedContent: string[]): Promise<void> {
  const start = Date.now()
  try {
    const response = await fetch(`${BASE_URL}${path}`)
    const html = await response.text()
    
    const missingContent = expectedContent.filter(content => !html.toLowerCase().includes(content.toLowerCase()))
    const passed = missingContent.length === 0 && response.status === 200
    
    results.push({
      name,
      passed,
      status: response.status,
      duration: Date.now() - start,
      error: passed ? undefined : `Missing content: ${missingContent.join(', ')}`
    })
  } catch (error) {
    results.push({
      name,
      passed: false,
      duration: Date.now() - start,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

async function testHeaders(name: string, path: string): Promise<void> {
  const start = Date.now()
  try {
    const response = await fetch(`${BASE_URL}${path}`)
    const contentType = response.headers.get('content-type')
    const passed = contentType?.includes('text/html') ?? false
    
    results.push({
      name,
      passed,
      status: response.status,
      duration: Date.now() - start,
      error: passed ? undefined : `Invalid content-type: ${contentType}`
    })
  } catch (error) {
    results.push({
      name,
      passed: false,
      duration: Date.now() - start,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

async function runTests(): Promise<void> {
  console.log(`\n🧪 Running E2E URL Tests against ${BASE_URL}\n`)
  console.log('='.repeat(60))
  
  // URL Status Tests
  console.log('\n📍 URL Status Tests')
  await testUrl('Homepage returns 200', '/')
  await testUrl('Non-existent page returns 404', '/non-existent-page-xyz', 404)
  
  // Content Tests - Updated for live site content
  console.log('\n📝 Content Tests')
  await testContent('Homepage has branding', '/', [
    'Ownly',
    'Next.js'
  ])
  await testContent('Homepage has pricing section', '/', [
    '$49',
    'one-time'
  ])
  await testContent('Homepage has features section', '/', [
    'Authentication',
    'UI Components',
    'Stripe'
  ])
  await testContent('Homepage has tech stack', '/', [
    'TypeScript',
    'Tailwind',
    'Prisma',
    'tRPC'
  ])
  await testContent('Homepage has CTA', '/', [
    'Get Instant Access'
  ])
  await testContent('Homepage has FAQ section', '/', [
    'Questions',
    'What do I get'
  ])
  
  // Header Tests
  console.log('\n🔧 Header Tests')
  await testHeaders('Homepage returns HTML', '/')
  
  // Performance Tests
  console.log('\n⚡ Performance Tests')
  const perfStart = Date.now()
  await fetch(`${BASE_URL}/`)
  const homepageTime = Date.now() - perfStart
  results.push({
    name: 'Homepage loads under 5 seconds',
    passed: homepageTime < 5000,
    duration: homepageTime,
    error: homepageTime >= 5000 ? `Load time: ${homepageTime}ms` : undefined
  })
  
  // SEO Tests
  console.log('\n🔍 SEO Tests')
  await testContent('Homepage has viewport meta', '/', [
    'viewport'
  ])
  await testContent('Homepage has proper heading structure', '/', [
    '<h1',
    '<h2'
  ])
  await testContent('Homepage has semantic HTML', '/', [
    '<main',
    '<footer'
  ])
  
  // External Link Tests
  console.log('\n🔗 External Link Tests')
  await testContent('Homepage has Stripe payment link', '/', [
    'stripe'
  ])
  await testContent('Homepage has GitHub attribution', '/', [
    'github.com'
  ])
  await testContent('Homepage has creator attribution', '/', [
    'Cod3BlackAgency'
  ])
  
  // Accessibility Tests
  console.log('\n♿ Accessibility Tests')
  await testContent('Homepage has lang attribute', '/', [
    'lang='
  ])
  
  // Print Results
  console.log('\n' + '='.repeat(60))
  console.log('\n📊 Test Results\n')
  
  let passed = 0
  let failed = 0
  
  for (const result of results) {
    const icon = result.passed ? '✅' : '❌'
    const time = result.duration ? ` (${result.duration}ms)` : ''
    console.log(`${icon} ${result.name}${time}`)
    if (!result.passed && result.error) {
      console.log(`   └─ ${result.error}`)
    }
    result.passed ? passed++ : failed++
  }
  
  console.log('\n' + '='.repeat(60))
  console.log(`\n📈 Summary: ${passed} passed, ${failed} failed, ${results.length} total`)
  
  if (failed > 0) {
    console.log('\n❌ Some tests failed!')
    process.exit(1)
  } else {
    console.log('\n✅ All tests passed!')
    process.exit(0)
  }
}

runTests().catch(console.error)
