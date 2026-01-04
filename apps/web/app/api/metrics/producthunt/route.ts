/**
 * API Route: Get ProductHunt metrics
 * GET /api/metrics/producthunt?postId=xyz
 */

import { getProductHuntClient } from '@/lib/apis/producthunt'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const postId = searchParams.get('postId')

    if (!postId) {
      return Response.json(
        { error: 'postId parameter required' },
        { status: 400 }
      )
    }

    const phClient = getProductHuntClient()
    const metrics = await phClient.getPostMetrics(postId)

    if (!metrics) {
      return Response.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    return Response.json(metrics)
  } catch (error) {
    console.error('ProductHunt metrics error:', error)
    return Response.json(
      { error: 'Failed to fetch metrics' },
      { status: 500 }
    )
  }
}
