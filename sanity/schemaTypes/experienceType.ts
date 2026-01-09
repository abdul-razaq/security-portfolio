import {CaseIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const experienceType = defineType({
  name: 'experience',
  title: 'Work Experience',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'period',
      title: 'Period',
      type: 'string',
      description: 'e.g., "2022 - Present" or "2020 - 2022"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of skills/technologies used',
    }),
    defineField({
      name: 'highlight',
      title: 'Highlight',
      type: 'boolean',
      description: 'Mark as highlighted to emphasize this experience',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (most recent should be 0)',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      company: 'company',
      period: 'period',
      highlight: 'highlight',
    },
    prepare(selection) {
      const {title, company, period, highlight} = selection
      return {
        title: `${title}${highlight ? ' ⭐' : ''}`,
        subtitle: `${company} • ${period}`,
      }
    },
  },
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Period, Recent',
      name: 'periodDesc',
      by: [{field: 'period', direction: 'desc'}],
    },
  ],
})
