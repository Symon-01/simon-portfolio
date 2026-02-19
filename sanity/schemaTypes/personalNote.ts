import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'personalNote',
  title: 'A Personal Note Section',
  type: 'document',
  fields: [
    defineField({
      name: 'paragraphs',
      title: 'Personal Note Paragraphs',
      type: 'array',
      description: 'Add paragraphs for your personal note section',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Paragraph Text',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'text',
            },
            prepare(selection) {
              return {
                title: selection.title?.substring(0, 60) + '...',
              };
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'paragraphs.0.text',
    },
    prepare(selection) {
      return {
        title: 'A Personal Note',
        subtitle: selection.title?.substring(0, 50) + '...',
      };
    },
  },
});