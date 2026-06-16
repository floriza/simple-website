"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight, Tag } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { NewsPost } from "@/types";

const placeholderNews: NewsPost[] = [
  {
    _id: "1",
    title: "Campaign Launches with Overwhelming Student Support",
    slug: { current: "campaign-launch" },
    excerpt: "Hundreds of students gathered at the main quad to witness the official campaign launch, showing strong grassroots support from across all departments.",
    body: [],
    mainImage: { _type: "image", asset: { _ref: "", _type: "reference" } },
    publishedAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
    category: "Campaign News",
    tags: ["launch", "support"],
    featured: true,
    author: "[Candidate Name]",
  },
  {
    _id: "2",
    title: "Mental Health Forum: Students Speak Out",
    slug: { current: "mental-health-forum" },
    excerpt: "Over 200 students attended our campus mental health forum, sharing their experiences and co-creating solutions for better mental health services.",
    body: [],
    mainImage: { _type: "image", asset: { _ref: "", _type: "reference" } },
    publishedAt: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
    category: "Events",
    tags: ["mental-health", "forum"],
    featured: false,
    author: "Campaign Team",
  },
  {
    _id: "3",
    title: "Academic Reform Proposal Released",
    slug: { current: "academic-reform-proposal" },
    excerpt: "Read our comprehensive plan to reduce class waitlists, expand online learning options, and improve academic advising across all departments.",
    body: [],
    mainImage: { _type: "image", asset: { _ref: "", _type: "reference" } },
    publishedAt: new Date(Date.now() - 8 * 24 * 3600 * 1000).toISOString(),
    category: "Platform",
    tags: ["academic", "reform"],
    featured: false,
    author: "[Candidate Name]",
  },
];

const categoryColors: Record<string, string> = {
  "Campaign News": "bg-blue-50 text-blue-700",
  "Events": "bg-green-50 text-green-700",
  "Platform": "bg-purple-50 text-purple-700",
  "Achievement": "bg-amber-50 text-amber-700",
};

interface LatestNewsSectionProps {
  posts?: NewsPost[];
}

export default function LatestNewsSection({ posts = placeholderNews }: LatestNewsSectionProps) {
  return (
    <section className="section-padding bg-white" aria-labelledby="news-heading">
      <div className="container-max">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="section-tag">
              <Tag size={14} />
              Latest Updates
            </span>
            <h2 id="news-heading" className="section-title mb-0">
              Campaign News
            </h2>
          </div>
          <Link href="/news" className="flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all">
            View All News <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card group flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
                {post.mainImage?.asset?._ref ? (
                  <Image
                    src={post.mainImage.asset._ref}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-primary-300 font-heading font-bold text-5xl opacity-30">
                      {post.title.charAt(0)}
                    </div>
                  </div>
                )}
                {post.featured && (
                  <span className="absolute top-3 left-3 bg-accent-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category] || "bg-gray-100 text-gray-600"}`}>
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar size={11} />
                    {formatDate(post.publishedAt, "MMM d, yyyy")}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors line-clamp-2">
                  <Link href={`/news/${post.slug.current}`} className="hover:underline focus-visible:outline-none focus-visible:underline">
                    {post.title}
                  </Link>
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1 mb-4">
                  {post.excerpt}
                </p>

                <Link
                  href={`/news/${post.slug.current}`}
                  className="flex items-center gap-1 text-sm text-primary-600 font-semibold hover:gap-2 transition-all mt-auto"
                  aria-label={`Read more: ${post.title}`}
                >
                  Read More <ArrowRight size={14} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
