import { SEO_PAGES, SITE_URL, SITE_NAME } from '@/lib/seo-config'

export async function GET() {
  const _buildTime = new Date().toISOString()
  
  const items = SEO_PAGES.map(page => `
    <item>
      <title>${page.title} — ${SITE_NAME}</title>
      <link>${SITE_URL}/${page.slug}</link>
      <description>${page.h1}. Production-ready Next.js 14 + tRPC + Prisma starter kit. Only $49.</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid>${SITE_URL}/${page.slug}</guid>
    </item>
  `).join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>Ship your SaaS in days, not months. Production-ready Next.js starter kit.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <item>
      <title>Ownly Starter Kit — Ship Your SaaS in Days</title>
      <link>${SITE_URL}</link>
      <description>Production-ready Next.js 14 + tRPC + Prisma foundation with 24 UI components, 15 database models, and demo mode. Only $49.</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid>${SITE_URL}</guid>
    </item>
    ${items}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
