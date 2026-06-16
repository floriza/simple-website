import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Server-side client with elevated permissions
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

// ============================================================
// DATABASE SCHEMA (run in Supabase SQL editor)
// ============================================================
export const DATABASE_SCHEMA = `
-- Contact form submissions
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  student_id TEXT,
  mobile TEXT,
  message TEXT NOT NULL,
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  read BOOLEAN DEFAULT FALSE
);

-- Volunteer sign-ups
CREATE TABLE volunteers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  mobile TEXT NOT NULL,
  interests TEXT[] DEFAULT '{}',
  availability TEXT,
  skills TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mailing list subscribers
CREATE TABLE subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
  source TEXT DEFAULT 'website',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

-- Event RSVPs
CREATE TABLE event_rsvps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile TEXT,
  guests INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, email)
);

-- Donation records (Stripe handles payment; this stores metadata)
CREATE TABLE donations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_payment_intent_id TEXT UNIQUE,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'usd',
  frequency TEXT DEFAULT 'once' CHECK (frequency IN ('once', 'monthly')),
  donor_name TEXT,
  donor_email TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'succeeded', 'failed', 'refunded')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row-level security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Only service role can read; anyone can insert (for form submissions)
CREATE POLICY "Enable insert for all" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for all" ON volunteers FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for all" ON subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for all" ON event_rsvps FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role only" ON contact_submissions FOR SELECT USING (auth.role() = 'service_role');
CREATE POLICY "Service role only" ON volunteers FOR SELECT USING (auth.role() = 'service_role');
CREATE POLICY "Service role only" ON subscribers FOR SELECT USING (auth.role() = 'service_role');
CREATE POLICY "Service role only" ON event_rsvps FOR SELECT USING (auth.role() = 'service_role');

-- Index for performance
CREATE INDEX idx_volunteers_email ON volunteers(email);
CREATE INDEX idx_subscribers_email ON subscribers(email);
CREATE INDEX idx_donations_stripe ON donations(stripe_payment_intent_id);
CREATE INDEX idx_event_rsvps_event ON event_rsvps(event_id);
`;
