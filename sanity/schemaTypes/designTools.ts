export default {
  name: 'designTools',
  title: 'Design Tools',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Our Design Tools',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Section Description',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'tools',
      title: 'Design Tools',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Tool Name',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'iconName',
              title: 'Icon Name',
              type: 'string',
              description: 'Use lowercase: palette, pentool, filetext, video, scissors, box, layers, wand2',
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
        title: 'Design Tools Section',
      }
    },
  },
}