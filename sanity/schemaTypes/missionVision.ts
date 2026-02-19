export default {
  name: 'missionVision',
  title: 'Mission & Vision',
  type: 'document',
  fields: [
    {
      name: 'missionTitle',
      title: 'Mission Title',
      type: 'string',
      initialValue: 'Mission',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'missionText',
      title: 'Mission Text',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'visionTitle',
      title: 'Vision Title',
      type: 'string',
      initialValue: 'Vision',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'visionText',
      title: 'Vision Text',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Mission & Vision Section',
      }
    },
  },
}