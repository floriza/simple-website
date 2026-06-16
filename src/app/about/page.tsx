import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Award, Briefcase, Heart, GraduationCap, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about [Candidate Name] — their leadership experience, achievements, community service, and vision for the student body.",
};

const timeline = [
  { year: "2021", title: "Joined University", desc: "Enrolled in [Major] at [University Name]. Immediately engaged in campus life." },
  { year: "2022", title: "Department Representative", desc: "Elected as student representative for the Faculty of [Department], championing academic reform." },
  { year: "2022", title: "Mental Health Advocacy", desc: "Co-founded the Campus Wellness Coalition, growing to 300+ members within the first semester." },
  { year: "2023", title: "Vice President, Student Society", desc: "Led a team of 12 in organizing 20+ campus events, increasing student participation by 40%." },
  { year: "2023", title: "Community Award", desc: 'Received the "[Award Name]" for outstanding contributions to student welfare and community building.' },
  { year: "2024", title: "Running for President", desc: "Launching a campaign to bring meaningful change to every corner of campus life." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient pt-32 pb-20 px-4">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <span className="inline-block px-4 py-1.5 bg-white/15 border border-white/30 rounded-full text-sm font-semibold mb-6">
                Meet the Candidate
              </span>
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-5">
                [Candidate Name]
              </h1>
              <p className="text-blue-100 text-lg mb-2">Candidate for Student Council President</p>
              <p className="text-blue-100 text-lg mb-8">[University Name] · Class of [Year] · [Major]</p>
              <p className="text-blue-100 leading-relaxed max-w-lg mb-10">
                A passionate student leader with [X] years of hands-on experience in campus governance,
                advocacy, and community building. I believe every student deserves a university experience
                that prepares them for life — and I am committed to making that a reality.
              </p>
              <Link href="/platform" className="btn-accent">
                Read My Platform <ArrowRight size={16} />
              </Link>
            </div>

            {/* Photo */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden border-4 border-white/30 shadow-2xl bg-white/10 flex items-center justify-center">
                <div className="text-white/40 text-center">
                  <div className="text-7xl font-heading font-bold mb-2">[C]</div>
                  <p className="text-sm">Candidate Photo</p>
                  <p className="text-xs opacity-60">Replace with actual image</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="section-padding bg-white">
        <div className="container-max max-w-4xl">
          <h2 className="section-title text-center mb-10">Personal Story</h2>
          <div className="prose-campaign">
            <p>
              Growing up in [City/Region], [Candidate Name] learned early the importance of community
              and collective action. The first in their family to attend university, they arrived at
              [University Name] not just to earn a degree, but to contribute to something larger than
              themselves.
            </p>
            <p>
              From their very first semester, they noticed gaps — students struggling with mental health
              in silence, academic resources that didn&apos;t match real needs, and a student government
              that felt distant from everyday campus life. Rather than accept these as inevitable,
              they got involved.
            </p>
            <p>
              Now, after [X] years of building coalitions, advocating for policy change, and leading
              organizations that touch thousands of students, they are ready to take the next step:
              becoming the Student Council President who finally bridges the gap between students and
              the administration.
            </p>
          </div>
        </div>
      </section>

      {/* Cards: Education, Experience, Service */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                Icon: GraduationCap,
                title: "Education",
                color: "text-blue-600 bg-blue-50 border-blue-100",
                items: [
                  "[University Name] — B.Sc. [Major] (Expected [Year])",
                  "Dean&apos;s List, [Semesters]",
                  "Academic Excellence Scholarship, [Year]",
                  "Minor in [Minor Subject]",
                ],
              },
              {
                Icon: Briefcase,
                title: "Leadership Experience",
                color: "text-green-600 bg-green-50 border-green-100",
                items: [
                  "Vice President, [Student Society] (2023–Present)",
                  "Department Student Representative (2022–2023)",
                  "Coordinator, Orientation Week Committee",
                  "Peer Tutor, Academic Support Centre",
                ],
              },
              {
                Icon: Heart,
                title: "Community Service",
                color: "text-red-600 bg-red-50 border-red-100",
                items: [
                  "Co-Founder, Campus Wellness Coalition",
                  "Volunteer, [Local Food Bank]",
                  "Mentor, First-Year Student Mentorship Program",
                  "Organizer, Annual Campus Charity Drive",
                ],
              },
            ].map(({ Icon, title, color, items }) => (
              <div key={title} className="card p-7">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 ${color}`}>
                  <Icon size={22} />
                </div>
                <h3 className="font-heading font-bold text-xl text-gray-900 mb-4">{title}</h3>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0 mt-1.5" />
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-padding bg-white">
        <div className="container-max max-w-4xl">
          <h2 className="section-title text-center mb-12">
            <span className="flex items-center justify-center gap-3">
              <Award size={32} className="text-accent-500" />
              Awards & Achievements
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { year: "2023", title: "[Award Name]", org: "[Organization]", desc: "Awarded for outstanding contribution to student welfare and community building on campus." },
              { year: "2023", title: "Dean&apos;s List", org: "[University Name]", desc: "Recognized for academic excellence with a GPA of [X.X] for [N] consecutive semesters." },
              { year: "2022", title: "Student Leadership Award", org: "[Faculty/Department]", desc: "Recognized for exceptional leadership as departmental student representative." },
              { year: "2022", title: "Scholarship Recipient", org: "[Scholarship Name]", desc: "Awarded competitive merit scholarship for academic and community achievement." },
            ].map(({ year, title, org, desc }) => (
              <div key={title} className="flex gap-4 p-5 rounded-xl border border-gray-100 bg-gray-50">
                <div className="flex-shrink-0">
                  <span className="text-xs font-bold text-primary-600 bg-primary-50 border border-primary-200 rounded-lg px-2.5 py-1 block text-center">
                    {year}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-0.5" dangerouslySetInnerHTML={{ __html: title }} />
                  <p className="text-xs text-primary-600 font-medium mb-2">{org}</p>
                  <p className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: desc }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-gray-50">
        <div className="container-max max-w-3xl">
          <h2 className="section-title text-center mb-14">Leadership Journey</h2>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-200 -translate-x-1/2" aria-hidden="true" />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <div key={item.year + item.title} className={`relative flex ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-6 items-start`}>
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary-600 border-4 border-white -translate-x-1/2 mt-1 shadow-md" aria-hidden="true" />
                  <div className={`flex-1 ml-10 md:ml-0 ${i % 2 === 0 ? "md:pr-10 md:text-right" : "md:pl-10"}`}>
                    <div className="card p-5">
                      <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full border border-primary-200">
                        {item.year}
                      </span>
                      <h3 className="font-bold text-gray-900 mt-2 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-hero-gradient text-white text-center">
        <div className="container-max">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Ready to Join the Movement?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            Together, we can build the student government that every student deserves.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/platform" className="btn-accent">
              Read the Platform
            </Link>
            <Link href="/contact#volunteer" className="btn-ghost">
              Volunteer
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
