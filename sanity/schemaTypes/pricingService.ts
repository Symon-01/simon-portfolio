// FILE LOCATION: sanity/schemaTypes/pricingService.ts

export default {
  name: 'pricingService',
  title: 'Pricing Service',
  type: 'document',
  fields: [
    // ─── Core ────────────────────────────────────────────────────────────────
    {
      name: 'name',
      title: 'Service Name',
      type: 'string',
      description: 'e.g., Magazine Layouts, Logo Design, Product Packaging',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'pricingCategory' }],
      description: 'Which category does this service belong to?',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Service Description',
      type: 'text',
      description: 'Brief description shown under the service name.',
      rows: 2,
    },

    // ─── Pricing type ─────────────────────────────────────────────────────────
    {
      name: 'pricingType',
      title: 'Pricing Type',
      type: 'string',
      description:
        'Fixed = one flat price shown directly. Variable = client uses the estimator to calculate.',
      options: {
        list: [
          { title: 'Fixed Price', value: 'fixed' },
          { title: 'Variable / Estimated', value: 'variable' },
        ],
        layout: 'radio',
      },
      initialValue: 'fixed',
      validation: (Rule: any) => Rule.required(),
    },

    // ─── Price fields ─────────────────────────────────────────────────────────
    {
      name: 'price',
      title: 'Base / Starting Price (KES)',
      type: 'number',
      description:
        'For fixed services: the exact price. For variable services: the minimum / starting price shown as "From KES X".',
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: 'priceLabel',
      title: 'Price Display Label',
      type: 'string',
      description:
        'Only used for FIXED services. How to display the price. e.g. "KES 3,500" or "KES 3,000 – 6,000".',
      hidden: ({ document }: any) => document?.pricingType === 'variable',
    },

    // ─── Discount fields ──────────────────────────────────────────────────────
    {
      name: 'originalPriceLabel',
      title: 'Original Price Label (before discount)',
      type: 'string',
      description:
        'Optional. Shown struck-through next to the current price. e.g. "KES 8,000". Leave blank if no discount.',
    },
    {
      name: 'discountLabel',
      title: 'Discount Badge Text',
      type: 'string',
      description:
        'Optional. Short text for the orange badge. e.g. "-20%" or "SAVE 30%". Leave blank if no discount.',
    },

    // ─── Display order ────────────────────────────────────────────────────────
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first within the category.',
      initialValue: 0,
    },
  ],

  preview: {
    select: {
      title: 'name',
      category: 'category.name',
      pricingType: 'pricingType',
      discount: 'discountLabel',
    },
    prepare(selection: any) {
      const { title, category, pricingType, discount } = selection;
      const typeTag = pricingType === 'variable' ? '〜 Variable' : '✓ Fixed';
      return {
        title: discount ? `${title}  •  ${discount}` : title,
        subtitle: `${category ?? 'No category'}  ·  ${typeTag}`,
      };
    },
  },
}