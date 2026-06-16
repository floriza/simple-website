import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Heart, ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Donation Successful" };

export default function DonateSuccessPage() {
  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-20">
      <div className="max-w-lg text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-green-500" />
        </div>
        <h1 className="font-heading text-3xl font-bold text-gray-900 mb-3">Thank You!</h1>
        <p className="text-gray-600 text-lg mb-8">
          Your donation has been received. A receipt has been sent to your email.
          Together, we are building the student government that every student deserves.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">
            Back to Home <ArrowRight size={16} />
          </Link>
          <Link href="/contact#volunteer" className="btn-secondary">
            <Heart size={16} /> Volunteer Too
          </Link>
        </div>
      </div>
    </section>
  );
}
