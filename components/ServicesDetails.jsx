// "use client";
// import { FaCheckCircle } from "react-icons/fa";

// export default function ServicesDetails({ service }) {
//   const { hero, sections, footerNote } = service;

//   return (
//     <section className="bg-gray-50 py-16 md:py-24">
//       <div className="max-w-5xl mx-auto px-6 space-y-12">
//         {/* HERO */}
//         <div className="space-y-4">
//           <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
//             {hero.title}
//           </h1>

//           <p className="text-lg text-gray-600 leading-relaxed">
//             {hero.description1}
//           </p>

//           <p className="text-gray-600 leading-relaxed">{hero.description2}</p>
//         </div>

//         {/* SECTIONS */}
//         {sections.map((section, idx) => (
//           <div key={idx} className="space-y-6">
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-l-4 border-primary pl-4">
//               {section.title}
//             </h2>

//             <p className="text-gray-600 leading-relaxed">
//               {section.description}
//             </p>

//             <div>
//               {section.items.map((item, i) => (
//                 <div
//                   key={i}
//                   className="flex items-start gap-3 p-3 transition hover:bg-white hover:rounded-lg"
//                 >
//                   <FaCheckCircle className="text-primary mt-1" />
//                   <span className="text-gray-700">{item}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}

//         {/* FOOTER NOTE */}
//         <div className="bg-white p-6 rounded-xl border text-gray-600 text-sm">
//           {footerNote}
//         </div>

//         {/* PREMIUM CTA */}
//         <div className="relative overflow-hidden rounded-3xl p-[1px] bg-gradient-to-r from-primary via-primary_light to-secondary shadow-2xl">
//           <div className="absolute inset-0 opacity-30 blur-2xl bg-gradient-to-r from-primary via-primary_light to-secondary"></div>

//           <div className="relative bg-gradient-to-br from-secondary to-secondary_two text-white p-8 md:p-12 rounded-3xl flex flex-col gap-8">
//             {/* TEXT */}
//             <div className="max-w-xl space-y-4">
//               <h2 className="text-2xl md:text-3xl font-bold leading-snug">
//                 Request a{" "}
//                 <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
//                   Consultation
//                 </span>{" "}
//                 in Dubai
//               </h2>

//               <p className="text-white/80 leading-relaxed">
//                 Our specialists help uncover financial irregularities, trace
//                 transactions, and deliver confidential insights that protect
//                 your business.
//               </p>

//               <div className="flex flex-wrap gap-4 text-sm text-white/70">
//                 <span>✔ Confidential</span>
//                 <span>✔ Expert Auditors</span>
//                 <span>✔ Fast Response</span>
//               </div>
//             </div>

//             {/* CTA BOTTOM LEFT */}
//             <div className="flex flex-col items-start gap-2">
//               <button className="px-7 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-primary to-pink-500 hover:scale-105 transition-all duration-300 shadow-lg">
//                 Get Free Consultation
//               </button>

//               <p className="text-xs text-white/50">
//                 No obligation • 100% confidential
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// import Link from "next/link";
// import {
//   FaArrowRight,
//   FaBalanceScale,
//   FaCheckCircle,
//   FaFileSignature,
//   FaPhoneAlt,
//   FaShieldAlt,
// } from "react-icons/fa";

// const highlights = [
//   { icon: FaShieldAlt, title: "UAE Compliant", text: "IFRS-ready reporting" },
//   { icon: FaBalanceScale, title: "Risk Focused", text: "Clear audit controls" },
//   {
//     icon: FaFileSignature,
//     title: "Board Ready",
//     text: "Professional findings",
//   },
// ];

// export default function ServicesDetails({ service }) {
//   const { hero, sections = [], footerNote } = service;

//   return (
//     <section className="bg-gray-50 text-gray-900">
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-6xl mx-auto px-6 py-14 md:py-20 grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
//           <div className="space-y-6">
//             <span className="inline-flex w-fit rounded-lg bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
//               Dubai Audit & Assurance
//             </span>

//             <div className="space-y-4">
//               <h1 className="text-3xl md:text-5xl font-bold leading-tight text-gray-950">
//                 {hero.title}
//               </h1>
//               <p className="text-lg leading-relaxed text-gray-600">
//                 {hero.description1}
//               </p>
//               {hero.description2 && (
//                 <p className="leading-relaxed text-gray-600">
//                   {hero.description2}
//                 </p>
//               )}
//             </div>

