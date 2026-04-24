export default {
  name: 'banner',
  title: 'Banner Images',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Banner Title',
      type: 'string',
      description: 'Internal reference name (e.g., "Home Hero Banner")',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'pageLocation',
      title: 'Page Location',
      type: 'string',
      options: {
        list: [
          { title: 'Home - Hero', value: 'home-hero' },
          { title: 'Home - CTA', value: 'home-cta' },
          { title: 'About - Hero', value: 'about-hero' },
          { title: 'About - CTA', value: 'about-cta' },
          { title: 'About Me - Hero', value: 'about-me-hero' },
          { title: 'About Me - CTA', value: 'about-me-cta' },
          { title: 'Portfolio - Hero', value: 'portfolio-hero' },
          { title: 'Portfolio - CTA', value: 'portfolio-cta' },
          { title: 'Services - Hero', value: 'services-hero' },
          { title: 'Services - CTA', value: 'services-cta' },
          { title: 'Pricing - Hero', value: 'pricing-hero' },
          { title: 'Pricing - CTA', value: 'pricing-cta' },
          { title: 'Simon Arts - Hero', value: 'simon-arts-hero' },
          { title: 'Simon Arts - CTA', value: 'simon-arts-cta' },
          { title: 'Contact - Hero', value: 'contact-hero' },
          { title: 'Contact - CTA', value: 'contact-cta' },
          { title: 'Leadership Review - Masthead', value: 'leadership-review' },
        ],
        layout: 'dropdown'
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'isSlider',
      title: 'Enable Slider?',
      type: 'boolean',
      description: 'Check this to enable multiple images with slider (recommended for Hero sections with multiple messages)',
      initialValue: false
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
                metadata: ['lqip', 'palette']
              },
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Describe the image for accessibility and SEO',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'order',
              title: 'Display Order',
              type: 'number',
              description: 'Order in slider (1 = first, 2 = second, etc.)',
              initialValue: 1,
              validation: (Rule: any) => Rule.required().min(1)
            },
            {
              name: 'heading',
              title: 'Heading Text (Optional)',
              type: 'string',
              description: 'Main heading to display over the image. Leave empty to hide heading.'
            },
            {
              name: 'subheading',
              title: 'Subheading Text (Optional)',
              type: 'text',
              rows: 3,
              description: 'Secondary text under the heading. Leave empty to hide subheading.'
            },
            
            // ============================================
            // BUTTON LAYOUT SELECTOR
            // ============================================
            {
              name: 'buttonLayout',
              title: 'Button Style',
              type: 'string',
              description: 'Choose how buttons should appear on this slide',
              options: {
                list: [
                  { title: '🔘 Two Buttons (Green + Orange)', value: 'two-buttons' },
                  { title: '🏷️ Single Badge Button (with icon)', value: 'single-badge' },
                  { title: '❌ No Buttons', value: 'no-buttons' }
                ],
                layout: 'radio'
              },
              initialValue: 'two-buttons'
            },

            // ============================================
            // TWO BUTTONS SECTION
            // ============================================
            {
              name: 'showButtons',
              title: 'Show Buttons?',
              type: 'boolean',
              description: 'Check to show CTA buttons on this slide',
              initialValue: true,
              hidden: ({ parent }: any) => parent?.buttonLayout !== 'two-buttons'
            },
            {
              name: 'button1Text',
              title: 'Button 1 Text',
              type: 'string',
              description: 'Text for first button (e.g., "Contact Us", "Get Started")',
              placeholder: 'Contact Us',
              hidden: ({ parent }: any) => parent?.buttonLayout !== 'two-buttons' || !parent?.showButtons
            },
            {
              name: 'button1Link',
              title: 'Button 1 Link',
              type: 'string',
              description: 'URL for first button (e.g., /contact, /services)',
              placeholder: '/contact',
              hidden: ({ parent }: any) => parent?.buttonLayout !== 'two-buttons' || !parent?.showButtons
            },
            {
              name: 'button1Color',
              title: 'Button 1 Color',
              type: 'string',
              options: {
                list: [
                  { title: '🟢 Green (Primary)', value: 'green' },
                  { title: '🟠 Orange (Secondary)', value: 'orange' },
                  { title: '🔵 Blue', value: 'blue' },
                  { title: '🔴 Red', value: 'red' },
                ],
                layout: 'radio'
              },
              initialValue: 'green',
              hidden: ({ parent }: any) => parent?.buttonLayout !== 'two-buttons' || !parent?.showButtons
            },
            {
              name: 'button2Text',
              title: 'Button 2 Text',
              type: 'string',
              description: 'Text for second button (e.g., "View our Work", "See Pricing")',
              placeholder: 'View our Work',
              hidden: ({ parent }: any) => parent?.buttonLayout !== 'two-buttons' || !parent?.showButtons
            },
            {
              name: 'button2Link',
              title: 'Button 2 Link',
              type: 'string',
              description: 'URL for second button (e.g., /portfolio, /pricing)',
              placeholder: '/portfolio',
              hidden: ({ parent }: any) => parent?.buttonLayout !== 'two-buttons' || !parent?.showButtons
            },
            {
              name: 'button2Color',
              title: 'Button 2 Color',
              type: 'string',
              options: {
                list: [
                  { title: '🟠 Orange (Secondary)', value: 'orange' },
                  { title: '🟢 Green (Primary)', value: 'green' },
                  { title: '🔵 Blue', value: 'blue' },
                  { title: '🔴 Red', value: 'red' },
                ],
                layout: 'radio'
              },
              initialValue: 'orange',
              hidden: ({ parent }: any) => parent?.buttonLayout !== 'two-buttons' || !parent?.showButtons
            },

            // ============================================
            // SINGLE BADGE BUTTON SECTION
            // ============================================
            {
              name: 'badgeText',
              title: 'Badge Button Text',
              type: 'string',
              description: 'Text for badge button (e.g., "Bringing Your Vision to Life")',
              placeholder: 'Bringing Your Vision to Life',
              hidden: ({ parent }: any) => parent?.buttonLayout !== 'single-badge',
              validation: (Rule: any) => Rule.custom((value: any, context: any) => {
                const parent = context.parent;
                if (parent?.buttonLayout === 'single-badge' && !value) {
                  return 'Badge text is required when using single badge button';
                }
                return true;
              })
            },
            {
              name: 'badgeIcon',
              title: 'Badge Icon (Emoji)',
              type: 'string',
              description: 'Emoji or symbol for the badge',
              placeholder: '✨',
              initialValue: '✨',
              options: {
                list: [
                  { title: '✨ Sparkles', value: '✨' },
                  { title: '🎨 Art Palette', value: '🎨' },
                  { title: '🚀 Rocket', value: '🚀' },
                  { title: '⭐ Star', value: '⭐' },
                  { title: '💡 Light Bulb', value: '💡' },
                  { title: '🎯 Target', value: '🎯' },
                  { title: '💼 Briefcase', value: '💼' },
                  { title: '🌟 Glowing Star', value: '🌟' },
                  { title: '🔥 Fire', value: '🔥' },
                  { title: '💫 Dizzy', value: '💫' },
                ],
                layout: 'dropdown'
              },
              hidden: ({ parent }: any) => parent?.buttonLayout !== 'single-badge'
            },
            {
              name: 'badgeLink',
              title: 'Badge Button Link (Optional)',
              type: 'string',
              description: 'URL for badge button. Leave empty for non-clickable badge',
              placeholder: '/contact or #section',
              hidden: ({ parent }: any) => parent?.buttonLayout !== 'single-badge'
            },
            {
              name: 'badgeStyle',
              title: 'Badge Background Style',
              type: 'string',
              options: {
                list: [
                  { title: '⚫ Dark Semi-transparent (Default)', value: 'dark' },
                  { title: '⚪ Light Semi-transparent', value: 'light' },
                  { title: '🟢 Green Solid', value: 'green' },
                  { title: '🟠 Orange Solid', value: 'orange' },
                  { title: '🔵 Blue Solid', value: 'blue' }
                ],
                layout: 'radio'
              },
              initialValue: 'dark',
              hidden: ({ parent }: any) => parent?.buttonLayout !== 'single-badge'
            }
          ],
          preview: {
            select: {
              title: 'alt',
              media: 'image',
              order: 'order',
              heading: 'heading',
              buttonLayout: 'buttonLayout'
            },
            prepare(selection: any) {
              const { title, media, order, heading, buttonLayout } = selection;
              const layoutIcon = buttonLayout === 'two-buttons' ? '🔘' : buttonLayout === 'single-badge' ? '🏷️' : '❌';
              return {
                title: `${order}. ${heading || title}`,
                subtitle: `${layoutIcon} ${title}`,
                media: media
              };
            }
          }
        }
      ],
      validation: (Rule: any) => Rule.required().min(1).custom((images: any, context: any) => {
        const isSlider = context.document.isSlider;
        if (isSlider && images && images.length < 2) {
          return 'Slider requires at least 2 images. Disable slider or add more images.';
        }
        return true;
      })
    },
    {
      name: 'notes',
      title: 'Notes',
      type: 'text',
      rows: 2,
      description: 'Internal notes about this banner (not visible on website)'
    }
  ],
  preview: {
    select: {
      title: 'title',
      location: 'pageLocation',
      media: 'images.0.image',
      isSlider: 'isSlider'
    },
    prepare(selection: any) {
      const { title, location, media, isSlider } = selection;
      return {
        title: title,
        subtitle: `${location}${isSlider ? ' (Slider)' : ''}`,
        media: media
      };
    }
  }
}