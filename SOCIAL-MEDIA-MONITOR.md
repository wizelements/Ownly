# Social Media Monitoring & Automation

## Setup Instructions

### 1. ProductHunt API Setup

**Step 1**: Get API Token
```bash
1. Go to https://www.producthunt.com/settings/developer
2. Create new app (if you haven't)
3. Copy API token
4. Add to .env.local:
   PRODUCTHUNT_API_TOKEN=your_token_here
```

**Step 2**: Test Connection
```bash
# From Ownly root
curl -X GET "http://localhost:3000/api/metrics/producthunt?postId=123456" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Step 3**: Create Your Post
Manual process (API limitations):
1. Go to https://www.producthunt.com/launch
2. Fill in:
   - Title: "Ownly - $49 SaaS boilerplate with type-safe APIs"
   - Tagline: "Next.js 14 + tRPC + Prisma starter. Live demo, $49, lifetime updates"
   - Description: [Use from SEO-LAUNCH-CHECKLIST.md]
   - Gallery: Screenshot of live demo, database schema, components
3. Post at 12:01 AM PT (best time for front page)
4. Copy the post ID from URL

**Step 4**: Monitor Post
```bash
# Check votes, comments, featured status
curl -X GET "http://localhost:3000/api/metrics/producthunt?postId=YOUR_POST_ID"
```

---

### 2. HackerNews Setup

**Step 1**: Create Account
```
1. Go to https://news.ycombinator.com/
2. Create account (username, password)
3. Verify email
4. Wait 1 day before posting (HN requires account age)
```

**Step 2**: Prepare Your Post
Title options:
- "Show HN: Ownly - $49 SaaS boilerplate with type-safe APIs"
- "Show HN: I built a cheaper ShipFast alternative"
- "Show HN: tRPC + Prisma SaaS starter kit (5.7x cheaper than competitors)"

Post URL: https://ownly-kit.vercel.app

**Step 3**: Submit Post
```
1. Go to https://news.ycombinator.com/submit
2. Paste URL
3. Title: "Show HN: [your title]"
4. Submit
5. Copy story ID from URL (e.g., news.ycombinator.com/item?id=38269175)
```

**Step 4**: Monitor Post
```bash
# Check rank, score, comments
curl -X GET "http://localhost:3000/api/metrics/hackernews?storyId=38269175"

# Search for mentions
curl -X GET "http://localhost:3000/api/metrics/hackernews?search=ownly"
```

---

## Monitoring Dashboard Usage

### Get ProductHunt Metrics

```typescript
// In your page/component
import { getProductHuntClient } from '@/lib/apis/producthunt'

const metrics = await getProductHuntClient().getPostMetrics('ph-post-id')
console.log(metrics)
// {
//   postId: 'xxx',
//   votesCount: 245,
//   commentsCount: 18,
//   reviewsAverage: 4.8,
//   reviewsCount: 12,
//   featured: true,
//   lastUpdated: 2024-01-02T14:00:00Z
// }
```

### Get HackerNews Metrics

```typescript
import { getHackerNewsClient } from '@/lib/apis/hackernews'

const hnClient = getHackerNewsClient()

// Get story metrics
const metrics = await hnClient.getStoryMetrics(38269175)
console.log(metrics)
// {
//   storyId: 38269175,
//   title: 'Show HN: Ownly - SaaS boilerplate...',
//   score: 145,
//   commentCount: 32,
//   url: 'https://ownly-kit.vercel.app',
//   submittedBy: 'your_username',
//   submittedAt: 2024-01-02T14:00:00Z,
//   lastUpdated: 2024-01-02T15:30:00Z
// }

// Check rank (lower = better)
const rank = await hnClient.estimateRank(38269175)
console.log(`Rank: ${rank}/30`) // Front page if < 31

// Is it still on front page?
const onFrontPage = await hnClient.isStoryOnFrontPage(38269175)
console.log(onFrontPage) // true/false
```

---

## Automated Monitoring Script

Create `/apps/web/scripts/monitor-socials.ts`:

```typescript
import { getProductHuntClient } from '../lib/apis/producthunt'
import { getHackerNewsClient } from '../lib/apis/hackernews'

