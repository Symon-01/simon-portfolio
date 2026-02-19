export default {
  name: 'servicesFeatures',
  title: 'Services Features',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Why Choose Us',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Section Description',
      type: 'string',
      initialValue: 'What makes Simon Designs your best choice for creative solutions',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Feature Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'iconName',
              title: 'Icon Name',
              type: 'string',
              description: 'Use lowercase: clock, zap, thumbsup, headphones',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Feature Description',
              type: 'text',
              rows: 3,
              validation: (Rule: any) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required().min(1),
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Services Features Section',
      }
    },
  },
}