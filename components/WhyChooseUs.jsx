import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle, FaStar } from "react-icons/fa";
import SectionBadge from "./SectionBadge";

export default function WhyChooseUs() {
  const points = [
    "Certified auditors with UAE & international experience",
    "Strict confidentiality and secure financial handling",
    "Fast response during urgent financial investigations",
    "Regulatory expertise aligned with UAE compliance laws",
    "Transparent reporting and strategic advisory support",
  ];

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* soft background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* IMAGE */}
        <div className="relative group">
          <div className="absolute -inset-3 bg-gradient-to-r from-primary/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition" />

          <Image
            src="/why-us.jpg"
            alt="Audit Consulting Team"
            width={600}
            height={420}
            className="rounded-3xl shadow-2xl object-cover relative z-10"
          />
        </div>

        {/* CONTENT */}
        <div>
          <SectionBadge icon={FaStar} className="mb-4">
            Why Clients Choose Us
          </SectionBadge>

          <h2 className="text-4xl font-bold text-[#0B1C2D] leading-tight">
            Trusted Audit & Advisory Partner
          </h2>

          <p className="mt-6 text-gray-600 leading-relaxed">
            When you work with our audit firm, you gain a strategic partner
            focused on protecting your financial integrity and supporting
            long-term growth. Our specialists combine regulatory knowledge,
            investigative precision, and industry insight to deliver reliable
            financial clarity.
          </p>

          {/* BENEFITS */}
          <div className="mt-8 space-y-4">
            {points.map((item, index) => (
              <div key={index} className="flex items-start gap-3 text-gray-700">
                <FaCheckCircle className="text-primary mt-1" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 mt-10 px-7 py-3 rounded-xl
            bg-primary text-white font-semibold
            hover:bg-primary transition-all duration-300
            shadow-lg hover:shadow-xl"
          >
            Contact Us Now
          </Link>
        </div>
      </div>
    </section>
  );
}
