import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { checkRateLimit, sanitizeInput } from "@/lib/utils";
import { Resend } from "resend";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  studentId: z.string().optional(),
  mobile: z.string().optional(),
  message: z.string().min(10).max(2000),
  honeypot: z.string().max(0),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (!checkRateLimit(ip, 3, 60_000)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "Invalid form data", details: result.error.flatten() }, { status: 422 });
  }

  const { name, email, studentId, mobile, message } = result.data;

  // Sanitize inputs
  const sanitized = {
    name: sanitizeInput(name),
    email: email.toLowerCase().trim(),
    student_id: studentId ? sanitizeInput(studentId) : null,
    mobile: mobile ? sanitizeInput(mobile) : null,
    message: sanitizeInput(message),
    ip_address: ip,
  };

  // Save to Supabase
  const { error: dbError } = await supabaseAdmin
    .from("contact_submissions")
    .insert([sanitized]);

  if (dbError) {
    console.error("DB insert error:", dbError);
    return NextResponse.json({ error: "Failed to save submission" }, { status: 500 });
  }

  // Send notification email
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "noreply@campaign.edu",
      to: process.env.EMAIL_TO || "info@campaign.edu",
      subject: `New Contact Form Submission from ${sanitized.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table>
          <tr><td><strong>Name:</strong></td><td>${sanitized.name}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${sanitized.email}</td></tr>
          ${sanitized.student_id ? `<tr><td><strong>Student ID:</strong></td><td>${sanitized.student_id}</td></tr>` : ""}
          ${sanitized.mobile ? `<tr><td><strong>Mobile:</strong></td><td>${sanitized.mobile}</td></tr>` : ""}
          <tr><td><strong>Message:</strong></td><td>${sanitized.message.replace(/\n/g, "<br>")}</td></tr>
        </table>
      `,
    });

    // Confirmation to sender
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "noreply@campaign.edu",
      to: sanitized.email,
      subject: "We received your message — [Candidate Name] Campaign",
      html: `
        <h2>Hi ${sanitized.name},</h2>
        <p>Thank you for reaching out! We've received your message and will get back to you within 24-48 hours.</p>
        <p>In the meantime, check out our <a href="${process.env.NEXT_PUBLIC_SITE_URL}/platform">platform</a> or <a href="${process.env.NEXT_PUBLIC_SITE_URL}/events">upcoming events</a>.</p>
        <p>— The Campaign Team</p>
      `,
    });
  } catch (emailErr) {
    // Don't fail the response if email fails — submission already saved
    console.error("Email error:", emailErr);
  }

  return NextResponse.json({ success: true, message: "Message sent successfully" });
}
