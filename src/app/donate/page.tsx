import type { Metadata } from "next";
import DonateForm from "@/components/forms/DonateForm";
import { Shield, Lock, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Donate",
  description: "Support the [Candidate Name] campaign with a secure donation. Every contribution helps amplify student voices.",
};

export default function DonatePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient pt-32 pb-16 px-4 text-white">
        <div className="container-max text-center max-w-3xl">
          <span className="inline-block px-4 py-1.5 bg-white/15 border border-white/30 rounded-full text-sm font-semibold mb-6">
            Support the Campaign
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Fuel the Movement
          </h1>
          <p className="text-blue-100 text-lg max-w-xl mx-auto">
            Your contribution — no matter the size — directly supports campaign materials, events,
            and outreach to reach every corner of campus.
          </p>
        </div>
      </section>

      {/* Trust badges */}
      <section className="bg-white border-b border-gray-100 py-5 px-4">
        <div className="container-max flex flex-wrap justify-center gap-8">
          {[
            { Icon: Lock, text: "SSL Secured Checkout" },
            { Icon: Shield, text: "PCI DSS Compliant" },
            { Icon: Heart, text: "100% to the Campaign" },
          ].map(({ Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm text-gray-500 font-medium">
              <Icon size={16} className="text-green-500" />
              {text}
            </div>
          ))}
        </div>
      </section>

      {/* Donation Form */}
      <section className="section-padding bg-gray-50">
        <div className="container-max max-w-2xl">
          <div className="card p-7 md:p-10">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2 text-center">
              Make a Donation
            </h2>
            <p className="text-gray-500 text-sm text-center mb-8">
              Paid for by the [Candidate Name] for Student President Campaign Fund.
            </p>
            <DonateForm />
          </div>

          {/* Legal disclaimer */}
          <p className="text-xs text-gray-400 text-center mt-6 max-w-md mx-auto">
            Donations are used exclusively for student election campaign activities.
            By donating you confirm you are a student at [University Name].
            This is a student government election; contribution limits may apply per university regulations.
          </p>
        </div>
      </section>
    </>
  );
}
