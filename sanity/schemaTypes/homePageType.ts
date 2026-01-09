import {HomeIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home Page Content',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Home Page',
      readOnly: true,
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'greeting',
          title: 'Greeting',
          type: 'string',
          initialValue: "Hello, I'm",
        }),
        defineField({
          name: 'firstName',
          title: 'First Name',
          type: 'string',
          initialValue: 'AbdulRazaq',
        }),
        defineField({
          name: 'lastName',
          title: 'Last Name',
          type: 'string',
          initialValue: 'Suleiman',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          description: 'Main description text in hero section',
        }),
        defineField({
          name: 'roles',
          title: 'Roles (for typewriter effect)',
          type: 'array',
          of: [{type: 'string'}],
          description: 'List of roles that will cycle in the typewriter effect',
        }),
      ],
    }),
    defineField({
      name: 'about',
      title: 'About Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 4,
        }),
        defineField({
          name: 'features',
          title: 'Feature Cards',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({name: 'icon', type: 'string', title: 'Icon (emoji)'}),
                defineField({name: 'title', type: 'string', title: 'Title'}),
                defineField({name: 'description', type: 'string', title: 'Description'}),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'services',
      title: 'Services Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'services',
          title: 'Services',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({name: 'icon', type: 'string', title: 'Icon (emoji)'}),
                defineField({name: 'title', type: 'string', title: 'Title'}),
                defineField({name: 'description', type: 'text', title: 'Description', rows: 3}),
                defineField({
                  name: 'features',
                  type: 'array',
                  title: 'Features',
                  of: [{type: 'string'}],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare() {
      return {
        title: 'Home Page Content',
        subtitle: 'Manage hero, about, and services sections',
      }
    },
  },
})
