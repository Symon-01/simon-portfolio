// FILE LOCATION: sanity/schemaTypes/contactMessage.ts

import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'contactMessage',
  title: 'Contact Messages',
  type: 'document',
  fields: [
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
      readOnly: true,
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'service',
      title: 'Service Interested In',
      type: 'string',
      readOnly: true,
    }),

    // ── Estimator fields ─────────────────────────────────────────────────────
    // Only populated when the quote request came from the pricing estimator.

    defineField({
      name: 'originService',
      title: '📌 Origin Service (from Estimator)',
      type: 'string',
      description: 'The specific service the client was estimating — e.g. "Magazine Layouts | KES 3,460". Always captured even if the client rewrites Project Details.',
      readOnly: true,
    }),
    defineField({
      name: 'estimateSummary',
      title: '🧮 Estimate Breakdown (from Estimator)',
      type: 'text',
      description: 'The full estimator configuration the client set before requesting a formal quote.',
      readOnly: true,
    }),
    // ─────────────────────────────────────────────────────────────────────────

    defineField({
      name: 'projectDetails',
      title: 'Project Details (Client Message)',
      type: 'text',
      description: 'What the client wrote freely in the Project Details field.',
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: '🔵 Unread', value: 'unread' },
          { title: '✅ Read', value: 'read' },
          { title: '📧 Replied', value: 'replied' },
          { title: '✔️ Resolved', value: 'resolved' },
        ],
      },
      initialValue: 'unread',
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'string',
      options: {
        list: [
          { title: '🔴 High', value: 'high' },
          { title: '🟡 Medium', value: 'medium' },
          { title: '🟢 Low', value: 'low' },
        ],
      },
      initialValue: 'medium',
    }),
    defineField({
      name: 'adminNotes',
      title: 'Admin Notes (Private)',
      type: 'text',
      description: 'Internal notes - not visible to users',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'originService',
      email: 'email',
      status: 'status',
    },
    prepare({ title, subtitle, email, status }) {
      const statusEmoji: Record<string, string> = {
        unread: '🔵',
        read: '✅',
        replied: '📧',
        resolved: '✔️',
      };
      return {
        title: `${statusEmoji[status] || '📝'} ${title}`,
        // Shows the origin service in the list if available, otherwise email
        subtitle: subtitle ? `📌 ${subtitle}` : email,
      };
    },
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'newestFirst',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
    {
      title: 'Status',
      name: 'status',
      by: [{ field: 'status', direction: 'asc' }],
    },
  ],
});