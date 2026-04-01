"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaChartLine,
  FaShieldAlt,
  FaBalanceScale,
  FaArrowAltCircleRight,
} from "react-icons/fa";
import SectionBadge from "./SectionBadge";
import { FiArrowDownRight, FiArrowRightCircle } from "react-icons/fi";

export default function AboutAuditDubai() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Soft Gradient Background */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-primary/10 blur-3xl rounded-full" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-secondary/10 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 py-28 grid lg:grid-cols-2 gap-20 items-center">
        {/* ================= LEFT CONTENT ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          <SectionBadge icon={FaShieldAlt} className="mb-6">
            Trusted Audit Firm in Dubai, UAE
          </SectionBadge>
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-secondary">
            Redefining Audit with
            <span className="block text-primary">
              Clarity, Confidence & Strategy
            </span>
          </h2>

          {/* Paragraph */}
          <p className="text-gray-600 text-lg leading-relaxed mb-6 max-w-xl">
            Audits should never feel like a burden. At our audit firm in Dubai,
            we transform auditing into a powerful business advantage. Beyond
            compliance, we deliver clarity, build confidence, and guide smarter
            financial decisions.
          </p>

          <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-xl">
            Recognized among the most reputable audit firms in the UAE, we help
            businesses of all sizes simplify complexity, strengthen financial
            transparency, and unlock real strategic insights.
          </p>

          {/* FEATURES */}
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FaShieldAlt className="text-primary" />
              </div>
              <span className="text-soft_black font-medium">
                100% Compliance
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FaChartLine className="text-primary" />
              </div>
              <span className="text-soft_black font-medium">
                Strategic Insights
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FaBalanceScale className="text-primary" />
              </div>
              <span className="text-soft_black font-medium">
                Trusted Advisory
              </span>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-5">
            <button
              className="bg-primary text-white px-8 py-4 rounded-xl font-semibold
    flex items-center gap-2 hover:scale-105 transition"
            >
              Get Free Consultation
              <FiArrowRightCircle className="text-lg" />
            </button>

            <Link href="/services">
              <button className="border border-border_color text-secondary px-8 py-4 rounded-xl font-semibold hover:bg-secondary hover:text-white transition">
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
          <div className="relative h-[550px] rounded-[30px] overflow-hidden shadow-xl border border-border_color">
            <Image
              src="/audit-dubai.jpg"
              alt="Audit Firm Dubai"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* FLOATING CARD */}
          <div className="absolute -bottom-10 left-10 bg-white border border-border_color px-8 py-6 rounded-2xl shadow-xl">
            <p className="text-sm text-gray-500 mb-1">Trusted by Businesses</p>

            <p className="text-3xl font-bold text-primary">500+</p>

            <p className="text-gray-600 text-sm">Companies Across UAE</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
