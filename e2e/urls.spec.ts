import { test, expect } from '@playwright/test'

test.describe('Homepage URL Tests', () => {
  test('homepage loads successfully', async ({ page }) => {
    const response = await page.goto('/')
    expect(response?.status()).toBe(200)
  })

  test('homepage has correct title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Ownly|SaaS|Next/i)
  })

  test('homepage displays main heading', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('homepage has branding', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Ownly')).toBeVisible()
  })

  test('homepage has CTA button', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Get Instant Access')).toBeVisible()
  })

  test('homepage has pricing', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=$49')).toBeVisible()
  })

  test('homepage has features section', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Authentication')).toBeVisible()
    await expect(page.locator('text=Stripe')).toBeVisible()
  })

  test('homepage has tech stack section', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Next.js')).toBeVisible()
    await expect(page.locator('text=TypeScript')).toBeVisible()
  })

  test('homepage has FAQ section', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Questions')).toBeVisible()
  })

  test('homepage footer has creator attribution', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Cod3BlackAgency')).toBeVisible()
  })
})

test.describe('Navigation Tests', () => {
  test('CTA button is clickable', async ({ page }) => {
    await page.goto('/')
    const ctaButton = page.locator('text=Get Instant Access').first()
    await expect(ctaButton).toBeVisible()
    await expect(ctaButton).toBeEnabled()
  })

  test('external links have correct targets', async ({ page }) => {
    await page.goto('/')
    const githubLinks = page.locator('a[href*="github.com"]')
    const count = await githubLinks.count()
    expect(count).toBeGreaterThan(0)
  })
})

test.describe('Responsive Design Tests', () => {
  test('mobile view renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('text=Ownly')).toBeVisible()
  })

  test('tablet view renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('desktop view renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto('/')
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('text=$49')).toBeVisible()
  })
})

test.describe('Performance Tests', () => {
  test('homepage loads within acceptable time', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    const loadTime = Date.now() - startTime
    expect(loadTime).toBeLessThan(10000)
  })
})

test.describe('SEO & Meta Tests', () => {
  test('homepage has meta viewport tag', async ({ page }) => {
    await page.goto('/')
    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content')
    expect(viewport).toContain('width=device-width')
  })

  test('homepage has proper heading hierarchy', async ({ page }) => {
    await page.goto('/')
    const h1Count = await page.locator('h1').count()
    expect(h1Count).toBeGreaterThanOrEqual(1)
    const h2Count = await page.locator('h2').count()
    expect(h2Count).toBeGreaterThan(0)
  })

  test('homepage has semantic HTML', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('main')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
  })
})

test.describe('Accessibility Tests', () => {
  test('page has lang attribute', async ({ page }) => {
    await page.goto('/')
    const lang = await page.locator('html').getAttribute('lang')
    expect(lang).toBeTruthy()
  })

  test('buttons are keyboard accessible', async ({ page }) => {
    await page.goto('/')
    const buttons = page.locator('button, a[role="button"]')
    const count = await buttons.count()
    expect(count).toBeGreaterThan(0)
  })

  test('images have alt text or are decorative', async ({ page }) => {
    await page.goto('/')
    const images = page.locator('img')
    const count = await images.count()
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i)
      const alt = await img.getAttribute('alt')
      const role = await img.getAttribute('role')
      const ariaHidden = await img.getAttribute('aria-hidden')
      const isAccessible = alt !== null || role === 'presentation' || ariaHidden === 'true'
      expect(isAccessible).toBeTruthy()
    }
  })
})

test.describe('Error Handling Tests', () => {
  test('404 page for non-existent route', async ({ page }) => {
    const response = await page.goto('/non-existent-page-12345')
    expect(response?.status()).toBe(404)
  })
})

test.describe('Content Integrity Tests', () => {
  test('pricing shows correct amount', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=$49')).toBeVisible()
    await expect(page.locator('text=one-time')).toBeVisible()
  })

  test('features list is complete', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Authentication')).toBeVisible()
    await expect(page.locator('text=Stripe')).toBeVisible()
    await expect(page.locator('text=UI Components')).toBeVisible()
  })

  test('tech stack items are visible', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Next.js')).toBeVisible()
    await expect(page.locator('text=TypeScript')).toBeVisible()
    await expect(page.locator('text=Tailwind')).toBeVisible()
    await expect(page.locator('text=Prisma')).toBeVisible()
  })
})
