// ============================================
// SERVICE QUERIES
// ============================================

// Get services for homepage (only featured ones)
export const homepageServicesQuery = `
  *[_type == "service" && displayOnHomepage == true] | order(order asc) {
    _id,
    title,
    slug,
    icon,
    iconEmoji,
    description,
    offerings,
    cardColor,
    order
  }
`

// Get all services for services page
export const allServicesQuery = `
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    icon,
    iconEmoji,
    description,
    offerings,
    fullDescription,
    cardColor,
    order
  }
`

// Get single service by slug
export const serviceBySlugQuery = `
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    icon,
    iconEmoji,
    description,
    offerings,
    fullDescription,
    cardColor
  }
`