// FILE: sanity/schemaTypes/leadershipReview.ts
//
// Changes from previous version:
//   - Added `mastheadBackground` image field — displayed behind the newspaper
//     masthead on the issue detail page. Optional; masthead looks normal without it.

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
      description: 'Upload a screenshot/photo of the front page — shown on the website cards',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'mastheadBackground',
      title: 'Masthead Background Image',
      type: 'image',
      description: 'Optional. Upload an image to display behind the newspaper masthead on the issue detail page. A white overlay is applied automatically so all text stays readable. Works best with landscape photos or textured backgrounds.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image (WhatsApp / Facebook)',
      type: 'image',
      description: 'Upload a landscape image at exactly 1200 × 628px — this is what appears when someone shares the issue link on WhatsApp, Facebook, Twitter, etc. If left empty, the Cover Image will be used instead.',
      options: { hotspot: true },
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

    // ── Reader Reviews (with moderation) ──────────────────────────────────────
    defineField({
      name: 'reviews',
      title: 'Reader Reviews',
      type: 'array',
      description: 'Reviews submitted by readers. Use Status and Hidden to moderate each one.',
      of: [
        {
          type: 'object',
          name: 'review',
          fields: [
            defineField({
              name: 'reviewerName',
              title: 'Reviewer Name',
              type: 'string',
            }),
            defineField({
              name: 'location',
              title: 'Location',
              type: 'string',
              description: 'e.g. "Nairobi"',
            }),
            defineField({
              name: 'rating',
              title: 'Rating (1–5)',
              type: 'number',
              validation: Rule => Rule.min(1).max(5),
            }),
            defineField({
              name: 'comment',
              title: 'Comment',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'date',
              title: 'Date Submitted',
              type: 'date',
            }),
            defineField({
              name: 'status',
              title: 'Moderation Status',
              type: 'string',
              description:
                'Pending = not yet reviewed by Simon. Approved = shows publicly. Rejected = will not show.',
              options: {
                list: [
                  { title: '⏳ Pending (default — not shown yet)', value: 'pending' },
                  { title: '✅ Approved (shows on the website)', value: 'approved' },
                  { title: '❌ Rejected (hidden, won\'t show)', value: 'rejected' },
                ],
                layout: 'radio',
              },
              initialValue: 'pending',
            }),
            defineField({
              name: 'isHidden',
              title: 'Hide this review?',
              type: 'boolean',
              description:
                'Toggle ON to hide an already-approved review without deleting it.',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'reviewerName',
              subtitle: 'status',
              description: 'comment',
            },
            prepare({ title, subtitle, description }: { title: string; subtitle: string; description: string }) {
              const statusEmoji =
                subtitle === 'approved' ? '✅' :
                subtitle === 'rejected' ? '❌' : '⏳';
              return {
                title: title ?? 'Anonymous',
                subtitle: `${statusEmoji} ${subtitle ?? 'pending'} — ${description?.slice(0, 60) ?? ''}…`,
              };
            },
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
    prepare({ title, subtitle, media }: { title: string; subtitle: string; media: any }) {
      return {
        title: title ?? 'Untitled Issue',
        subtitle: subtitle ? `Featured: ${subtitle}` : 'No leader specified',
        media,
      };
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