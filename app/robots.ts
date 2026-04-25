import type {MetadataRoute} from 'next'

export default function robots(): MetadataRoute.Robots {
  const indexable = process.env.NEXT_PUBLIC_INDEX === 'true'
  if (indexable) {
    return {
      rules: [{userAgent: '*', allow: '/'}],
    }
  }
  return {
    rules: [{userAgent: '*', disallow: '/'}],
  }
}
