# Student Election Campaign Website

A production-ready, modern campaign website built for student election campaigns.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| CMS | Sanity |
| Database | Supabase (PostgreSQL) |
| Payments | Stripe |
| Email | Resend |
| Hosting | Vercel |

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Fill in all values in .env.local

# 3. Start development server
npm run dev
```

Visit http://localhost:3000

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home page
│   ├── about/              # Biography page
│   ├── platform/           # Policy platform page
│   ├── news/               # News & updates
│   ├── events/             # Events calendar
│   ├── achievements/       # Achievements page
│   ├── contact/            # Contact + volunteer + subscribe
│   ├── donate/             # Donation page (Stripe)
│   ├── privacy/            # Privacy policy
│   ├── api/                # API routes
│   │   ├── contact/        # Contact form handler
│   │   ├── volunteer/      # Volunteer signup handler
│   │   ├── subscribe/      # Newsletter subscription
│   │   └── donate/         # Stripe checkout creation
│   ├── layout.tsx          # Root layout (nav, footer, SEO)
│   └── globals.css         # Global styles
│
├── components/
│   ├── layout/             # Navbar, Footer, GoogleAnalytics
│   ├── sections/           # Page sections (Hero, Priorities, etc.)
│   └── forms/              # Form components (Contact, Volunteer, etc.)
│
├── lib/
│   ├── sanity.ts           # Sanity client + GROQ queries
│   ├── supabase.ts         # Supabase client + DB schema
│   └── utils.ts            # Utilities, validation helpers
│
└── types/
    └── index.ts            # Shared TypeScript types

sanity/                     # Sanity Studio configuration
├── schemas/
│   ├── candidate.ts        # Candidate profile schema
│   ├── newsPost.ts         # News post schema
│   ├── event.ts            # Event schema
│   └── index.ts            # Schema exports

docs/                       # Documentation
├── ARCHITECTURE.md         # System design & tech decisions
├── DEPLOYMENT.md           # Step-by-step deployment guide
├── ADMIN_GUIDE.md          # CMS guide for non-technical staff
└── MAINTENANCE.md          # Ongoing maintenance procedures
```

## Pages

- **/** — Home (Hero, Vision, Priorities, News, Events, CTA)
- **/about** — Biography, timeline, experience, achievements
- **/platform** — Full policy platform with 6 sections
- **/news** — Campaign news with categories, search, pagination
- **/events** — Events calendar with RSVP
- **/achievements** — Achievements & community impact
- **/contact** — Contact, Volunteer, and Subscribe forms
- **/donate** — Stripe-powered donation page

## Documentation

- [Architecture Overview](docs/ARCHITECTURE.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Admin & CMS Guide](docs/ADMIN_GUIDE.md)
- [Maintenance Guide](docs/MAINTENANCE.md)

## Accessibility

This site targets WCAG 2.1 AA compliance:
- Semantic HTML throughout
- Keyboard navigation support
- ARIA labels on all interactive elements
- Skip-to-content link
- Color contrast ratios meeting AA standards
- Focus indicators on all focusable elements

## Security

- CSRF protection via Next.js
- XSS protection (sanitized inputs + React escaping)
- Rate limiting on all API routes
- Honeypot spam protection on all forms
- Strict Content Security Policy headers
- PCI-compliant payments (Stripe Checkout redirect)
- Row Level Security on Supabase

## License

Campaign use only. Replace all placeholder content before deployment.
