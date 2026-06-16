import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImage } from "@/types";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}

// ============================================================
// GROQ QUERIES
// ============================================================

export async function getHomePageData() {
  return sanityClient.fetch(`{
    "candidate": *[_type == "candidate"][0]{
      name, title, position, photo, heroHeadline, heroSubheadline, bio, email, socialLinks
    },
    "priorities": *[_type == "priority"] | order(order asc)[0...6]{
      _id, title, description, icon, slug, color
    },
    "latestNews": *[_type == "newsPost"] | order(publishedAt desc)[0...3]{
      _id, title, slug, excerpt, mainImage, publishedAt, category, featured
    },
    "upcomingEvents": *[_type == "event" && date >= now()] | order(date asc)[0...3]{
      _id, title, slug, description, date, location, type, image
    },
    "testimonials": *[_type == "testimonial" && featured == true][0...3]{
      _id, name, role, photo, quote
    }
  }`);
}

export async function getAllNews(page = 1, category?: string) {
  const perPage = 9;
  const start = (page - 1) * perPage;
  const categoryFilter = category ? `&& category == "${category}"` : "";

  return sanityClient.fetch(`{
    "posts": *[_type == "newsPost" ${categoryFilter}] | order(publishedAt desc)[${start}...${start + perPage}]{
      _id, title, slug, excerpt, mainImage, publishedAt, category, tags, featured
    },
    "total": count(*[_type == "newsPost" ${categoryFilter}])
  }`);
}

export async function getNewsPost(slug: string) {
  return sanityClient.fetch(
    `*[_type == "newsPost" && slug.current == $slug][0]{
      _id, title, slug, excerpt, body, mainImage, publishedAt, category, tags, author
    }`,
    { slug }
  );
}

export async function getAllEvents() {
  return sanityClient.fetch(`*[_type == "event"] | order(date asc){
    _id, title, slug, description, date, endDate, location, locationUrl, type, image, rsvpEnabled, capacity
  }`);
}

export async function getEvent(slug: string) {
  return sanityClient.fetch(
    `*[_type == "event" && slug.current == $slug][0]{
      _id, title, slug, description, date, endDate, location, locationUrl, type, image, rsvpEnabled, capacity
    }`,
    { slug }
  );
}

export async function getPlatformData() {
  return sanityClient.fetch(`*[_type == "policySection"] | order(order asc){
    _id, title, slug, summary, body, icon, color, order, documents
  }`);
}

export async function getBiographyData() {
  return sanityClient.fetch(`*[_type == "candidate"][0]{
    name, title, position, photo, bio, fullBio, education, experience, achievements,
    communityService, vision, timeline, socialLinks
  }`);
}

export async function getAchievements() {
  return sanityClient.fetch(`*[_type == "achievement"] | order(date desc){
    _id, title, description, date, category, image, stat, statLabel
  }`);
}
