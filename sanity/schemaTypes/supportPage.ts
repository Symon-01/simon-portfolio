// FILE LOCATION: sanity/schemaTypes/supportPage.ts
//
// Controls all editable content on the /support page:
// - Hero section (managed via existing Banner Images)
// - Story section (Why Your Support Matters)
// - What Your Support Funds items
// - Widget heading/subheading
// - FAQ questions and answers

export default {
  name: 'supportPage',
  title: 'Support Page',
  type: 'document',
  fields: [

    // ── STORY SECTION ─────────────────────────────────────────────────────────
    {
      name: 'storyLabel',
      title: 'Story Section Label',
      type: 'string',
      description: 'Small orange label above the heading. E.g. "Why Your Support Matters"',
      initialValue: 'Why Your Support Matters',
    },
    {
      name: 'storyHeading',
      title: 'Story Heading (Line 1)',
      type: 'string',
      description: 'First line of the heading in black. E.g. "Creative work takes resources."',
      initialValue: 'Creative work takes resources.',
    },
    {
      name: 'storyHeadingAccent',
      title: 'Story Heading (Line 2 — Green)',
      type: 'string',
      description: 'Second line shown in green. E.g. "Your support makes it possible."',
      initialValue: 'Your support makes it possible.',
    },
    {
      name: 'storyParagraphs',
      title: 'Story Paragraphs',
      type: 'array',
      description: 'The body text paragraphs. Add, remove, or reorder as needed.',
      of: [{ type: 'text', rows: 4 }],
    },

    // ── WHAT YOUR SUPPORT FUNDS ───────────────────────────────────────────────
    {
      name: 'fundsLabel',
      title: '"What Your Support Funds" Card Label',
      type: 'string',
      initialValue: 'What your support funds',
    },
    {
      name: 'fundItems',
      title: 'Fund Items',
      type: 'array',
      description: 'Items shown in the "What Your Support Funds" grid. Up to 6 recommended.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'emoji', title: 'Emoji Icon', type: 'string', description: 'e.g. 🖊️' },
            { name: 'title', title: 'Item Title', type: 'string' },
            { name: 'description', title: 'Item Description', type: 'string' },
            {
              name: 'color',
              title: 'Accent Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Green', value: 'green' },
                  { title: 'Orange', value: 'orange' },
                  { title: 'Purple', value: 'purple' },
                  { title: 'Blue', value: 'blue' },
                  { title: 'Red', value: 'red' },
                ],
              },
              initialValue: 'green',
            },
          ],
          preview: {
            select: { title: 'title', subtitle: 'description', emoji: 'emoji' },
            prepare({ title, subtitle, emoji }: any) {
              return { title: `${emoji || ''} ${title}`, subtitle };
            },
          },
        },
      ],
    },

    // ── WIDGET CARD ───────────────────────────────────────────────────────────
    {
      name: 'widgetHeading',
      title: 'Widget Card Heading',
      type: 'string',
      initialValue: 'Support Simon Designs',
    },
    {
      name: 'widgetSubheading',
      title: 'Widget Card Subheading',
      type: 'string',
      initialValue: 'Help us create more amazing work',
    },
    {
      name: 'widgetStepOneLabel',
      title: 'Widget Step 1 Label',
      type: 'string',
      initialValue: 'Choose how much you\'d like to support us with',
    },

    // ── FAQ SECTION ───────────────────────────────────────────────────────────
    {
      name: 'faqLabel',
      title: 'FAQ Section Label',
      type: 'string',
      initialValue: 'Got questions?',
    },
    {
      name: 'faqHeading',
      title: 'FAQ Section Heading',
      type: 'string',
      initialValue: 'Frequently Asked Questions',
    },
    {
      name: 'faqs',
      title: 'FAQ Items',
      type: 'array',
      description: 'Add, edit, or reorder FAQ questions and answers.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: (Rule: any) => Rule.required() },
          ],
          preview: {
            select: { title: 'question', subtitle: 'answer' },
          },
        },
      ],
    },

    // ── STILL HAVE QUESTIONS CTA ──────────────────────────────────────────────
    {
      name: 'contactCtaHeading',
      title: '"Still Have a Question?" Heading',
      type: 'string',
      initialValue: 'Still have a question?',
    },
    {
      name: 'contactCtaSubtext',
      title: '"Still Have a Question?" Subtext',
      type: 'string',
      initialValue: 'We\'re happy to help. Reach out directly and we\'ll respond promptly.',
    },
    {
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'simonmachariamugo@gmail.com',
    },
  ],

  preview: {
    prepare() {
      return { title: 'Support Page Content' };
    },
  },
};