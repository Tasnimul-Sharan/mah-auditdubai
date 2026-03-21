"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaChartLine, FaShieldAlt, FaBalanceScale } from "react-icons/fa";

export default function AboutAuditDubai() {
  return (
    <section className="relative bg-[#0B1C2D] text-white overflow-hidden">
      {/* Gradient Glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#C8A96A]/20 blur-3xl rounded-full" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-[#1E3A8A]/20 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 py-28 grid lg:grid-cols-2 gap-20 items-center">
        {/* ================= LEFT CONTENT ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          <p className="text-sm uppercase tracking-widest text-[#C8A96A] mb-4">
            Trusted Audit Firm in Dubai, UAE
          </p>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Redefining Audit with
            <span className="block text-[#C8A96A]">
              Clarity, Confidence & Strategy
            </span>
          </h2>

          {/* Paragraph */}
          <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-xl">
            Audits should never feel like a burden. At our audit firm in Dubai,
            we transform auditing into a powerful business advantage. Beyond
            compliance, we deliver clarity, build confidence, and guide smarter
            financial decisions.
          </p>

          <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-xl">
            Recognized among the most reputable audit firms in the UAE, we help
            businesses of all sizes simplify complexity, strengthen financial
            transparency, and unlock real strategic insights.
          </p>

          {/* FEATURES */}
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            <div className="flex items-center gap-3">
              <FaShieldAlt className="text-[#C8A96A]" />
              <span className="text-gray-200">100% Compliance</span>
            </div>

            <div className="flex items-center gap-3">
              <FaChartLine className="text-[#C8A96A]" />
              <span className="text-gray-200">Strategic Insights</span>
            </div>

            <div className="flex items-center gap-3">
              <FaBalanceScale className="text-[#C8A96A]" />
              <span className="text-gray-200">Trusted Advisory</span>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-5">
            <Link href="/contact">
              <button className="bg-[#C8A96A] text-black px-8 py-4 rounded-xl font-semibold hover:scale-105 transition">
                Get Free Consultation →
              </button>
            </Link>

            <Link href="/services">
              <button className="border border-[#C8A96A] text-[#C8A96A] px-8 py-4 rounded-xl font-semibold hover:bg-[#C8A96A] hover:text-black transition">
                Explore Services
              </button>
            </Link>
          </div>
        </motion.div>

        {/* ================= RIGHT SIDE ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          {/* IMAGE */}
          <div className="relative h-[550px] rounded-[30px] overflow-hidden shadow-2xl">
            <Image
              src="/audit-dubai.jpg"
              alt="Audit Firm Dubai"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* FLOATING CARD */}
          <div className="absolute -bottom-10 left-10 bg-[#0F172A]/90 backdrop-blur-lg border border-[#C8A96A]/30 px-8 py-6 rounded-2xl shadow-xl">
            <p className="text-sm text-gray-400 mb-1">Trusted by Businesses</p>

            <p className="text-3xl font-bold text-[#C8A96A]">500+</p>

            <p className="text-gray-300 text-sm">Companies Across UAE</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