//             <div className="grid sm:grid-cols-3 gap-3">
//               {highlights.map((item) => {
//                 const Icon = item.icon;

//                 return (
//                   <div
//                     key={item.title}
//                     className="rounded-lg border border-gray-200 bg-gray-50 p-4"
//                   >
//                     <Icon className="mb-3 text-xl text-primary" />
//                     <h3 className="font-semibold text-gray-950">
//                       {item.title}
//                     </h3>
//                     <p className="mt-1 text-sm text-gray-500">{item.text}</p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           <aside className="rounded-lg bg-secondary p-6 md:p-8 text-white shadow-xl">
//             <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
//               Engagement Focus
//             </p>

//             <div className="mt-6 space-y-5">
//               {[
//                 "Financial clarity",
//                 "Regulatory confidence",
//                 "Confidential reporting",
//               ].map((item) => (
//                 <div key={item} className="flex items-center gap-3">
//                   <FaCheckCircle className="text-primary" />
//                   <span className="font-medium">{item}</span>
//                 </div>
//               ))}
//             </div>

//             <Link
//               href="/contact"
//               className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary/90"
//             >
//               Get Consultation <FaArrowRight />
//             </Link>
//           </aside>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto px-6 py-14 md:py-20 grid lg:grid-cols-[260px_1fr] gap-10">
//         <aside className="lg:sticky lg:top-24 h-fit rounded-lg border border-gray-200 bg-white p-5">
//           <p className="font-semibold text-gray-950">Service Coverage</p>
//           <div className="mt-4 space-y-3">
//             {sections.map((section, index) => (
//               <div
//                 key={section.title}
//                 className="flex gap-3 text-sm text-gray-600"
//               >
//                 <span className="font-bold text-primary">
//                   {String(index + 1).padStart(2, "0")}
//                 </span>
//                 <span>{section.title}</span>
//               </div>
//             ))}
//           </div>
//         </aside>

//         <div className="space-y-6">
//           {sections.map((section) => (
//             <article
//               key={section.title}
//               className="rounded-lg border border-gray-200 bg-white p-6 md:p-8 shadow-sm"
//             >
//               <h2 className="text-2xl md:text-3xl font-bold text-gray-950">
//                 {section.title}
//               </h2>

//               <p className="mt-4 leading-relaxed text-gray-600">
//                 {section.description}
//               </p>

//               <div className="mt-6 grid sm:grid-cols-2 gap-3">
//                 {section.items.map((item) => (
//                   <div
//                     key={item}
//                     className="flex items-start gap-3 rounded-lg bg-gray-50 p-4"
//                   >
//                     <FaCheckCircle className="mt-1 shrink-0 text-primary" />
//                     <span className="text-gray-700">{item}</span>
//                   </div>
//                 ))}
//               </div>
//             </article>
//           ))}
//         </div>
//       </div>

//       {footerNote && (
//         <div className="max-w-6xl mx-auto px-6 pb-14">
//           <div className="rounded-lg border-l-4 border-primary bg-white p-6 text-gray-600 shadow-sm">
//             {footerNote}
//           </div>
//         </div>
//       )}

//       <div className="bg-secondary">
//         <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8 text-white">
//           <div className="max-w-2xl">
//             <p className="text-sm font-semibold uppercase tracking-wide text-primary">
//               Speak with MAH Audit Dubai
//             </p>
//             <h2 className="mt-3 text-2xl md:text-4xl font-bold">
//               Need a reliable audit partner in Dubai?
//             </h2>
//             <p className="mt-4 text-white/75">
//               Get confidential guidance from experienced auditors for
//               compliance, risk review, and financial reporting.
//             </p>
//           </div>

//           <Link
//             href="/contact"
//             className="inline-flex w-fit items-center gap-3 rounded-lg bg-primary px-6 py-4 font-semibold text-white transition hover:bg-primary/90"
//           >
//             <FaPhoneAlt /> Request Free Consultation
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

// "use client";

// import Link from "next/link";
// import {
//   FaArrowRight,
//   FaBalanceScale,
//   FaCheckCircle,
//   FaClipboardCheck,
//   FaFileSignature,
//   FaPhoneAlt,
//   FaShieldAlt,
// } from "react-icons/fa";

// export default function ServicesDetails({ service }) {
//   const { hero = {}, sections = [], footerNote, cta = {} } = service || {};

