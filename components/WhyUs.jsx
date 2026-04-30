// "use client";

// import { motion } from "framer-motion";
// import { FaShieldAlt, FaChartLine, FaUserTie, FaGlobe } from "react-icons/fa";
// import { FaShield } from "react-icons/fa6";
// import SectionBadge from "./SectionBadge";
// import { fadeUp } from "@/Hooks/animations";

// const iconMap = {
//   FaShieldAlt: FaShieldAlt,
//   FaChartLine: FaChartLine,
//   FaUserTie: FaUserTie,
//   FaGlobe: FaGlobe,

//   shield: FaShieldAlt,
//   chart: FaChartLine,
//   user: FaUserTie,
//   globe: FaGlobe,
// };

// export default function WhyUs({ whyUs }) {
//   const data = whyUs;

//   if (!data) return null;

//   return (
//     <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
//       <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-primary/10 blur-3xl rounded-full" />

//       <div className="max-w-7xl mx-auto px-6">
//         <div className="text-center mb-12">
//           <div className="flex justify-center mb-4">
//             <SectionBadge icon={FaShield}>
//               {data.subtitle || "Why Choose Us"}
//             </SectionBadge>
//           </div>

//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
//             {data.title}
//           </h2>

//           <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
//             {data.description}
//           </p>
//         </div>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {(data.points || []).map((item, i) => {
//             const Icon = iconMap[item.icon] || FaShieldAlt;

//             return (
//               <motion.div
//                 key={i}
//                 variants={fadeUp}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true }}
//                 className="group bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
//               >
//                 <div className="w-14 h-14 mb-5 flex items-center justify-center rounded-xl bg-primary/10 text-primary text-xl group-hover:bg-primary group-hover:text-white transition">
//                   <Icon />
//                 </div>

//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                   {item.text}
//                 </h3>

//                 {item.desc && (
//                   <p className="text-gray-600 text-sm leading-relaxed">
//                     {item.desc}
//                   </p>
//                 )}
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

// "use client";

import { motion } from "framer-motion";
import { FaShieldAlt, FaChartLine, FaUserTie, FaGlobe } from "react-icons/fa";
import { FaShield } from "react-icons/fa6";
import SectionBadge from "./SectionBadge";
import { fadeUp } from "@/Hooks/animations";

const iconMap = {
  FaShieldAlt: FaShieldAlt,
  FaChartLine: FaChartLine,
  FaUserTie: FaUserTie,
  FaGlobe: FaGlobe,

  shield: FaShieldAlt,
  chart: FaChartLine,
  user: FaUserTie,
  globe: FaGlobe,
};

export default function WhyUs({ whyUs }) {
  const data = whyUs;

  if (!data) return null;

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-primary/10 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <SectionBadge icon={FaShield}>
              {data.subtitle || "Why Choose Us"}
            </SectionBadge>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            {data.title}
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            {data.description}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {(data.points || []).map((item, i) => {
            const Icon = iconMap[item.icon] || FaShieldAlt;

            return (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-14 h-14 mb-5 flex items-center justify-center rounded-xl bg-primary/10 text-primary text-xl group-hover:bg-primary group-hover:text-white transition">
                  <Icon />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.text}
                </h3>

                {item.desc && (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// "use client";

// import { motion } from "framer-motion";
// import { FaShieldAlt, FaChartLine, FaUserTie, FaGlobe } from "react-icons/fa";
// import { FaShield } from "react-icons/fa6";
// import SectionBadge from "./SectionBadge";
// import { fadeUp } from "@/Hooks/animations";

// const iconMap = {
//   FaShieldAlt: FaShieldAlt,
//   FaChartLine: FaChartLine,
//   FaUserTie: FaUserTie,
//   FaGlobe: FaGlobe,

//   shield: FaShieldAlt,
//   chart: FaChartLine,
//   user: FaUserTie,
//   globe: FaGlobe,
// };

// export default function WhyUs({ whyUs }) {
//   const data = whyUs;

//   if (!data) return null;

//   return (
//     <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
//       <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-primary/10 blur-3xl rounded-full" />

//       <div className="max-w-7xl mx-auto px-6">
//         <div className="text-center mb-12">
//           <div className="flex justify-center mb-4">
//             <SectionBadge icon={FaShield}>
//               {data.subtitle || "Why Choose Us"}
//             </SectionBadge>
//           </div>

//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
//             {data.title}
//           </h2>

//           <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
//             {data.description}
//           </p>
//         </div>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {(data.points || []).map((item, i) => {
//             const Icon = iconMap[item.icon] || FaShieldAlt;

//             return (
//               <motion.div
//                 key={i}
//                 variants={fadeUp}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true }}
//                 className="group bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
//               >
//                 <div className="w-14 h-14 mb-5 flex items-center justify-center rounded-xl bg-primary/10 text-primary text-xl group-hover:bg-primary group-hover:text-white transition">
//                   <Icon />
//                 </div>

//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                   {item.text}
//                 </h3>

//                 {item.desc && (
//                   <p className="text-gray-600 text-sm leading-relaxed">
//                     {item.desc}
//                   </p>
//                 )}
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }
