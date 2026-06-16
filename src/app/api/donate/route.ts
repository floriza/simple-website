import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { checkRateLimit } from "@/lib/utils";

const schema = z.object({
  amount: z.number().positive().min(1).max(10000),
  frequency: z.enum(["once", "monthly"]),
  name: z.string().min(2).max(100),
  email: z.string().email(),
});

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

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
    return NextResponse.json({ error: "Invalid donation data" }, { status: 422 });
  }

  const { amount, frequency, name, email } = result.data;
  const amountInCents = Math.round(amount * 100);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  let sessionParams: Stripe.Checkout.SessionCreateParams;

  if (frequency === "monthly") {
    // Create a recurring price
    const price = await stripe.prices.create({
      unit_amount: amountInCents,
      currency: "usd",
      recurring: { interval: "month" },
      product_data: { name: "Monthly Campaign Donation" },
    });

    sessionParams = {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: price.id, quantity: 1 }],
      customer_email: email.toLowerCase().trim(),
      metadata: { donor_name: name, frequency },
      success_url: `${siteUrl}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/donate`,
    };
  } else {
    sessionParams = {
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Campaign Donation — [Candidate Name] for Student President" },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      customer_email: email.toLowerCase().trim(),
      metadata: { donor_name: name, frequency },
      success_url: `${siteUrl}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/donate`,
    };
  }

  const session = await stripe.checkout.sessions.create(sessionParams);

  // Store pending donation record
  await supabaseAdmin.from("donations").insert([
    {
      stripe_payment_intent_id: session.payment_intent as string || session.id,
      amount: amountInCents,
      currency: "usd",
      frequency,
      donor_name: name,
      donor_email: email.toLowerCase().trim(),
      status: "pending",
    },
  ]).then(({ error }) => {
    if (error) console.error("Donation DB error:", error);
  });

  return NextResponse.json({ url: session.url });
}
