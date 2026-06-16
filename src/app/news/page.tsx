import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Tag, Search, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "News & Updates",
  description: "Stay up to date with the latest campaign news, announcements, and updates from [Candidate Name].",
};

const SAMPLE_POSTS = [
  { id: "1", title: "Campaign Launches with Overwhelming Student Support", slug: "campaign-launch", excerpt: "Hundreds of students gathered at the main quad to witness the official campaign launch.", publishedAt: new Date(Date.now() - 2 * 86400000).toISOString(), category: "Campaign News", featured: true },
  { id: "2", title: "Mental Health Forum Draws 200+ Students", slug: "mental-health-forum", excerpt: "Students from across the university shared their experiences at our campus mental health forum.", publishedAt: new Date(Date.now() - 5 * 86400000).toISOString(), category: "Events", featured: false },
  { id: "3", title: "Academic Reform Proposal Released", slug: "academic-reform-proposal", excerpt: "Read our comprehensive plan to improve academic resources and reduce waitlists.", publishedAt: new Date(Date.now() - 8 * 86400000).toISOString(), category: "Platform", featured: false },
  { id: "4", title: "Volunteer Team Reaches 100 Members", slug: "volunteer-milestone", excerpt: "Thanks to the incredible support of our campus community, the volunteer team has grown rapidly.", publishedAt: new Date(Date.now() - 12 * 86400000).toISOString(), category: "Campaign News", featured: false },
  { id: "5", title: "Campus Facilities Survey Results", slug: "facilities-survey", excerpt: "Over 800 students responded to our campus facilities survey. Here are the key findings.", publishedAt: new Date(Date.now() - 15 * 86400000).toISOString(), category: "Research", featured: false },
  { id: "6", title: "Debate Recap: Candidate Stands Firm on Student Welfare", slug: "debate-recap", excerpt: "A summary of last night's student council candidate debate and where we stand on every issue.", publishedAt: new Date(Date.now() - 18 * 86400000).toISOString(), category: "Campaign News", featured: false },
];

const CATEGORIES = ["All", "Campaign News", "Events", "Platform", "Research"];

const categoryColors: Record<string, string> = {
  "Campaign News": "bg-blue-50 text-blue-700",
  "Events": "bg-green-50 text-green-700",
  "Platform": "bg-purple-50 text-purple-700",
  "Research": "bg-amber-50 text-amber-700",
};

export default function NewsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient pt-32 pb-16 px-4 text-white">
        <div className="container-max">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">News & Updates</h1>
          <p className="text-blue-100 text-lg max-w-xl">
            Stay up to date with campaign announcements, events, and policy developments.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-100 py-4 px-4 sticky top-16 md:top-20 z-30 shadow-sm">
        <div className="container-max flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Category Tabs */}
          <div className="flex gap-1 overflow-x-auto pb-1 sm:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className="flex-shrink-0 px-4 py-2 text-sm font-semibold rounded-lg transition-colors text-gray-600 hover:bg-primary-50 hover:text-primary-700 focus-visible:ring-2 focus-visible:ring-primary-600"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search (UI placeholder — wire up with search params or client state) */}
          <div className="relative flex-shrink-0">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search articles..."
              className="form-input pl-9 py-2 text-sm w-56"
              aria-label="Search news"
            />
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          {/* Featured Post */}
          {SAMPLE_POSTS.filter((p) => p.featured).map((post) => (
            <article key={post.id} className="card mb-8 overflow-hidden md:flex">
              <div className="md:w-2/5 h-56 md:h-auto bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center text-white/20 font-heading text-8xl font-bold">
                {post.title.charAt(0)}
              </div>
              <div className="p-8 md:w-3/5 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-accent-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    Featured
                  </span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category] || "bg-gray-100 text-gray-600"}`}>
                    {post.category}
                  </span>
                </div>
                <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">
                  <Link href={`/news/${post.slug}`} className="hover:text-primary-700 transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-5">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-sm text-gray-400">
                    <Calendar size={13} />
                    {formatDate(post.publishedAt)}
                  </span>
                  <Link href={`/news/${post.slug}`} className="flex items-center gap-1 text-sm text-primary-600 font-semibold hover:gap-2 transition-all">
                    Read More <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLE_POSTS.filter((p) => !p.featured).map((post) => (
              <article key={post.id} className="card group flex flex-col">
                <div className="h-44 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-300 font-heading text-6xl font-bold">
                  {post.title.charAt(0)}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category] || "bg-gray-100 text-gray-600"}`}>
                      <Tag size={10} className="inline mr-1" />
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400">{formatDate(post.publishedAt, "MMM d")}</span>
                  </div>
                  <h3 className="font-heading font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors line-clamp-2 flex-1">
                    <Link href={`/news/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">{post.excerpt}</p>
                  <Link href={`/news/${post.slug}`} className="flex items-center gap-1 text-sm text-primary-600 font-semibold mt-auto hover:gap-2 transition-all">
                    Read More <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-12">
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`w-10 h-10 rounded-lg text-sm font-semibold transition-colors ${page === 1 ? "bg-primary-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-primary-50"}`}
                aria-label={`Page ${page}`}
                aria-current={page === 1 ? "page" : undefined}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
