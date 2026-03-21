"use client";

import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

const industries = [
  "Small & Medium Enterprises (SMEs)",
  "Free Zone Companies across the UAE",
  "Real Estate & Construction Firms",
  "Hospitality, Retail & Tourism",
  "Manufacturing & Logistics Companies",
  "Financial Services, Healthcare & Education",
];

export default function WhoWeWorkWith() {
  return (
    <section className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT CONTENT */}
        <div>
          <p className="text-primary font-semibold tracking-widest uppercase mb-4">
            Industries We Serve
          </p>

          <h2 className="text-4xl font-bold leading-tight mb-6">
            Trusted by Businesses Across Multiple Sectors
          </h2>

          <p className="text-gray-600 mb-7 leading-relaxed">
            Our audit and advisory team works with organizations across diverse
            industries in Dubai and the UAE. We understand the regulatory
            environment, operational challenges, and financial risks unique to
            each sector.
          </p>

          {/* <div className="grid sm:grid-cols-2 gap-4"> */}
          {industries.map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-2">
              <FaCheckCircle className="text-primary mt-1 text-base" />
              <span className="text-gray-700 text-base">{item}</span>
            </div>
          ))}
          {/* </div> */}

          <button className="mt-10 border border-primary text-primary px-8 py-3 rounded-xl hover:bg-primary hover:text-white transition">
            Consult With Our Experts
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-3xl blur-2xl"></div>

          <Image
            src="/images/services/audit-team.jpg"
            alt="Audit Consulting"
            width={600}
            height={500}
            className="rounded-3xl shadow-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
