"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Target } from "lucide-react";

const visionPoints = [
  "A campus where mental health support is accessible and stigma-free",
  "Academic programs that prepare students for the real world",
  "Student governance that is transparent, responsive, and representative",
  "Facilities and resources that every student deserves",
];

export default function VisionSection() {
  return (
    <section className="section-padding bg-white" aria-labelledby="vision-heading">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-tag">
              <Target size={14} />
              Our Vision
            </span>
            <h2 id="vision-heading" className="section-title">
              A Campus That Works{" "}
              <span className="gradient-text">For Every Student</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              For too long, students have felt unheard and underrepresented. I believe that student
              government should be a genuine force for change — not just a title on a resume.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              My vision is a university experience where every student — regardless of background,
              major, or year — has access to the resources, representation, and support they need to
              succeed.
            </p>

            <ul className="space-y-3">
              {visionPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Stats / Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { stat: "3+", label: "Years Student Leadership", desc: "Active involvement in campus organizations" },
              { stat: "500+", label: "Students Supported", desc: "Through advocacy and direct programs" },
              { stat: "6", label: "Platform Pillars", desc: "Comprehensive, actionable policies" },
              { stat: "100%", label: "Student-Focused", desc: "No outside agendas — only student needs" },
            ].map(({ stat, label, desc }) => (
              <div key={label} className="p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-blue-50 border border-primary-100">
                <p className="font-heading font-bold text-4xl text-primary-700 mb-1">{stat}</p>
                <p className="font-semibold text-gray-900 text-sm mb-1">{label}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