interface LaunchMetrics {
  timestamp: Date
  producthunt: {
    votes: number
    comments: number
    featured: boolean
    reviews: number
  }
  hackernews: {
    score: number
    comments: number
    rank: number | null
    onFrontPage: boolean
  }
}

async function monitorLaunch(
  phPostId: string,
  hnStoryId: number,
  intervalMinutes = 5,
  durationHours = 12
) {
  const metricsHistory: LaunchMetrics[] = []
  const maxChecks = (durationHours * 60) / intervalMinutes

  const phClient = getProductHuntClient()
  const hnClient = getHackerNewsClient()

  console.log(`📊 Monitoring launch for ${durationHours} hours...`)
  console.log(`ProductHunt: ${phPostId}`)
  console.log(`HackerNews: ${hnStoryId}`)
  console.log('')

  for (let i = 0; i < maxChecks; i++) {
    const [phMetrics, hnMetrics, hnRank] = await Promise.all([
      phClient.getPostMetrics(phPostId),
      hnClient.getStoryMetrics(hnStoryId),
      hnClient.estimateRank(hnStoryId),
    ])

    if (phMetrics && hnMetrics) {
      const metrics: LaunchMetrics = {
        timestamp: new Date(),
        producthunt: {
          votes: phMetrics.votesCount,
          comments: phMetrics.commentsCount,
          featured: phMetrics.featured,
          reviews: phMetrics.reviewsCount,
        },
        hackernews: {
          score: hnMetrics.score,
          comments: hnMetrics.commentCount,
          rank: hnRank,
          onFrontPage: hnRank ? hnRank <= 30 : false,
        },
      }

      metricsHistory.push(metrics)

      // Log current status
      console.log(`[${metrics.timestamp.toLocaleTimeString()}]`)
      console.log(
        `ProductHunt: ${metrics.producthunt.votes} votes, ` +
        `${metrics.producthunt.comments} comments, ` +
        `${metrics.producthunt.featured ? '⭐ Featured' : 'Not featured'}`
      )
      console.log(
        `HackerNews: ${metrics.hackernews.score} points, ` +
        `${metrics.hackernews.comments} comments, ` +
        `Rank #${metrics.hackernews.rank || '?'} ${
          metrics.hackernews.onFrontPage ? '🔥 Front page' : ''
        }`
      )
      console.log('')
    }

    // Wait before next check
    if (i < maxChecks - 1) {
      await new Promise(resolve =>
        setTimeout(resolve, intervalMinutes * 60 * 1000)
      )
    }
  }

  // Summary
  console.log('📈 Launch Summary:')
  console.log(
    `ProductHunt Peak: ${Math.max(
      ...metricsHistory.map(m => m.producthunt.votes)
    )} votes`
  )
  console.log(
    `HackerNews Peak: ${Math.max(
      ...metricsHistory.map(m => m.hackernews.score)
    )} points`
  )

  return metricsHistory
}

// Run if script is executed directly
if (require.main === module) {
  const phPostId = process.env.PRODUCTHUNT_POST_ID || 'your-post-id'
  const hnStoryId = parseInt(
    process.env.HACKERNEWS_STORY_ID || '0'
  )

  if (!phPostId || !hnStoryId) {
    console.error(
      'Set PRODUCTHUNT_POST_ID and HACKERNEWS_STORY_ID env vars'
    )
    process.exit(1)
  }

  monitorLaunch(phPostId, hnStoryId, 5, 12)
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err)
      process.exit(1)
    })
}

export { monitorLaunch, type LaunchMetrics }
```

**Run monitoring**:
```bash
PRODUCTHUNT_POST_ID=123456 HACKERNEWS_STORY_ID=38269175 \
  pnpm tsx apps/web/scripts/monitor-socials.ts
```

---

## Dashboard Component

Create `/apps/web/app/dashboard/metrics/page.tsx`:

```typescript
'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUp, TrendingUp, Zap } from 'lucide-react'

interface MetricsData {
  producthunt: {
    votes: number
    comments: number
    featured: boolean
  }
  hackernews: {
    score: number
    comments: number
    rank: number | null
    onFrontPage: boolean
  }
}

