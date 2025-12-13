import { z } from 'zod'

/**
 * Common validation schemas
 */

export const emailSchema = z.string().email('Invalid email address')

export const phoneSchema = z
  .string()
  .regex(/^\+?[\d\s\-\(\)]+$/, 'Invalid phone number')
  .min(10, 'Phone number must be at least 10 digits')

export const einSchema = z
  .string()
  .regex(/^\d{2}-?\d{7}$/, 'EIN must be in format XX-XXXXXXX')

export const zipCodeSchema = z
  .string()
  .regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code')

export const ssnSchema = z
  .string()
  .regex(/^\d{3}-?\d{2}-?\d{4}$/, 'SSN must be in format XXX-XX-XXXX')

export const urlSchema = z.string().url('Invalid URL')

export const addressSchema = z.object({
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().length(2, 'State must be 2 characters'),
  zip: zipCodeSchema,
  country: z.string().default('US'),
})

export const businessNameSchema = z
  .string()
  .min(1, 'Business name is required')
  .max(200, 'Business name is too long')
  .regex(
    /^[a-zA-Z0-9\s\-\.\,\&\']+$/,
    'Business name contains invalid characters'
  )

export const currencyAmountSchema = z
  .number()
  .positive('Amount must be positive')
  .finite('Amount must be a valid number')

export const percentageSchema = z
  .number()
  .min(0, 'Percentage cannot be negative')
  .max(100, 'Percentage cannot exceed 100')

/**
 * Password validation
 */
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')

/**
 * Date validation
 */
export const futureDateSchema = z.date().refine(
  date => date > new Date(),
  'Date must be in the future'
)

export const pastDateSchema = z.date().refine(
  date => date < new Date(),
  'Date must be in the past'
)

/**
 * File validation
 */
export const fileSchema = z.object({
  name: z.string(),
  size: z.number().max(10 * 1024 * 1024, 'File size must be less than 10MB'),
  type: z.string().regex(/^(image|application\/pdf)/, 'Invalid file type'),
})

/**
 * Validate business name availability
 */
export function validateBusinessName(name: string): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  // Reserved words
  const reservedWords = [
    'bank',
    'insurance',
    'trust',
    'fbi',
    'cia',
    'treasury',
  ]
  const lowerName = name.toLowerCase()

  for (const word of reservedWords) {
    if (lowerName.includes(word)) {
      errors.push(
        `Business name cannot contain reserved word: "${word}"`
      )
    }
  }

  // Must not be too similar to existing trademarks (simplified check)
  const trademarkedTerms = ['google', 'facebook', 'amazon', 'microsoft', 'apple']
  for (const term of trademarkedTerms) {
    if (lowerName.includes(term)) {
      errors.push(
        `Business name may infringe on trademark: "${term}"`
      )
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Validate EIN format
 */
export function validateEIN(ein: string): boolean {
  const cleaned = ein.replace(/\D/g, '')
  return cleaned.length === 9
}

/**
 * Validate SSN format
 */
export function validateSSN(ssn: string): boolean {
  const cleaned = ssn.replace(/\D/g, '')
  return cleaned.length === 9
}
