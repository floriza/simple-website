import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the [Candidate Name] campaign website.",
};

export default function PrivacyPage() {
  return (
    <section className="section-padding bg-white pt-32">
      <div className="container-max max-w-3xl prose-campaign">
        <h1>Privacy Policy</h1>
        <p className="text-sm text-gray-400">Last updated: {new Date().getFullYear()}</p>

        <h2>1. Information We Collect</h2>
        <p>When you use our website, we may collect:</p>
        <ul>
          <li>Contact form submissions (name, email, message)</li>
          <li>Volunteer sign-up information (name, email, phone, interests)</li>
          <li>Newsletter subscriptions (email, optional name)</li>
          <li>Donation information (processed securely through Stripe)</li>
          <li>Basic analytics data (pages visited, browser type) via Google Analytics</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>Responding to your inquiries</li>
          <li>Coordinating volunteer activities</li>
          <li>Sending campaign updates (with your consent)</li>
          <li>Processing donations</li>
          <li>Improving the website</li>
        </ul>

        <h2>3. Data Security</h2>
        <p>We use industry-standard security measures including SSL encryption, secure database storage, and PCI-compliant payment processing through Stripe. We do not store credit card information.</p>

        <h2>4. Your Rights</h2>
        <p>You may request access to, correction of, or deletion of your personal data by emailing us at info@campaign.edu.</p>

        <h2>5. Third-Party Services</h2>
        <p>We use Stripe (payments), Supabase (data storage), Resend (email), and Google Analytics (website analytics). Each has their own privacy policy.</p>

        <h2>6. Contact</h2>
        <p>For privacy concerns, contact us at info@campaign.edu.</p>
      </div>
    </section>
  );
}
