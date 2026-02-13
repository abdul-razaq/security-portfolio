import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short description of the blog post',
      validation: (Rule) => Rule.required().max(800),
    }),
    defineField({
      name: 'category',
      title: 'Categories',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Case Study', value: 'Case Study'},
          {title: 'Tool Development', value: 'Tool Development'},
          {title: 'Exploitation', value: 'Exploitation'},
          {title: 'API Security', value: 'API Security'},
          {title: 'Methodology', value: 'Methodology'},
          {title: 'Enumeration', value: 'Enumeration'},
          {title: 'Reconnaissance & Intelligence Gathering', value: 'Reconnaissance & Intelligence Gathering'},
        ],
        layout: 'tags',
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
      description: 'Mark as featured to highlight on the blog page',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readTime',
      title: 'Reading Time',
      type: 'string',
      description: 'e.g., "8 min read"',
      initialValue: '5 min read',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'AbdulRazaq Suleiman',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ]
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      featured: 'featured',
      publishedAt: 'publishedAt',
    },
    prepare(selection) {
      const {title, category, featured, publishedAt} = selection
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString() : ''
      // Handle category as array or string (backward compatibility)
      const categoryDisplay = Array.isArray(category) 
        ? (category.length > 0 ? category.join(', ') : 'Uncategorized')
        : (category || 'Uncategorized')
      return {
        title,
        subtitle: `${categoryDisplay}${featured ? ' ⭐' : ''} • ${date}`,
      }
    },
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Published Date, Old',
      name: 'publishedAtAsc',
      by: [{field: 'publishedAt', direction: 'asc'}],
    },
  ],
})
