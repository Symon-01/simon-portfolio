import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'aboutMe',
  title: 'About Me - Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title (Your Name)',
      type: 'string',
      description: 'Main title in the hero section (e.g., "Simon Macharia")',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      description: 'Brief description in the hero section',
      validation: (Rule) => Rule.required().max(300),
    }),

    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      description: 'Your professional photo for the hero section',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'skills',
      title: 'Skills / What I Do',
      type: 'array',
      description: 'List of your key skills or services',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'skillName',
              title: 'Skill Name',
              type: 'string',
              description: 'e.g., "Graphic Designer", "Pencil Artist"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'skillIcon',
              title: 'Icon',
              type: 'string',
              description: 'Choose an icon name from lucide-react (e.g., palette, pencil, star)',
              options: {
                list: [
                  // Design & Creative
                  { title: '🎨 Palette (Design)', value: 'palette' },
                  { title: '✏️ Pencil (Art)', value: 'pencil' },
                  { title: '🖌️ Brush (Art)', value: 'brush' },
                  { title: '🎭 Paintbrush (Creative)', value: 'paintbrush' },
                  { title: '✨ Sparkles (Magic)', value: 'sparkles' },
                  { title: '⭐ Star (Quality)', value: 'star' },
                  
                  // Business & Strategy
                  { title: '📊 BarChart3 (Analytics)', value: 'chart' },
                  { title: '🎯 Target (Focus)', value: 'target' },
                  { title: '💡 Lightbulb (Ideas)', value: 'lightbulb' },
                  { title: '🚀 Rocket (Growth)', value: 'rocket' },
                  { title: '📈 TrendingUp (Success)', value: 'trending' },
                  
                  // Technical
                  { title: '💻 Code (Development)', value: 'code' },
                  { title: '⚙️ Settings (Technical)', value: 'settings' },
                  { title: '🔧 Wrench (Tools)', value: 'wrench' },
                  
                  // Communication
                  { title: '💬 MessageSquare (Communication)', value: 'message' },
                  { title: '👥 Users (Team)', value: 'users' },
                  { title: '🤝 Handshake (Partnership)', value: 'handshake' },
                  
                  // Media & Content
                  { title: '📷 Camera (Photography)', value: 'camera' },
                  { title: '🎬 Video (Videography)', value: 'video' },
                  { title: '🎵 Music (Audio)', value: 'music' },
                  { title: '📝 FileText (Content)', value: 'filetext' },
                  
                  // Marketing
                  { title: '📢 Megaphone (Marketing)', value: 'megaphone' },
                  { title: '🔔 Bell (Notifications)', value: 'bell' },
                  { title: '📱 Smartphone (Mobile)', value: 'smartphone' },
                  
                  // Other
                  { title: '❤️ Heart (Passion)', value: 'heart' },
                  { title: '🏆 Trophy (Excellence)', value: 'trophy' },
                  { title: '👁️ Eye (Vision)', value: 'eye' },
                  { title: '🧠 Brain (Intelligence)', value: 'brain' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'skillName',
              subtitle: 'skillIcon',
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'heroTitle',
      media: 'profileImage',
    },
  },
});