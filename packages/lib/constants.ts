/**
 * Application constants
 */

export const APP_NAME = 'Ownly'
export const APP_TAGLINE = 'Ship your SaaS in days, not months'

/**
 * Pricing
 */
export const PRICING = {
  FOUNDER: {
    price: 399,
    name: 'Founder',
    description: 'Perfect for solo entrepreneurs',
  },
  TEAM: {
    price: 699,
    name: 'Team',
    description: 'For teams of 2-10 members',
  },
  SUCCESS_SHIELD: {
    price: 149,
    name: 'Success Shield',
    description: 'Annual compliance & support',
    recurring: true,
  },
} as const

/**
 * US States with formation info
 */
export const US_STATES = {
  AL: { name: 'Alabama', fee: 200, processingDays: 15 },
  AK: { name: 'Alaska', fee: 250, processingDays: 10 },
  AZ: { name: 'Arizona', fee: 50, processingDays: 7 },
  AR: { name: 'Arkansas', fee: 45, processingDays: 14 },
  CA: { name: 'California', fee: 70, processingDays: 10 },
  CO: { name: 'Colorado', fee: 50, processingDays: 7 },
  CT: { name: 'Connecticut', fee: 120, processingDays: 10 },
  DE: { name: 'Delaware', fee: 90, processingDays: 5 },
  FL: { name: 'Florida', fee: 125, processingDays: 7 },
  GA: { name: 'Georgia', fee: 100, processingDays: 7 },
  HI: { name: 'Hawaii', fee: 50, processingDays: 10 },
  ID: { name: 'Idaho', fee: 100, processingDays: 7 },
  IL: { name: 'Illinois', fee: 150, processingDays: 10 },
  IN: { name: 'Indiana', fee: 95, processingDays: 7 },
  IA: { name: 'Iowa', fee: 50, processingDays: 7 },
  KS: { name: 'Kansas', fee: 160, processingDays: 14 },
  KY: { name: 'Kentucky', fee: 40, processingDays: 10 },
  LA: { name: 'Louisiana', fee: 100, processingDays: 14 },
  ME: { name: 'Maine', fee: 175, processingDays: 10 },
  MD: { name: 'Maryland', fee: 100, processingDays: 7 },
  MA: { name: 'Massachusetts', fee: 500, processingDays: 10 },
  MI: { name: 'Michigan', fee: 50, processingDays: 7 },
  MN: { name: 'Minnesota', fee: 135, processingDays: 7 },
  MS: { name: 'Mississippi', fee: 50, processingDays: 14 },
  MO: { name: 'Missouri', fee: 50, processingDays: 7 },
  MT: { name: 'Montana', fee: 35, processingDays: 10 },
  NE: { name: 'Nebraska', fee: 100, processingDays: 10 },
  NV: { name: 'Nevada', fee: 75, processingDays: 5 },
  NH: { name: 'New Hampshire', fee: 100, processingDays: 7 },
  NJ: { name: 'New Jersey', fee: 125, processingDays: 10 },
  NM: { name: 'New Mexico', fee: 50, processingDays: 10 },
  NY: { name: 'New York', fee: 200, processingDays: 14 },
  NC: { name: 'North Carolina', fee: 125, processingDays: 7 },
  ND: { name: 'North Dakota', fee: 135, processingDays: 10 },
  OH: { name: 'Ohio', fee: 99, processingDays: 7 },
  OK: { name: 'Oklahoma', fee: 100, processingDays: 10 },
  OR: { name: 'Oregon', fee: 100, processingDays: 7 },
  PA: { name: 'Pennsylvania', fee: 125, processingDays: 14 },
  RI: { name: 'Rhode Island', fee: 150, processingDays: 10 },
  SC: { name: 'South Carolina', fee: 110, processingDays: 7 },
  SD: { name: 'South Dakota', fee: 150, processingDays: 7 },
  TN: { name: 'Tennessee', fee: 300, processingDays: 10 },
  TX: { name: 'Texas', fee: 300, processingDays: 7 },
  UT: { name: 'Utah', fee: 70, processingDays: 7 },
  VT: { name: 'Vermont', fee: 125, processingDays: 10 },
  VA: { name: 'Virginia', fee: 100, processingDays: 7 },
  WA: { name: 'Washington', fee: 200, processingDays: 7 },
  WV: { name: 'West Virginia', fee: 100, processingDays: 14 },
  WI: { name: 'Wisconsin', fee: 130, processingDays: 10 },
  WY: { name: 'Wyoming', fee: 100, processingDays: 5 },
} as const

