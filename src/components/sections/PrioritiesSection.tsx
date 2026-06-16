"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Heart, BookOpen, Brain, Building2, Users, Briefcase,
  ArrowRight, Star, Shield, Globe, Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Heart, BookOpen, Brain, Building2, Users, Briefcase,
  Star, Shield, Globe, Zap,
};

interface Priority {
  _id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  slug: { current: string };
}

const defaultPriorities: Priority[] = [
  { _id: "1", title: "Student Welfare", description: "Advocating for affordable housing, food security, and financial aid access for all students.", icon: "Heart", color: "bg-red-50 text-red-600 border-red-100", slug: { current: "student-welfare" } },
  { _id: "2", title: "Academic Excellence", description: "Improving course availability, library resources, and academic support services.", icon: "BookOpen", color: "bg-blue-50 text-blue-600 border-blue-100", slug: { current: "academic-excellence" } },
  { _id: "3", title: "Mental Health Support", description: "Expanding counseling services and building a stigma-free mental health culture on campus.", icon: "Brain", color: "bg-purple-50 text-purple-600 border-purple-100", slug: { current: "mental-health" } },
  { _id: "4", title: "Campus Facilities", description: "Modernizing study spaces, improving accessibility, and upgrading recreational facilities.", icon: "Building2", color: "bg-amber-50 text-amber-600 border-amber-100", slug: { current: "campus-facilities" } },
  { _id: "5", title: "Student Representation", description: "Ensuring every department and demographic has a genuine voice in university decisions.", icon: "Users", color: "bg-green-50 text-green-600 border-green-100", slug: { current: "student-representation" } },
  { _id: "6", title: "Career Development", description: "Connecting students to internships, mentors, and career services that open real doors.", icon: "Briefcase", color: "bg-indigo-50 text-indigo-600 border-indigo-100", slug: { current: "career-development" } },
];

interface PrioritiesSectionProps {
  priorities?: Priority[];
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PrioritiesSection({ priorities = defaultPriorities }: PrioritiesSectionProps) {
  return (
    <section className="section-padding bg-gray-50" aria-labelledby="priorities-heading">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-tag">
            <Star size={14} />
            Campaign Platform
          </span>
          <h2 id="priorities-heading" className="section-title">
            My Key Priorities for{" "}
            <span className="gradient-text">Student Success</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Six pillars to create a campus community where every student can learn, grow, and belong.
          </p>
        </div>

        {/* Priority Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {priorities.map((priority) => {
            const Icon = iconMap[priority.icon] || Star;
            return (
              <motion.div key={priority._id} variants={cardVariants}>
                <Link
                  href={`/platform#${priority.slug.current}`}
                  className="card group p-6 block h-full hover:border-primary-200 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={cn("w-12 h-12 rounded-xl border flex items-center justify-center mb-5 transition-transform group-hover:scale-110", priority.color)}>
                    <Icon size={22} />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
                    {priority.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {priority.description}
                  </p>
                  <span className="flex items-center gap-1 text-primary-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight size={14} />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/platform" className="btn-primary">
            View Full Platform <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
