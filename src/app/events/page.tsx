import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { formatDate, isUpcoming } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Events",
  description: "Join [Candidate Name] at upcoming campaign events, town halls, and rallies. RSVP today.",
};

const ALL_EVENTS = [
  { id: "1", title: "Campaign Launch Rally", slug: "launch-rally", description: "Join us for the official campaign kickoff! Meet the candidate, hear the vision, and be part of the movement for change.", date: new Date(Date.now() + 3 * 86400000).toISOString(), location: "Main Quad, University Campus", type: "rally", rsvpEnabled: true, capacity: 500 },
  { id: "2", title: "Student Town Hall: Mental Health", slug: "mental-health-townhall", description: "An open forum for students to discuss mental health challenges and shape campaign policies.", date: new Date(Date.now() + 7 * 86400000).toISOString(), location: "Student Union, Room 201", type: "townhall", rsvpEnabled: true, capacity: 100 },
  { id: "3", title: "Volunteer Training Day", slug: "volunteer-training", description: "Learn how to canvass, run phone banks, and support the campaign.", date: new Date(Date.now() + 10 * 86400000).toISOString(), location: "Library Conference Room", type: "volunteer", rsvpEnabled: true },
  { id: "4", title: "Academic Reform Q&A", slug: "academic-reform-qa", description: "A focused discussion on our academic reform proposals with faculty and student input.", date: new Date(Date.now() + 14 * 86400000).toISOString(), location: "Science Building, Auditorium", type: "townhall", rsvpEnabled: true, capacity: 200 },
  { id: "5", title: "Career Fair Partnership Announcement", slug: "career-fair", description: "Announcing new employer partnerships for the next career fair — attendees get a preview.", date: new Date(Date.now() - 5 * 86400000).toISOString(), location: "Sports Complex, Hall B", type: "other", rsvpEnabled: false },
];

const typeConfig: Record<string, { label: string; color: string }> = {
  rally: { label: "Rally", color: "bg-red-100 text-red-700 border-red-200" },
  townhall: { label: "Town Hall", color: "bg-blue-100 text-blue-700 border-blue-200" },
  debate: { label: "Debate", color: "bg-purple-100 text-purple-700 border-purple-200" },
  volunteer: { label: "Volunteer", color: "bg-green-100 text-green-700 border-green-200" },
  other: { label: "Event", color: "bg-gray-100 text-gray-700 border-gray-200" },
};

export default function EventsPage() {
  const upcoming = ALL_EVENTS.filter((e) => isUpcoming(e.date));
  const past = ALL_EVENTS.filter((e) => !isUpcoming(e.date));

  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient pt-32 pb-16 px-4 text-white">
        <div className="container-max">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Events Calendar</h1>
          <p className="text-blue-100 text-lg max-w-xl">
            Come meet the candidate, share your voice, and be part of the campaign.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-max max-w-4xl">
          {/* Upcoming */}
          <h2 className="section-title mb-8">Upcoming Events</h2>
          {upcoming.length === 0 ? (
            <p className="text-gray-500 text-center py-10">No upcoming events. Check back soon!</p>
          ) : (
            <div className="space-y-5 mb-16">
              {upcoming.map((event) => {
                const tc = typeConfig[event.type] || typeConfig.other;
                return (
                  <article key={event.id} className="card p-6 flex flex-col md:flex-row gap-6 items-start group">
                    {/* Date */}
                    <div className="flex-shrink-0 w-18 text-center">
                      <div className="w-16 h-16 rounded-xl bg-primary-600 text-white flex flex-col items-center justify-center">
                        <span className="text-xs font-semibold opacity-75">{formatDate(event.date, "MMM")}</span>
                        <span className="text-2xl font-bold leading-tight">{formatDate(event.date, "d")}</span>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${tc.color}`}>{tc.label}</span>
                        {event.capacity && (
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <Users size={11} /> Capacity: {event.capacity}
                          </span>
                        )}
                      </div>
                      <h3 className="font-heading font-bold text-xl text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
                        <Link href={`/events/${event.slug}`}>{event.title}</Link>
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5"><Clock size={13} className="text-primary-500" />{formatDate(event.date, "EEEE, MMMM d, yyyy")}</span>
                        <span className="flex items-center gap-1.5"><MapPin size={13} className="text-primary-500" />{event.location}</span>
                      </div>
                    </div>

                    <div className="flex-shrink-0 flex flex-col gap-2">
                      {event.rsvpEnabled && (
                        <Link href={`/events/${event.slug}#rsvp`} className="btn-primary text-sm">
                          RSVP
                        </Link>
                      )}
                      <Link href={`/events/${event.slug}`} className="btn-secondary text-sm">
                        Details <ArrowRight size={14} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Past Events */}
          {past.length > 0 && (
            <>
              <h2 className="section-title mb-8 text-gray-400">Past Events</h2>
              <div className="space-y-4">
                {past.map((event) => {
                  const tc = typeConfig[event.type] || typeConfig.other;
                  return (
                    <article key={event.id} className="p-5 rounded-xl border border-gray-100 bg-gray-50 flex gap-4 items-start opacity-70">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gray-300 text-white flex flex-col items-center justify-center text-xs">
                        <span>{formatDate(event.date, "MMM")}</span>
                        <span className="text-lg font-bold leading-tight">{formatDate(event.date, "d")}</span>
                      </div>
                      <div>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${tc.color} mr-2`}>{tc.label}</span>
                        <h3 className="font-semibold text-gray-700 mt-1">{event.title}</h3>
                        <span className="flex items-center gap-1 text-xs text-gray-500 mt-1"><MapPin size={10} />{event.location}</span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
