# Solution Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│                    USERS (Students)                     │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTPS
                           ▼
┌─────────────────────────────────────────────────────────┐
│                    Vercel CDN / Edge                     │
│           Next.js 14 App (SSG + ISR + SSR)              │
│                                                         │
│  Pages: Home / About / Platform / News / Events /       │
│         Achievements / Contact / Donate                 │
│                                                         │
│  API Routes:                                            │
│    POST /api/contact    → Email + Supabase              │
│    POST /api/volunteer  → Email + Supabase              │
│    POST /api/subscribe  → Email + Supabase + Mailchimp  │
│    POST /api/donate     → Stripe Checkout               │
└──────────┬───────────────┬───────────────┬──────────────┘
           │               │               │
           ▼               ▼               ▼
┌─────────────┐  ┌──────────────┐  ┌────────────────┐
│  Sanity CMS │  │  Supabase DB │  │     Stripe      │
│             │  │              │  │                 │
│ • Candidate │  │ • volunteers │  │ • Checkout      │
│ • News      │  │ • subscribers│  │ • Subscriptions │
│ • Events    │  │ • contacts   │  │ • Webhooks      │
│ • Platform  │  │ • donations  │  │                 │
│ • Achieve.  │  │              │  └────────────────┘
└─────────────┘  └──────────────┘
                                          │
                                          ▼
                               ┌────────────────────┐
                               │       Resend        │
                               │  Transactional      │
                               │  Email Service      │
                               └────────────────────┘
```

---

## Technology Decisions

### Next.js 14 (App Router)
- **Why**: Best-in-class performance with hybrid SSG/SSR/ISR. Excellent SEO support.
- **Pattern**: Static generation for most pages; ISR for news/events (revalidate every 60 seconds).

### Sanity CMS
- **Why**: Easiest for non-technical staff to use; real-time updates; excellent media handling; GROQ query language is powerful.
- **Alternative**: WordPress Headless (more familiar to many clients but more infrastructure to manage).

### Supabase (PostgreSQL)
- **Why**: Simple, fast, free tier is generous, excellent Row Level Security, built-in REST API.
- **Usage**: Stores form submissions, volunteers, subscribers, and donation metadata.

### Stripe
- **Why**: Industry standard, PCI compliant, easy Checkout integration, supports recurring billing.
- **Architecture**: Redirect to Stripe Checkout (never handle card data ourselves — PCI compliant by design).

### Resend
- **Why**: Simple transactional email API with excellent deliverability; free tier is generous.
- **Alternative**: Mailchimp transactional (Mandrill), SendGrid.

### Vercel
- **Why**: Zero-config Next.js deployment, global CDN, automatic SSL, free tier available.
- **Alternative**: Netlify, AWS Amplify, Railway.

---

## Page Rendering Strategy

| Page | Strategy | Revalidation |
|------|----------|-------------|
| Home | ISR | 60 seconds |
| About | ISR | 3600 seconds |
| Platform | ISR | 3600 seconds |
| News List | ISR | 60 seconds |
| News Article | ISR | 300 seconds |
| Events | ISR | 60 seconds |
| Achievements | ISR | 3600 seconds |
| Contact | Static | — |
| Donate | Static | — |

---

## Sitemap

```
/                    — Home (Hero, Vision, Priorities, News, Events, CTA)
/about               — Candidate biography, timeline, achievements
/platform            — Full policy platform (6 sections)
/news                — News & Updates (with categories, search, pagination)
/news/[slug]         — Individual news article
/events              — Events calendar (upcoming + past)
/events/[slug]       — Individual event detail + RSVP
/achievements        — Achievements & initiatives
/contact             — Contact form, volunteer form, subscribe form
/donate              — Donation page (Stripe)
/donate/success      — Post-donation confirmation
/privacy             — Privacy policy
/accessibility       — Accessibility statement
```

---

## Security Architecture

- **CSRF**: Next.js built-in protection on API routes
- **XSS**: All inputs sanitized server-side; React escapes output by default
- **SQL Injection**: Supabase parameterized queries; no raw SQL
- **Rate Limiting**: IP-based in-memory rate limiter on all API routes
- **Honeypot**: Hidden field on all forms to catch bots
- **CSP**: Strict Content Security Policy headers via next.config.ts
- **PCI Compliance**: Card data never touches our servers (redirect to Stripe Checkout)
- **Secure Headers**: X-Frame-Options, X-Content-Type-Options, Referrer-Policy all set

---

## CMS Content Model

### Candidate Profile (singleton)
- name, title, position, photo
- heroHeadline, heroSubheadline
- bio, fullBio (rich text)
- education[], experience[], achievements[], communityService[]
- timeline[] (year, title, desc)
- socialLinks (facebook, instagram, twitter, linkedin)

### News Post
- title, slug, publishedAt, category, featured
- excerpt, mainImage, body (portable text)
- tags[], author

### Event
- title, slug, date, endDate
- location, locationUrl, type
- description, image
- rsvpEnabled, capacity

### Policy Section (Platform)
- title, slug, summary
- body (portable text with embedded docs/videos)
- icon, color, order

### Achievement
- title, description, date, category
- image, stat, statLabel

### Testimonial
- name, role, photo, quote, featured
