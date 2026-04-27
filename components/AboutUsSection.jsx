"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionBadge from "./SectionBadge";
import { FiArrowRight } from "react-icons/fi";
import { FaShieldAlt, FaChartLine, FaBalanceScale } from "react-icons/fa";

const iconMap = {
  shield: FaShieldAlt,
  chart: FaChartLine,
  balance: FaBalanceScale,
};

export default function AboutUsSection({ data }) {
  if (!data) return null;

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-x-0 top-0 h-[42%] bg-[#f6f8fb]" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <SectionBadge className="mb-6">{data.badge}</SectionBadge>

            <h2 className="max-w-2xl text-4xl md:text-5xl font-bold leading-tight text-secondary">
              {data.title}
              <span className="block text-primary">
                {data.highlighted_title}
              </span>
            </h2>

            <div className="mt-6 max-w-xl space-y-4 text-base md:text-lg leading-relaxed text-gray-600">
              <p>{data.description1}</p>
              <p>{data.description2}</p>
            </div>

            <div className="mt-9 grid sm:grid-cols-3 gap-3">
              {data.features?.map((item, i) => {
                const Icon = iconMap[item.icon];

                return (
                  <div
                    key={i}
                    className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {Icon && <Icon />}
                    </div>

                    <p className="mt-4 text-sm font-semibold leading-snug text-secondary">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={data.button_primary_link}
                className="group inline-flex items-center gap-3 rounded-lg bg-primary px-7 py-4 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(56,182,255,0.28)] transition hover:bg-secondary hover:shadow-[0_18px_40px_rgba(15,23,42,0.18)]"
              >
                {data.button_primary_text}
                <FiArrowRight className="text-base transition group-hover:translate-x-1" />
              </Link>

              <Link
                href={data.button_secondary_link}
                className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-7 py-4 text-sm font-semibold text-secondary transition hover:border-secondary hover:bg-secondary hover:text-white"
              >
                {data.button_secondary_text}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-secondary p-3 shadow-[0_30px_90px_rgba(15,23,42,0.14)]">
              <div className="relative h-[420px] md:h-[560px] overflow-hidden rounded-xl">
                <Image
                  src={data.image}
                  alt="Audit Firm Dubai"
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-secondary/75 via-transparent to-transparent" />
              </div>

              <div className="absolute bottom-8 left-8 right-8 rounded-xl border border-white/15 bg-white/10 p-5 text-white backdrop-blur-md">
                <p className="text-sm text-white/65">{data.stats_title}</p>

                <p className="mt-2 text-3xl md:text-4xl font-bold text-primary">
                  {data.stats_value}
                </p>

                <p className="mt-1 text-sm text-white/75">
                  {data.stats_subtitle}
                </p>
              </div>
            </div>

            {/* <div className="absolute -right-4 -top-4 hidden h-24 w-24 rounded-2xl border border-primary/20 bg-primary/10 lg:block" /> */}
            {/* <div className="absolute -left-5 bottom-16 hidden h-16 w-16 rounded-xl border border-gray-200 bg-white shadow-lg lg:block" /> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// "use client";

// import { useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   motion,
//   useReducedMotion,
//   useScroll,
//   useTransform,
// } from "framer-motion";
// import SectionBadge from "./SectionBadge";
// import { FiArrowRight } from "react-icons/fi";
// import { FaShieldAlt, FaChartLine, FaBalanceScale } from "react-icons/fa";

// const iconMap = {
//   shield: FaShieldAlt,
//   chart: FaChartLine,
//   balance: FaBalanceScale,
// };

// const containerVariants = {
//   hidden: {},
//   visible: {
//     transition: { staggerChildren: 0.1 },
//   },
// };

// const fadeUp = {
//   hidden: { opacity: 0, y: 28 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
//   },
// };

// export default function AboutUsSection({ data }) {
//   const imageRef = useRef(null);
//   const reduceMotion = useReducedMotion();

//   const { scrollYProgress } = useScroll({
//     target: imageRef,
//     offset: ["start end", "end start"],
//   });

//   const y = useTransform(
//     scrollYProgress,
//     [0, 1],
//     reduceMotion ? ["0%", "0%"] : ["-5%", "5%"],
//   );

//   if (!data) return null;

//   return (
//     <section className="relative overflow-hidden bg-white">
//       <div className="absolute inset-x-0 top-0 h-[45%] bg-[#f6f8fb]" />
//       <div className="absolute inset-x-0 top-0 h-px bg-border_color" />

//       <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
//         <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-20 items-center">
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-80px" }}
//           >
//             <motion.div variants={fadeUp}>
//               <SectionBadge className="mb-6">{data.badge}</SectionBadge>
//             </motion.div>

//             <motion.h2
//               variants={fadeUp}
//               className="max-w-2xl text-4xl md:text-5xl font-bold leading-tight text-secondary"
//             >
//               {data.title}
//               <span className="block text-primary">
//                 {data.highlighted_title}
//               </span>
//             </motion.h2>

//             <motion.div
//               variants={fadeUp}
//               className="mt-6 flex items-center gap-3"
//             >
//               <span className="h-px w-12 bg-primary" />
//               <span className="h-1.5 w-1.5 rounded-full bg-primary" />
//               <span className="h-px w-24 bg-primary/25" />
//             </motion.div>

//             <motion.div
//               variants={fadeUp}
//               className="mt-7 max-w-xl space-y-4 text-base md:text-lg leading-relaxed text-gray-600"
//             >
//               <p>{data.description1}</p>
//               <p>{data.description2}</p>
//             </motion.div>

//             <motion.div
//               variants={fadeUp}
//               className="mt-9 grid sm:grid-cols-3 gap-3"
//             >
//               {data.features?.map((item, i) => {
//                 const Icon = iconMap[item.icon];

//                 return (
//                   <div
//                     key={i}
//                     className="group rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-primary/40 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
//                   >
//                     <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
//                       {Icon && <Icon />}
//                     </div>

//                     <p className="mt-4 text-sm font-semibold leading-snug text-secondary">
//                       {item.text}
//                     </p>
//                   </div>
//                 );
//               })}
//             </motion.div>

//             <motion.div
//               variants={fadeUp}
//               className="mt-10 flex flex-wrap gap-4"
//             >
//               <Link
//                 href={data.button_primary_link}
//                 className="group inline-flex items-center gap-3 rounded-lg bg-primary px-7 py-4 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(56,182,255,0.28)] transition hover:bg-secondary hover:shadow-[0_18px_40px_rgba(15,23,42,0.18)]"
//               >
//                 {data.button_primary_text}
//                 <FiArrowRight className="text-base transition group-hover:translate-x-1" />
//               </Link>

//               <Link
//                 href={data.button_secondary_link}
//                 className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-7 py-4 text-sm font-semibold text-secondary transition hover:border-secondary hover:bg-secondary hover:text-white"
//               >
//                 {data.button_secondary_text}
//               </Link>
//             </motion.div>
//           </motion.div>

//           <motion.div
//             ref={imageRef}
//             initial={{ opacity: 0, y: 32 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.65, delay: 0.08 }}
//             className="relative"
//           >
//             <div className="absolute -right-5 -top-5 h-full w-full rounded-[2rem] border border-primary/25" />

//             <div className="relative z-10 h-[430px] overflow-hidden rounded-[1.75rem] border border-gray-200 bg-secondary shadow-[0_30px_90px_rgba(15,23,42,0.16)] md:h-[580px]">
//               <motion.div style={{ y }} className="absolute inset-0 scale-110">
//                 <Image
//                   src={data.image}
//                   alt="MAH Audit Dubai"
//                   fill
//                   className="object-cover"
//                   priority
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-secondary/10 to-transparent" />
//               </motion.div>

//               <div className="absolute left-6 top-6 rounded-lg border border-white/15 bg-secondary/70 px-4 py-2.5 text-xs font-semibold uppercase text-white backdrop-blur-md">
//                 Dubai, UAE
//               </div>
//             </div>

//             <motion.div
//               initial={{ opacity: 0, y: 24, x: -16 }}
//               whileInView={{ opacity: 1, y: 0, x: 0 }}
//               transition={{
//                 delay: 0.35,
//                 duration: 0.65,
//                 ease: [0.22, 1, 0.36, 1],
//               }}
//               viewport={{ once: true }}
//               className="absolute -bottom-8 left-4 z-20 rounded-2xl border border-gray-200 bg-white px-7 py-6 shadow-[0_22px_60px_rgba(15,23,42,0.14)] md:-left-8"
//             >
//               <p className="text-xs font-semibold uppercase text-gray-500">
//                 {data.stats_title}
//               </p>

//               <p className="mt-2 text-4xl font-bold leading-none text-primary">
//                 {data.stats_value}
//               </p>

//               <p className="mt-2 text-sm text-gray-600">
//                 {data.stats_subtitle}
//               </p>

//               <div className="mt-4 h-px w-20 bg-gradient-to-r from-primary to-primary/10" />
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               transition={{
//                 delay: 0.5,
//                 duration: 0.55,
//                 ease: [0.22, 1, 0.36, 1],
//               }}
//               viewport={{ once: true }}
//               className="absolute -left-5 -top-5 z-20 flex h-16 w-16 flex-col items-center justify-center rounded-2xl bg-primary text-white shadow-[0_16px_40px_rgba(56,182,255,0.35)]"
//             >
//               <FaShieldAlt className="mb-1 text-lg" />
//               <span className="text-[9px] font-bold uppercase">Audit</span>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

// "use client";

// import { useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   motion,
//   useReducedMotion,
//   useScroll,
//   useTransform,
// } from "framer-motion";
// import SectionBadge from "./SectionBadge";
// import { FiArrowRight } from "react-icons/fi";
// import { FaShieldAlt, FaChartLine, FaBalanceScale } from "react-icons/fa";

// const iconMap = {
//   shield: FaShieldAlt,
//   chart: FaChartLine,
//   balance: FaBalanceScale,
// };

// const fadeUp = {
//   hidden: { opacity: 0, y: 28 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
//   },
// };

// const stagger = {
//   hidden: {},
//   visible: {
//     transition: { staggerChildren: 0.1 },
//   },
// };

// export default function AboutUsSection({ data }) {
//   const imageRef = useRef(null);
//   const reduceMotion = useReducedMotion();

//   const { scrollYProgress } = useScroll({
//     target: imageRef,
//     offset: ["start end", "end start"],
//   });

//   const imageY = useTransform(
//     scrollYProgress,
//     [0, 1],
//     reduceMotion ? ["0%", "0%"] : ["-6%", "6%"],
//   );

//   const cardY = useTransform(
//     scrollYProgress,
//     [0, 1],
//     reduceMotion ? ["0px", "0px"] : ["24px", "-24px"],
//   );

//   if (!data) return null;

//   return (
//     <section className="relative overflow-hidden bg-white">
//       <div className="absolute inset-x-0 top-0 h-[48%] bg-[#f6f8fb]" />
//       <div className="absolute inset-x-0 top-0 h-px bg-border_color" />

//       <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
//         <div className="grid lg:grid-cols-[0.92fr_1.08fr] gap-14 lg:gap-20 items-center">
//           <motion.div
//             variants={stagger}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-80px" }}
//           >
//             <motion.div variants={fadeUp}>
//               <SectionBadge className="mb-6">{data.badge}</SectionBadge>
//             </motion.div>

//             <motion.h2
//               variants={fadeUp}
//               className="max-w-2xl text-4xl md:text-5xl font-bold leading-tight text-secondary"
//             >
//               {data.title}
//               <span className="block text-primary">
//                 {data.highlighted_title}
//               </span>
//             </motion.h2>

//             <motion.div
//               variants={fadeUp}
//               className="mt-6 flex items-center gap-3"
//             >
//               <span className="h-px w-14 bg-primary" />
//               <span className="h-1.5 w-1.5 rounded-full bg-primary" />
//               <span className="h-px w-28 bg-primary/25" />
//             </motion.div>

//             <motion.div
//               variants={fadeUp}
//               className="mt-7 max-w-xl space-y-4 text-base md:text-lg leading-relaxed text-gray-600"
//             >
//               <p>{data.description1}</p>
//               <p>{data.description2}</p>
//             </motion.div>

//             <motion.div variants={fadeUp} className="mt-9 space-y-3">
//               {data.features?.map((item, i) => {
//                 const Icon = iconMap[item.icon];

//                 return (
//                   <motion.div
//                     key={i}
//                     variants={fadeUp}
//                     whileHover={{ x: 6 }}
//                     className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-primary/40 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
//                   >
//                     <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
//                       {Icon && <Icon />}
//                     </div>

//                     <div className="min-w-0">
//                       <p className="text-xs font-bold uppercase tracking-wide text-primary">
//                         {String(i + 1).padStart(2, "0")}
//                       </p>
//                       <p className="mt-1 font-semibold leading-snug text-secondary">
//                         {item.text}
//                       </p>
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </motion.div>

//             <motion.div
//               variants={fadeUp}
//               className="mt-10 flex flex-wrap gap-4"
//             >
//               <Link
//                 href={data.button_primary_link}
//                 className="group inline-flex items-center gap-3 rounded-lg bg-primary px-7 py-4 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(56,182,255,0.28)] transition hover:bg-secondary hover:shadow-[0_18px_40px_rgba(15,23,42,0.18)]"
//               >
//                 {data.button_primary_text}
//                 <FiArrowRight className="text-base transition group-hover:translate-x-1" />
//               </Link>

//               <Link
//                 href={data.button_secondary_link}
//                 className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-7 py-4 text-sm font-semibold text-secondary transition hover:border-secondary hover:bg-secondary hover:text-white"
//               >
//                 {data.button_secondary_text}
//               </Link>
//             </motion.div>
//           </motion.div>

//           <motion.div
//             ref={imageRef}
//             initial={{ opacity: 0, y: 34 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
//             className="relative"
//           >
//             <div className="absolute -right-5 -top-5 h-full w-full rounded-[2rem] border border-primary/25" />

//             <div className="relative z-10 overflow-hidden rounded-[1.75rem] border border-gray-200 bg-secondary p-3 shadow-[0_32px_100px_rgba(15,23,42,0.18)]">
//               <div className="relative h-[430px] overflow-hidden rounded-[1.25rem] md:h-[590px]">
//                 <motion.div
//                   style={{ y: imageY }}
//                   className="absolute inset-0 scale-110"
//                 >
//                   <Image
//                     src={data.image}
//                     alt="MAH Audit Dubai"
//                     fill
//                     className="object-cover"
//                     priority
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/20 to-transparent" />
//                 </motion.div>

//                 <div className="absolute left-6 top-6 rounded-lg border border-white/15 bg-secondary/75 px-4 py-2.5 text-xs font-semibold uppercase text-white backdrop-blur-md">
//                   Dubai, UAE
//                 </div>

//                 <motion.div
//                   style={{ y: cardY }}
//                   className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/15 bg-white/10 p-5 text-white backdrop-blur-md"
//                 >
//                   <div className="flex items-end justify-between gap-6">
//                     <div>
//                       <p className="text-xs font-semibold uppercase tracking-wide text-white/60">
//                         {data.stats_title}
//                       </p>
//                       <p className="mt-2 text-4xl font-bold leading-none text-primary">
//                         {data.stats_value}
//                       </p>
//                       <p className="mt-2 text-sm text-white/75">
//                         {data.stats_subtitle}
//                       </p>
//                     </div>

//                     <div className="hidden sm:block h-16 w-px bg-white/15" />

//                     <div className="hidden sm:block max-w-[150px] text-right text-sm text-white/65">
//                       Independent guidance for audit, compliance, and business
//                       clarity.
//                     </div>
//                   </div>
//                 </motion.div>
//               </div>
//             </div>

//             <motion.div
//               initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
//               whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
//               transition={{
//                 delay: 0.35,
//                 duration: 0.6,
//                 ease: [0.22, 1, 0.36, 1],
//               }}
//               viewport={{ once: true }}
//               className="absolute -left-5 -top-5 z-20 flex h-16 w-16 flex-col items-center justify-center rounded-2xl bg-primary text-white shadow-[0_16px_40px_rgba(56,182,255,0.35)]"
//             >
//               <FaShieldAlt className="mb-1 text-lg" />
//               <span className="text-[9px] font-bold uppercase">Audit</span>
//             </motion.div>

//             <div className="absolute -bottom-5 right-8 z-20 hidden rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-[0_18px_45px_rgba(15,23,42,0.12)] md:block">
//               <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
//                 Assurance
//               </p>
//               <p className="mt-1 text-sm font-semibold text-secondary">
//                 Compliance-ready reporting
//               </p>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }
