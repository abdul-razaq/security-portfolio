export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-12-24'

// Use environment variables with fallback to prevent build errors
// These values should match your .env.local file
export const dataset = 
  process.env.NEXT_PUBLIC_SANITY_DATASET || 
  process.env.SANITY_STUDIO_API_DATASET ||
  'production'

export const projectId = 
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 
  process.env.SANITY_STUDIO_API_PROJECT_ID ||
  'irqvssxz'

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
