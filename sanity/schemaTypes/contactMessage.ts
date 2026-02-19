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
    defineField({
      name: 'projectDetails',
      title: 'Project Details',
      type: 'text',
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
      subtitle: 'email',
      status: 'status',
    },
    prepare({ title, subtitle, status }) {
      const statusEmoji = {
        unread: '🔵',
        read: '✅',
        replied: '📧',
        resolved: '✔️',
      };
      return {
        title: `${statusEmoji[status as keyof typeof statusEmoji] || '📝'} ${title}`,
        subtitle: subtitle,
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