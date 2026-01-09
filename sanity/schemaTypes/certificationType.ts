import {DocumentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const certificationType = defineType({
  name: 'certification',
  title: 'Certification',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Certification Name (Short)',
      type: 'string',
      description: 'e.g., "OSCP"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      description: 'e.g., "Offensive Security Certified Professional"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year Obtained',
      type: 'string',
      description: 'e.g., "2024"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'issuer',
      title: 'Issuing Organization',
      type: 'string',
      description: 'e.g., "Offensive Security"',
    }),
    defineField({
      name: 'credentialId',
      title: 'Credential ID',
      type: 'string',
      description: 'Your credential ID (optional)',
    }),
    defineField({
      name: 'credentialUrl',
      title: 'Verification URL',
      type: 'url',
      description: 'Link to verify the certification (optional)',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      fullName: 'fullName',
      year: 'year',
    },
    prepare(selection) {
      const {title, fullName, year} = selection
      return {
        title: `${title} (${year})`,
        subtitle: fullName,
      }
    },
  },
  orderings: [
    {
      title: 'Year, Recent',
      name: 'yearDesc',
      by: [{field: 'year', direction: 'desc'}],
    },
  ],
})
