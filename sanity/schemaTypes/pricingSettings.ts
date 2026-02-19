export default {
  name: 'pricingSettings',
  title: 'Pricing Page Settings',
  type: 'document',
  fields: [
    {
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Our Pricing Guide',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'pageSubtitle',
      title: 'Page Subtitle',
      type: 'string',
      initialValue: 'Custom packages available for larger projects. All prices in KES.',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'noteTitle',
      title: 'Note Section Title',
      type: 'string',
      initialValue: 'Note:',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'noteContent',
      title: 'Note Section Content',
      type: 'text',
      rows: 4,
      initialValue: 'All prices are indicative and may vary based on project complexity, timeline, and specific requirements. Custom packages are available.',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'requestQuoteButtonText',
      title: 'Request Quote Button Text',
      type: 'string',
      initialValue: 'Request a Quote',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'currencySymbol',
      title: 'Currency Symbol',
      type: 'string',
      initialValue: 'KES',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Pricing Page Settings',
        subtitle: 'Global pricing page configuration',
      }
    },
  },
}