//   const totalItems = sections.reduce(
//     (total, section) => total + (section.items?.length || 0),
//     0,
//   );

//   return (
//     <section className="bg-[#f6f8fb] text-gray-900">
//       <div className="max-w-7xl mx-auto px-6 py-14 md:py-20">
//         <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-stretch">
//           <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm">
//             <div className="flex items-center gap-3 text-primary font-semibold text-sm">
//               <span className="h-px w-10 bg-primary" />
//               Dubai Audit & Advisory
//             </div>

//             <h2 className="mt-5 text-3xl md:text-5xl font-bold leading-tight text-gray-950">
//               {hero.title}
//             </h2>

//             <p className="mt-5 text-lg leading-relaxed text-gray-600">
//               {hero.description1}
//             </p>

//             {hero.description2 && (
//               <p className="mt-4 leading-relaxed text-gray-600">
//                 {hero.description2}
//               </p>
//             )}

//             {/* <div className="mt-8 grid sm:grid-cols-3 gap-3">
//               <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
//                 <FaShieldAlt className="text-primary text-xl" />
//                 <h3 className="mt-3 font-bold">Confidential</h3>
//                 <p className="mt-1 text-sm text-gray-500">
//                   Secure audit process
//                 </p>
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
//                 <FaBalanceScale className="text-primary text-xl" />
//                 <h3 className="mt-3 font-bold">Compliant</h3>
//                 <p className="mt-1 text-sm text-gray-500">
//                   UAE focused guidance
//                 </p>
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
//                 <FaFileSignature className="text-primary text-xl" />
//                 <h3 className="mt-3 font-bold">Clear Reports</h3>
//                 <p className="mt-1 text-sm text-gray-500">Practical findings</p>
//               </div>
//             </div> */}
//           </div>

//           <div className="rounded-lg overflow-hidden bg-secondary text-white shadow-xl">
//             <div className="p-6 md:p-8 border-b border-white/10">
//               <p className="text-sm font-semibold uppercase tracking-wide text-primary">
//                 Service Snapshot
//               </p>

//               <div className="mt-8 grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-4xl font-bold">{sections.length}</p>
//                   <p className="mt-1 text-sm text-white/60">Core areas</p>
//                 </div>

//                 <div>
//                   <p className="text-4xl font-bold">{totalItems}</p>
//                   <p className="mt-1 text-sm text-white/60">Audit points</p>
//                 </div>
//               </div>
//             </div>

//             <div className="p-6 md:p-8 space-y-4">
//               {sections.slice(0, 3).map((section, index) => (
//                 <div key={section.title} className="flex gap-4">
//                   <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-primary font-bold">
//                     {index + 1}
//                   </span>
//                   <div>
//                     <h3 className="font-semibold">{section.title}</h3>
//                     <p className="mt-1 text-sm text-white/60 line-clamp-2">
//                       {section.description}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="mt-10 grid lg:grid-cols-[280px_1fr] gap-8">
//           <aside className="lg:sticky lg:top-24 h-fit bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
//             <p className="font-bold text-gray-950">Audit Coverage</p>

//             <div className="mt-5 space-y-3">
//               {sections.map((section, index) => (
//                 <a
//                   key={section.title}
//                   href={`#section-${index}`}
//                   className="flex gap-3 rounded-lg p-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary transition"
//                 >
//                   <span className="font-bold text-primary">
//                     {String(index + 1).padStart(2, "0")}
//                   </span>
//                   <span>{section.title}</span>
//                 </a>
//               ))}
//             </div>
//           </aside>

//           <div className="space-y-6">
//             {sections.map((section, index) => (
//               <article
//                 id={`section-${index}`}
//                 key={section.title}
//                 className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm"
//               >
//                 <div className="flex items-start gap-4">
//                   <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
//                     <FaClipboardCheck size={22} />
//                   </div>

//                   <div>
//                     <h2 className="text-2xl md:text-3xl font-bold text-gray-950">
//                       {section.title}
//                     </h2>
//                     <p className="mt-3 leading-relaxed text-gray-600">
//                       {section.description}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-7 grid sm:grid-cols-2 gap-3">
//                   {section.items?.map((item) => (
//                     <div
//                       key={item}
//                       className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4"
//                     >
//                       <FaCheckCircle className="mt-1 shrink-0 text-primary" />
//                       <span className="text-gray-700">{item}</span>
//                     </div>
//                   ))}
//                 </div>
//               </article>
//             ))}
//           </div>
//         </div>

