/**
 * ProductHunt API Client
 * Handles posting, tracking, and retrieving metrics
 * 
 * Requires: PRODUCTHUNT_API_TOKEN (get from https://www.producthunt.com/settings/developer)
 */

interface PHPost {
  id: string
  name: string
  tagline: string
  description: string
  url: string
  thumbnail?: {
    image_url?: string
  }
  gallery?: Array<{ image_url?: string }>
  maker?: {
    name?: string
  }
  featured: boolean
  votes_count: number
  comments_count: number
  reviews_average: number
  reviews_count: number
}

interface PHCreatePostPayload {
  name: string
  tagline: string
  description: string
  url: string
  thumbnail_external_url?: string
  gallery_urls?: string[]
  category_id?: string
}

interface PHMetrics {
  postId: string
  votesCount: number
  commentsCount: number
  reviewsAverage: number
  reviewsCount: number
  featured: boolean
  lastUpdated: Date
}

class ProductHuntClient {
  private apiToken: string
  private baseUrl = 'https://api.producthunt.com/v2'
  private graphqlUrl = 'https://api.producthunt.com/v2/graphql'

  constructor(token: string) {
    if (!token) {
      throw new Error('ProductHunt API token required. Get it from https://www.producthunt.com/settings/developer')
    }
    this.apiToken = token
  }

  /**
   * Create a new ProductHunt post
   * Note: The API has limitations. Consider manual posting via website for first launch.
   */
  async createPost(payload: PHCreatePostPayload): Promise<PHPost | null> {
    try {
      const query = `
        mutation CreatePost(
          $name: String!
          $tagline: String!
          $description: String!
          $url: String!
        ) {
          postCreate(
            input: {
              name: $name
              tagline: $tagline
              description: $description
              url: $url
            }
          ) {
            post {
              id
              name
              tagline
              description
              url
              votesCount
              commentsCount
            }
            errors {
              message
            }
          }
        }
      `

      const response = await fetch(this.graphqlUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiToken}`,
        },
        body: JSON.stringify({
          query,
          variables: {
            name: payload.name,
            tagline: payload.tagline,
            description: payload.description,
            url: payload.url,
          },
        }),
      })

      const data = await response.json()

      if (data.errors) {
        console.error('ProductHunt API error:', data.errors)
        return null
      }

      if (data.data?.postCreate?.errors?.length > 0) {
        console.error('Post creation error:', data.data.postCreate.errors)
        return null
      }

      return data.data?.postCreate?.post || null
    } catch (error) {
      console.error('ProductHunt createPost error:', error)
      return null
    }
  }

  /**
   * Get metrics for a specific post
   */
  async getPostMetrics(postId: string): Promise<PHMetrics | null> {
    try {
      const query = `
        query GetPost($id: ID!) {
          post(id: $id) {
            id
            name
            votesCount
            commentsCount
            reviewsAverage
            reviewsCount
            featured
          }
        }
      `

      const response = await fetch(this.graphqlUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiToken}`,
        },
        body: JSON.stringify({
          query,
          variables: { id: postId },
        }),
      })

      const data = await response.json()

      if (data.errors) {
        console.error('ProductHunt API error:', data.errors)
        return null
      }

      const post = data.data?.post

      return post
        ? {
            postId: post.id,
            votesCount: post.votesCount,
            commentsCount: post.commentsCount,
            reviewsAverage: post.reviewsAverage,
            reviewsCount: post.reviewsCount,
            featured: post.featured,
            lastUpdated: new Date(),
          }
        : null
    } catch (error) {
      console.error('ProductHunt getPostMetrics error:', error)
      return null
    }
  }

  /**
   * Get today's posts in a specific category
   */
  async getTodaysPosts(categoryId?: string): Promise<PHPost[]> {
    try {
      const query = `
        query GetPosts($first: Int, $after: String, $category: String) {
          posts(first: $first, after: $after, category: $category) {
            edges {
              node {
                id
                name
                tagline
                description
                url
                votesCount
                commentsCount
                reviewsAverage
                reviewsCount
                featured
              }
            }
          }
        }
      `

      const response = await fetch(this.graphqlUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiToken}`,
        },
        body: JSON.stringify({
          query,
          variables: {
            first: 20,
            category: categoryId || 'tech',
          },
        }),
      })

      const data = await response.json()

      if (data.errors) {
        console.error('ProductHunt API error:', data.errors)
        return []
      }

      return (
        data.data?.posts?.edges?.map((edge: any) => edge.node) || []
      )
    } catch (error) {
      console.error('ProductHunt getTodaysPosts error:', error)
      return []
    }
  }

  /**
   * Get your posted products
   */
  async getMyProducts(): Promise<PHPost[]> {
    try {
      const query = `
        query GetMyProducts($first: Int) {
          viewer {
            products(first: $first) {
              edges {
                node {
                  id
                  name
                  tagline
                  description
                  url
                  votesCount
                  commentsCount
                  reviewsAverage
                  featured
                }
              }
            }
          }
        }
      `

      const response = await fetch(this.graphqlUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiToken}`,
        },
        body: JSON.stringify({
          query,
          variables: { first: 10 },
        }),
      })

      const data = await response.json()

      if (data.errors) {
        console.error('ProductHunt API error:', data.errors)
        return []
      }

      return (
        data.data?.viewer?.products?.edges?.map((edge: any) => edge.node) || []
      )
    } catch (error) {
      console.error('ProductHunt getMyProducts error:', error)
      return []
    }
  }
}

// Export singleton
let phClient: ProductHuntClient | null = null

export function getProductHuntClient(): ProductHuntClient {
  const token = process.env.PRODUCTHUNT_API_TOKEN
  if (!token) {
    throw new Error('PRODUCTHUNT_API_TOKEN not set in environment')
  }

  if (!phClient) {
    phClient = new ProductHuntClient(token)
  }

  return phClient
}

export type { PHPost, PHCreatePostPayload, PHMetrics }