/**
 * Top states for LLC formation
 */
export const TOP_STATES = ['DE', 'WY', 'NV', 'FL', 'TX'] as const

/**
 * Business types
 */
export const BUSINESS_TYPES = {
  LLC: 'Limited Liability Company',
  SINGLE_MEMBER_LLC: 'Single-Member LLC',
  MULTI_MEMBER_LLC: 'Multi-Member LLC',
  S_CORP: 'S Corporation',
  C_CORP: 'C Corporation',
  NONPROFIT: 'Nonprofit Organization',
  DAO: 'Decentralized Autonomous Organization',
} as const

/**
 * Tax rates (simplified)
 */
export const TAX_BRACKETS_2024 = [
  { min: 0, max: 11000, rate: 0.10 },
  { min: 11001, max: 44725, rate: 0.12 },
  { min: 44726, max: 95375, rate: 0.22 },
  { min: 95376, max: 182100, rate: 0.24 },
  { min: 182101, max: 231250, rate: 0.32 },
  { min: 231251, max: 578125, rate: 0.35 },
  { min: 578126, max: Infinity, rate: 0.37 },
] as const

/**
 * Self-employment tax rate
 */
export const SELF_EMPLOYMENT_TAX_RATE = 0.153 // 15.3%

/**
 * Standard deduction 2024
 */
export const STANDARD_DEDUCTION = {
  SINGLE: 14600,
  MARRIED: 29200,
  HEAD_OF_HOUSEHOLD: 21900,
} as const

/**
 * Invoice statuses
 */
export const INVOICE_STATUSES = [
  'DRAFT',
  'SENT',
  'VIEWED',
  'PARTIALLY_PAID',
  'PAID',
  'OVERDUE',
  'CANCELLED',
] as const

/**
 * Payment terms
 */
export const PAYMENT_TERMS = {
  NET_0: 0,
  NET_7: 7,
  NET_15: 15,
  NET_30: 30,
  NET_60: 60,
  NET_90: 90,
} as const

/**
 * File size limits
 */
export const FILE_SIZE_LIMITS = {
  DOCUMENT: 10 * 1024 * 1024, // 10MB
  IMAGE: 5 * 1024 * 1024, // 5MB
  AVATAR: 2 * 1024 * 1024, // 2MB
} as const

/**
 * Allowed file types
 */
export const ALLOWED_FILE_TYPES = {
  DOCUMENT: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  IMAGE: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
} as const

/**
 * Date formats
 */
export const DATE_FORMATS = {
  SHORT: 'MM/DD/YYYY',
  LONG: 'MMMM D, YYYY',
  ISO: 'YYYY-MM-DD',
} as const

/**
 * Support contact
 */
export const SUPPORT = {
  EMAIL: 'support@ownly.com',
  PHONE: '1-800-OWNLY-US',
  HOURS: 'Monday-Friday, 9am-5pm EST',
} as const

/**
 * Social links
 */
export const SOCIAL_LINKS = {
  TWITTER: 'https://twitter.com/ownly',
  LINKEDIN: 'https://linkedin.com/company/ownly',
  FACEBOOK: 'https://facebook.com/ownly',
  YOUTUBE: 'https://youtube.com/@ownly',
  DISCORD: 'https://discord.gg/ownly',
} as const

/**
 * Feature flags
 */
export const FEATURES = {
  AI_COACH: process.env.NEXT_PUBLIC_ENABLE_AI_COACH === 'true',
  INSURANCE: process.env.NEXT_PUBLIC_ENABLE_INSURANCE === 'true',
  COMMUNITY: process.env.NEXT_PUBLIC_ENABLE_COMMUNITY === 'true',
  INTERNATIONAL: process.env.NEXT_PUBLIC_ENABLE_INTERNATIONAL === 'true',
} as const

/**
 * API rate limits
 */
export const RATE_LIMITS = {
  ANONYMOUS: 100, // requests per hour
  AUTHENTICATED: 1000,
  PREMIUM: 10000,
} as const

/**
 * Success metrics
 */
export const SUCCESS_METRICS = {
  TIME_TO_FIRST_LLC_DAYS: 9,
  TIME_TO_FIRST_REVENUE_DAYS: 30,
  TIME_TO_PROFITABLE_MONTHS: 12,
  TARGET_NPS: 78,
  TARGET_CHURN_RATE: 0.09,
} as const
