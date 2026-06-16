/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://yourcampaignsite.com",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "weekly",
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/api/", "/admin/"] },
    ],
    additionalSitemaps: [],
  },
  additionalPaths: async () => {
    // In production, fetch news and event slugs from Sanity and add here
    return [
      { loc: "/", changefreq: "daily", priority: 1.0 },
      { loc: "/about", changefreq: "weekly", priority: 0.9 },
      { loc: "/platform", changefreq: "weekly", priority: 0.9 },
      { loc: "/news", changefreq: "daily", priority: 0.8 },
      { loc: "/events", changefreq: "daily", priority: 0.8 },
      { loc: "/achievements", changefreq: "weekly", priority: 0.7 },
      { loc: "/contact", changefreq: "monthly", priority: 0.6 },
      { loc: "/donate", changefreq: "monthly", priority: 0.6 },
    ];
  },
};
