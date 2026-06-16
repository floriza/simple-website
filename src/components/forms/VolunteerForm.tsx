"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { HandHeart, CheckCircle2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { VOLUNTEER_INTERESTS } from "@/lib/utils";
import type { VolunteerFormData } from "@/types";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  mobile: z.string().min(7, "Please enter a valid phone number"),
  interests: z.array(z.string()).min(1, "Please select at least one interest"),
  availability: z.string().min(1, "Please select your availability"),
  skills: z.string().optional(),
  honeypot: z.string().max(0, "Bot detected"),
});

export default function VolunteerForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VolunteerFormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: VolunteerFormData) {
    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Submission failed");
      setSubmitted(true);
      toast.success("You're signed up! Welcome to the team!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-10">
        <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
        <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2">Welcome to the Team!</h3>
        <p className="text-gray-600">We&apos;ll be in touch shortly with next steps and your volunteer orientation details.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Volunteer signup form">
      <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} aria-hidden="true" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label htmlFor="vol-name" className="form-label">Full Name <span className="text-red-500">*</span></label>
          <input id="vol-name" type="text" autoComplete="name" className={`form-input ${errors.name ? "border-red-400" : ""}`} placeholder="Your name" {...register("name")} />
          {errors.name && <p className="form-error">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="vol-email" className="form-label">Email <span className="text-red-500">*</span></label>
          <input id="vol-email" type="email" autoComplete="email" className={`form-input ${errors.email ? "border-red-400" : ""}`} placeholder="you@university.edu" {...register("email")} />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="vol-mobile" className="form-label">Mobile Number <span className="text-red-500">*</span></label>
          <input id="vol-mobile" type="tel" autoComplete="tel" className={`form-input ${errors.mobile ? "border-red-400" : ""}`} placeholder="+1 (555) 000-0000" {...register("mobile")} />
          {errors.mobile && <p className="form-error">{errors.mobile.message}</p>}
        </div>
        <div>
          <label htmlFor="vol-availability" className="form-label">Availability <span className="text-red-500">*</span></label>
          <select id="vol-availability" className={`form-input ${errors.availability ? "border-red-400" : ""}`} {...register("availability")}>
            <option value="">Select availability...</option>
            <option value="weekday-mornings">Weekday Mornings</option>
            <option value="weekday-afternoons">Weekday Afternoons</option>
            <option value="weekday-evenings">Weekday Evenings</option>
            <option value="weekends">Weekends</option>
            <option value="flexible">Flexible</option>
          </select>
          {errors.availability && <p className="form-error">{errors.availability.message}</p>}
        </div>
      </div>

      {/* Interests */}
      <div className="mb-5">
        <p className="form-label">Areas of Interest <span className="text-red-500">*</span></p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
          {VOLUNTEER_INTERESTS.map((interest) => (
            <label key={interest} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                value={interest}
                className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                {...register("interests")}
              />
              <span className="text-sm text-gray-700 group-hover:text-primary-700 transition-colors">{interest}</span>
            </label>
          ))}
        </div>
        {errors.interests && <p className="form-error mt-1">{errors.interests.message}</p>}
      </div>

      {/* Skills */}
      <div className="mb-6">
        <label htmlFor="vol-skills" className="form-label">Special Skills <span className="text-gray-400 text-xs font-normal">(optional)</span></label>
        <textarea id="vol-skills" rows={3} className="form-input resize-none" placeholder="Any skills you&apos;d like to contribute (language, design, tech, etc.)" {...register("skills")} />
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center">
        {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Signing Up...</> : <><HandHeart size={16} /> Sign Up to Volunteer</>}
      </button>
    </form>
  );
}
