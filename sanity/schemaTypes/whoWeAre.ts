export default {
  name: 'whoWeAre',
  title: 'Who We Are',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Who we are',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'paragraphs',
      title: 'Description Paragraphs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Paragraph Text',
              type: 'text',
              rows: 4,
              validation: (Rule: any) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'image',
      title: 'Section Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'buttons',
      title: 'Action Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'buttonLink',
              title: 'Button Link',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'buttonColor',
              title: 'Button Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Green', value: 'green' },
                  { title: 'Orange', value: 'orange' },
                ],
              },
              initialValue: 'green',
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
        title: 'Who We Are Section',
      }
    },
  },
}