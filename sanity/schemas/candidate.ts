import { defineType, defineField } from "sanity";

export const candidate = defineType({
  name: "candidate",
  title: "Candidate Profile",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Full Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", title: "Campaign Title", type: "string", description: "e.g. Candidate for Student Council President" }),
    defineField({ name: "position", title: "Position Running For", type: "string" }),
    defineField({ name: "photo", title: "Candidate Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "heroHeadline", title: "Hero Headline", type: "string" }),
    defineField({ name: "heroSubheadline", title: "Hero Sub-headline", type: "text", rows: 3 }),
    defineField({ name: "bio", title: "Short Biography", type: "text", rows: 4 }),
    defineField({ name: "fullBio", title: "Full Biography", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "education", title: "Education", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "experience", title: "Leadership Experience", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "achievements", title: "Achievements", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "communityService", title: "Community Service", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "vision", title: "Vision Statement", type: "text" }),
    defineField({
      name: "timeline",
      title: "Leadership Timeline",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "year", title: "Year", type: "string" },
          { name: "title", title: "Title", type: "string" },
          { name: "description", title: "Description", type: "text" },
        ],
      }],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "object",
      fields: [
        { name: "facebook", title: "Facebook URL", type: "url" },
        { name: "instagram", title: "Instagram URL", type: "url" },
        { name: "twitter", title: "Twitter/X URL", type: "url" },
        { name: "linkedin", title: "LinkedIn URL", type: "url" },
      ],
    }),
    defineField({ name: "email", title: "Contact Email", type: "string" }),
  ],
  preview: { select: { title: "name", media: "photo" } },
});
