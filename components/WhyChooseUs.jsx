// import Image from "next/image";
// import Link from "next/link";
// import { FaCheckCircle, FaStar } from "react-icons/fa";
// import SectionBadge from "./SectionBadge";

// export default function WhyChooseUs() {
//   const points = [
//     "Certified auditors with UAE & international experience",
//     "Strict confidentiality and secure financial handling",
//     "Fast response during urgent financial investigations",
//     "Regulatory expertise aligned with UAE compliance laws",
//     "Transparent reporting and strategic advisory support",
//   ];

//   return (
//     <section className="relative py-24 bg-white overflow-hidden">
//       {/* soft background accent */}
//       <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-3xl -z-10" />

//       <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
//         {/* IMAGE */}
//         <div className="relative group">
//           <div className="absolute -inset-3 bg-gradient-to-r from-primary/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition" />

//           <Image
//             src="/why-us.jpg"
//             alt="Audit Consulting Team"
//             width={600}
//             height={420}
//             className="rounded-3xl shadow-2xl object-cover relative z-10"
//           />
//         </div>

//         {/* CONTENT */}
//         <div>
//           <SectionBadge icon={FaStar} className="mb-4">
//             Why Clients Choose Us
//           </SectionBadge>

//           <h2 className="text-4xl font-bold text-[#0B1C2D] leading-tight">
//             Trusted Audit & Advisory Partner
//           </h2>

//           <p className="mt-6 text-gray-600 leading-relaxed">
//             When you work with our audit firm, you gain a strategic partner
//             focused on protecting your financial integrity and supporting
//             long-term growth. Our specialists combine regulatory knowledge,
//             investigative precision, and industry insight to deliver reliable
//             financial clarity.
//           </p>

//           {/* BENEFITS */}
//           <div className="mt-8 space-y-4">
//             {points.map((item, index) => (
//               <div key={index} className="flex items-start gap-3 text-gray-700">
//                 <FaCheckCircle className="text-primary mt-1" />
//                 <span>{item}</span>
//               </div>
//             ))}
//           </div>

//           {/* CTA */}
//           <Link
//             href="/contact"
//             className="inline-flex items-center gap-3 mt-10 px-7 py-3 rounded-xl
//             bg-primary text-white font-semibold
//             hover:bg-primary transition-all duration-300
//             shadow-lg hover:shadow-xl"
//           >
//             Contact Us Now
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

// import Image from "next/image";
// import Link from "next/link";
// import {
//   FaArrowRight,
//   FaCheckCircle,
//   FaShieldAlt,
//   FaStar,
// } from "react-icons/fa";
// import SectionBadge from "./SectionBadge";
// import { supabaseServer } from "@/lib/supabaseServer";

// export default async function WhyChooseUs() {
//   const { data: whyChooseUs, error: whyError } = await supabaseServer
//     .from("why_choose_us")
//     .select("id, title, subtitle, description, image")
//     .order("created_at", { ascending: false })
//     .limit(1)
//     .maybeSingle();

//   if (whyError) {
//     console.error("why_choose_us fetch error:", whyError.message);
//     return null;
//   }

//   if (!whyChooseUs) {
//     return null;
//   }

//   const { data: pointRows, error: pointsError } = await supabaseServer
//     .from("why_choose_points")
//     .select("point")
//     .eq("why_id", whyChooseUs.id)
//     .order("created_at", { ascending: true });

//   if (pointsError) {
//     console.error("why_choose_points fetch error:", pointsError.message);
//   }

//   const points = (pointRows || []).map((item) => item.point).filter(Boolean);

//   return (
//     <section className="relative overflow-hidden bg-white py-20 sm:py-24">
//       <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.05),transparent_35%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]" />

//       <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 md:grid-cols-2 lg:gap-20">
//         {whyChooseUs.image && (
//           <div className="relative">
//             <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full border border-primary/20" />
//             <div className="absolute -bottom-6 -right-6 h-44 w-44 rounded-full bg-primary/10 blur-3xl" />

//             <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-[0_28px_90px_rgba(15,23,42,0.18)]">
//               <Image
//                 src={whyChooseUs.image}
//                 alt={whyChooseUs.title || "Why choose us"}
//                 fill
//                 sizes="(min-width: 768px) 50vw, 100vw"
//                 className="object-cover"
//                 priority
//               />

//               <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C2D]/70 via-[#0B1C2D]/10 to-transparent" />

//               <div className="absolute bottom-5 left-5 right-5 flex items-center gap-4 rounded-2xl border border-white/30 bg-white/90 p-4 shadow-xl backdrop-blur-md">
//                 <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
//                   <FaShieldAlt className="text-xl" />
//                 </div>

//                 <div>
//                   <p className="font-semibold text-[#0B1C2D]">
//                     Confidential by design
//                   </p>
//                   <p className="mt-1 text-sm leading-5 text-slate-600">
//                     Secure audit handling with clear reporting.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-[#0B1C2D] p-5 text-white shadow-2xl sm:block">
//               <p className="text-3xl font-bold leading-none">UAE</p>
//               <p className="mt-2 text-sm text-white/70">Compliance focused</p>
//             </div>
//           </div>
//         )}

//         <div className={!whyChooseUs.image ? "md:col-span-2 max-w-3xl" : ""}>
//           {whyChooseUs.subtitle && (
//             <SectionBadge icon={FaStar} className="mb-5">
//               {whyChooseUs.subtitle}
//             </SectionBadge>
//           )}

//           {whyChooseUs.title && (
//             <h2 className="max-w-xl text-4xl font-bold leading-tight text-[#0B1C2D] sm:text-5xl">
//               {whyChooseUs.title}
//             </h2>
//           )}

//           {whyChooseUs.description && (
//             <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
//               {whyChooseUs.description}
//             </p>
//           )}

