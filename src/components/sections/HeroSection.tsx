"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

interface HeroSectionProps {
  headline?: string;
  subheadline?: string;
  candidateName?: string;
  candidateTitle?: string;
  photoUrl?: string;
}

export default function HeroSection({
  headline = "Leading With Purpose. Serving With Integrity.",
  subheadline = "Together we will build a stronger, more inclusive student community where every voice is heard, every concern is addressed, and every student has the opportunity to thrive.",
  candidateName = "[Candidate Name]",
  candidateTitle = "Candidate for Student Council President",
  photoUrl,
}: HeroSectionProps) {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Campaign hero"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-hero-gradient" />

      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 50%, white 1px, transparent 1px), radial-gradient(circle at 75% 80%, white 1px, transparent 1px)",
          backgroundSize: "60px 60px, 80px 80px",
        }}
        aria-hidden="true"
      />

      {/* Decorative circles */}
      <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-white/5 -translate-y-1/4 translate-x-1/4" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent-500/10 translate-y-1/4 -translate-x-1/4" aria-hidden="true" />

      <div className="relative z-10 container-max px-4 md:px-8 py-32 grid lg:grid-cols-2 gap-16 items-center">
        {/* Text Content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-sm border border-white/30 rounded-full text-white text-sm font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
              {candidateTitle}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            {headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-blue-100 leading-relaxed mb-10 max-w-xl"
          >
            {subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/about" className="btn-accent">
              Learn About Me <ArrowRight size={16} />
            </Link>
            <Link href="/platform" className="btn-ghost">
              Read My Platform
            </Link>
            <Link href="/contact#volunteer" className="btn-ghost border-white/50">
              Get Involved
            </Link>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-6 mt-14 pt-10 border-t border-white/20"
          >
            {[
              { value: "500+", label: "Supporters" },
              { value: "6", label: "Key Priorities" },
              { value: "3", label: "Years Leadership" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl font-bold text-white font-heading">{value}</p>
                <p className="text-sm text-blue-200 mt-1">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Candidate Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative">
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full bg-accent-400/30 blur-3xl scale-110" aria-hidden="true" />

            {/* Photo frame */}
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
              {photoUrl ? (
                <Image
                  src={photoUrl}
                  alt={`${candidateName} - ${candidateTitle}`}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 288px, 384px"
                />
              ) : (
                <div className="w-full h-full bg-white/10 flex flex-col items-center justify-center text-white/60">
                  <div className="w-24 h-24 rounded-full bg-white/20 mb-3 flex items-center justify-center text-4xl font-heading font-bold text-white">
                    {candidateName.charAt(0)}
                  </div>
                  <p className="text-sm">{candidateName}</p>
                  <p className="text-xs opacity-60">Candidate Photo</p>
                </div>
              )}
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-primary-700 font-bold text-sm">#1</span>
              </div>
              <div>
                <p className="text-xs text-gray-500">Running for</p>
                <p className="text-sm font-bold text-gray-900">President</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60"
        aria-hidden="true"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
