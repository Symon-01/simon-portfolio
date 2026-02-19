import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'creativePhilosophy',
  title: 'My Creative Philosophy Section',
  type: 'document',
  fields: [
    defineField({
      name: 'mainQuote',
      title: 'Main Philosophy Quote',
      type: 'text',
      description: 'Your main philosophy or mission statement',
      validation: (Rule) => Rule.required().max(500),
    }),

    defineField({
      name: 'pillars',
      title: 'Philosophy Pillars',
      type: 'array',
      description: 'Add 3 core pillars of your philosophy',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Pillar Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Pillar Description',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'emoji',
              title: 'Emoji',
              type: 'string',
              description: 'Single emoji to represent this pillar',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'mainQuote',
    },
    prepare(selection) {
      return {
        title: 'Creative Philosophy',
        subtitle: selection.title?.substring(0, 50) + '...',
      };
    },
  },
});