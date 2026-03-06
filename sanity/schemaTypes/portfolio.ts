// FILE LOCATION: sanity/schemaTypes/portfolio.ts

export default {
  name: 'portfolio',
  title: 'Portfolio Projects',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Branding', value: 'branding' },
          { title: 'Marketing', value: 'marketing' },
          { title: 'UI/UX Design', value: 'uiux' },
          { title: 'Print & Publishing', value: 'print' },
          { title: 'Packaging', value: 'packaging' }
        ]
      }
    },
    {
      name: 'description',
      title: 'Project Description',
      type: 'text'
    },
    {
      name: 'client',
      title: 'Client Name',
      type: 'string'
    },
    {
      name: 'projectDate',
      title: 'Project Date',
      type: 'date'
    },

    {
      name: 'images',
      title: 'Project Images',
      type: 'array',
      description: 'Upload project images. For new images, use "Add Project Image" to get the Cover Image toggle. Existing images are still fully supported.',
      of: [
        // ✅ OLD FORMAT — keeps all existing images working, no reupload needed
        {
          type: 'image',
          options: { hotspot: true }
        },
        // ✅ NEW FORMAT — use this for new images going forward (has Cover Image toggle)
        {
          type: 'object',
          name: 'projectImage',
          title: 'Project Image',
          fields: [
            {
              name: 'asset',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'isCover',
              title: '⭐ Set as Cover Image',
              type: 'boolean',
              description: 'This image will appear as the WhatsApp/Facebook/Twitter preview when sharing the link',
              initialValue: false
            },
            {
              name: 'alt',
              title: 'Alt Text (optional)',
              type: 'string',
              description: 'Describe the image for accessibility'
            }
          ],
          preview: {
            select: {
              media: 'asset',
              isCover: 'isCover',
              alt: 'alt'
            },
            prepare({ media, isCover, alt }: any) {
              return {
                title: isCover ? '⭐ Cover Image' : 'Project Image',
                subtitle: alt || 'No alt text',
                media
              };
            }
          }
        }
      ]
    },

    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Show this project on homepage'
    },
    {
      name: 'projectUrl',
      title: 'Project URL (optional)',
      type: 'url'
    },

    // Client Testimonials
    {
      name: 'testimonials',
      title: 'Client Testimonials',
      type: 'array',
      description: 'Add multiple client testimonials with ratings',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'quote',
              title: 'Testimonial Quote',
              type: 'text',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'author',
              title: 'Client Name',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'position',
              title: 'Client Position/Role',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'company',
              title: 'Company/Organization (optional)',
              type: 'string'
            },
            {
              name: 'rating',
              title: 'Star Rating',
              type: 'number',
              validation: (Rule: any) => Rule.required().min(1).max(5),
              options: {
                list: [
                  { title: '⭐ 1 Star', value: 1 },
                  { title: '⭐⭐ 2 Stars', value: 2 },
                  { title: '⭐⭐⭐ 3 Stars', value: 3 },
                  { title: '⭐⭐⭐⭐ 4 Stars', value: 4 },
                  { title: '⭐⭐⭐⭐⭐ 5 Stars', value: 5 }
                ]
              }
            },
            {
              name: 'photo',
              title: 'Client Photo (optional)',
              type: 'image',
              options: { hotspot: true }
            },
            {
              name: 'date',
              title: 'Testimonial Date (optional)',
              type: 'date'
            },
            {
              name: 'verified',
              title: 'Verified Client',
              type: 'boolean',
              initialValue: true
            }
          ],
          preview: {
            select: {
              title: 'author',
              subtitle: 'position',
              media: 'photo',
              rating: 'rating'
            },
            prepare({ title, subtitle, media, rating }: any) {
              const stars = '⭐'.repeat(rating || 0);
              return {
                title: `${title} ${stars}`,
                subtitle,
                media
              };
            }
          }
        }
      ]
    },

    // Legacy testimonial — hidden but kept for backward compatibility
    {
      name: 'testimonial',
      title: 'Legacy Testimonial (Old Format)',
      type: 'object',
      description: '⚠️ Deprecated: Use "Client Testimonials" above instead',
      hidden: true,
      fields: [
        { name: 'quote', title: 'Testimonial Quote', type: 'text' },
        { name: 'author', title: 'Client Name', type: 'string' },
        { name: 'position', title: 'Client Position', type: 'string' },
        {
          name: 'photo',
          title: 'Client Photo (optional)',
          type: 'image',
          options: { hotspot: true }
        }
      ]
    },

    // Creative Approach
    {
      name: 'approach',
      title: 'Creative Approach',
      type: 'array',
      description: 'Describe your creative process step by step',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'stepTitle', title: 'Step Title', type: 'string' },
            { name: 'stepDescription', title: 'Step Description', type: 'text' }
          ],
          preview: {
            select: { title: 'stepTitle', subtitle: 'stepDescription' }
          }
        }
      ]
    },

    // Downloadable Files
    {
      name: 'downloadableFiles',
      title: 'Downloadable Files',
      type: 'array',
      description: 'PDFs, case studies, or other files users can download',
      of: [
        {
          type: 'file',
          fields: [
            { name: 'fileTitle', title: 'File Title', type: 'string' },
            { name: 'fileDescription', title: 'File Description (optional)', type: 'text' }
          ]
        }
      ]
    },

    // Related Projects
    {
      name: 'relatedProjects',
      title: 'Related Projects',
      type: 'array',
      description: 'Select 3-4 related projects to show at the bottom',
      of: [{ type: 'reference', to: [{ type: 'portfolio' }] }],
      validation: (Rule: any) => Rule.max(4)
    }
  ],

  preview: {
    select: {
      title: 'title',
      // ✅ Falls back gracefully for both old and new image formats
      media: 'images.0',
      category: 'category'
    },
    prepare({ title, media, category }: any) {
      return { title, subtitle: category, media };
    }
  }
};