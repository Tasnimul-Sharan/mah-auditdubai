// "use client";

// import Image from "next/image";
// import { FaCheckCircle, FaIndustry } from "react-icons/fa";
// import SectionBadge from "./SectionBadge";

// const industries = [
//   "Small & Medium Enterprises (SMEs)",
//   "Free Zone Companies across the UAE",
//   "Real Estate & Construction Firms",
//   "Hospitality, Retail & Tourism",
//   "Manufacturing & Logistics Companies",
//   "Financial Services, Healthcare & Education",
// ];

// export default function WhoWeWorkWith() {
//   return (
//     <section className="py-28 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
//         {/* LEFT CONTENT */}
//         <div>
//           <div className="flex justify-start mb-4">
//             <SectionBadge    icon={FaIndustry}>Industries We Serve</SectionBadge>
//           </div>

//           <h2 className="text-4xl font-bold leading-tight mb-6">
//             Trusted by Businesses Across Multiple Sectors
//           </h2>

//           <p className="text-gray-600 mb-7 leading-relaxed">
//             Our audit and advisory team works with organizations across diverse
//             industries in Dubai and the UAE. We understand the regulatory
//             environment, operational challenges, and financial risks unique to
//             each sector.
//           </p>

//           {/* <div className="grid sm:grid-cols-2 gap-4"> */}
//           {industries.map((item, index) => (
//             <div key={index} className="flex items-start gap-3 p-2">
//               <FaCheckCircle className="text-primary mt-1 text-base" />
//               <span className="text-gray-700 text-base">{item}</span>
//             </div>
//           ))}
//           {/* </div> */}

//           <button className="mt-10 border border-primary text-primary px-8 py-3 rounded-md hover:bg-primary hover:text-white transition-all transform duration-300">
//             Consult With Our Experts
//           </button>
//         </div>

//         {/* RIGHT IMAGE */}
//         <div className="relative">
//           <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-3xl blur-2xl"></div>

//           <Image
//             src="/images/services/audit-team.jpg"
//             alt="Audit Consulting"
//             width={600}
//             height={500}
//             className="rounded-3xl shadow-xl object-cover"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import Image from "next/image";
import { FaCheckCircle, FaIndustry } from "react-icons/fa";
import SectionBadge from "./SectionBadge";

export default function WhoWeWorkWith({ industries = [] }) {
  const firstIndustry = industries?.[0];

  return (
    <section className="relative overflow-hidden bg-[#f8fafc] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.06),transparent_35%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        {/* LEFT CONTENT */}
        <div>
          <div className="mb-5 flex justify-start">
            <SectionBadge icon={FaIndustry}>
              {firstIndustry?.subtitle || "Industries We Serve"}
            </SectionBadge>
          </div>

          <h2 className="max-w-xl text-4xl font-bold leading-tight text-[#0B1C2D] md:text-5xl">
            {firstIndustry?.title ||
              "Trusted by Businesses Across Multiple Sectors"}
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
            {firstIndustry?.description ||
              "Our audit and advisory team works with organizations across diverse industries in Dubai and the UAE."}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {industries.map((item) => (
              <div
                key={item.id}
                className="group flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
              >
                <FaCheckCircle className="mt-1 shrink-0 text-primary transition duration-300 group-hover:scale-110" />

                <span className="text-sm font-medium leading-6 text-slate-700">
                  {item.title}
                </span>
              </div>
            ))}
          </div>

          <button className="mt-10 rounded-xl bg-primary px-8 py-3 font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl">
            Consult With Our Experts
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full border border-primary/20" />
          <div className="absolute -bottom-8 -right-8 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative h-[520px] overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-[0_28px_90px_rgba(15,23,42,0.16)]">
            <Image
              src={firstIndustry?.image || "/images/services/audit-team.jpg"}
              alt={firstIndustry?.title || "Industries We Serve"}
              fill
              className="object-cover"
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C2D]/70 via-[#0B1C2D]/10 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/30 bg-white/90 p-5 shadow-xl backdrop-blur-md">
              <p className="text-lg font-bold text-[#0B1C2D]">
                Industry-Focused Audit Support
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Tailored audit, tax, accounting and advisory solutions for UAE
                businesses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}