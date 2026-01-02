import { NextResponse } from 'next/server'
import { SEO_PAGES } from '@/lib/seo-config'

// IndexNow API for instant indexing on Bing, Yandex, Seznam, Naver
// Generate key: any 32 char hex string
const INDEXNOW_KEY = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'
const SITE_HOST = 'ownly-kit.vercel.app'

export async function GET() {
  const urls = [
    `https://${SITE_HOST}`,
    `https://${SITE_HOST}/dashboard`,
    ...SEO_PAGES.map(p => `https://${SITE_HOST}/${p.slug}`),
  ]

  // Ping all IndexNow endpoints
  const endpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
    'https://yandex.com/indexnow',
  ]

  const results = await Promise.allSettled(
    endpoints.map(async (endpoint) => {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          host: SITE_HOST,
          key: INDEXNOW_KEY,
          keyLocation: `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`,
          urlList: urls,
        }),
      })
      return { endpoint, status: response.status }
    })
  )

  return NextResponse.json({
    success: true,
    urlCount: urls.length,
    results: results.map((r, i) => ({
      endpoint: endpoints[i],
      status: r.status === 'fulfilled' ? r.value.status : 'failed',
    })),
  })
}
