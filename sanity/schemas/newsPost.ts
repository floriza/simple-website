import { defineType, defineField } from "sanity";

export const newsPost = defineType({
  name: "newsPost",
  title: "News Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug (URL)", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "publishedAt", title: "Publish Date", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "category", title: "Category", type: "string", options: { list: ["Campaign News", "Events", "Platform", "Research", "Announcement"] } }),
    defineField({ name: "featured", title: "Featured Post?", type: "boolean", initialValue: false }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3, validation: (r) => r.required().max(300) }),
    defineField({ name: "mainImage", title: "Main Image", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "Alt Text" }] }),
    defineField({ name: "body", title: "Body Content", type: "array", of: [{ type: "block" }, { type: "image", options: { hotspot: true } }] }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "author", title: "Author", type: "string" }),
  ],
  orderings: [{ title: "Published Date (Newest First)", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title", media: "mainImage", subtitle: "publishedAt" } },
});
