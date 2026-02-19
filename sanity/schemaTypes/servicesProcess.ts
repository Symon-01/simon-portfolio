export default {
  name: 'servicesProcess',
  title: 'Services Process',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Our Process',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Section Description',
      type: 'string',
      initialValue: 'A proven approach to delivering exceptional design solutions',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'steps',
      title: 'Process Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'number',
              title: 'Step Number',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'title',
              title: 'Step Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Step Description',
              type: 'text',
              rows: 3,
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Step Icon (Emoji)',
              type: 'string',
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
        title: 'Services Process Section',
      }
    },
  },
}