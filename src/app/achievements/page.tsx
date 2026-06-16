import type { Metadata } from "next";
import { Award, TrendingUp, Users, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Achievements & Initiatives",
  description: "Explore the achievements, initiatives, and community impact of [Candidate Name].",
};

const achievements = [
  { id: "1", category: "Leadership", icon: Award, color: "text-amber-600 bg-amber-50 border-amber-100", title: "Vice President, [Student Society]", stat: "12", statLabel: "Team Members Led", description: "Oversaw a team of 12 students in organizing 20+ campus events throughout the academic year, increasing overall student event participation by 40%.", year: "2023" },
  { id: "2", category: "Community", icon: Users, color: "text-blue-600 bg-blue-50 border-blue-100", title: "Co-Founded Campus Wellness Coalition", stat: "300+", statLabel: "Members", description: "Built the Campus Wellness Coalition from scratch to over 300 active members within a single semester, creating peer support networks and destigmatizing mental health conversations.", year: "2022" },
  { id: "3", category: "Impact", icon: TrendingUp, color: "text-green-600 bg-green-50 border-green-100", title: "Academic Advocacy Success", stat: "40%", statLabel: "Wait-list Reduction", description: "Worked with department heads to review course scheduling, resulting in a 40% reduction in course waitlist backlogs for the Faculty of [Department].", year: "2023" },
  { id: "4", category: "Innovation", icon: Lightbulb, color: "text-purple-600 bg-purple-50 border-purple-100", title: "Student Feedback Digital Platform", stat: "800+", statLabel: "Responses Collected", description: "Launched a digital student feedback platform that collected over 800 survey responses on campus priorities, directly informing this campaign platform.", year: "2024" },
];

const testimonials = [
  { name: "Prof. [Name]", role: "Faculty Advisor", quote: "Demonstrates rare leadership maturity — someone who listens first and acts with purpose. An outstanding student advocate." },
  { name: "[Name], Student", role: "Engineering, Year 3", quote: "The wellness coalition they built helped me through one of the hardest semesters of my life. Real impact, not just talk." },
];

export default function AchievementsPage() {
  return (
    <>
      <section className="bg-hero-gradient pt-32 pb-16 px-4 text-white text-center">
        <div className="container-max max-w-3xl">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Achievements & Initiatives</h1>
          <p className="text-blue-100 text-lg">
            Real actions, real results. A track record of making things happen for students.
          </p>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {[
              { stat: "300+", label: "Wellness Coalition Members" },
              { stat: "20+", label: "Events Organized" },
              { stat: "40%", label: "Waitlist Reduction" },
              { stat: "800+", label: "Survey Responses" },
            ].map(({ stat, label }) => (
              <div key={label} className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-blue-50 border border-primary-100">
                <p className="font-heading text-4xl font-bold text-primary-700 mb-2">{stat}</p>
                <p className="text-sm text-gray-600 font-medium">{label}</p>
              </div>
            ))}
          </div>

          {/* Achievement Cards */}
          <h2 className="section-title text-center mb-12">Key Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {achievements.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.id} className="card p-7">
                  <div className="flex items-start gap-4 mb-5">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 ${item.color}`}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{item.category} · {item.year}</span>
                      <h3 className="font-heading font-bold text-xl text-gray-900 mt-1">{item.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-5 leading-relaxed">{item.description}</p>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="font-heading text-3xl font-bold text-primary-700">{item.stat}</span>
                    <span className="text-sm text-gray-600 font-medium">{item.statLabel}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-gray-50">
        <div className="container-max max-w-4xl">
          <h2 className="section-title text-center mb-12">What Others Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <figure key={t.name} className="card p-7">
                <blockquote className="text-gray-700 leading-relaxed mb-5 italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
