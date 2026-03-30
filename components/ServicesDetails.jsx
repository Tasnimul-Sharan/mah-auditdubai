// "use client";

// import Image from "next/image";
// import { FaFacebookF, FaTwitter, FaLinkedinIn, FaRegCheckCircle } from "react-icons/fa";

// const blogsData = {
//   slug: "forensic-audit-in-dubai",

//   blogPost: {
//     title: "Forensic Audit in Dubai: Detect Fraud & Ensure Compliance",
//     author: "Admin",
//     date: "18 August, 2025",

//     image: "/blogs/forensic-audit/main.jpg",

//     subImages: [
//       "/blogs/forensic-audit/sub1.jpg",
//       "/blogs/forensic-audit/sub2.jpg",
//     ],

//     quote:
//       "Forensic auditing is not just about finding fraud—it’s about protecting your business, reputation, and future growth.",

//     postTags: ["Forensic Audit", "Dubai", "Fraud Detection", "Compliance"],

//     content: [
//       "Forensic auditing extends beyond examination of financial statements; it validates the accuracy of transactions. Whether addressing fraud, employee misconduct, or legal proceedings, forensic auditing acts as a critical safeguard for businesses.",

//       "At our Audit Firm in Dubai, our auditors combine deep financial expertise with investigative skills. We not only detect irregularities but also help strengthen internal controls to prevent such issues in the future.",

//       "⚡ Request a Forensic Audit Consultation",

//       "Our forensic audit specialists in Dubai possess the expertise to trace suspicious transactions, analyze financial records, review electronic data, and conduct discreet investigations when required.",

//       "⚡ When Should a Forensic Audit be Undertaken?",

//       [
//         "Unexplained discrepancies in accounts or cash flow",
//         "Suspicious transactions by vendors or employees",
//         "Whistleblower complaints of fraud or misconduct",
//         "Mergers and acquisitions requiring independent validation",
//         "Ongoing litigation or arbitration involving financial evidence",
//         "Investigations or inquiries by regulators",
//       ],

//       "⚡ Why is Forensic Auditing Important?",

//       [
//         "Fraud prevention and early detection",
//         "Protection of company assets",
//         "Support for litigation and dispute resolution",
//         "Ensuring compliance with UAE regulations",
//         "Strengthening internal controls",
//         "Building stakeholder trust and reputation",
//       ],

//       "⚡ Our Forensic Audit Services in Dubai",

//       [
//         "Fraud investigation in payroll, procurement, and vendor management",
//         "Financial statement analysis and transaction tracing",
//         "Internal control assessments and compliance reviews",
//         "Litigation support and expert witness services",
//         "Asset tracing and recovery (local and international)",
//         "Digital forensics including emails, ERP systems, and electronic records",
//       ],
//     ],
//   },

//   socialIcons: [
//     {
//       icon: FaFacebookF,
//       link: (url) => `https://www.facebook.com/sharer/sharer.php?u=${url}`,
//     },
//     {
//       icon: FaTwitter,
//       link: (url, title) =>
//         `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
//     },
//     {
//       icon: FaLinkedinIn,
//       link: (url) =>
//         `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
//     },
//   ],
// };

// export default function ServicesDetails() {
//   const { blogPost } = blogsData;

//   return (
//     <section className="py-12 max-w-6xl mx-auto md:px-0 px-6">
//       <div className="max-w-4xl mx-auto space-y-10">
//         {blogPost.content.map((block, i) => {
//           if (Array.isArray(block)) {
//             return (
//               <div key={i} className="grid sm:grid-cols-2 gap-5">
//                 {block.map((item, idx) => (
//                   <div
//                     key={idx}
//                     className="group flex items-start gap-3 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
//                   >
//                     <FaRegCheckCircle className="text-primary mt-1 text-lg group-hover:scale-110 transition" />
//                     <span className="text-gray-700 font-medium leading-relaxed">
//                       {item}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             );
//           }

//           if (typeof block === "string" && block.startsWith("⚡")) {
//             return (
//               <div key={i} className="pt-10">
//                 <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 relative inline-block">
//                   {block.replace("⚡", "")}
//                   <span className="block w-16 h-1 bg-gradient-to-r from-purple-600 to-pink-500 mt-2 rounded-full"></span>
//                 </h2>
//               </div>
//             );
//           }

