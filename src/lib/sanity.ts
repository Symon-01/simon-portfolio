// FILE LOCATION: src/lib/sanity.ts

import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { PortableTextBlock } from 'sanity'

// Client with write permissions (for API routes)
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN, // Add write token
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

export interface Service {
  _id: string
  _type: 'service'
  title: string
  slug: {
    current: string
  }
  icon?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  iconEmoji?: string
  description: string
  offerings: string[]
  fullDescription?: PortableTextBlock[]
  displayOnHomepage: boolean
  order: number
  cardColor: 'orange' | 'green' | 'blue' | 'purple' | 'red'
}