import { defineType, defineField } from 'sanity';

const skill = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Penetration Testing', value: 'pentest' },
          { title: 'Web Security', value: 'web' },
          { title: 'Network Security', value: 'network' },
          { title: 'Mobile Security', value: 'mobile' },
          { title: 'Cloud Security', value: 'cloud' },
          { title: 'Tools', value: 'tools' },
          { title: 'Programming', value: 'programming' },
        ],
      },
    }),
    defineField({
      name: 'proficiency',
      title: 'Proficiency Level',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon name or emoji',
    }),
  ],
});

export default skill;

