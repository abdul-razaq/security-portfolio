import {BookIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const educationType = defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'degree',
      title: 'Degree',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'institution',
      title: 'Institution',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'period',
      title: 'Period',
      type: 'string',
      description: 'e.g., "2015 - 2019"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'degree',
      institution: 'institution',
      period: 'period',
    },
    prepare(selection) {
      const {title, institution, period} = selection
      return {
        title,
        subtitle: `${institution} • ${period}`,
      }
    },
  },
})
