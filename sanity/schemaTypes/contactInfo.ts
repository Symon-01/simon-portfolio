export default {
  name: 'contactInfo',
  title: 'Contact Information',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'emailLink',
      title: 'Email Link (mailto)',
      type: 'string',
      initialValue: 'mailto:simonmachariamugo@gmail.com',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'phoneLink',
      title: 'Phone Link (tel)',
      type: 'string',
      initialValue: 'tel:+254742323611',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'locationLink',
      title: 'Location Map Link',
      type: 'url',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'workingHours',
      title: 'Working Hours',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Information',
      }
    },
  },
}