export default function MetricsPage() {
  const [metrics, setMetrics] = useState<MetricsData | null>(null)
  const [loading, setLoading] = useState(true)

  const phPostId = process.env.NEXT_PUBLIC_PH_POST_ID
  const hnStoryId = process.env.NEXT_PUBLIC_HN_STORY_ID

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true)
      try {
        const [phRes, hnRes] = await Promise.all([
          phPostId
            ? fetch(`/api/metrics/producthunt?postId=${phPostId}`)
            : Promise.resolve(null),
          hnStoryId
            ? fetch(`/api/metrics/hackernews?storyId=${hnStoryId}`)
            : Promise.resolve(null),
        ])

        const phData = phRes && phRes.ok ? await phRes.json() : null
        const hnData = hnRes && hnRes.ok ? await hnRes.json() : null

        setMetrics({
          producthunt: phData
            ? {
                votes: phData.votesCount,
                comments: phData.commentsCount,
                featured: phData.featured,
              }
            : { votes: 0, comments: 0, featured: false },
          hackernews: hnData
            ? {
                score: hnData.score,
                comments: hnData.commentCount,
                rank: hnData.storyId, // In real scenario, calculate rank
                onFrontPage: true,
              }
            : { score: 0, comments: 0, rank: null, onFrontPage: false },
        })
      } catch (error) {
        console.error('Failed to fetch metrics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
    const interval = setInterval(fetchMetrics, 60000) // Refresh every minute

    return () => clearInterval(interval)
  }, [phPostId, hnStoryId])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Launch Metrics</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* ProductHunt Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              ProductHunt
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!phPostId ? (
              <p className="text-muted-foreground">
                Set NEXT_PUBLIC_PH_POST_ID in .env
              </p>
            ) : loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <div>
                  <p className="text-sm text-muted-foreground">Votes</p>
                  <p className="text-3xl font-bold">
                    {metrics?.producthunt.votes || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Comments</p>
                  <p className="text-2xl font-bold">
                    {metrics?.producthunt.comments || 0}
                  </p>
                </div>
                {metrics?.producthunt.featured && (
                  <p className="text-sm text-green-600">⭐ Featured</p>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* HackerNews Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-600" />
              HackerNews
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!hnStoryId ? (
              <p className="text-muted-foreground">
                Set NEXT_PUBLIC_HN_STORY_ID in .env
              </p>
            ) : loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <div>
                  <p className="text-sm text-muted-foreground">Points</p>
                  <p className="text-3xl font-bold">
                    {metrics?.hackernews.score || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Comments</p>
                  <p className="text-2xl font-bold">
                    {metrics?.hackernews.comments || 0}
                  </p>
                </div>
                {metrics?.hackernews.onFrontPage && (
                  <p className="text-sm text-yellow-600">🔥 Front page</p>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
```

---

## Environment Variables

Add to `.env.local`:

```env
# ProductHunt
PRODUCTHUNT_API_TOKEN=your_token_here
NEXT_PUBLIC_PH_POST_ID=123456

# HackerNews (no token needed for read)
NEXT_PUBLIC_HN_STORY_ID=38269175
```

---

## Launch Day Timeline

**8:00 PM PST Day Before**
- Final review of post content
- Prepare HackerNews post title
- Set ProductHunt to publish at 12:01 AM PT

**12:01 AM PT (Launch)**
- ProductHunt goes live
- Wait 30 mins for initial traction
- Post to HackerNews with "Show HN" prefix

**6:00 AM PT**
- Check front page status both platforms
- Reply to comments
- Monitor vote counts

**12:00 PM PT**
- Peak engagement window
- Reply to more comments
- Share on X/Reddit if momentum is good

**6:00 PM PT**
- Begin Reddit/X amplification
- Respond to all comments
- Share key metrics

---

## Success Metrics

```
ProductHunt:
- Top 5 for day = 200+ votes
- Featured = viral wave coming
- 50+ comments = strong engagement

HackerNews:
- Front page (#1-30) = 50+ upvotes
- 100+ score = strong signal
- 50+ comments = active discussion
```

---

## Troubleshooting

**ProductHunt API issues**:
- Verify token is valid: `curl -H "Authorization: Bearer TOKEN" https://api.producthunt.com/v2/graphql`
- Check rate limits (100/hour for free tier)
- Ensure post ID format is correct

**HackerNews API issues**:
- Story might not be indexed yet (wait 2-3 mins)
- Search might be delayed (use direct story ID)
- Check HN status at news.ycombinator.com/item?id=YOUR_ID