//           {points.length > 0 && (
//             <div className="mt-8 grid gap-3 sm:grid-cols-2">
//               {points.map((item, index) => (
//                 <div
//                   key={`${item}-${index}`}
//                   className="group flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
//                 >
//                   <FaCheckCircle className="mt-1 shrink-0 text-primary transition duration-300 group-hover:scale-110" />
//                   <span className="text-sm leading-6 text-slate-700">
//                     {item}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           )}

//           <Link
//             href="/contact"
//             className="mt-10 inline-flex items-center gap-3 rounded-xl bg-primary px-7 py-3 font-semibold text-white shadow-lg shadow-primary/20 transition duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl"
//           >
//             Contact Us Now
//             <FaArrowRight className="text-sm" />
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaCheckCircle,
  FaShieldAlt,
  FaStar,
} from "react-icons/fa";
import SectionBadge from "./SectionBadge";

export default function WhyChooseUs({ data, points = [] }) {
  const whyChooseUs = data;

  if (!whyChooseUs) return null;

  const buttonHref =
    typeof whyChooseUs?.button_link === "string" &&
    whyChooseUs.button_link.trim() !== ""
      ? whyChooseUs.button_link.trim()
      : "/contact";

  const buttonText =
    typeof whyChooseUs?.button_text === "string" &&
    whyChooseUs.button_text.trim() !== ""
      ? whyChooseUs.button_text.trim()
      : "Contact Us Now";

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.05),transparent_35%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 md:grid-cols-2 lg:gap-20">
        {whyChooseUs.image && (
          // <div className="relative">
          //   <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full border border-primary/20" />
          //   <div className="absolute -bottom-6 -right-6 h-44 w-44 rounded-full bg-primary/10 blur-3xl" />

          //   <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-[0_28px_90px_rgba(15,23,42,0.18)]">
          //     <Image
          //       src={whyChooseUs.image}
          //       alt={whyChooseUs.title}
          //       fill
          //       className="object-cover w-full h-full"
          //       priority
          //     />

          //     <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C2D]/70 via-[#0B1C2D]/10 to-transparent" />

          //     <div className="absolute bottom-5 left-5 right-5 flex items-center gap-4 rounded-2xl border border-white/30 bg-white/90 p-4 shadow-xl backdrop-blur-md">
          //       <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          //         <FaShieldAlt className="text-xl" />
          //       </div>

          //       <div>
          //         <p className="font-semibold text-[#0B1C2D]">
          //           Confidential by design
          //         </p>
          //         <p className="mt-1 text-sm leading-5 text-slate-600">
          //           Secure audit handling with clear reporting.
          //         </p>
          //       </div>
          //     </div>
          //   </div>

          //   {/* <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-[#0B1C2D] p-5 text-white shadow-2xl sm:block">
          //     <p className="text-3xl font-bold leading-none">UAE</p>
          //     <p className="mt-2 text-sm text-white/70">Compliance focused</p>
          //   </div> */}
          // </div>

          <div className="relative">
            <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full border border-primary/20" />
            <div className="absolute -bottom-6 -right-6 h-44 w-44 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative h-full min-h-[420px] md:min-h-[520px] lg:min-h-[600px] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-[0_28px_90px_rgba(15,23,42,0.18)]">
              <Image
                src={whyChooseUs.image}
                alt={whyChooseUs.title || "Why choose us"}
                fill
                className="object-cover"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C2D]/70 via-[#0B1C2D]/10 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 flex items-center gap-4 rounded-2xl border border-white/30 bg-white/90 p-4 shadow-xl backdrop-blur-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FaShieldAlt className="text-xl" />
                </div>

                <div>
                  <p className="font-semibold text-[#0B1C2D]">
                    Confidential by design
                  </p>
                  <p className="mt-1 text-sm leading-5 text-slate-600">
                    Secure audit handling with clear reporting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={!whyChooseUs.image ? "md:col-span-2 max-w-3xl" : ""}>
          {whyChooseUs.subtitle && (
            <SectionBadge icon={FaStar} className="mb-5">
              {whyChooseUs.subtitle}
            </SectionBadge>
          )}

          {whyChooseUs.title && (
            <h2 className="max-w-xl text-4xl font-bold leading-tight text-[#0B1C2D] sm:text-5xl">
              {whyChooseUs.title}
            </h2>
          )}

          {whyChooseUs.description && (
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
              {whyChooseUs.description}
            </p>
          )}

          {points.length > 0 && (
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {points.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="group flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
                >
                  <FaCheckCircle className="mt-1 shrink-0 text-primary" />
                  <span className="text-sm leading-6 text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          )}

          <Link
            href={whyChooseUs.button_link}
            className="mt-10 inline-flex items-center gap-3 rounded-xl bg-primary px-7 py-3 font-semibold text-white shadow-lg shadow-primary/20 transition duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl"
          >
            {whyChooseUs.button_text}
            <FaArrowRight className="text-sm" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// import { supabaseServer } from "@/lib/supabaseServer";
// import WhyChooseUsView from "./home/WhyChooseUsView";

// export default async function WhyChooseUs() {
//   const { data: whyChooseUs, error } = await supabaseServer
//     .from("why_choose_us")
//     .select("id, title, subtitle, description, image")
//     .order("created_at", { ascending: false })
//     .limit(1)
//     .maybeSingle();

//   if (error || !whyChooseUs) return null;

//   const { data: pointRows } = await supabaseServer
//     .from("why_choose_points")
//     .select("point")
//     .eq("why_id", whyChooseUs.id)
//     .order("created_at", { ascending: true });

//   const points = (pointRows || []).map((item) => item.point).filter(Boolean);

//   return <WhyChooseUsView data={whyChooseUs} points={points} />;
// }
