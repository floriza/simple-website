"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import type { ContactFormData } from "@/types";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  studentId: z.string().optional(),
  mobile: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
  honeypot: z.string().max(0, "Bot detected"),
});

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: ContactFormData) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Submission failed");
      setSubmitted(true);
      reset();
      toast.success("Message sent! We'll get back to you soon.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
        <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
        <p className="text-gray-600 mb-6">Thank you for reaching out. We&apos;ll get back to you within 24-48 hours.</p>
        <button onClick={() => setSubmitted(false)} className="btn-secondary text-sm">
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Contact form">
      {/* Honeypot - hidden from real users */}
      <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} aria-hidden="true" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label htmlFor="contact-name" className="form-label">Full Name <span className="text-red-500">*</span></label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            className={`form-input ${errors.name ? "border-red-400 focus:ring-red-400" : ""}`}
            placeholder="Your full name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          {errors.name && <p id="name-error" className="form-error" role="alert">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="contact-email" className="form-label">Email Address <span className="text-red-500">*</span></label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            className={`form-input ${errors.email ? "border-red-400 focus:ring-red-400" : ""}`}
            placeholder="you@university.edu"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email && <p id="email-error" className="form-error" role="alert">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="contact-student-id" className="form-label">Student ID <span className="text-gray-400 text-xs font-normal">(optional)</span></label>
          <input
            id="contact-student-id"
            type="text"
            className="form-input"
            placeholder="Your student ID"
            {...register("studentId")}
          />
        </div>

        <div>
          <label htmlFor="contact-mobile" className="form-label">Mobile Number <span className="text-gray-400 text-xs font-normal">(optional)</span></label>
          <input
            id="contact-mobile"
            type="tel"
            autoComplete="tel"
            className="form-input"
            placeholder="+1 (555) 000-0000"
            {...register("mobile")}
          />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="contact-message" className="form-label">Message <span className="text-red-500">*</span></label>
        <textarea
          id="contact-message"
          rows={5}
          className={`form-input resize-none ${errors.message ? "border-red-400 focus:ring-red-400" : ""}`}
          placeholder="Tell us what's on your mind..."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
        {errors.message && <p id="message-error" className="form-error" role="alert">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full justify-center"
        aria-live="polite"
      >
        {isSubmitting ? (
          <><Loader2 size={16} className="animate-spin" /> Sending...</>
        ) : (
          <><Send size={16} /> Send Message</>
        )}
      </button>

      <p className="text-xs text-gray-400 text-center mt-4">
        We typically respond within 24–48 hours. Your information is kept private.
      </p>
    </form>
  );
}
