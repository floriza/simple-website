import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { checkRateLimit } from "@/lib/utils";
import { Resend } from "resend";

const schema = z.object({
  email: z.string().email(),
  firstName: z.string().max(100).optional(),
  lastName: z.string().max(100).optional(),
  honeypot: z.string().max(0),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (!checkRateLimit(ip, 3, 60_000)) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 422 });
  }

  const { email, firstName, lastName } = result.data;

  const { error: dbError } = await supabaseAdmin
    .from("subscribers")
    .upsert(
      [{ email: email.toLowerCase().trim(), first_name: firstName || null, last_name: lastName || null, source: "website", status: "active" }],
      { onConflict: "email" }
    );

  if (dbError && dbError.code !== "23505") {
    console.error("Subscriber DB error:", dbError);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }

  // Optionally also add to Mailchimp
  if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_AUDIENCE_ID) {
    try {
      await fetch(
        `https://${process.env.MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.MAILCHIMP_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email_address: email.toLowerCase().trim(),
            status: "subscribed",
            merge_fields: { FNAME: firstName || "", LNAME: lastName || "" },
          }),
        }
      );
    } catch (mcErr) {
      console.error("Mailchimp error:", mcErr);
    }
  }

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "noreply@campaign.edu",
      to: email.toLowerCase().trim(),
      subject: "You're subscribed! — [Candidate Name] Campaign",
      html: `
        <h2>Hi${firstName ? ` ${firstName}` : ""}!</h2>
        <p>You're now subscribed to campaign updates from [Candidate Name] for Student President.</p>
        <p>You'll receive updates about:</p>
        <ul>
          <li>Campaign news and announcements</li>
          <li>Upcoming events</li>
          <li>Platform and policy updates</li>
        </ul>
        <p>To unsubscribe at any time, <a href="${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe?email=${encodeURIComponent(email)}">click here</a>.</p>
        <p>— The Campaign Team</p>
      `,
    });
  } catch (emailErr) {
    console.error("Subscribe email error:", emailErr);
  }

  return NextResponse.json({ success: true });
}
