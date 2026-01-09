import {CodeIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const skillType = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  icon: CodeIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Skill Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'level',
      title: 'Proficiency Level',
      type: 'number',
      validation: (Rule) => Rule.required().min(0).max(100),
      description: 'Skill level as a percentage (0-100)',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Offensive Security', value: 'Offensive Security'},
          {title: 'API Security', value: 'API Security'},
          {title: 'Tool Development', value: 'Tool Development'},
          {title: 'Methodologies', value: 'Methodologies'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon (Emoji)',
      type: 'string',
      description: 'Emoji icon for the skill (e.g., 🌐, 🔌, 🛠️)',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      level: 'level',
      category: 'category',
    },
    prepare(selection) {
      const {title, level, category} = selection
      return {
        title,
        subtitle: `${category} • ${level}%`,
      }
    },
  },
  orderings: [
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [{field: 'category', direction: 'asc'}],
    },
    {
      title: 'Level, High',
      name: 'levelDesc',
      by: [{field: 'level', direction: 'desc'}],
    },
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})