//         {footerNote && (
//           <div className="mt-10 rounded-lg border-l-4 border-primary bg-white p-6 text-gray-600 shadow-sm">
//             {footerNote}
//           </div>
//         )}
//       </div>

//       <div className="bg-secondary">
//         <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8 text-white">
//           <div className="max-w-2xl">
//             <p className="text-sm font-semibold uppercase tracking-wide text-primary">
//               Speak with MAH Audit Dubai
//             </p>

//             <h2 className="mt-3 text-2xl md:text-4xl font-bold">
//               {cta.title || "Need a reliable audit partner in Dubai?"}
//             </h2>

//             <p className="mt-4 text-white/75">
//               {cta.description ||
//                 "Get confidential guidance from experienced auditors for compliance, risk review, and financial reporting."}
//             </p>
//           </div>

//           <Link
//             href="/contact"
//             className="inline-flex w-fit items-center gap-3 rounded-lg bg-primary px-6 py-4 font-semibold text-white transition hover:bg-primary/90"
//           >
//             <FaPhoneAlt />
//             {cta.buttonText || "Request Consultation"}
//             <FaArrowRight size={14} />
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import {
//   FaArrowRight,
//   FaBalanceScale,
//   FaCheckCircle,
//   FaClipboardCheck,
//   FaFileSignature,
//   FaPhoneAlt,
//   FaShieldAlt,
// } from "react-icons/fa";

// const trustItems = [
//   { icon: FaShieldAlt, label: "Confidential Review" },
//   { icon: FaBalanceScale, label: "UAE Compliance Focus" },
//   { icon: FaFileSignature, label: "Clear Audit Reporting" },
// ];

// export default function ServicesDetails({ service }) {
//   const { hero = {}, sections = [], footerNote, cta = {} } = service || {};

//   const totalItems = sections.reduce(
//     (total, section) => total + (section.items?.length || 0),
//     0,
//   );

//   return (
//     <section className="bg-primary/5 text-gray-900">
//       {service?.image && (
//         <div className="max-w-7xl mx-auto px-4 pt-8 md:pt-12">
//           <div className="relative h-[300px] w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm md:h-[600px]">
//             <Image
//               src={service.image}
//               alt={service.hero?.title || service.title || "Service image"}
//               fill
//               priority
//               sizes="(max-width: 768px) 100vw, 1280px"
//               className="object-cover"
//             />
//           </div>
//         </div>
//       )}

//       <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
//         <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-8 items-stretch">
//           <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 md:p-10 shadow-sm">
//             <div className="absolute right-0 top-0 h-32 w-32 bg-primary/10 blur-3xl" />

//             <div className="relative">
//               <div className="flex items-center gap-3 text-primary font-semibold text-sm">
//                 <span className="h-px w-10 bg-primary" />
//                 Dubai Audit & Advisory
//               </div>

//               <h2 className="mt-5 text-3xl md:text-5xl font-bold leading-tight text-gray-950">
//                 {hero.title}
//               </h2>

//               <p className="mt-5 text-lg leading-relaxed text-gray-600">
//                 {hero.description1}
//               </p>

//               {hero.description2 && (
//                 <p className="mt-4 leading-relaxed text-gray-600">
//                   {hero.description2}
//                 </p>
//               )}

//               <div className="mt-8 grid sm:grid-cols-3 gap-3">
//                 {trustItems.map((item) => {
//                   const Icon = item.icon;

//                   return (
//                     <div
//                       key={item.label}
//                       className="rounded-lg border border-gray-200 bg-[#f8fafc] p-4"
//                     >
//                       <Icon className="text-xl text-primary" />
//                       <p className="mt-3 text-sm font-semibold text-gray-800">
//                         {item.label}
//                       </p>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           <aside className="rounded-lg overflow-hidden bg-secondary text-white shadow-xl">
//             <div className="p-6 md:p-8 border-b border-white/10">
//               <p className="text-sm font-semibold uppercase tracking-wide text-primary">
//                 Service Snapshot
//               </p>

//               <div className="mt-8 grid grid-cols-2 gap-4">
//                 <div className="rounded-lg bg-white/10 p-5">
//                   <p className="text-4xl font-bold">{sections.length}</p>
//                   <p className="mt-1 text-sm text-white/60">Core areas</p>
//                 </div>

//                 <div className="rounded-lg bg-white/10 p-5">
//                   <p className="text-4xl font-bold">{totalItems}</p>
//                   <p className="mt-1 text-sm text-white/60">Audit points</p>
//                 </div>
//               </div>
//             </div>

//             <div className="p-6 md:p-8 space-y-4">
//               {sections.slice(0, 3).map((section, index) => (
//                 <a
//                   key={section.title}
//                   href={`#section-${index}`}
//                   className="group flex gap-4 rounded-lg p-3 transition hover:bg-white/10"
//                 >
//                   <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white font-bold">
//                     {index + 1}
//                   </span>

//                   <div>
//                     <h3 className="font-semibold group-hover:text-primary transition">
//                       {section.title}
//                     </h3>
//                     <p className="mt-1 text-sm text-white/60 line-clamp-2">
//                       {section.description}
//                     </p>
//                   </div>
//                 </a>
//               ))}
//             </div>
//           </aside>
//         </div>

//         <div className="mt-10 grid lg:grid-cols-[290px_1fr] gap-8">
//           <aside className="lg:sticky lg:top-24 h-fit rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
//             <p className="font-bold text-gray-950">Audit Coverage</p>

//             <div className="mt-5 space-y-2">
//               {sections.map((section, index) => (
//                 <a
//                   key={section.title}
//                   href={`#section-${index}`}
//                   className="flex gap-3 rounded-lg p-3 text-sm text-gray-600 transition hover:bg-primary/10 hover:text-primary"
//                 >
//                   <span className="font-bold text-primary">
//                     {String(index + 1).padStart(2, "0")}
//                   </span>
//                   <span>{section.title}</span>
//                 </a>
//               ))}
//             </div>
//           </aside>

//           <div className="space-y-6">
//             {sections.map((section, index) => (
//               <article
//                 id={`section-${index}`}
//                 key={section.title}
//                 className="rounded-lg border border-gray-200 bg-white p-6 md:p-8 shadow-sm"
//               >
//                 <div className="flex flex-col sm:flex-row sm:items-start gap-4">
//                   <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
//                     <FaClipboardCheck size={22} />
//                   </div>

//                   <div>
//                     <p className="text-sm font-semibold text-primary">
//                       Coverage {String(index + 1).padStart(2, "0")}
//                     </p>

//                     <h2 className="mt-2 text-2xl md:text-3xl font-bold text-gray-950">
//                       {section.title}
//                     </h2>

//                     <p className="mt-3 leading-relaxed text-gray-600">
//                       {section.description}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-7 grid sm:grid-cols-2 gap-3">
//                   {section.items?.map((item) => (
//                     <div
//                       key={item}
//                       className="flex items-start gap-3 rounded-lg border border-gray-100 bg-[#f8fafc] p-4 transition hover:border-primary/30 hover:bg-white hover:shadow-sm"
//                     >
//                       <FaCheckCircle className="mt-1 shrink-0 text-primary" />
//                       <span className="text-gray-700">{item}</span>
//                     </div>
//                   ))}
//                 </div>
//               </article>
//             ))}
//           </div>
//         </div>

//         {footerNote && (
//           <div className="mt-10 rounded-lg border border-gray-200 border-l-4 border-l-primary bg-white p-6 text-gray-600 shadow-sm">
//             {footerNote}
//           </div>
//         )}
//       </div>

//       {/* <div className="bg-secondary">
//         <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8 text-white">
//           <div className="max-w-2xl">
//             <p className="text-sm font-semibold uppercase tracking-wide text-primary">
//               Speak with MAH Audit Dubai
//             </p>

//             <h2 className="mt-3 text-2xl md:text-4xl font-bold">
//               {cta.title || "Need a reliable audit partner in Dubai?"}
//             </h2>

//             <p className="mt-4 text-white/75">
//               {cta.description ||
//                 "Get confidential guidance from experienced auditors for compliance, risk review, and financial reporting."}
//             </p>
//           </div>

//           <Link
//             href="/contact"
//             className="inline-flex w-fit items-center gap-3 rounded-lg bg-primary px-6 py-4 font-semibold text-white transition hover:bg-primary/90"
//           >
//             <FaPhoneAlt />
//             {cta.buttonText || "Request Consultation"}
//             <FaArrowRight size={14} />
//           </Link>
//         </div>
//       </div> */}

//       <div className="bg-[#f6f8fb] px-6 pb-14 md:pb-20">
//         <div className="max-w-7xl mx-auto">
//           <div className="overflow-hidden rounded-2xl border border-primary/20 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.10)]">
//             <div className="grid lg:grid-cols-[1fr_auto] items-center gap-8 p-6 md:p-10">
//               <div className="max-w-3xl">
//                 <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-wide text-primary">
//                   <span className="h-px w-10 bg-primary" />
//                   Speak with MAH Audit Dubai
//                 </div>

//                 <h2 className="mt-4 text-2xl md:text-4xl font-bold leading-tight text-secondary">
//                   {cta.title || "Need a reliable audit partner in Dubai?"}
//                 </h2>

//                 <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-gray-600">
//                   {cta.description ||
//                     "Get confidential guidance from experienced auditors for compliance, risk review, and financial reporting."}
//                 </p>

//                 <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium text-gray-600">
//                   <span className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2">
//                     Confidential advisory
//                   </span>
//                   <span className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2">
//                     UAE compliance focused
//                   </span>
//                   <span className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2">
//                     Fast response
//                   </span>
//                 </div>
//               </div>

//               <div className="lg:min-w-[300px] rounded-xl bg-secondary p-5 md:p-6 text-white">
//                 <p className="text-sm text-white/60">Ready to talk?</p>

//                 <Link
//                   href="/contact"
//                   className="mt-4 inline-flex w-full items-center justify-center gap-3 rounded-lg bg-primary px-6 py-4 font-semibold text-white transition hover:bg-primary_light"
//                 >
//                   <FaPhoneAlt />
//                   {cta.buttonText || "Request Consultation"}
//                   <FaArrowRight size={14} />
//                 </Link>

//                 <p className="mt-4 text-center text-xs text-white/50">
//                   No obligation. 100% confidential.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaBalanceScale,
  FaCheckCircle,
  FaClipboardCheck,
  FaFileSignature,
  FaPhoneAlt,
  FaShieldAlt,
} from "react-icons/fa";

