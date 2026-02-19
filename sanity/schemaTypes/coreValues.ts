export default {
  name: 'coreValues',
  title: 'Core Values',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Our Core Values',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'values',
      title: 'Values',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Value Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'iconName',
              title: 'Icon Name',
              type: 'string',
              description: 'Use lowercase: lightbulb, users, award, sparkles',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Value Description',
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
        title: 'Core Values Section',
      }
    },
  },
}