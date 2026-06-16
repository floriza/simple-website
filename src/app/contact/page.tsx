import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageSquare, HandHeart, Bell } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";
import VolunteerForm from "@/components/forms/VolunteerForm";
import SubscribeForm from "@/components/forms/SubscribeForm";

export const metadata: Metadata = {
  title: "Contact & Get Involved",
  description: "Get in touch with the [Candidate Name] campaign, volunteer, or subscribe to campaign updates.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient pt-32 pb-16 px-4 text-white">
        <div className="container-max">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-blue-100 text-lg max-w-xl">
            Have questions? Want to get involved? We want to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="section-padding bg-white" id="contact">
        <div className="container-max">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Info */}
            <div>
              <span className="section-tag mb-4">
                <MessageSquare size={14} />
                Contact Us
              </span>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                Let&apos;s Start a Conversation
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Whether you have questions about the platform, want to share concerns, or simply want
                to introduce yourself — our team reads every message.
              </p>

              <div className="space-y-4">
                {[
                  { Icon: Mail, label: "Email", value: "info@campaign.edu", href: "mailto:info@campaign.edu" },
                  { Icon: Phone, label: "Phone", value: "(123) 456-7890", href: "tel:+11234567890" },
                  { Icon: MapPin, label: "Location", value: "Student Union Building, [University]", href: null },
                ].map(({ Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-primary-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">{label}</p>
                      {href ? (
                        <a href={href} className="text-gray-900 font-medium hover:text-primary-700 transition-colors">{value}</a>
                      ) : (
                        <p className="text-gray-900 font-medium">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="card p-7">
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-6">Send a Message</h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer */}
      <section className="section-padding bg-gray-50" id="volunteer">
        <div className="container-max max-w-3xl">
          <div className="text-center mb-10">
            <span className="section-tag">
              <HandHeart size={14} />
              Volunteer
            </span>
            <h2 className="section-title">Join the Campaign Team</h2>
            <p className="section-subtitle mx-auto">
              Make a direct impact by volunteering your time and skills. No experience necessary — just enthusiasm.
            </p>
          </div>
          <div className="card p-7 md:p-10">
            <VolunteerForm />
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="section-padding bg-white" id="subscribe">
        <div className="container-max max-w-2xl">
          <div className="text-center mb-10">
            <span className="section-tag">
              <Bell size={14} />
              Stay Informed
            </span>
            <h2 className="section-title">Subscribe to Updates</h2>
            <p className="section-subtitle mx-auto">
              Get campaign news, event announcements, and policy updates delivered to your inbox.
            </p>
          </div>
          <div className="card p-7 md:p-10">
            <SubscribeForm />
          </div>
        </div>
      </section>
    </>
  );
}
