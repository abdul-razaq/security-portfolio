import { defineField, defineType } from "sanity";

export const infographicType = defineType({
  name: "infographic",
  title: "Infographic",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 5,
      description: "Short description shown below the infographic image",
      validation: (Rule) => Rule.required().max(2000),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Infographic Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      publishedAt: "publishedAt",
    },
    prepare(selection) {
      const { title, publishedAt } = selection;
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString()
        : "";
      return {
        title,
        subtitle: date,
      };
    },
  },
});
