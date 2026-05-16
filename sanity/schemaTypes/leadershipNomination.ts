// FILE LOCATION: sanity/schemaTypes/leadershipNomination.ts

import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'leadershipNomination',
  title: 'Leadership Nominations',
  type: 'document',
  fields: [
    // ── Section 1: Nominator ──────────────────────────────────────────────
    defineField({
      name: 'nominatorName',
      title: 'Nominator Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),
    defineField({
      name: 'nominatorEmail',
      title: 'Nominator Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
      readOnly: true,
    }),
    defineField({
      name: 'nominatorPhone',
      title: 'Nominator Phone (Optional)',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'nominatorCounty',
      title: 'Nominator County',
      type: 'string',
      readOnly: true,
    }),

    // ── Section 2: Leader Info ────────────────────────────────────────────
    defineField({
      name: 'leaderName',
      title: 'Leader Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),
    defineField({
      name: 'leaderPosition',
      title: 'Leadership Position',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'leaderPositionOther',
      title: 'Other Position (if specified)',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'areaRepresented',
      title: 'Area Represented / Institution',
      type: 'string',
      readOnly: true,
    }),

    // ── Section 3: Nomination Reason ──────────────────────────────────────
    defineField({
      name: 'mainReason',
      title: 'Main Reason for Nomination',
      type: 'text',
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),
    defineField({
      name: 'areasOfImpact',
      title: 'Key Areas of Impact',
      type: 'array',
      of: [{ type: 'string' }],
      readOnly: true,
    }),
    defineField({
      name: 'notableAchievements',
      title: 'Notable Achievements (Optional)',
      type: 'text',
      readOnly: true,
    }),

    // ── Section 4: Supporting Material ───────────────────────────────────
    defineField({
      name: 'supportingLink',
      title: 'Supporting Link (Optional)',
      type: 'url',
      readOnly: true,
    }),

    // ── Section 5: Consent ────────────────────────────────────────────────
    defineField({
      name: 'consentGiven',
      title: 'Consent Given',
      type: 'boolean',
      readOnly: true,
    }),

    // ── Admin fields ──────────────────────────────────────────────────────
    defineField({
      name: 'status',
      title: 'Review Status',
      type: 'string',
      options: {
        list: [
          { title: '🔵 New', value: 'new' },
          { title: '👁️ Under Review', value: 'reviewing' },
          { title: '✅ Shortlisted', value: 'shortlisted' },
          { title: '📰 Published', value: 'published' },
          { title: '❌ Declined', value: 'declined' },
        ],
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'adminNotes',
      title: 'Editorial Notes (Private)',
      type: 'text',
      description: 'Internal notes — not visible to nominators',
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
      leaderName: 'leaderName',
      leaderPosition: 'leaderPosition',
      status: 'status',
      area: 'areaRepresented',
    },
    prepare({ leaderName, leaderPosition, status, area }) {
      const statusEmoji: Record<string, string> = {
        new: '🔵',
        reviewing: '👁️',
        shortlisted: '✅',
        published: '📰',
        declined: '❌',
      };
      return {
        title: `${statusEmoji[status] || '📝'} ${leaderName || 'Unknown Leader'}`,
        subtitle: [leaderPosition, area].filter(Boolean).join(' · '),
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
      name: 'byStatus',
      by: [{ field: 'status', direction: 'asc' }],
    },
  ],
});