// FILE LOCATION: sanity/schemaTypes/simonArts.ts

export default {
  name: 'simonArts',
  title: 'Simon Arts - Pencil Drawings',
  type: 'document',
  fields: [
    // ========== BASIC INFORMATION ==========
    {
      name: 'title',
      title: 'Artwork Title',
      type: 'string',
      description: 'e.g., "Portrait of Nelson Mandela"',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { 
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      description: 'Brief summary (shown on gallery cards)',
      rows: 3,
      validation: Rule => Rule.required()
    },
    {
      name: 'subject',
      title: 'Subject',
      type: 'string',
      description: 'Who or what is drawn? e.g., "Nelson Mandela", "Mother and Child"'
    },

    // ========== IMAGES ==========
    {
      name: 'mainImage',
      title: 'Main Artwork Image',
      type: 'image',
      description: 'Primary image of the artwork',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'detailImages',
      title: 'Detail Images (Optional)',
      type: 'array',
      description: 'Additional close-up or detail shots of the artwork',
      of: [{ type: 'image' }]
    },

    // ========== TECHNICAL DETAILS ==========
    {
      name: 'medium',
      title: 'Drawing Medium',
      type: 'array',
      description: 'Select all materials used',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Graphite Pencil', value: 'graphite' },
          { title: 'Charcoal', value: 'charcoal' },
          { title: 'Colored Pencil', value: 'colored-pencil' },
          { title: 'Carbon Pencil', value: 'carbon' },
          { title: 'Conte Crayon', value: 'conte' }
        ]
      },
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'paperType',
      title: 'Paper Type',
      type: 'string',
      options: {
        list: [
          { title: 'Bristol Board', value: 'bristol-board' },
          { title: 'Sketch Paper', value: 'sketch-paper' },
          { title: 'Mixed Media Paper', value: 'mixed-media' },
          { title: 'Watercolor Paper', value: 'watercolor' },
          { title: 'Other', value: 'other' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'dimensions',
      title: 'Dimensions',
      type: 'object',
      description: 'Size of the artwork',
      fields: [
        {
          name: 'width',
          title: 'Width (cm)',
          type: 'number',
          validation: Rule => Rule.required().positive()
        },
        {
          name: 'height',
          title: 'Height (cm)',
          type: 'number',
          validation: Rule => Rule.required().positive()
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'timeToComplete',
      title: 'Time to Complete',
      type: 'string',
      description: 'e.g., "15 hours", "2 weeks", "3 days"',
      validation: Rule => Rule.required()
    },
    {
      name: 'year',
      title: 'Year Created',
      type: 'number',
      description: 'Year the artwork was completed',
      validation: Rule => Rule.required().integer().min(2000).max(new Date().getFullYear())
    },

    // ========== STORY & CONTEXT ==========
    {
      name: 'story',
      title: 'The Story Behind the Artwork',
      type: 'text',
      description: 'Full story, inspiration, context, and creative process',
      rows: 8,
      validation: Rule => Rule.required()
    },

    // ========== CATEGORIZATION ==========
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Portrait', value: 'portrait' },
          { title: 'Landscape', value: 'landscape' },
          { title: 'Still Life', value: 'still-life' },
          { title: 'Abstract', value: 'abstract' },
          { title: 'Animal', value: 'animal' },
          { title: 'Other', value: 'other' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      description: 'Keywords for this artwork (e.g., "realistic", "African leader", "black and white")',
      of: [{ type: 'string' }]
    },

    // ========== PURCHASE INFORMATION ==========
    {
      name: 'availableForSale',
      title: 'Available for Purchase',
      type: 'boolean',
      description: 'Is this artwork available for sale?',
      initialValue: false
    },
    {
      name: 'price',
      title: 'Price (KES)',
      type: 'number',
      description: 'Price in Kenyan Shillings',
      hidden: ({ document }) => !document?.availableForSale
    },

    // ========== FEATURED ==========
    {
      name: 'featured',
      title: 'Featured Artwork',
      type: 'boolean',
      description: 'Show this artwork on homepage',
      initialValue: false
    },

    // ========== METADATA ==========
    {
      name: 'createdAt',
      title: 'Date Added',
      type: 'datetime',
      description: 'When this entry was created',
      initialValue: () => new Date().toISOString()
    }
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      category: 'category',
      year: 'year',
      featured: 'featured'
    },
    prepare({ title, media, category, year, featured }) {
      return {
        title: `${title} ${featured ? '⭐' : ''}`,
        subtitle: `${category} • ${year}`,
        media
      };
    }
  },

  orderings: [
    {
      title: 'Year (Newest First)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }]
    },
    {
      title: 'Year (Oldest First)',
      name: 'yearAsc',
      by: [{ field: 'year', direction: 'asc' }]
    },
    {
      title: 'Title (A-Z)',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }]
    }
  ]
};