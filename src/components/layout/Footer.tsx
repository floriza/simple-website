import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  Campaign: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/platform", label: "Platform" },
    { href: "/achievements", label: "Achievements" },
  ],
  "Get Involved": [
    { href: "/events", label: "Events" },
    { href: "/contact#volunteer", label: "Volunteer" },
    { href: "/contact#subscribe", label: "Subscribe" },
    { href: "/donate", label: "Donate" },
  ],
  Resources: [
    { href: "/news", label: "News & Updates" },
    { href: "/contact", label: "Contact Us" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/accessibility", label: "Accessibility" },
  ],
};

const socialLinks = [
  { href: "#", label: "Facebook", Icon: Facebook },
  { href: "#", label: "Instagram", Icon: Instagram },
  { href: "#", label: "Twitter / X", Icon: Twitter },
  { href: "#", label: "LinkedIn", Icon: Linkedin },
];

export default function Footer() {
  return (
    <footer className="bg-campaign-navy text-white" role="contentinfo">
      {/* Main Footer */}
      <div className="container-max px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg">
              <div className="w-12 h-12 rounded-full bg-white/10 border-2 border-campaign-gold flex items-center justify-center text-campaign-gold font-bold text-xl">
                C
              </div>
              <div>
                <p className="font-heading font-bold text-xl">[Candidate Name]</p>
                <p className="text-blue-300 text-sm">For Student Council President</p>
              </div>
            </Link>
            <p className="text-blue-200 text-sm leading-relaxed mb-6 max-w-xs">
              Leading with purpose. Serving with integrity. Building a student community where
              every voice is heard and every student thrives.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-campaign-blue flex items-center justify-center transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="font-bold text-sm uppercase tracking-widest text-campaign-gold mb-4">
                {section}
              </h3>
              <ul className="space-y-2.5">
                {links.map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-blue-200 hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-6">
          <a
            href="mailto:info@campaign.edu"
            className="flex items-center gap-2 text-sm text-blue-200 hover:text-white transition-colors"
          >
            <Mail size={14} />
            info@campaign.edu
          </a>
          <a
            href="tel:+1234567890"
            className="flex items-center gap-2 text-sm text-blue-200 hover:text-white transition-colors"
          >
            <Phone size={14} />
            (123) 456-7890
          </a>
          <span className="flex items-center gap-2 text-sm text-blue-200">
            <MapPin size={14} />
            [University Name], Student Union Building
          </span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="container-max px-4 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-300">
          <p>
            © {new Date().getFullYear()} [Candidate Name] Campaign. Authorized by the Campaign Committee.
          </p>
          <p>
            Paid for by [Candidate Name] for Student President Campaign Fund.
          </p>
        </div>
      </div>
    </footer>
  );
}
