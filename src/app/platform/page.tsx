import type { Metadata } from "next";
import Link from "next/link";
import {
  Heart, BookOpen, Brain, Building2, Users, Briefcase,
  FileText, ArrowRight, CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "Read the full platform and policy positions of [Candidate Name] for Student Council President — covering academic reform, student welfare, mental health, and more.",
};

const policies = [
  {
    id: "academic-reform",
    icon: BookOpen,
    color: "bg-blue-50 border-blue-100 text-blue-600",
    accent: "bg-blue-600",
    title: "Academic Reform",
    summary: "Making academic resources more accessible, equitable, and effective for every student.",
    points: [
      "Reduce course waitlist backlogs by working with departments on better scheduling",
      "Expand 24/7 library access and study space availability",
      "Advocate for more affordable textbook programs and open-access resources",
      "Improve academic advising ratios to 1:150 or better",
      "Create a student feedback loop for course evaluations",
    ],
  },
  {
    id: "student-services",
    icon: Heart,
    color: "bg-red-50 border-red-100 text-red-600",
    accent: "bg-red-600",
    title: "Student Services & Welfare",
    summary: "Ensuring every student has their basic needs met so they can focus on learning.",
    points: [
      "Establish an on-campus emergency fund for students in financial crisis",
      "Negotiate more affordable on-campus housing options",
      "Expand the food pantry and meal program",
      "Simplify financial aid application processes",
      "Create a student welfare navigator position",
    ],
  },
  {
    id: "mental-health",
    icon: Brain,
    color: "bg-purple-50 border-purple-100 text-purple-600",
    accent: "bg-purple-600",
    title: "Mental Health",
    summary: "Building a campus culture where mental health is a priority, not an afterthought.",
    points: [
      "Hire additional certified counselors — target a 1:250 ratio",
      "Introduce same-day crisis counseling appointments",
      "Launch a peer-support mental health ambassador program",
      "Partner with telehealth providers for after-hours access",
      "Destigmatize mental health through campus-wide awareness campaigns",
    ],
  },
  {
    id: "campus-facilities",
    icon: Building2,
    color: "bg-amber-50 border-amber-100 text-amber-600",
    accent: "bg-amber-600",
    title: "Campus Facilities",
    summary: "Upgrading the physical campus experience to meet modern student needs.",
    points: [
      "Audit and repair all accessibility issues for students with disabilities",
      "Upgrade outdated computer labs and maker spaces",
      "Create more quiet zones and collaboration spaces",
      "Improve campus Wi-Fi coverage in all buildings",
      "Advocate for sustainable and eco-friendly facility upgrades",
    ],
  },
  {
    id: "student-representation",
    icon: Users,
    color: "bg-green-50 border-green-100 text-green-600",
    accent: "bg-green-600",
    title: "Student Representation",
    summary: "Reforming student governance to be transparent, inclusive, and genuinely powerful.",
    points: [
      "Hold monthly open town halls with live Q&A",
      "Publish clear meeting minutes and action logs online",
      "Ensure representation for international, Indigenous, and marginalized students",
      "Create a formal student–administration liaison committee",
      "Launch a digital platform for students to submit and vote on ideas",
    ],
  },
  {
    id: "career-development",
    icon: Briefcase,
    color: "bg-indigo-50 border-indigo-100 text-indigo-600",
    accent: "bg-indigo-600",
    title: "Career Development",
    summary: "Connecting students to real-world opportunities that launch their careers.",
    points: [
      "Expand the internship directory and employer partnership network",
      "Host more industry-specific career fairs and networking events",
      "Create a peer mentorship program connecting juniors with recent graduates",
      "Fund startup incubator support for student entrepreneurs",
      "Offer resume, interview, and LinkedIn workshops each semester",
    ],
  },
];

export default function PlatformPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient pt-32 pb-20 px-4 text-white text-center">
        <div className="container-max max-w-3xl">
          <span className="inline-block px-4 py-1.5 bg-white/15 border border-white/30 rounded-full text-sm font-semibold mb-6">
            Campaign Platform
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-5">
            A Platform Built By Students, For Students
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            Every policy in this platform came from listening to students across departments,
            years, and backgrounds. These are not just words — they are commitments with
            clear, actionable steps.
          </p>
        </div>
      </section>

      {/* Quick Nav */}
      <section className="bg-white border-b border-gray-100 sticky top-16 md:top-20 z-30 shadow-sm">
        <div className="container-max px-4 overflow-x-auto">
          <nav className="flex gap-1 py-3" aria-label="Platform sections">
            {policies.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="flex-shrink-0 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
              >
                {p.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Policy Sections */}
      <main className="section-padding bg-white">
        <div className="container-max max-w-4xl space-y-20">
          {policies.map((policy, i) => {
            const Icon = policy.icon;
            return (
              <section
                key={policy.id}
                id={policy.id}
                className="scroll-mt-36"
                aria-labelledby={`policy-${policy.id}`}
              >
                <div className="flex items-start gap-5 mb-8">
                  <div className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center flex-shrink-0 ${policy.color}`}>
                    <Icon size={26} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Priority {i + 1} of {policies.length}
                    </p>
                    <h2 id={`policy-${policy.id}`} className="font-heading text-2xl md:text-3xl font-bold text-gray-900">
                      {policy.title}
                    </h2>
                    <p className="text-gray-600 mt-2">{policy.summary}</p>
                  </div>
                </div>

                <div className="border border-gray-100 rounded-2xl overflow-hidden">
                  <div className={`h-1.5 ${policy.accent}`} />
                  <div className="p-6 md:p-8">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <FileText size={16} className="text-gray-400" />
                      Specific Commitments
                    </h3>
                    <ul className="space-y-3">
                      {policy.points.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-gray-700">
                          <CheckCircle2 size={18} className="text-primary-600 flex-shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </main>

      {/* CTA */}
      <section className="section-padding bg-gray-50 text-center">
        <div className="container-max">
          <h2 className="section-title">Have Questions About the Platform?</h2>
          <p className="section-subtitle mx-auto mb-8">
            We want to hear from you. Ask questions, share concerns, or suggest ideas.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Get in Touch <ArrowRight size={16} />
            </Link>
            <Link href="/events" className="btn-secondary">
              Attend a Town Hall
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
