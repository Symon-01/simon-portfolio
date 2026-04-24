export default {
  name: 'pricingService',
  title: 'Pricing Service',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Service Name',
      type: 'string',
      description: 'e.g., Logo Design, Business Card, Poster/Flyer',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'pricingCategory' }],
      description: 'Select which category this service belongs to',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Service Description',
      type: 'text',
      description: 'What is included in this service?',
      rows: 3,
    },
    {
      name: 'price',
      title: 'Price (Minimum)',
      type: 'number',
      description: 'Starting price in KES',
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: 'priceLabel',
      title: 'Price Display Label',
      type: 'string',
      description: 'How to display the current/discounted price. e.g., "KES 3,000 - 6,000" or "From KES 5,000"',
      validation: (Rule: any) => Rule.required(),
    },
    // ─── DISCOUNT FIELDS ──────────────────────────────────────────────────────
    {
      name: 'originalPriceLabel',
      title: 'Original Price Label (before discount)',
      type: 'string',
      description:
        'Optional. The old/full price shown struck-through next to the current price. e.g. "KES 8,000". Leave blank if no discount.',
    },
    {
      name: 'discountLabel',
      title: 'Discount Badge Text',
      type: 'string',
      description:
        'Optional. Short text on the orange badge. e.g. "-20%" or "SAVE 30%" or "LIMITED OFFER". Leave blank if no discount.',
    },
    // ─────────────────────────────────────────────────────────────────────────
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first within the category',
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      title: 'name',
      category: 'category.name',
      discount: 'discountLabel',
    },
    prepare(selection: any) {
      const { title, category, discount } = selection
      return {
        title: discount ? `${title}  •  ${discount}` : title,
        subtitle: category ? `Category: ${category}` : 'No category selected',
      }
    },
  },
}