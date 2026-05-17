// FILE: sanity/schemaTypes/subscriber.ts

import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'subscriber',
  title: 'Newsletter Subscriber',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: Rule => Rule.required().email(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'confirmed',
      title: 'Email Confirmed',
      type: 'boolean',
      initialValue: false,
      description: 'Set to true once the user clicks the confirmation link in their email.',
    }),
    defineField({
      name: 'confirmToken',
      title: 'Confirmation Token',
      type: 'string',
      description: 'One-time token used to verify the subscriber\'s email address.',
    }),
    defineField({
      name: 'subscribedAt',
      title: 'Subscribed At',
      type: 'datetime',
    }),
    defineField({
      name: 'confirmedAt',
      title: 'Confirmed At',
      type: 'datetime',
    }),
    defineField({
      name: 'source',
      title: 'Subscription Source',
      type: 'string',
      description: 'Where the subscriber signed up (e.g. "leadership-review-index", "issue-detail")',
    }),
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'confirmed',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? '✅ Confirmed' : '⏳ Pending confirmation',
      };
    },
  },
});