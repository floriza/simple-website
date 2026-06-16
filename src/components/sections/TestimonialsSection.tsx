"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    id: "1",
    name: "Alex Rivera",
    role: "4th Year, Engineering",
    quote: "Finally a candidate who actually listens to students. The academic reform proposals address real problems we face every semester.",
    initials: "AR",
    color: "bg-blue-600",
  },
  {
    id: "2",
    name: "Priya Sharma",
    role: "2nd Year, Psychology",
    quote: "The mental health platform is exactly what our campus needs. Someone who understands the pressure students are under and has real solutions.",
    initials: "PS",
    color: "bg-purple-600",
  },
  {
    id: "3",
    name: "Marcus Johnson",
    role: "3rd Year, Business",
    quote: "I've never been involved in campus politics before, but this campaign inspired me to volunteer. The energy and dedication are real.",
    initials: "MJ",
    color: "bg-green-600",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-white" aria-labelledby="testimonials-heading">
      <div className="container-max">
        <div className="text-center mb-14">
          <span className="section-tag">
            <Star size={14} />
            Student Voices
          </span>
          <h2 id="testimonials-heading" className="section-title">
            What Students Are Saying
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="card p-7 relative"
            >
              <Quote size={32} className="text-primary-100 absolute top-6 right-6" aria-hidden="true" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-accent-400 text-accent-400" />
                ))}
              </div>
              <blockquote className="text-gray-700 leading-relaxed mb-6 relative z-10">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm`}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
