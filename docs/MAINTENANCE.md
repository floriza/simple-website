# Maintenance Guide

## Weekly Tasks

- [ ] Check Google Analytics for traffic trends
- [ ] Review contact form submissions in Supabase
- [ ] Publish any scheduled news posts
- [ ] Update events calendar with new/changed events
- [ ] Check Stripe dashboard for donation activity

---

## Monthly Tasks

- [ ] Review and respond to all unanswered contact form messages
- [ ] Export volunteer list and follow up with new volunteers
- [ ] Run `npm audit` to check for security vulnerabilities
- [ ] Check Lighthouse scores and address any regressions
- [ ] Review Google Search Console for indexing issues or errors
- [ ] Review subscriber growth and send a campaign email update

---

## Dependency Updates

Run every 1-2 months:

```bash
npm outdated           # Show outdated packages
npm update             # Update minor/patch versions
npx npm-check-updates  # Show major version upgrades (review before applying)
npm run build          # Verify no build errors after updating
```

---

## Backups

### Supabase Database
Supabase auto-backs up databases on paid plans. For free tier:
1. Go to Supabase → Table Editor
2. Export each table as CSV monthly (volunteers, subscribers, contact_submissions, donations)
3. Store in a secure Google Drive or similar

### Sanity Content
Sanity maintains version history of all content automatically. No manual backup needed.

### Code
Your GitHub repository is your code backup. Ensure all changes are committed and pushed.

---

## Security Checklist

- [ ] Rotate Stripe API keys every 6 months
- [ ] Rotate Sanity API tokens every 6 months  
- [ ] Rotate Supabase service role key every 6 months
- [ ] Review Supabase Row Level Security policies after any schema changes
- [ ] Monitor Stripe for suspicious payment activity
- [ ] Check Vercel deployment logs for errors

---

## Performance Monitoring

### Lighthouse (run after any major update)
```bash
npx lighthouse https://yourdomain.com --output html --output-path ./lighthouse-report.html
```

Target scores:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 95+
- SEO: 95+

### Core Web Vitals
Monitor in Google Search Console → **Experience → Core Web Vitals**.

---

## Updating the Sanity Studio

```bash
cd sanity
sanity upgrade
sanity deploy
```

---

## Handling a Compromised Account

If you suspect your Sanity, Supabase, or Stripe accounts are compromised:
1. Immediately rotate all API keys
2. Update all environment variables in Vercel
3. Review access logs for unusual activity
4. Enable 2FA on all accounts if not already enabled

---

## Adding New Campaign Staff to the CMS

1. Go to [manage.sanity.io](https://manage.sanity.io)
2. Select your project → **Members** → **Invite member**
3. Roles:
   - **Editor** — Can create and edit content (recommended for staff)
   - **Viewer** — Read-only (for advisors)
   - **Administrator** — Full access (only for lead developer)

---

## Post-Campaign Archiving

After the election:
1. Export all data from Supabase (contacts, donors, volunteers)
2. Download all Sanity content exports from the Sanity dashboard
3. Cancel Stripe subscriptions (monthly donors) and send thank-you emails
4. Store all exports securely for records
5. Archive the GitHub repository

---

## Emergency Contacts

| Issue | Where to Look | Action |
|-------|--------------|--------|
| Website down | Vercel status page, vercel.com/status | Check deployment logs, redeploy if needed |
| CMS not updating | Sanity Studio | Check Sanity webhook settings |
| Forms not sending emails | Resend dashboard | Check API key, check email logs |
| Payment issues | Stripe dashboard | Check Stripe status page |
| Database issues | Supabase dashboard | Check connection pool, review logs |