//           if (typeof block === "string" && block.includes("Consultation")) {
//             return (
//               <div
//                 key={i}
//                 className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-8 md:p-10 rounded-3xl shadow-xl"
//               >
//                 <h3 className="text-xl md:text-2xl font-semibold mb-3">
//                   {block}
//                 </h3>
//               </div>
//             );
//           }

//           return (
//             <p
//               key={i}
//               className="text-gray-700 leading-relaxed text-lg tracking-[0.2px]"
//             >
//               {block}
//             </p>
//           );
//         })}
//       </div>
//     </section>
//   );
// }

// "use client";

// import { FaCheckCircle } from "react-icons/fa";

// export default function ForensicAuditDetails() {
//   return (
//     <section className="bg-gray-50 py-16 md:py-24">
//       <div className="max-w-5xl mx-auto px-6 space-y-12">
//         {/* HERO */}
//         <div className="space-y-4">
//           <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
//             Forensic Audit Services in{" "}
//             <span className="text-primary">Dubai, UAE</span>
//           </h1>

//           <p className="text-lg text-gray-600 leading-relaxed">
//             Forensic auditing extends beyond examination of financial
//             statements; it validates the accuracy of transactions. Whether
//             addressing fraud, misconduct, or legal evidence preparation,
//             forensic audit acts as a crucial safeguard for businesses.
//           </p>

//           <p className="text-gray-600 leading-relaxed">
//             Our auditors combine strong financial expertise with investigative
//             skills to detect irregularities, resolve issues, and strengthen
//             internal controls for long-term protection.
//           </p>
//         </div>

//         {/* WHEN NEEDED */}
//         <div className="space-y-6">
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-l-4 border-primary pl-4">
//             When Should a Forensic Audit Be Undertaken in UAE?
//           </h2>

//           <p className="text-gray-600 leading-relaxed">
//             Not every accounting matter requires a forensic audit. However,
//             organizations engage forensic auditors when fraud risks or
//             regulatory requirements demand independent verification.
//           </p>

//           <div className="">
//             {[
//               "Unexplained discrepancies in accounts or cash flow",
//               "Suspicious transactions by vendors or employees",
//               "Whistleblower complaints of fraud or misconduct",
//               "Mergers and acquisitions validation",
//               "Ongoing litigation or arbitration cases",
//               "Regulatory investigations",
//             ].map((item, i) => (
//               <div key={i} className="flex items-start gap-3 p-3 transition">
//                 <FaCheckCircle className="text-primary mt-1" />
//                 <span className="text-gray-700">{item}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* WHY IMPORTANT */}
//         <div className="space-y-6">
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-l-4 border-primary pl-4">
//             Why Forensic Auditing Is Important
//           </h2>

//           <p className="text-gray-600">
//             Forensic auditing safeguards assets, builds trust, and ensures
//             compliance with UAE regulations.
//           </p>

//           <div className="">
//             {[
//               "Fraud prevention & detection",
//               "Asset protection",
//               "Litigation support",
//               "Regulatory compliance",
//               "Internal control improvements",
//               "Trust & reputation",
//             ].map((item, i) => (
//               <div key={i} className="flex items-start gap-3 p-3 transition">
//                 <FaCheckCircle className="text-primary mt-1" />
//                 <span className="text-gray-700">{item}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* SERVICES */}
//         <div className="space-y-6">
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-l-4 border-primary pl-4">
//             Our Forensic Audit Services in Dubai
//           </h2>

//           <p className="text-gray-600">
//             We deliver comprehensive forensic audit solutions tailored to
//             diverse business needs.
//           </p>

