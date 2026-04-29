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
      description: 'Upload a screenshot/photo of the front page — shown on the website cards',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'mastheadBackground',
      title: 'Masthead Background Image',
      type: 'image',
      description:
        'Optional. Upload an image to display behind the newspaper masthead on the issue detail page.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image (WhatsApp / Facebook)',
      type: 'image',
      description:
        'Upload a landscape image at exactly 1200 × 628px — this is what appears when someone shares the issue link on WhatsApp, Facebook, etc.',
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

    // ── NEW: Web / Online Article Content ────────────────────────────────────
    // This is the text version of the issue that Google can read and index.
    // The PDF viewer above is for the designed layout — this is for SEO + accessibility.
    //
    // HOW TO USE IN SANITY STUDIO:
    //   • H2  → Each major standalone article title  (e.g. "Built on Hard Work...")
    //   • H3  → Sub-article title nested inside an H2 (e.g. "The Student Who Refused...")
    //   • H4  → Red section headings within an article (e.g. "The Lawyer: Standing with the Powerless")
    //   • H5  → Italic subtitle / deck line under H2 or H3
    //   • Normal → Regular paragraph text
    //   • Pull Quote → Highlighted reader quote or key quote
    //   • Article Image → Drop an image anywhere — set caption + position (Full, Left, Right)
    defineField({
      name: 'articleContent',
      title: 'Article Content (Web / Online Version)',
      type: 'array',
      description:
        'Write the full issue here as text. This is what Google indexes. Use the styles dropdown: H2 = major article, H3 = sub-article, H4 = red section heading, H5 = italic subtitle, Normal = paragraph. Drop images anywhere using the + button.',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal (Paragraph)', value: 'normal' },
            { title: 'H2 — Major Article Title', value: 'h2' },
            { title: 'H3 — Sub-Article Title', value: 'h3' },
            { title: 'H4 — Section Heading (Red on website)', value: 'h4' },
            { title: 'H5 — Subtitle / Deck (Italic)', value: 'h5' },
            { title: 'Pull Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
          },
        },
        // Inline image block — drop anywhere in the article
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'caption',
              title: 'Caption (optional)',
              type: 'string',
              description: 'Short description shown below the image on the website',
            }),
            defineField({
              name: 'position',
              title: 'Image Position',
              type: 'string',
              description: 'Full Width fills the column. Left / Right floats the image beside text.',
              options: {
                list: [
                  { title: 'Full Width', value: 'full' },
                  { title: 'Float Left (text wraps right)', value: 'left' },
                  { title: 'Float Right (text wraps left)', value: 'right' },
                ],
                layout: 'radio',
              },
              initialValue: 'full',
            }),
          ],
        },
      ],
    }),
    // ── End of articleContent ─────────────────────────────────────────────────

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
      description:
        'Only one issue should be featured at a time — this shows in the portfolio window',
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
                  { title: "❌ Rejected (hidden, won't show)", value: 'rejected' },
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
            prepare({
              title,
              subtitle,
              description,
            }: {
              title: string
              subtitle: string
              description: string
            }) {
              const statusEmoji =
                subtitle === 'approved' ? '✅' : subtitle === 'rejected' ? '❌' : '⏳'
              return {
                title: title ?? 'Anonymous',
                subtitle: `${statusEmoji} ${subtitle ?? 'pending'} — ${description?.slice(0, 60) ?? ''}…`,
              }
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
    prepare({
      title,
      subtitle,
      media,
    }: {
      title: string
      subtitle: string
      media: any
    }) {
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