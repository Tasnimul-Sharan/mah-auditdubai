"use client";

import { motion } from "framer-motion";
import { FaShieldAlt, FaChartLine, FaUserTie, FaGlobe } from "react-icons/fa";
import { fadeUp } from "@/Hooks/animations";
import SectionBadge from "./SectionBadge";
import { FaShield } from "react-icons/fa6";   

export default function WhyUs() {
  const features = [
    {
      icon: FaShieldAlt,
      title: "Regulatory Compliance",
      desc: "Full adherence to UAE laws and Federal Tax Authority (FTA) regulations for complete peace of mind.",
    },
    {
      icon: FaChartLine,
      title: "Results-Driven Insights",
      desc: "We go beyond audits to deliver actionable insights that improve financial performance.",
    },
    {
      icon: FaUserTie,
      title: "Expert Professionals",
      desc: "A dedicated team of experienced auditors and financial advisors ensuring accuracy and reliability.",
    },
    {
      icon: FaGlobe,
      title: "Global Standards",
      desc: "International auditing practices combined with deep local expertise in the UAE market.",
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-primary/10 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <SectionBadge icon={FaShield} className="mb-0">
              Why Choose Us
            </SectionBadge>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Businesses Trust Us
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            We combine expertise, technology, and strategic insight to deliver
            reliable audit and compliance solutions across Dubai and the UAE.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group bg-white/80 backdrop-blur-xl border border-gray-100 
                rounded-2xl p-6 shadow-sm hover:shadow-xl 
                transition-all duration-500 hover:-translate-y-2"
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 mb-5 flex items-center justify-center rounded-xl 
                bg-primary/10 text-primary text-xl
                group-hover:bg-primary group-hover:text-white transition"
                >
                  <Icon />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
