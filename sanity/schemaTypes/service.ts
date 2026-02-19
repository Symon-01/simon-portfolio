import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'E.g., Brand Identity, Marketing Materials, UI/UX Design'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule) => Rule.required(),
      description: 'Click "Generate" button after entering title'
    }),
    defineField({
      name: 'icon',
      title: 'Service Icon/Image',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Upload an icon or image for this service'
    }),
    defineField({
      name: 'iconEmoji',
      title: 'Icon Emoji (Optional)',
      type: 'string',
      description: 'Emoji to use if no image uploaded (e.g., 🎨, 📢, 💻, 📦, 🖨️)'
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
      description: 'Brief description shown on cards (max 200 characters)'
    }),
    defineField({
      name: 'offerings',
      title: 'Service Offerings',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of specific services offered (e.g., Logo Design, Brand Guidelines)',
      validation: (Rule) => Rule.required().min(1)
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description (Optional)',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Detailed description for individual service pages (optional for now)'
    }),
    defineField({
      name: 'displayOnHomepage',
      title: 'Display on Homepage',
      type: 'boolean',
      description: 'Check this to show this service on the homepage',
      initialValue: false
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which service appears (1, 2, 3, etc. - lower numbers first)',
      validation: (Rule) => Rule.required().min(1),
      initialValue: 1
    }),
    defineField({
      name: 'cardColor',
      title: 'Card Accent Color',
      type: 'string',
      options: {
        list: [
          { title: 'Orange', value: 'orange' },
          { title: 'Green', value: 'green' },
          { title: 'Blue', value: 'blue' },
          { title: 'Purple', value: 'purple' },
          { title: 'Red', value: 'red' }
        ],
        layout: 'radio'
      },
      initialValue: 'orange',
      description: 'Color theme for this service card'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'icon'
    }
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ]
})