import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'skillsExpertise',
  title: 'Skills & Expertise Section',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionDescription',
      title: 'Section Description',
      type: 'string',
      description: 'Main description for the Skills & Expertise section (the highlighted text)',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'skillCategories',
      title: 'Skill Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Category Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Category Description',
              type: 'string',
              description: 'Brief description of this skill category',
            }),
            defineField({
              name: 'categoryImage',
              title: 'Category Image (Square)',
              type: 'image',
              description: 'Square image for the skill category card',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'items',
              title: 'Skills/Services',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'categoryImage',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().length(3),
    }),

    defineField({
      name: 'designTools',
      title: 'Design Tools',
      type: 'array',
      description: 'Add or remove design tools as you learn new software',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'toolName',
              title: 'Tool Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'toolName',
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'skillCategories.0.title',
    },
    prepare() {
      return {
        title: 'Skills & Expertise',
      };
    },
  },
});