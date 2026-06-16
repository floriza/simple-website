# Admin & Content Management Guide

This guide is written for **non-technical campaign staff** who need to manage the website content.

---

## Logging Into the CMS (Sanity Studio)

1. Open your browser and go to: `https://your-sanity-studio-url.sanity.studio`
2. Log in with your Google or email account (your developer must invite you first).
3. You will see the **Sanity Studio** — the dashboard for all website content.

---

## Updating the Candidate Biography

1. In Sanity Studio, click **"Candidate Profile"** in the left sidebar.
2. Click on the candidate entry to open it.
3. You can edit:
   - **Full Name** — The candidate's name shown throughout the site
   - **Hero Headline** — The large text on the homepage hero section
   - **Bio** — The short summary shown on the homepage
   - **Full Biography** — The detailed biography on the About page (supports rich text, images, and links)
   - **Education, Experience, Achievements** — Lists shown on the About page
   - **Timeline** — The leadership journey timeline
   - **Social Links** — Facebook, Instagram, Twitter, LinkedIn URLs
   - **Photo** — Upload a new candidate photo (click the image area)
4. Click **"Publish"** when done. The website updates automatically within 1-2 minutes.

---

## Publishing a News Article

1. Click **"News Post"** in the left sidebar.
2. Click the **"+"** button or "Create new" to create a new post.
3. Fill in:
   - **Title** — The article headline
   - **Slug** — Auto-generated from the title (leave as is)
   - **Publish Date** — When the article should go live
   - **Category** — Campaign News, Events, Platform, Research, or Announcement
   - **Featured** — Check this to highlight the article at the top of the news page
   - **Excerpt** — A 1-3 sentence summary (shown in article previews)
   - **Main Image** — Upload a photo for the article
   - **Body** — The full article content (supports headings, bullet lists, images, links, and more)
   - **Tags** — Keywords like "mental-health", "events", "reform"
   - **Author** — Your name or "Campaign Team"
4. Click **"Publish"** when ready.

### Tips for Writing Articles
- Keep headlines under 70 characters for SEO
- Always add a main image (1200×630 pixels ideal)
- Write a clear, concise excerpt
- Use headings to break up long articles

---

## Managing Events

1. Click **"Event"** in the left sidebar.
2. To add a new event, click **"+"**.
3. Fill in:
   - **Event Title** — Clear, descriptive name
   - **Date & Time** — Start time
   - **End Date & Time** — When it ends (optional)
   - **Location** — The venue name and address
   - **Location URL** — A Google Maps link (optional)
   - **Event Type** — Rally, Town Hall, Debate, Volunteer, or Other
   - **Description** — Details about the event
   - **Event Image** — Upload a photo
   - **Enable RSVP?** — Turn on to allow students to register
   - **Capacity** — Maximum number of attendees (optional)
4. Click **"Publish"** to make it visible on the website.

### To Delete/Remove an Event
- Open the event → Click the three-dot menu (⋮) → "Delete"
- Or: Unpublish it to hide it without deleting

---

## Managing Donations

Donations are processed via Stripe. To view donation data:

1. Go to [dashboard.stripe.com](https://dashboard.stripe.com).
2. Under **Payments** → **All payments**, you can see all successful donations.
3. Under **Subscriptions**, you can see recurring monthly donors.
4. Export reports via **Reports → Revenue**.

To issue a refund:
- Click the payment → "Refund payment".

---

## Exporting Contacts (Volunteers & Subscribers)

To export your contact lists:

1. Go to [supabase.com](https://supabase.com) → Your project.
2. Click **"Table Editor"** in the left sidebar.
3. Select the table you want to export:
   - `volunteers` — Volunteer signups
   - `subscribers` — Newsletter subscribers
   - `contact_submissions` — Contact form messages
4. Click **"Export"** → **"CSV"** to download as a spreadsheet.

To import from CSV:
- Use the **"Import data via spreadsheet"** option in the Table Editor.

---

## Updating Homepage Content

Most homepage content is pulled from the **Candidate Profile** in Sanity.

To update specific sections:
- **Hero text** → Edit "Hero Headline" and "Hero Sub-headline" in Candidate Profile
- **Latest News** → Auto-updates from your News Posts
- **Upcoming Events** → Auto-updates from your Events
- **Vision stats** → These are currently hardcoded; ask your developer to update

---

## Managing the Mailing List

All subscribers are stored in Supabase (`subscribers` table) and optionally synced to Mailchimp.

### Sending a Campaign Email (Mailchimp)
1. Log into your [Mailchimp account](https://mailchimp.com).
2. Click **"Create"** → **"Email"**.
3. Select your audience and design your email.
4. Schedule or send immediately.

### Growing the List
- Subscribers come from the **"Subscribe"** form on the Contact page.
- They are automatically added to both Supabase and Mailchimp.

---

## Reviewing Contact Form Messages

1. Go to [supabase.com](https://supabase.com) → Your project → **Table Editor**.
2. Click the **"contact_submissions"** table.
3. You can view, search, and sort all messages.
4. You'll also receive email notifications for each new message.

---

## Frequently Asked Questions

**Q: I published a news post but it's not showing on the website yet.**
A: Wait 1-2 minutes — the website automatically rebuilds after any content change. If it still doesn't show after 5 minutes, contact your developer.

**Q: How do I change the candidate photo?**
A: In Sanity Studio → Candidate Profile → click on the photo → Upload Image.

**Q: Can I schedule a news post to publish in the future?**
A: Yes! Set the "Publish Date" to a future date and time, then publish the post. It will appear on the website at the scheduled time.

**Q: How do I add a new team member to Sanity?**
A: Ask your developer — they will need to invite the new person from the Sanity project settings.
