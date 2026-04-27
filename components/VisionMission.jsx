// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FaEye, FaBullseye, FaCheckCircle } from "react-icons/fa";
// import { fadeUp } from "@/Hooks/animations";
// import { supabaseServer } from "@/lib/supabaseServer";

// export default function VisionMission() {
//   const [sections, setSections] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const { data } = await supabaseServer
//       .from("vision_mission")
//       .select(
//         `
//         *,
//         vision_mission_points(*)
//       `,
//       )
//       .order("id");

//     setSections(data || []);
//   };

//   const icons = {
//     vision: FaEye,
//     mission: FaBullseye,
//   };

//   return (
//     <section className="relative bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
//       <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
//       <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

//       <div className="relative max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12">
//         {sections.map((section) => {
//           const Icon = icons[section.type];

//           return (
//             <motion.div
//               key={section.id}
//               variants={fadeUp}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               className="group bg-white/80 backdrop-blur-xl rounded-3xl p-10 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
//             >
//               <div className="flex items-center gap-4 mb-6">
//                 <span className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl">
//                   <Icon />
//                 </span>
//                 <h3 className="text-2xl font-bold text-gray-900">
//                   {section.title}
//                 </h3>
//               </div>

//               <p className="text-gray-600 leading-relaxed mb-6">
//                 {section.description}
//               </p>

//               <ul className="space-y-3">
//                 {section.vision_mission_points.map((item) => (
//                   <li
//                     key={item.id}
//                     className="flex items-start gap-3 text-gray-700"
//                   >
//                     <span className="mt-1 text-primary">
//                       <FaCheckCircle size={18} />
//                     </span>
//                     <span>{item.point}</span>
//                   </li>
//                 ))}
//               </ul>
//             </motion.div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaBullseye, FaCheckCircle } from "react-icons/fa";
import { fadeUp } from "@/Hooks/animations";
import { supabaseServer } from "@/lib/supabaseServer";

export default function VisionMission() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabaseServer
      .from("vision_mission")
      .select(
        `
        *,
        vision_mission_points(*)
      `
      )
      .order("id");

    if (error) {
      console.error("Vision Mission Fetch Error:", error.message);
      return;
    }

    setSections(data || []);
  };

  const icons = {
    vision: FaEye,
    mission: FaBullseye,
  };

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      <div className="absolute inset-x-0 top-0 h-[48%] bg-[#f6f8fb]" />
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {sections.map((section, index) => {
            const Icon = icons[section.type] || FaEye;

            return (
              <motion.article
                key={section.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_26px_80px_rgba(15,23,42,0.12)]"
              >
                <div className="absolute right-0 top-0 h-32 w-32 bg-primary/10 blur-3xl transition group-hover:bg-primary/20" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xl text-primary transition group-hover:bg-primary group-hover:text-white">
                        <Icon />
                      </span>

                      <div>
                        <p className="text-sm font-bold uppercase tracking-wide text-primary">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                        <h3 className="mt-1 text-2xl md:text-3xl font-bold text-secondary">
                          {section.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="mt-6 leading-relaxed text-gray-600">
                    {section.description}
                  </p>

                  <div className="mt-7 h-px w-full bg-gray-100" />

                  <ul className="mt-7 space-y-3">
                    {section.vision_mission_points?.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-start gap-3 rounded-lg bg-[#f8fafc] p-4 text-gray-700"
                      >
                        <FaCheckCircle className="mt-1 shrink-0 text-primary" />
                        <span>{item.point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
