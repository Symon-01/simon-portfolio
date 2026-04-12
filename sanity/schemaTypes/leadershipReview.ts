// FILE: sanity/schemaTypes/leadershipReview.ts

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'leadershipReview',
  title: 'The Leadership Review',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Issue Title / Headline',
      type: 'string',
      description: 'e.g. "Double Scholar, Double Impact"',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'issueNumber',
      title: 'Issue Number',
      type: 'number',
      description: 'e.g. 1 for the first issue',
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'volume',
      title: 'Volume',
      type: 'number',
      description: 'e.g. 1',
      initialValue: 1,
    }),
    defineField({
      name: 'edition',
      title: 'Edition Label',
      type: 'string',
      description: 'e.g. "Special Edition" or "Monthly Edition"',
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'date',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'Upload a screenshot/photo of the front page',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'pdfFile',
      title: 'PDF File',
      type: 'file',
      description: 'Upload the full newspaper PDF',
      options: { accept: '.pdf' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'featuredLeader',
      title: 'Featured Leader',
      type: 'string',
      description: 'e.g. "Hon. Ndindi Nyoro"',
    }),
    defineField({
      name: 'leaderTitle',
      title: 'Leader Title / Role',
      type: 'string',
      description: 'e.g. "MP for Kiharu Constituency"',
    }),
    defineField({
      name: 'county',
      title: 'County',
      type: 'string',
    }),
    defineField({
      name: 'constituency',
      title: 'Constituency / Ward',
      type: 'string',
    }),
    defineField({
      name: 'summary',
      title: 'Issue Summary',
      type: 'text',
      rows: 4,
      description: 'Short paragraph shown on the portfolio window and issue listing',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Education', value: 'Education' },
          { title: 'Policy', value: 'Policy' },
          { title: 'County Leadership', value: 'County Leadership' },
          { title: 'National Leadership', value: 'National Leadership' },
          { title: 'Constituency', value: 'Constituency' },
          { title: 'Special Edition', value: 'Special Edition' },
          { title: 'Monthly Edition', value: 'Monthly Edition' },
          { title: 'Infrastructure', value: 'Infrastructure' },
          { title: 'Health', value: 'Health' },
          { title: 'Business', value: 'Business' },
        ],
      },
    }),
    defineField({
      name: 'isFeatured',
      title: 'Feature as Latest Issue?',
      type: 'boolean',
      description: 'Only one issue should be featured at a time — this shows in the portfolio window',
      initialValue: false,
    }),
    defineField({
      name: 'reviews',
      title: 'Reader Reviews',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'review',
          fields: [
            defineField({ name: 'reviewerName', title: 'Reviewer Name', type: 'string' }),
            defineField({ name: 'location', title: 'Location', type: 'string', description: 'e.g. "Nairobi"' }),
            defineField({
              name: 'rating',
              title: 'Rating (1–5)',
              type: 'number',
              validation: Rule => Rule.min(1).max(5),
            }),
            defineField({ name: 'comment', title: 'Comment', type: 'text', rows: 3 }),
            defineField({ name: 'date', title: 'Date Submitted', type: 'date' }),
          ],
          preview: {
            select: { title: 'reviewerName', subtitle: 'comment' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'featuredLeader',
      media: 'coverImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title ?? 'Untitled Issue',
        subtitle: subtitle ? `Featured: ${subtitle}` : 'No leader specified',
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'publishedDateDesc',
      by: [{ field: 'publishedDate', direction: 'desc' }],
    },
  ],
})