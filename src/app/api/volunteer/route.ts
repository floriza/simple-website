import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { checkRateLimit, sanitizeInput } from "@/lib/utils";
import { Resend } from "resend";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  mobile: z.string().min(7).max(20),
  interests: z.array(z.string()).min(1),
  availability: z.string().min(1),
  skills: z.string().max(500).optional(),
  honeypot: z.string().max(0),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (!checkRateLimit(ip, 2, 60_000)) {
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
    return NextResponse.json({ error: "Invalid form data" }, { status: 422 });
  }

  const { name, email, mobile, interests, availability, skills } = result.data;

  const { error: dbError } = await supabaseAdmin
    .from("volunteers")
    .upsert(
      [{
        name: sanitizeInput(name),
        email: email.toLowerCase().trim(),
        mobile: sanitizeInput(mobile),
        interests,
        availability,
        skills: skills ? sanitizeInput(skills) : null,
        status: "pending",
      }],
      { onConflict: "email" }
    );

  if (dbError) {
    console.error("Volunteer DB error:", dbError);
    return NextResponse.json({ error: "Failed to save volunteer signup" }, { status: 500 });
  }

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "noreply@campaign.edu",
      to: email.toLowerCase().trim(),
      subject: "Welcome to the Campaign Team! — [Candidate Name]",
      html: `
        <h2>Hi ${sanitizeInput(name)},</h2>
        <p>Thank you for signing up to volunteer with the [Candidate Name] campaign!</p>
        <p>We're excited to have you on board. Here's what to expect next:</p>
        <ol>
          <li>A campaign team member will reach out within 48 hours</li>
          <li>You'll receive details about volunteer orientation</li>
          <li>You'll be matched with opportunities that fit your interests and availability</li>
        </ol>
        <p>Your interests: ${interests.join(", ")}</p>
        <p>See you out there!</p>
        <p>— The Campaign Team</p>
      `,
    });

    await resend.emails.send({
      from: process.env.EMAIL_FROM || "noreply@campaign.edu",
      to: process.env.EMAIL_TO || "info@campaign.edu",
      subject: `New Volunteer Signup: ${sanitizeInput(name)}`,
      html: `
        <h2>New Volunteer</h2>
        <p><strong>Name:</strong> ${sanitizeInput(name)}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${sanitizeInput(mobile)}</p>
        <p><strong>Interests:</strong> ${interests.join(", ")}</p>
        <p><strong>Availability:</strong> ${availability}</p>
        ${skills ? `<p><strong>Skills:</strong> ${sanitizeInput(skills)}</p>` : ""}
      `,
    });
  } catch (emailErr) {
    console.error("Volunteer email error:", emailErr);
  }

  return NextResponse.json({ success: true });
}
