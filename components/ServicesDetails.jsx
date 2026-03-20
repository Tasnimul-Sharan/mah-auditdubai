"use client";

import Image from "next/image";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaRegCheckCircle } from "react-icons/fa";


const blogsData = {
  slug: "forensic-audit-in-dubai",

  blogPost: {
    title: "Forensic Audit in Dubai: Detect Fraud & Ensure Compliance",
    author: "Admin",
    date: "18 August, 2025",

    image: "/blogs/forensic-audit/main.jpg",

    subImages: [
      "/blogs/forensic-audit/sub1.jpg",
      "/blogs/forensic-audit/sub2.jpg",
    ],

    quote:
      "Forensic auditing is not just about finding fraud—it’s about protecting your business, reputation, and future growth.",

    postTags: ["Forensic Audit", "Dubai", "Fraud Detection", "Compliance"],

    content: [
      "Forensic auditing extends beyond examination of financial statements; it validates the accuracy of transactions. Whether addressing fraud, employee misconduct, or legal proceedings, forensic auditing acts as a critical safeguard for businesses.",

      "At our Audit Firm in Dubai, our auditors combine deep financial expertise with investigative skills. We not only detect irregularities but also help strengthen internal controls to prevent such issues in the future.",

      "⚡ Request a Forensic Audit Consultation",

      "Our forensic audit specialists in Dubai possess the expertise to trace suspicious transactions, analyze financial records, review electronic data, and conduct discreet investigations when required.",

      "⚡ When Should a Forensic Audit be Undertaken?",

      [
        "Unexplained discrepancies in accounts or cash flow",
        "Suspicious transactions by vendors or employees",
        "Whistleblower complaints of fraud or misconduct",
        "Mergers and acquisitions requiring independent validation",
        "Ongoing litigation or arbitration involving financial evidence",
        "Investigations or inquiries by regulators",
      ],

      "⚡ Why is Forensic Auditing Important?",

      [
        "Fraud prevention and early detection",
        "Protection of company assets",
        "Support for litigation and dispute resolution",
        "Ensuring compliance with UAE regulations",
        "Strengthening internal controls",
        "Building stakeholder trust and reputation",
      ],

      "⚡ Our Forensic Audit Services in Dubai",

      [
        "Fraud investigation in payroll, procurement, and vendor management",
        "Financial statement analysis and transaction tracing",
        "Internal control assessments and compliance reviews",
        "Litigation support and expert witness services",
        "Asset tracing and recovery (local and international)",
        "Digital forensics including emails, ERP systems, and electronic records",
      ],
    ],
  },

  socialIcons: [
    {
      icon: FaFacebookF,
      link: (url) => `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    },
    {
      icon: FaTwitter,
      link: (url, title) =>
        `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
    },
    {
      icon: FaLinkedinIn,
      link: (url) =>
        `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    },
  ],
};

export default function ServicesDetails() {
  const { blogPost } = blogsData;

  return (
    <section className="py-12 max-w-6xl mx-auto md:px-0 px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        {blogPost.content.map((block, i) => {
          if (Array.isArray(block)) {
            return (
              <div key={i} className="grid sm:grid-cols-2 gap-5">
                {block.map((item, idx) => (
                  <div
                    key={idx}
                    className="group flex items-start gap-3 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <FaRegCheckCircle className="text-primary mt-1 text-lg group-hover:scale-110 transition" />
                    <span className="text-gray-700 font-medium leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            );
          }

          if (typeof block === "string" && block.startsWith("⚡")) {
            return (
              <div key={i} className="pt-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 relative inline-block">
                  {block.replace("⚡", "")}
                  <span className="block w-16 h-1 bg-gradient-to-r from-purple-600 to-pink-500 mt-2 rounded-full"></span>
                </h2>
              </div>
            );
          }

          if (typeof block === "string" && block.includes("Consultation")) {
            return (
              <div
                key={i}
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-8 md:p-10 rounded-3xl shadow-xl"
              >
                <h3 className="text-xl md:text-2xl font-semibold mb-3">
                  {block}
                </h3>
              </div>
            );
          }

          return (
            <p
              key={i}
              className="text-gray-700 leading-relaxed text-lg tracking-[0.2px]"
            >
              {block}
            </p>
          );
        })}
      </div>
    </section>
  );
}

// "use client";

// import Image from "next/image";
// import { FaCheckCircle, FaQuoteLeft } from "react-icons/fa";

// export default function ServicesDetails({ service }) {
//   const { title, description, checklist, quote, image, subImages } =
//     service.services;

//   return (
//     <section className="py-6 md:py-16 max-w-7xl mx-auto px-6">
//       <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl shadow-2xl mb-16">
//         <Image
//           src={image}
//           alt={title}
//           fill
//           className="object-cover transition-transform duration-500 hover:scale-105"
//           priority
//         />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
//         <div className="lg:col-span-2">
//           <p className="text-lg text-gray-700 leading-relaxed mb-10 border-l-4 border-primary pl-4">
//             {description}
//           </p>

//           <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
//             What's Included
//           </h3>
//           <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
//             {checklist.map((item, idx) => (
//               <li
//                 key={idx}
//                 className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
//               >
//                 <FaCheckCircle className="text-primary mt-1 flex-shrink-0 text-xl" />
//                 <span className="font-medium">{item}</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <aside className="lg:col-span-1">
//           <div className="sticky top-10">
//             {" "}
//             <blockquote className="relative p-8 bg-primary/10 border-l-4 border-primary rounded-xl shadow-lg">
//               <FaQuoteLeft className="absolute top-4 left-4 text-primary/50 text-4xl opacity-50" />
//               <p className="italic text-gray-800 text-xl leading-relaxed mt-6">
//                 “{quote}”
//               </p>
//               <footer className="text-right text-sm text-gray-600 mt-4">
//                 - Client Testimonial
//               </footer>
//             </blockquote>
//           </div>
//         </aside>
//       </div>

//       <hr className="my-16 border-gray-200" />

//       <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
//         Our Work Examples
//       </h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {subImages.slice(0, 2).map((img, idx) => (
//           <div
//             key={idx}
//             className="relative w-full aspect-video overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition-all"
//           >
//             <Image
//               src={img}
//               alt={`${title} example ${idx + 1}`}
//               fill
//               className="object-cover transition-transform duration-500 hover:scale-105"
//             />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
