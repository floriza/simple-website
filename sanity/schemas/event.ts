import { defineType, defineField } from "sanity";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Event Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "date", title: "Start Date & Time", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "endDate", title: "End Date & Time", type: "datetime" }),
    defineField({ name: "location", title: "Location", type: "string", validation: (r) => r.required() }),
    defineField({ name: "locationUrl", title: "Location URL (Google Maps)", type: "url" }),
    defineField({ name: "type", title: "Event Type", type: "string", options: { list: ["rally", "townhall", "debate", "volunteer", "other"] } }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "image", title: "Event Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "rsvpEnabled", title: "Enable RSVP?", type: "boolean", initialValue: true }),
    defineField({ name: "capacity", title: "Capacity (optional)", type: "number" }),
  ],
  orderings: [{ title: "Date (Soonest First)", name: "dateAsc", by: [{ field: "date", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "date", media: "image" } },
});
