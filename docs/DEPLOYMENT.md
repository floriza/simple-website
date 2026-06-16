# Deployment Guide

## Prerequisites

- Node.js 18+ installed
- A Vercel account (free tier works)
- A Sanity account (free tier: sanity.io)
- A Supabase account (free tier: supabase.com)
- A Stripe account (stripe.com)
- A Resend account (resend.com) for transactional email

---

## Step 1: Clone & Install

```bash
git clone https://github.com/your-org/campaign-website.git
cd campaign-website
npm install
```

---

## Step 2: Set Up Sanity CMS

```bash
npm install -g @sanity/cli
cd sanity
sanity init    # Creates a new Sanity project
sanity deploy  # Deploys the Sanity Studio
```

Note your **Project ID** and **Dataset** from the Sanity dashboard.

---

## Step 3: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. In the **SQL Editor**, paste the full schema from `src/lib/supabase.ts` (the `DATABASE_SCHEMA` constant).
3. Run the SQL to create all tables and policies.
4. From your Supabase project settings, copy:
   - **Project URL**
   - **Anon key** (public)
   - **Service role key** (keep secret)

---

## Step 4: Set Up Stripe

1. Create a Stripe account at [stripe.com](https://stripe.com).
2. From the **Developers → API keys** page, copy your publishable and secret keys.
3. For webhooks (optional but recommended):
   - Go to **Developers → Webhooks** → Add endpoint
   - Endpoint URL: `https://yourdomain.com/api/webhooks/stripe`
   - Events to listen to: `checkout.session.completed`, `payment_intent.succeeded`

---

## Step 5: Set Up Resend (Email)

1. Create an account at [resend.com](https://resend.com).
2. Add and verify your sending domain.
3. Create an API key.

---

## Step 6: Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in all values:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your real credentials.

---

## Step 7: Run Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

---

## Step 8: Deploy to Vercel

### Option A: Vercel CLI

```bash
npm install -g vercel
vercel --prod
```

### Option B: GitHub Integration (Recommended)

1. Push your code to GitHub.
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your GitHub repo.
3. In **Environment Variables**, add all variables from `.env.local`.
4. Click **Deploy**.

Vercel automatically redeploys on every `git push` to your main branch.

---

## Step 9: Configure Custom Domain

1. In Vercel project settings → **Domains** → Add your domain.
2. Update your domain registrar's DNS to point to Vercel.
3. Vercel auto-provisions SSL certificates.

---

## Step 10: Post-Deployment Checklist

- [ ] Test all contact forms (check email delivery)
- [ ] Test volunteer signup (check Supabase database)
- [ ] Test donation flow with Stripe test card `4242 4242 4242 4242`
- [ ] Verify Google Analytics tracking
- [ ] Submit sitemap to [Google Search Console](https://search.google.com/search-console)
- [ ] Submit sitemap to [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit (target: Performance 90+, SEO 95+)

---

## Search Engine Setup

### Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console).
2. Add your property → Domain or URL prefix.
3. Verify ownership (add the verification meta tag to `layout.tsx`).
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`.

### Bing Webmaster Tools

1. Go to [bing.com/webmasters](https://www.bing.com/webmasters).
2. Add your site.
3. Submit sitemap.

---

## Generating the Sitemap

```bash
npm run build   # Generates sitemap after build
```

The sitemap is auto-generated to `/public/sitemap.xml` via `next-sitemap`.
