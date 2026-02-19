export default {
  name: 'pricingCategory',
  title: 'Pricing Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Category Name',
      type: 'string',
      description: 'e.g., Branding, Marketing, UI/UX Design',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Category Description',
      type: 'text',
      description: 'Short description of what this category includes',
      rows: 3,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Choose from: palette, megaphone, layout, bookopen, package',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (e.g., 1, 2, 3, 4, 5)',
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
    },
  },
}