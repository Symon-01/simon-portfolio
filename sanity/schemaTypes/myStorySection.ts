import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'myStorySection',
  title: 'My Story Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Title for this story section (e.g., "The Journey Began", "Where I Am Today")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Order in which this section should appear (1, 2, 3...)',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'paragraphs',
      title: 'Paragraphs',
      type: 'array',
      description: 'Add multiple paragraphs for this section',
      of: [
        {
          type: 'object',
          name: 'paragraph',
          title: 'Paragraph',
          fields: [
            {
              name: 'text',
              title: 'Text',
              type: 'text',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              text: 'text',
            },
            prepare(selection) {
              const { text } = selection;
              return {
                title: text?.substring(0, 50) + '...',
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      description: 'Add images for this section (displays 4 per row, wraps automatically)',
      of: [
        {
          type: 'object',
          name: 'storyImage',
          title: 'Story Image',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Image Description',
              type: 'string',
              description: 'Caption or description for this image',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              media: 'image',
              title: 'description',
            },
          },
        },
      ],
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      order: 'order',
    },
    prepare(selection) {
      const { title, order } = selection;
      return {
        title: `${order}. ${title}`,
      };
    },
  },
});