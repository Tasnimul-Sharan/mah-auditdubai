"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionBadge from "./SectionBadge";
import { FiArrowRight, FiArrowRightCircle } from "react-icons/fi";
import { FaShieldAlt, FaChartLine, FaBalanceScale } from "react-icons/fa";

const iconMap = {
  shield: FaShieldAlt,
  chart: FaChartLine,
  balance: FaBalanceScale,
};

export default function AboutUsSection({ data }) {
  if (!data) return null;

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-primary/10 blur-3xl rounded-full" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-secondary/10 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 py-28 grid lg:grid-cols-2 gap-20 items-center">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <SectionBadge className="mb-6">{data.badge}</SectionBadge>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-secondary">
            {data.title}
            <span className="block text-primary">{data.highlighted_title}</span>
          </h2>

          <p className="text-gray-600 text-lg mb-6 max-w-xl">
            {data.description1}
          </p>

          <p className="text-gray-600 text-lg mb-10 max-w-xl">
            {data.description2}
          </p>

          {/* FEATURES */}
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {data.features?.map((item, i) => {
              const Icon = iconMap[item.icon];
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    {Icon && <Icon className="text-primary" />}
                  </div>
                  <span className="text-soft_black font-medium">
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-5">
            {/* <Link href={data.button_primary_link}>
              <button className="bg-primary text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition">
                {data.button_primary_text}
                <FiArrowRightCircle />
              </button>
            </Link> */}

            <Link href={data.button_primary_link}>
              <button className="group relative inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-xl text-sm font-semibold tracking-wide overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_-8px_rgba(26,26,26,0.4)]">
                <span className="absolute inset-0 bg-secondary translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                <span className="relative z-10">
                  {data.button_primary_text}
                </span>
                <FiArrowRight className="relative z-10 text-base group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            <Link href={data.button_secondary_link}>
              <button className="border border-border_color text-secondary px-8 py-4 rounded-xl font-semibold hover:bg-secondary hover:text-white transition-all transform duration-500">
                {data.button_secondary_text}
              </button>
            </Link>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="relative h-[550px] rounded-[30px] overflow-hidden shadow-xl border border-border_color">
            <Image
              src={data.image}
              alt="Audit Firm Dubai"
              fill
              className="object-cover"
            />
          </div>

          {/* STATS */}
          <div className="absolute -bottom-10 left-10 bg-white border px-8 py-6 rounded-2xl shadow-xl">
            <p className="text-sm text-gray-500 mb-1">{data.stats_title}</p>

            <p className="text-3xl font-bold text-primary">
              {data.stats_value}
            </p>

            <p className="text-gray-600 text-sm">{data.stats_subtitle}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";
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
//   visible: { transition: { staggerChildren: 0.12 } },
// };

// const fadeUp = {
//   hidden: { opacity: 0, y: 32 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
// };

// const fadeIn = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { duration: 0.9, ease: "easeOut" } },
// };

// export default function AboutUsSection({ data }) {
//   if (!data) return null;
//   const imageRef = useRef(null);
//   const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start end", "end start"] });
//   const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

//   return (
//     <section className="relative bg-[#F9F7F4] overflow-hidden font-[var(--font-body)]">
//       {/* ── Decorative rule lines ── */}
//       <div className="pointer-events-none absolute inset-0">
//         <div className="absolute top-0 left-0 w-px h-full bg-[#D4C9B8]/60" />
//         <div className="absolute top-0 right-0 w-px h-full bg-[#D4C9B8]/60" />
//         <div className="absolute top-0 left-[50%] w-px h-32 bg-[#C6A96A]/40" />
//       </div>

//       {/* ── Gold accent corner ── */}
//       <div className="pointer-events-none absolute top-0 left-0 w-36 h-36">
//         <svg viewBox="0 0 144 144" fill="none" xmlns="http://www.w3.org/2000/svg">
//           <path d="M0 0 L144 0 L0 144 Z" fill="#C6A96A" fillOpacity="0.08" />
//           <path d="M0 0 L60 0 L0 60 Z" fill="#C6A96A" fillOpacity="0.18" />
//         </svg>
//       </div>

//       <div className="relative max-w-[1340px] mx-auto px-6 lg:px-16 py-32 grid lg:grid-cols-[1fr_1.1fr] gap-20 items-center">

//         {/* ────── LEFT COLUMN ────── */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-80px" }}
//         >
//           {/* Badge */}
//           <motion.div variants={fadeUp} className="mb-8">
//             <SectionBadge className="inline-flex items-center gap-2 text-[#C6A96A] border-[#C6A96A]/30 bg-[#C6A96A]/08 text-xs tracking-[0.18em] uppercase font-semibold px-4 py-2 rounded-full border">
//               {data.badge}
//             </SectionBadge>
//           </motion.div>

//           {/* Headline */}
//           <motion.h2
//             variants={fadeUp}
//             className="font-[var(--font-display)] text-[2.6rem] md:text-[3.4rem] leading-[1.08] tracking-[-0.02em] text-[#1A1A1A] mb-6"
//           >
//             {data.title}
//             <span className="block text-[#C6A96A] mt-1">{data.highlighted_title}</span>
//           </motion.h2>

//           {/* Gold divider */}
//           <motion.div
//             variants={fadeUp}
//             className="flex items-center gap-3 mb-8"
//           >
//             <span className="h-px w-10 bg-[#C6A96A]" />
//             <span className="h-1 w-1 rounded-full bg-[#C6A96A]" />
//             <span className="h-px w-24 bg-[#C6A96A]/30" />
//           </motion.div>

//           <motion.p variants={fadeUp} className="text-[#4A4540] text-[1.05rem] leading-[1.78] mb-5 max-w-lg">
//             {data.description1}
//           </motion.p>
//           <motion.p variants={fadeUp} className="text-[#4A4540] text-[1.05rem] leading-[1.78] mb-12 max-w-lg">
//             {data.description2}
//           </motion.p>

//           {/* Feature pills */}
//           <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-12">
//             {data.features?.map((item, i) => {
//               const Icon = iconMap[item.icon];
//               return (
//                 <div
//                   key={i}
//                   className="group flex items-center gap-3 bg-white border border-[#E0D8CC] rounded-xl px-5 py-3 hover:border-[#C6A96A]/60 hover:shadow-[0_4px_20px_-4px_rgba(198,169,106,0.2)] transition-all duration-300"
//                 >
//                   <div className="w-8 h-8 rounded-lg bg-[#C6A96A]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C6A96A]/20 transition-colors">
//                     {Icon && <Icon className="text-[#C6A96A] text-[14px]" />}
//                   </div>
//                   <span className="text-[#1A1A1A] text-sm font-medium tracking-wide">{item.text}</span>
//                 </div>
//               );
//             })}
//           </motion.div>

//           {/* Buttons */}
//           <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
//             <Link href={data.button_primary_link}>
//               <button className="group relative inline-flex items-center gap-3 bg-[#1A1A1A] text-[#F9F7F4] px-8 py-4 rounded-xl text-sm font-semibold tracking-wide overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_-8px_rgba(26,26,26,0.4)]">
//                 <span className="absolute inset-0 bg-[#C6A96A] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
//                 <span className="relative z-10">{data.button_primary_text}</span>
//                 <FiArrowRight className="relative z-10 text-base group-hover:translate-x-1 transition-transform" />
//               </button>
//             </Link>

//             <Link href={data.button_secondary_link}>
//               <button className="inline-flex items-center gap-2 border border-[#1A1A1A]/20 text-[#1A1A1A] px-8 py-4 rounded-xl text-sm font-semibold tracking-wide hover:border-[#C6A96A] hover:text-[#C6A96A] transition-all duration-300">
//                 {data.button_secondary_text}
//               </button>
//             </Link>
//           </motion.div>
//         </motion.div>

//         {/* ────── RIGHT COLUMN ────── */}
//         <motion.div
//           variants={fadeIn}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="relative"
//           ref={imageRef}
//         >
//           {/* Floating gold frame behind */}
//           <div className="absolute -top-5 -right-5 w-full h-full rounded-[2rem] border border-[#C6A96A]/30 -z-0" />

//           {/* Main image */}
//           <div className="relative h-[580px] rounded-[1.75rem] overflow-hidden z-10 border border-[#E0D8CC]">
//             <motion.div style={{ y }} className="absolute inset-0 scale-110">
//               <Image
//                 src={data.image}
//                 alt="MAH Audit Dubai"
//                 fill
//                 className="object-cover"
//                 priority
//               />
//               {/* Overlay gradient */}
//               <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/50 via-transparent to-transparent" />
//             </motion.div>

//             {/* Year established badge */}
//             <div className="absolute top-6 left-6 bg-[#1A1A1A]/70 backdrop-blur-md border border-white/10 text-white text-xs tracking-[0.16em] uppercase px-4 py-2.5 rounded-lg">
//               Est. 2005 · Dubai, UAE
//             </div>
//           </div>

//           {/* Stats card */}
//           <motion.div
//             initial={{ opacity: 0, y: 24, x: -16 }}
//             whileInView={{ opacity: 1, y: 0, x: 0 }}
//             transition={{ delay: 0.45, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//             viewport={{ once: true }}
//             className="absolute -bottom-8 -left-8 bg-white border border-[#E0D8CC] rounded-2xl px-8 py-6 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.12)] z-20"
//           >
//             <p className="text-[11px] text-[#9A9187] tracking-[0.14em] uppercase mb-1.5">{data.stats_title}</p>
//             <p className="text-[2.4rem] font-[var(--font-display)] font-bold text-[#C6A96A] leading-none mb-1">
//               {data.stats_value}
//             </p>
//             <p className="text-[#4A4540] text-sm">{data.stats_subtitle}</p>

//             {/* Mini gold bar */}
//             <div className="mt-3 h-px bg-gradient-to-r from-[#C6A96A] to-[#C6A96A]/10 w-16" />
//           </motion.div>

//           {/* Floating trust badge */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.88 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//             viewport={{ once: true }}
//             className="absolute -top-6 -left-6 bg-[#C6A96A] text-white rounded-2xl w-16 h-16 flex flex-col items-center justify-center shadow-lg z-20"
//           >
//             <FaShieldAlt className="text-xl mb-0.5" />
//             <span className="text-[9px] tracking-widest uppercase font-semibold">Certified</span>
//           </motion.div>
//         </motion.div>
//       </div>

//       {/* ── Bottom marquee strip ── */}
//       <div className="border-t border-[#D4C9B8]/60 overflow-hidden py-5 bg-white/60">
//         <motion.div
//           animate={{ x: ["0%", "-50%"] }}
//           transition={{ duration: 28, ease: "linear", repeat: Infinity }}
//           className="flex gap-12 whitespace-nowrap text-[11px] tracking-[0.2em] text-[#9A9187] uppercase"
//         >
//           {[
//             "Audit & Assurance",
//             "Tax Advisory",
//             "VAT Compliance",
//             "Corporate Finance",
//             "Risk Management",
//             "Due Diligence",
//             "Forensic Accounting",
//             "IFRS Reporting",
//             "Audit & Assurance",
//             "Tax Advisory",
//             "VAT Compliance",
//             "Corporate Finance",
//             "Risk Management",
//             "Due Diligence",
//             "Forensic Accounting",
//             "IFRS Reporting",
//           ].map((s, i) => (
//             <span key={i} className="flex items-center gap-12">
//               {s}
//               <span className="inline-block w-1 h-1 rounded-full bg-[#C6A96A]" />
//             </span>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }
