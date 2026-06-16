"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Mail, CheckCircle2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  honeypot: z.string().max(0, "Bot detected"),
});

type FormData = z.infer<typeof schema>;

export default function SubscribeForm() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Subscription failed");
      setSubmitted(true);
      toast.success("You're subscribed! Welcome to the campaign.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle2 size={40} className="text-green-500 mx-auto mb-3" />
        <h3 className="font-bold text-gray-900 mb-1">You&apos;re subscribed!</h3>
        <p className="text-sm text-gray-600">You&apos;ll receive campaign updates directly in your inbox.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Mailing list subscription">
      <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} aria-hidden="true" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="sub-first" className="form-label">First Name</label>
          <input id="sub-first" type="text" autoComplete="given-name" className="form-input" placeholder="First name" {...register("firstName")} />
        </div>
        <div>
          <label htmlFor="sub-last" className="form-label">Last Name</label>
          <input id="sub-last" type="text" autoComplete="family-name" className="form-input" placeholder="Last name" {...register("lastName")} />
        </div>
      </div>

      <div className="mb-5">
        <label htmlFor="sub-email" className="form-label">Email Address <span className="text-red-500">*</span></label>
        <input
          id="sub-email"
          type="email"
          autoComplete="email"
          className={`form-input ${errors.email ? "border-red-400" : ""}`}
          placeholder="you@university.edu"
          {...register("email")}
        />
        {errors.email && <p className="form-error">{errors.email.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center">
        {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Subscribing...</> : <><Mail size={16} /> Subscribe to Updates</>}
      </button>

      <p className="text-xs text-gray-400 text-center mt-3">
        Unsubscribe anytime. We respect your inbox and your privacy.
      </p>
    </form>
  );
}
