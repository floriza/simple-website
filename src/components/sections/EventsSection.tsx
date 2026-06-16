"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowRight, Users } from "lucide-react";
import { formatDate, isUpcoming } from "@/lib/utils";
import type { Event } from "@/types";

const placeholderEvents: Event[] = [
  {
    _id: "1",
    title: "Campaign Launch Rally",
    slug: { current: "launch-rally" },
    description: "Join us for the official campaign kickoff! Meet the candidate, hear the vision, and be part of the movement.",
    date: new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString(),
    location: "Main Quad, University Campus",
    type: "rally",
    rsvpEnabled: true,
    capacity: 500,
  },
  {
    _id: "2",
    title: "Student Town Hall: Mental Health",
    slug: { current: "mental-health-townhall" },
    description: "An open forum for students to discuss mental health challenges and shape our campaign policies.",
    date: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
    location: "Student Union, Room 201",
    type: "townhall",
    rsvpEnabled: true,
    capacity: 100,
  },
  {
    _id: "3",
    title: "Volunteer Training Day",
    slug: { current: "volunteer-training" },
    description: "Learn how to canvass, run phone banks, and support the campaign. All welcome — no experience needed!",
    date: new Date(Date.now() + 10 * 24 * 3600 * 1000).toISOString(),
    location: "Library Conference Room",
    type: "volunteer",
    rsvpEnabled: true,
  },
];

const eventTypeColors: Record<string, string> = {
  rally: "bg-red-50 text-red-700 border-red-200",
  townhall: "bg-blue-50 text-blue-700 border-blue-200",
  debate: "bg-purple-50 text-purple-700 border-purple-200",
  volunteer: "bg-green-50 text-green-700 border-green-200",
  other: "bg-gray-50 text-gray-700 border-gray-200",
};

interface EventsSectionProps {
  events?: Event[];
}

export default function EventsSection({ events = placeholderEvents }: EventsSectionProps) {
  const upcomingEvents = events.filter((e) => isUpcoming(e.date));

  return (
    <section className="section-padding bg-campaign-light" aria-labelledby="events-heading">
      <div className="container-max">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="section-tag">
              <Calendar size={14} />
              Upcoming Events
            </span>
            <h2 id="events-heading" className="section-title mb-0">
              Join Us on the Trail
            </h2>
          </div>
          <Link href="/events" className="flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all">
            All Events <ArrowRight size={16} />
          </Link>
        </div>

        {upcomingEvents.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No upcoming events at this time. Check back soon!</p>
        ) : (
          <div className="space-y-4">
            {upcomingEvents.slice(0, 3).map((event, i) => (
              <motion.article
                key={event._id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card group p-6 flex flex-col sm:flex-row gap-6 items-start"
              >
                {/* Date block */}
                <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-primary-600 text-white flex flex-col items-center justify-center">
                  <span className="text-xs font-semibold uppercase opacity-75">
                    {formatDate(event.date, "MMM")}
                  </span>
                  <span className="text-2xl font-bold leading-tight">
                    {formatDate(event.date, "d")}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border capitalize ${eventTypeColors[event.type]}`}>
                      {event.type}
                    </span>
                    {event.rsvpEnabled && (
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Users size={11} />
                        {event.capacity ? `Capacity: ${event.capacity}` : "Open to all"}
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading font-bold text-lg text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
                    <Link href={`/events/${event.slug.current}`}>
                      {event.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{event.description}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} className="text-primary-500" />
                      {formatDate(event.date, "EEEE, MMMM d 'at' h:mm a")}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-primary-500" />
                      {event.location}
                    </span>
                  </div>
                </div>

                {/* RSVP */}
                {event.rsvpEnabled && (
                  <Link
                    href={`/events/${event.slug.current}#rsvp`}
                    className="flex-shrink-0 btn-primary text-sm"
                  >
                    RSVP
                  </Link>
                )}
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
