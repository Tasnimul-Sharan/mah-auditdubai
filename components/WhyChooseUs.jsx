// export default function WhyChooseUs() {
//   return (
//     <section className="py-24 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
//         <img
//           src="/why-us.jpg"
//           alt="Why Choose Us"
//           className="rounded-2xl shadow-xl"
//         />

//         <div>
//           <h2 className="text-3xl md:text-4xl font-bold text-[#0B1C2D]">
//             Why Partner With Our Firm?
//           </h2>

//           <p className="mt-6 text-gray-600 leading-relaxed">
//             We combine regulatory expertise with precision-driven audit
//             methodology to ensure compliance, transparency, and business growth.
//             Our team prioritizes accuracy and long-term trust.
//           </p>

//           <button className="mt-8 bg-primary text-white px-7 py-3 rounded-xl hover:bg-[#4726d1] transition-all duration-300 shadow-lg">
//             Contact Us
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

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
          <p className="uppercase tracking-widest text-sm text-primary mb-4">
            Why Clients Choose Us
          </p>

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