//           <div className="">
//             {[
//               "Fraud investigation in payroll, procurement, and vendors",
//               "Financial statement analysis and transaction tracing",
//               "Internal control assessments and compliance checks",
//               "Litigation support and expert witness services",
//               "Asset recovery and tracing (local & international)",
//               "Digital forensics including ERP & email analysis",
//               "M&A financial validation and due diligence support",
//               "Confidential whistleblower investigation handling",
//             ].map((item, i) => (
//               <div key={i} className="flex items-start gap-3 p-3 transition">
//                 <FaCheckCircle className="text-primary mt-1" />
//                 <span className="text-gray-700">{item}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//         {/* FOOT NOTE */}
//         <div className="bg-white p-6 rounded-xl border text-gray-600 text-sm">
//           Our reports are practical, clear, and designed for immediate action.
//           We ensure accuracy, confidentiality, and compliance with international
//           forensic standards.
//         </div>
// {/* CTA */}
// <div className="bg-gradient-to-r from-primary to-purple-600 text-white p-8 md:p-10 rounded-3xl shadow-xl">
//   <h2 className="text-2xl font-semibold mb-3">
//     Request a Forensic Audit Consultation in Dubai
//   </h2>
//   <p className="text-white/90 mb-5">
//     Our specialists can trace suspicious transactions, analyze financial
//     data, and conduct discreet investigations with complete
//     confidentiality.
//   </p>
//   <button className="bg-white text-primary px-6 py-3 rounded-full font-semibold hover:scale-105 transition">
//     Get Free Consultation
//   </button>
// </div>
//       </div>
//     </section>
//   );
// }

// const data = {
//   hero: {
//     title: "Forensic Audit Services in Dubai, UAE",
//     description1:
//       "Forensic auditing extends beyond examination of financial statements; it validates the accuracy of transactions. Whether addressing fraud, misconduct, or legal evidence preparation, forensic audit acts as a crucial safeguard for businesses.",
//     description2:
//       "Our auditors combine strong financial expertise with investigative skills to detect irregularities, resolve issues, and strengthen internal controls for long-term protection.",
//   },

//   sections: [
//     {
//       title: "When Should a Forensic Audit Be Undertaken in UAE?",
//       description:
//         "Not every accounting matter requires a forensic audit. However, organizations engage forensic auditors when fraud risks or regulatory requirements demand independent verification.",
//       items: [
//         "Unexplained discrepancies in accounts or cash flow",
//         "Suspicious transactions by vendors or employees",
//         "Whistleblower complaints of fraud or misconduct",
//         "Mergers and acquisitions validation",
//         "Ongoing litigation or arbitration cases",
//         "Regulatory investigations",
//       ],
//     },

//     {
//       title: "Why Forensic Auditing Is Important",
//       description:
//         "Forensic auditing safeguards assets, builds trust, and ensures compliance with UAE regulations.",
//       items: [
//         "Fraud prevention & detection",
//         "Asset protection",
//         "Litigation support",
//         "Regulatory compliance",
//         "Internal control improvements",
//         "Trust & reputation",
//       ],
//     },

//     {
//       title: "Our Forensic Audit Services in Dubai",
//       description:
//         "We deliver comprehensive forensic audit solutions tailored to diverse business needs.",
//       items: [
//         "Fraud investigation in payroll, procurement, and vendors",
//         "Financial statement analysis and transaction tracing",
//         "Internal control assessments and compliance checks",
//         "Litigation support and expert witness services",
//         "Asset recovery and tracing (local & international)",
//         "Digital forensics including ERP & email analysis",
//         "M&A financial validation and due diligence support",
//         "Confidential whistleblower investigation handling",
//       ],
//     },
//   ],

//   footerNote:
//     "Our reports are practical, clear, and designed for immediate action. We ensure accuracy, confidentiality, and compliance with international forensic standards.",
// };

// "use client";
// import { FaCheckCircle } from "react-icons/fa";

// export default function ForensicAuditDetails(service) {
//   const { hero, sections, footerNote } = service;

//   return (
//     <section className="bg-gray-50 py-16 md:py-24">
//       <div className="max-w-5xl mx-auto px-6 space-y-12">
//         {/* HERO */}
//         <div className="space-y-4">
//           <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
//             {hero.title.split("Dubai")[0]}
//             <span className="text-primary">Dubai</span>
//             {hero.title.split("Dubai")[1]}
//           </h1>

//           <p className="text-lg text-gray-600 leading-relaxed">
//             {hero.description1}
//           </p>

//           <p className="text-gray-600 leading-relaxed">{hero.description2}</p>
//         </div>

//         {/* DYNAMIC SECTIONS */}
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

