/**
 * HackerNews API Client
 * 
 * Note: HackerNews doesn't have a public API for posting.
 * This client is for:
 * 1. Tracking story metrics (votes, comments)
 * 2. Searching for mentions
 * 3. Finding top stories in categories
 * 
 * Posting must be done manually at https://news.ycombinator.com/submit
 */

interface HNStory {
  id: number
  title: string
  url?: string
  score: number
  by: string
  time: number
  descendants?: number // comment count
  type: 'story' | 'comment' | 'poll'
  text?: string
}

interface HNMetrics {
  storyId: number
  title: string
  score: number
  commentCount: number
  url?: string
  submittedBy: string
  submittedAt: Date
  lastUpdated: Date
}

interface HNSearchResult {
  hits: HNStory[]
  nbHits: number
  page: number
  nbPages: number
}

class HackerNewsClient {
  private baseUrl = 'https://hacker-news.firebaseio.com/v0'
  private searchUrl = 'https://hn.algolia.com/api/v1'
  private cachedStories: Map<number, HNMetrics> = new Map()

  /**
   * Get story by ID
   */
  async getStory(storyId: number): Promise<HNStory | null> {
    try {
      const response = await fetch(`${this.baseUrl}/item/${storyId}.json`)
      if (!response.ok) return null
      return response.json()
    } catch (error) {
      console.error(`HackerNews getStory error (${storyId}):`, error)
      return null
    }
  }

  /**
   * Get metrics for a story
   */
  async getStoryMetrics(storyId: number): Promise<HNMetrics | null> {
    try {
      const story = await this.getStory(storyId)
      if (!story) return null

      const metrics: HNMetrics = {
        storyId: story.id,
        title: story.title,
        score: story.score,
        commentCount: story.descendants || 0,
        url: story.url,
        submittedBy: story.by,
        submittedAt: new Date(story.time * 1000),
        lastUpdated: new Date(),
      }

      this.cachedStories.set(storyId, metrics)
      return metrics
    } catch (error) {
      console.error('HackerNews getStoryMetrics error:', error)
      return null
    }
  }

  /**
   * Get top stories
   */
  async getTopStories(limit = 30): Promise<HNStory[]> {
    try {
      const response = await fetch(`${this.baseUrl}/topstories.json`)
      if (!response.ok) return []

      const storyIds: number[] = await response.json()
      const topIds = storyIds.slice(0, limit)

      // Fetch stories in parallel
      const stories = await Promise.all(
        topIds.map(id => this.getStory(id))
      )

      return stories.filter((s): s is HNStory => s !== null)
    } catch (error) {
      console.error('HackerNews getTopStories error:', error)
      return []
    }
  }

  /**
   * Get new stories
   */
  async getNewStories(limit = 30): Promise<HNStory[]> {
    try {
      const response = await fetch(`${this.baseUrl}/newstories.json`)
      if (!response.ok) return []

      const storyIds: number[] = await response.json()
      const newIds = storyIds.slice(0, limit)

      const stories = await Promise.all(
        newIds.map(id => this.getStory(id))
      )

      return stories.filter((s): s is HNStory => s !== null)
    } catch (error) {
      console.error('HackerNews getNewStories error:', error)
      return []
    }
  }

  /**
   * Search HackerNews using Algolia (unofficial API)
   * Search for your product name, keywords, or domain
   */
  async search(query: string, page = 0): Promise<HNSearchResult> {
    try {
      const response = await fetch(
        `${this.searchUrl}/search?query=${encodeURIComponent(query)}&page=${page}`
      )
      if (!response.ok) return { hits: [], nbHits: 0, page: 0, nbPages: 0 }

      return response.json()
    } catch (error) {
      console.error('HackerNews search error:', error)
      return { hits: [], nbHits: 0, page: 0, nbPages: 0 }
    }
  }

  /**
   * Monitor a story's performance over time
   * Returns metrics history
   */
  async monitorStory(
    storyId: number,
    intervalMs = 60000, // 1 minute
    maxChecks = 12 // Check for 12 hours
  ): Promise<HNMetrics[]> {
    const metrics: HNMetrics[] = []

    for (let i = 0; i < maxChecks; i++) {
      const metric = await this.getStoryMetrics(storyId)
      if (metric) metrics.push(metric)

      // Wait before next check
      if (i < maxChecks - 1) {
        await new Promise(resolve => setTimeout(resolve, intervalMs))
      }
    }

    return metrics
  }

  /**
   * Find stories mentioning a specific URL or domain
   */
  async findStoriesByDomain(domain: string, limit = 10): Promise<HNStory[]> {
    try {
      const result = await this.search(domain, 0)
      return result.hits.slice(0, limit)
    } catch (error) {
      console.error('HackerNews findStoriesByDomain error:', error)
      return []
    }
  }

  /**
   * Check if a story is still on front page
   * Front page typically shows top 30 stories
   */
  async isStoryOnFrontPage(storyId: number): Promise<boolean> {
    try {
      const topStories = await this.getTopStories(30)
      return topStories.some(s => s.id === storyId)
    } catch (error) {
      console.error('HackerNews isStoryOnFrontPage error:', error)
      return false
    }
  }

  /**
   * Get estimated ranking based on score and age
   * Lower number = better ranking
   */
  async estimateRank(storyId: number): Promise<number | null> {
    try {
      const topStories = await this.getTopStories(100)
      const story = await this.getStory(storyId)

      if (!story) return null

      const rank = topStories.findIndex(s => s.id === storyId)
      return rank === -1 ? 101 : rank + 1
    } catch (error) {
      console.error('HackerNews estimateRank error:', error)
      return null
    }
  }

  /**
   * Get cached metrics (useful for avoiding rate limits)
   */
  getCachedMetrics(storyId: number): HNMetrics | undefined {
    return this.cachedStories.get(storyId)
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cachedStories.clear()
  }
}

let hnClient: HackerNewsClient | null = null

export function getHackerNewsClient(): HackerNewsClient {
  if (!hnClient) {
    hnClient = new HackerNewsClient()
  }
  return hnClient
}

export type { HNStory, HNMetrics, HNSearchResult }
