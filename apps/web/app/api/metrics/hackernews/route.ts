/**
 * API Route: Get HackerNews story metrics
 * GET /api/metrics/hackernews?storyId=123456
 * GET /api/metrics/hackernews?search=ownly (search for your story)
 */

import { getHackerNewsClient } from '@/lib/apis/hackernews'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const storyId = searchParams.get('storyId')
    const search = searchParams.get('search')

    const hnClient = getHackerNewsClient()

    if (storyId) {
      const metrics = await hnClient.getStoryMetrics(parseInt(storyId))
      if (!metrics) {
        return Response.json(
          { error: 'Story not found' },
          { status: 404 }
        )
      }
      return Response.json(metrics)
    }

    if (search) {
      const results = await hnClient.search(search, 0)
      return Response.json({
        totalResults: results.nbHits,
        stories: results.hits.slice(0, 10).map(hit => ({
          id: hit.id,
          title: hit.title,
          url: hit.url,
          score: hit.score,
          commentCount: hit.descendants || 0,
          submittedBy: hit.by,
          submittedAt: new Date(hit.time * 1000),
        })),
      })
    }

    return Response.json(
      { error: 'storyId or search parameter required' },
      { status: 400 }
    )
  } catch (error) {
    console.error('HackerNews metrics error:', error)
    return Response.json(
      { error: 'Failed to fetch metrics' },
      { status: 500 }
    )
  }
}
