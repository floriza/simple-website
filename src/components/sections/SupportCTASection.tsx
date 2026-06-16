"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Mail, HandHeart } from "lucide-react";

export default function SupportCTASection() {
  return (
    <section className="section-padding bg-hero-gradient" aria-labelledby="support-heading">
      <div className="container-max text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="support-heading" className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-12">
            This campaign is powered by students like you. Every volunteer hour, every dollar donated,
            and every vote brings us closer to the student government our campus deserves.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            <Link
              href="/contact#volunteer"
              className="group flex flex-col items-center gap-4 p-7 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all text-white"
            >
              <div className="w-14 h-14 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-colors">
                <HandHeart size={26} />
              </div>
              <div>
                <p className="font-bold text-lg">Volunteer</p>
                <p className="text-sm text-blue-200 mt-1">Join the team</p>
              </div>
            </Link>

            <Link
              href="/contact#subscribe"
              className="group flex flex-col items-center gap-4 p-7 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all text-white"
            >
              <div className="w-14 h-14 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-colors">
                <Mail size={26} />
              </div>
              <div>
                <p className="font-bold text-lg">Subscribe</p>
                <p className="text-sm text-blue-200 mt-1">Stay informed</p>
              </div>
            </Link>

            <Link
              href="/donate"
              className="group flex flex-col items-center gap-4 p-7 rounded-2xl bg-accent-500 hover:bg-accent-400 border border-accent-400 hover:border-accent-300 transition-all text-white"
            >
              <div className="w-14 h-14 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-colors">
                <Heart size={26} />
              </div>
              <div>
                <p className="font-bold text-lg">Donate</p>
                <p className="text-sm text-amber-100 mt-1">Support the cause</p>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