//         {/* FOOT NOTE */}
//         <div className="bg-white p-6 rounded-xl border text-gray-600 text-sm">
//           {footerNote}
//         </div>
//         {/* PREMIUM CTA */}
//         <div className="relative overflow-hidden rounded-3xl p-[1px] bg-gradient-to-r from-primary via-purple-600 to-pink-500 shadow-2xl">
//           {/* Glow Layer */}
//           <div className="absolute inset-0 opacity-30 blur-2xl bg-gradient-to-r from-primary via-purple-500 to-pink-500"></div>

//           {/* Content */}
//           <div className="relative bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white p-8 md:p-12 rounded-3xl flex flex-col gap-8">
//             {/* LEFT CONTENT */}
//             <div className="max-w-xl space-y-4">
//               <h2 className="text-2xl md:text-3xl font-bold leading-snug">
//                 Request a{" "}
//                 <span className="bg-gradient-to-r from-primary to-pink-400 bg-clip-text text-transparent">
//                   Forensic Audit Consultation
//                 </span>{" "}
//                 in Dubai
//               </h2>

//               <p className="text-white/80 leading-relaxed">
//                 Our specialists help uncover financial irregularities, trace
//                 transactions, and deliver confidential insights that protect
//                 your business.
//               </p>

//               {/* Mini trust points */}
//               <div className="flex flex-wrap gap-4 text-sm text-white/70">
//                 <span>✔ Confidential</span>
//                 <span>✔ Expert Auditors</span>
//                 <span>✔ Fast Response</span>
//               </div>
//             </div>

//             {/* RIGHT BUTTON AREA → NOW BOTTOM LEFT */}
//             <div className="mt-3 flex flex-col items-start gap-2">
//               <button className="relative px-7 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-primary to-pink-500 hover:scale-105 transition-all duration-300 shadow-lg">
//                 Get Free Consultation
//               </button>

//               <p className="text-xs text-white/50 mt-2 ml-4">
//                 No obligation • 100% confidential
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";
import { FaCheckCircle } from "react-icons/fa";

export default function ServicesDetails({ service }) {
  const { hero, sections, footerNote } = service;

  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        {/* HERO */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            {hero.title}
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed">
            {hero.description1}
          </p>

          <p className="text-gray-600 leading-relaxed">{hero.description2}</p>
        </div>

        {/* SECTIONS */}
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-l-4 border-primary pl-4">
              {section.title}
            </h2>

            <p className="text-gray-600 leading-relaxed">
              {section.description}
            </p>

            <div>
              {section.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 transition hover:bg-white hover:rounded-lg"
                >
                  <FaCheckCircle className="text-primary mt-1" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* FOOTER NOTE */}
        <div className="bg-white p-6 rounded-xl border text-gray-600 text-sm">
          {footerNote}
        </div>

        {/* PREMIUM CTA */}
        <div className="relative overflow-hidden rounded-3xl p-[1px] bg-gradient-to-r from-primary via-purple-600 to-pink-500 shadow-2xl">
          <div className="absolute inset-0 opacity-30 blur-2xl bg-gradient-to-r from-primary via-purple-500 to-pink-500"></div>

          <div className="relative bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white p-8 md:p-12 rounded-3xl flex flex-col gap-8">
            {/* TEXT */}
            <div className="max-w-xl space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold leading-snug">
                Request a{" "}
                <span className="bg-gradient-to-r from-primary to-pink-400 bg-clip-text text-transparent">
                  Consultation
                </span>{" "}
                in Dubai
              </h2>

              <p className="text-white/80 leading-relaxed">
                Our specialists help uncover financial irregularities, trace
                transactions, and deliver confidential insights that protect
                your business.
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-white/70">
                <span>✔ Confidential</span>
                <span>✔ Expert Auditors</span>
                <span>✔ Fast Response</span>
              </div>
            </div>

            {/* CTA BOTTOM LEFT */}
            <div className="flex flex-col items-start gap-2">
              <button className="px-7 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-primary to-pink-500 hover:scale-105 transition-all duration-300 shadow-lg">
                Get Free Consultation
              </button>

              <p className="text-xs text-white/50">
                No obligation • 100% confidential
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