const trustItems = [
  { icon: FaShieldAlt, label: "Confidential Review" },
  { icon: FaBalanceScale, label: "UAE Compliance Focus" },
  { icon: FaFileSignature, label: "Clear Audit Reporting" },
];

export default function ServicesDetails({ service }) {
  const { hero = {}, sections = [], footerNote, cta = {} } = service || {};

  const totalItems = sections.reduce(
    (total, section) => total + (section.items?.length || 0),
    0,
  );

  return (
    <section className="bg-[#f6f8fb] text-gray-900">
      {/* Premium Hero Section */}
      <div className="max-w-7xl mx-auto px-4 pt-8 md:pt-12">
        <div className="relative overflow-hidden rounded-[2rem] bg-secondary shadow-[0_30px_100px_rgba(15,23,42,0.18)]">
          {service?.image && (
            <Image
              src={service.image}
              alt={hero.title || service.title || "Service image"}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1280px"
              className="object-cover"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/85 to-secondary/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.14),transparent_28%)]" />

          <div className="relative z-10 grid min-h-[520px] lg:grid-cols-[1.05fr_0.95fr] items-center gap-8 p-6 md:p-10 lg:p-14">
            <div className="max-w-3xl text-white">
              <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.25em] text-primary">
                <span className="h-px w-12 bg-primary" />
                Dubai Audit & Advisory
              </div>

              <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight">
                {hero.title}
              </h1>

              <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-white/75">
                {hero.description1}
              </p>

              {hero.description2 && (
                <p className="mt-4 max-w-2xl leading-relaxed text-white/65">
                  {hero.description2}
                </p>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                {trustItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur"
                    >
                      <Icon className="text-primary" />
                      {item.label}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Snapshot Card */}
            <aside className="rounded-[1.5rem] border border-white/15 bg-white/10 p-5 md:p-6 text-white backdrop-blur-xl shadow-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                Service Snapshot
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                  <p className="text-4xl md:text-5xl font-bold">
                    {sections.length}
                  </p>
                  <p className="mt-2 text-sm text-white/60">Core areas</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                  <p className="text-4xl md:text-5xl font-bold">{totalItems}</p>
                  <p className="mt-2 text-sm text-white/60">Audit points</p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-5">
                <p className="text-sm text-white/60">Best for</p>
                <h3 className="mt-2 text-xl font-bold">
                  Compliance, Risk Review & Financial Reporting
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  A structured advisory process designed for clarity,
                  confidentiality, and UAE-focused compliance standards.
                </p>
              </div>

              <Link
                href="/contact"
                className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-6 py-4 font-semibold text-white transition hover:bg-primary_light"
              >
                <FaPhoneAlt />
                {cta.buttonText || "Request Consultation"}
                <FaArrowRight size={14} />
              </Link>
            </aside>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          {/* Sticky Sidebar */}
          <aside className="lg:sticky lg:top-24 h-fit rounded-[1.5rem] border border-gray-200 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.07)]">
            <div className="rounded-2xl bg-secondary p-5 text-white">
              <p className="text-sm font-bold uppercase tracking-wide text-primary">
                Audit Coverage
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Explore the complete service areas included in this audit and
                advisory coverage.
              </p>
            </div>

            <div className="mt-5 space-y-2">
              {sections.map((section, index) => (
                <a
                  key={section.title}
                  href={`#section-${index}`}
                  className="group flex gap-3 rounded-xl p-3 text-sm text-gray-600 transition hover:bg-primary/10 hover:text-primary"
                >
                  <span className="font-bold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-medium group-hover:text-primary">
                    {section.title}
                  </span>
                </a>
              ))}
            </div>
          </aside>

          {/* Section Details */}
          <div className="space-y-7">
            {sections.map((section, index) => (
              <article
                id={`section-${index}`}
                key={section.title}
                className="group overflow-hidden rounded-[1.5rem] border border-gray-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(15,23,42,0.10)]"
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary">
                      <FaClipboardCheck size={24} />
                    </div>

                    <div>
                      <p className="text-sm font-bold uppercase tracking-wide text-primary">
                        Coverage {String(index + 1).padStart(2, "0")}
                      </p>

                      <h2 className="mt-2 text-2xl md:text-3xl font-bold leading-tight text-secondary">
                        {section.title}
                      </h2>

                      <p className="mt-4 max-w-3xl leading-relaxed text-gray-600">
                        {section.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 grid md:grid-cols-2 gap-4">
                    {section.items?.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-[#f8fafc] p-5 transition hover:border-primary/30 hover:bg-white hover:shadow-md"
                      >
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <FaCheckCircle size={13} />
                        </span>

                        <span className="text-[15px] leading-relaxed text-gray-700">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/40 to-transparent opacity-0 transition group-hover:opacity-100" />
              </article>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        {footerNote && (
          <div className="mt-10 rounded-[1.5rem] border border-gray-200 border-l-4 border-l-primary bg-white p-6 text-gray-600 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
            <p className="leading-relaxed">{footerNote}</p>
          </div>
        )}
      </div>

      {/* Premium CTA */}
      <div className="bg-gradient-to-br from-[#f8fafc] via-white to-primary/5 px-4 pb-14 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="overflow-hidden rounded-[2rem] border border-primary/20 bg-white/90 shadow-[0_30px_100px_rgba(15,23,42,0.14)] backdrop-blur">
            <div className="grid lg:grid-cols-[1fr_340px] items-center gap-8 p-6 md:p-10">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-wide text-primary">
                  <span className="h-px w-10 bg-primary" />
                  Speak with MAH Audit Dubai
                </div>

                <h2 className="mt-4 text-2xl md:text-4xl font-bold leading-tight text-secondary">
                  {cta.title || "Need a reliable audit partner in Dubai?"}
                </h2>

                <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-gray-600">
                  {cta.description ||
                    "Get confidential guidance from experienced auditors for compliance, risk review, and financial reporting."}
                </p>

                <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium text-gray-600">
                  <span className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2">
                    Confidential advisory
                  </span>
                  <span className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2">
                    UAE compliance focused
                  </span>
                  <span className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2">
                    Fast response
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-secondary p-5 md:p-6 text-white shadow-xl">
                <p className="text-sm text-white/60">Ready to talk?</p>

                <h3 className="mt-2 text-2xl font-bold">
                  Book a confidential consultation
                </h3>

                <Link
                  href="/contact"
                  className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-6 py-4 font-semibold text-white transition hover:bg-primary_light"
                >
                  <FaPhoneAlt />
                  {cta.buttonText || "Request Consultation"}
                  <FaArrowRight size={14} />
                </Link>

                <p className="mt-4 text-center text-xs text-white/50">
                  No obligation. 100% confidential.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}