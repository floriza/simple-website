"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreditCard, Loader2, CheckCircle2, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

const PRESET_AMOUNTS = [5, 10, 25, 50, 100];

const schema = z.object({
  frequency: z.enum(["once", "monthly"]),
  amount: z.number().positive("Please select or enter an amount"),
  customAmount: z.number().optional(),
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
});

type FormData = z.infer<typeof schema>;

export default function DonateForm() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [step, setStep] = useState<"amount" | "details" | "success">("amount");

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { frequency: "once", amount: 25 },
  });

  function handleAmountSelect(amount: number) {
    setSelectedAmount(amount);
    setCustomAmount("");
    setValue("amount", amount);
  }

  function handleCustomAmount(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setCustomAmount(val);
    setSelectedAmount(null);
    setValue("amount", parseFloat(val) || 0);
  }

  async function onSubmit(data: FormData) {
    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, frequency }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Payment failed");

      // Redirect to Stripe Checkout
      if (json.url) {
        window.location.href = json.url;
      } else {
        setStep("success");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Payment failed. Please try again.");
    }
  }

  if (step === "success") {
    return (
      <div className="text-center py-10">
        <CheckCircle2 size={56} className="text-green-500 mx-auto mb-4" />
        <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600">Your donation is confirmed. A receipt has been sent to your email.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Frequency Toggle */}
      <div className="flex rounded-xl border border-gray-200 overflow-hidden mb-7 bg-gray-50">
        {(["once", "monthly"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => { setFrequency(f); setValue("frequency", f); }}
            className={cn(
              "flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-all",
              frequency === f
                ? "bg-primary-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            )}
            aria-pressed={frequency === f}
          >
            {f === "monthly" && <RefreshCw size={14} />}
            {f === "once" ? "One-Time" : "Monthly"}
          </button>
        ))}
      </div>

      {/* Amount Selection */}
      <div className="mb-7">
        <p className="form-label mb-3">Select Amount <span className="text-red-500">*</span></p>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
          {PRESET_AMOUNTS.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => handleAmountSelect(amount)}
              className={cn(
                "py-3 rounded-lg text-sm font-bold border-2 transition-all",
                selectedAmount === amount
                  ? "border-primary-600 bg-primary-600 text-white"
                  : "border-gray-200 text-gray-700 hover:border-primary-400 hover:text-primary-700"
              )}
              aria-pressed={selectedAmount === amount}
            >
              ${amount}
            </button>
          ))}
        </div>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">$</span>
          <input
            type="number"
            min="1"
            step="1"
            value={customAmount}
            onChange={handleCustomAmount}
            placeholder="Other amount"
            className="form-input pl-8"
            aria-label="Custom donation amount"
          />
        </div>
        {errors.amount && <p className="form-error">{errors.amount.message}</p>}
      </div>

      {/* Donor Details */}
      <div className="space-y-4 mb-7 pb-7 border-b border-gray-100">
        <div>
          <label htmlFor="don-name" className="form-label">Full Name <span className="text-red-500">*</span></label>
          <input id="don-name" type="text" autoComplete="name" className={`form-input ${errors.name ? "border-red-400" : ""}`} placeholder="Your name as it appears on card" {...register("name")} />
          {errors.name && <p className="form-error">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="don-email" className="form-label">Email <span className="text-red-500">*</span></label>
          <input id="don-email" type="email" autoComplete="email" className={`form-input ${errors.email ? "border-red-400" : ""}`} placeholder="For donation receipt" {...register("email")} />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-primary-50 border border-primary-100 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Donation amount</span>
          <span className="font-bold text-gray-900">
            ${selectedAmount || parseFloat(customAmount) || 0}
            {frequency === "monthly" && <span className="text-primary-600 text-xs font-semibold ml-1">/month</span>}
          </span>
        </div>
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center text-base py-4">
        {isSubmitting
          ? <><Loader2 size={18} className="animate-spin" /> Processing...</>
          : <><CreditCard size={18} /> Donate ${selectedAmount || parseFloat(customAmount) || 0}{frequency === "monthly" ? "/month" : ""}</>
        }
      </button>

      <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400 mt-4">
        <span className="text-green-500">🔒</span> Secured by Stripe. We never store card details.
      </p>
    </form>
  );
}
