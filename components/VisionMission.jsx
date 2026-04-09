// "use client";

// import { fadeUp } from "@/Hooks/animations";
// import { motion } from "framer-motion";
// import { FaEye, FaBullseye, FaCheckCircle } from "react-icons/fa";
// import { Check } from "lucide-react";

// export default function VisionMission() {
//   return (
//     <section className="relative bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
//       {/* Glow */}
//       <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
//       <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

//       <div className="relative max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12">
//         {/* ================= Vision ================= */}
//         <motion.div
//           variants={fadeUp}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="group bg-white/80 backdrop-blur-xl rounded-3xl p-10 border border-gray-100
//           shadow-sm hover:shadow-2xl transition-all duration-500"
//         >
//           {/* Header */}
//           <div className="flex items-center gap-4 mb-6">
//             <span
//               className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl
//             group-hover:bg-primary group-hover:text-white transition"
//             >
//               <FaEye />
//             </span>
//             <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
//           </div>

//           {/* Content */}
//           <p className="text-gray-600 leading-relaxed mb-6">
//             To be a leading audit and advisory firm in the UAE, recognized for
//             delivering trusted financial insights, regulatory compliance, and
//             sustainable business growth.
//           </p>

//           {/* Points */}
//           <ul className="space-y-3">
//             {[
//               "Enhance financial transparency",
//               "Ensure regulatory compliance (FTA & UAE laws)",
//               "Support business growth with data-driven insights",
//               "Build long-term trust with clients",
//             ].map((item, index) => (
//               <li key={index} className="flex items-start gap-3 text-gray-700">
//                 <span className="mt-1 text-primary">
//                   <FaCheckCircle size={18} />
//                 </span>
//                 <span>{item}</span>
//               </li>
//             ))}
//           </ul>
//         </motion.div>

//         {/* ================= Mission ================= */}
//         <motion.div
//           variants={fadeUp}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="group bg-white/80 backdrop-blur-xl rounded-3xl p-10 border border-gray-100
//           shadow-sm hover:shadow-2xl transition-all duration-500"
//         >
//           {/* Header */}
//           <div className="flex items-center gap-4 mb-6">
//             <span
//               className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl
//             group-hover:bg-primary group-hover:text-white transition"
//             >
//               <FaBullseye />
//             </span>
//             <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
//           </div>

//           {/* Content */}
//           <p className="text-gray-600 leading-relaxed mb-6">
//             To provide reliable audit, VAT compliance, and financial advisory
//             services that help businesses in Dubai operate with confidence,
//             accuracy, and efficiency.
//           </p>

//           {/* Points */}
//           <ul className="space-y-3">
//             {[
//               "Deliver accurate and compliant audit reports",
//               "Assist with VAT registration & filing",
//               "Identify financial risks and improvement areas",
//               "Maintain strict confidentiality and data security",
//               "Support businesses with strategic financial guidance",
//             ].map((item, index) => (
//               <li key={index} className="flex items-start gap-3 text-gray-700">
//                 <span className="mt-1 text-primary">
//                   <FaCheckCircle size={18} />
//                 </span>
//                 <span>{item}</span>
//               </li>
//             ))}
//           </ul>
//         </motion.div>
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
    const { data } = await supabaseServer
      .from("vision_mission")
      .select(
        `
        *,
        vision_mission_points(*)
      `,
      )
      .order("id");

    setSections(data || []);
  };

  const icons = {
    vision: FaEye,
    mission: FaBullseye,
  };

  return (
    <section className="relative bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12">
        {sections.map((section) => {
          const Icon = icons[section.type];

          return (
            <motion.div
              key={section.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group bg-white/80 backdrop-blur-xl rounded-3xl p-10 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl">
                  <Icon />
                </span>
                <h3 className="text-2xl font-bold text-gray-900">
                  {section.title}
                </h3>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">
                {section.description}
              </p>

              <ul className="space-y-3">
                {section.vision_mission_points.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <span className="mt-1 text-primary">
                      <FaCheckCircle size={18} />
                    </span>
                    <span>{item.point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}