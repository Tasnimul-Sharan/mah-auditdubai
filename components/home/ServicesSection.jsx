// import Link from "next/link";
// import {
//   FaShieldAlt,
//   FaChartLine,
//   FaSearchDollar,
//   FaBalanceScale,
//   FaFileInvoiceDollar,
//   FaUniversity,
// } from "react-icons/fa";

// export default function ServicesPage() {
//   return (
//     <div className="bg-white text-[#0B1C2D] overflow-hidden">
//       {/* ================= HERO ================= */}
//       <section className="relative py-32 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
//         {/* Background Accent */}
//         <div className="absolute top-0 left-0 w-full h-96 bg-primary_light/5 blur-3xl -z-10" />

//         <div className="custom-container text-center max-w-4xl mx-auto">
//           <p className="uppercase tracking-widest text-sm text-primary_light mb-4">
//             Our Expertise
//           </p>

//           <h1 className="text-4xl md:text-5xl font-bold leading-tight">
//             Audit & Advisory Services Designed for Modern Enterprises
//           </h1>

//           <p className="text-gray-600 mt-6 text-lg">
//             Strategic, compliance-driven, and precision-focused audit solutions
//             tailored for UAE and international businesses.
//           </p>
//         </div>
//       </section>

//       {/* ================= SERVICES GRID ================= */}
//       <section className="py-28 bg-gradient-to-b from-gray-50 to-white">
//         <div className="custom-container">
//           <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-3">
//             <ServiceCard
//               icon={<FaShieldAlt />}
//               title="External Audit Services"
//               description="Independent statutory audits ensuring full regulatory compliance and transparent financial reporting."
//             />

//             <ServiceCard
//               icon={<FaChartLine />}
//               title="Internal Audit & Risk"
//               description="Risk assessment frameworks and internal control systems to strengthen governance."
//             />

//             <ServiceCard
//               icon={<FaSearchDollar />}
//               title="Forensic Audit"
//               description="Financial investigation and fraud detection services with advanced analytical methodologies."
//             />

//             <ServiceCard
//               icon={<FaBalanceScale />}
//               title="Tax Advisory"
//               description="Strategic VAT and corporate tax planning aligned with UAE and international regulations."
//             />

//             <ServiceCard
//               icon={<FaFileInvoiceDollar />}
//               title="Due Diligence"
//               description="Comprehensive financial reviews for mergers, acquisitions, and investment decisions."
//             />

//             <ServiceCard
//               icon={<FaUniversity />}
//               title="IFRS & Compliance"
//               description="IFRS advisory and regulatory compliance solutions tailored for growing enterprises."
//             />
//           </div>
//         </div>
//       </section>

//       {/* ================= TESTIMONIAL SECTION ================= */}
//       <section className="py-32 bg-white">
//         <div className="custom-container">
//           <div className="max-w-4xl mx-auto text-center">
//             <p className="text-2xl text-gray-700 leading-relaxed italic">
//               “Outstanding communication and exceptional financial precision.
//               Their strategic advisory has significantly strengthened our
//               corporate compliance structure.”
//             </p>

//             <div className="mt-10">
//               <h4 className="font-semibold text-lg">Michael Chen</h4>
//               <p className="text-sm text-gray-500">Marketing Director</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ================= PREMIUM CTA ================= */}
//       <section className="relative py-32">
//         <div className="custom-container">
//           <div className="relative rounded-3xl overflow-hidden bg-[#0B1C2D] p-16 text-white">
//             <div className="absolute inset-0 bg-gradient-to-r from-primary_light/40 to-transparent" />

//             <div className="relative z-10 text-center max-w-3xl mx-auto">
//               <h2 className="text-4xl font-bold mb-6">
//                 Book a Confidential Consultation
//               </h2>

//               <p className="text-gray-300 mb-10 text-lg">
//                 Over 40 years of experience ensuring financial clarity,
//                 compliance, and strategic security.
//               </p>

//               <Link
//                 href="/contact"
//                 className="inline-block bg-white text-[#0B1C2D] px-10 py-4 rounded-2xl
//                            font-semibold hover:bg-primary_light
//                            hover:text-white transition-all duration-300
//                            shadow-xl"
//               >
//                 Schedule Now
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// /* ================= SERVICE CARD COMPONENT ================= */

// function ServiceCard({ icon, title, description }) {
//   return (
//     <div
//       className="group relative rounded-3xl p-10 bg-white shadow-sm
//                     hover:shadow-2xl transition-all duration-500
//                     border border-gray-100 hover:border-primary_light/30
//                     hover:-translate-y-2"
//     >
//       {/* Icon Badge */}
//       <div
//         className="w-14 h-14 rounded-2xl bg-primary_light/10
//                       flex items-center justify-center
//                       mb-6 group-hover:bg-primary_light
//                       transition-all duration-300 text-primary_light
//                       group-hover:text-white text-xl"
//       >
//         {icon}
//       </div>

//       <h3 className="text-2xl font-semibold mb-4">{title}</h3>

//       <p className="text-gray-600 leading-relaxed mb-6">{description}</p>

//       <Link
//         href="/contact"
//         className="text-primary_light font-medium flex items-center gap-2
//                    group-hover:gap-4 transition-all duration-300"
//       >
//         Learn More →
//       </Link>
//     </div>
//   );
// }

import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

const services = [
  {
    title: "External Audit Services",
    description:
      "Independent statutory audits ensuring full regulatory compliance and transparent financial reporting.",
    image: "/services/external-audit.jpg",
    slug: "external-audit",
  },
  {
    title: "Internal Audit & Risk",
    description:
      "Risk assessment frameworks and internal control systems to strengthen governance.",
    image: "/services/internal-audit.jpg",
    slug: "internal-audit",
  },
  {
    title: "Forensic Audit",
    description:
      "Financial investigation and fraud detection using advanced analytical methodologies.",
    image: "/services/forensic-audit.jpg",
    slug: "forensic-audit",
  },
  {
    title: "Tax Advisory",
    description:
      "Strategic VAT and corporate tax planning aligned with UAE regulations.",
    image: "/services/tax-advisory.jpg",
    slug: "tax-advisory",
  },
  {
    title: "Due Diligence",
    description:
      "Comprehensive financial reviews for mergers, acquisitions, and investment decisions.",
    image: "/services/due-diligence.jpg",
    slug: "due-diligence",
  },
  {
    title: "IFRS & Compliance",
    description:
      "IFRS advisory and regulatory compliance solutions for modern enterprises.",
    image: "/services/ifrs.jpg",
    slug: "ifrs-compliance",
  },
];

export default function ServicesSection() {
  return (
    <div className="bg-white text-[#0B1C2D] py-12 overflow-hidden">
      {/* HERO */}
      <section className="relative bg-gradient-to-b from-white to-gray-50">
        <div className="absolute top-0 left-0 w-full h-96 bg-primary_light/5 blur-3xl -z-10" />

        <div className="custom-container text-center max-w-4xl mx-auto">
          <p className="uppercase tracking-widest text-sm text-primary_light mb-4">
            Our Expertise
          </p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Audit & Advisory Solutions
          </h1>

          <p className="text-gray-600 mt-6 text-lg">
            Strategic, compliance-driven, and precision-focused audit solutions
            tailored for UAE and international businesses.
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="custom-container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* SERVICE CARD */

function ServiceCard({ service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="block group rounded-3xl overflow-hidden border border-gray-100 
      hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white"
    >
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover group-hover:scale-110 transition duration-700"
        />
      </div>

      {/* Content */}
      <div className="p-8">
        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary_light transition">
          {service.title}
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {service.description}
        </p>
        {/* <span className="inline-flex items-center gap-3 text-sm font-semibold text-primary_light relative">
          View Service Details
          <span
            className="flex items-center justify-center w-9 h-9 rounded-full 
    bg-primary_light/10
    group-hover:bg-primary_light
    transition-all duration-300 ease-out
    group-hover:scale-110"
          >
            <FaArrowRight
              className="text-primary_light group-hover:text-white 
      transition-all duration-300 group-hover:translate-x-1"
            />
          </span>
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary_light group-hover:w-full transition-all duration-500"></span>
        </span> */}
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary_light relative group-hover:gap-3 transition-all duration-300">
          View Service Details
          <FaArrowRight className="transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary_light group-hover:w-full transition-all duration-500"></span>
        </span>
      </div>
    </Link>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { supabaseServer } from "@/lib/supabaseServer";
// import Image from "next/image";

// export default function ServicesPage() {
//   const [services, setServices] = useState([]);

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   const fetchServices = async () => {
//     const { data, error } = await supabaseServer
//       .from("services")
//       .select("*")
//       .order("created_at", { ascending: false });

//     if (!error) {
//       setServices(data);
//     }
//   };

//   return (
//     <div className="bg-white text-[#0B1C2D]">
//       {/* HERO */}
//       <section className="py-28 text-center bg-gray-50">
//         <div className="custom-container max-w-4xl mx-auto">
//           <p className="text-primary uppercase tracking-widest mb-4">
//             Our Services
//           </p>

//           <h1 className="text-5xl font-bold leading-tight">
//             Audit & Advisory Solutions
//           </h1>

//           <p className="text-gray-600 mt-6 text-lg">
//             Professional financial auditing and advisory services designed for
//             modern organizations across the UAE.
//           </p>
//         </div>
//       </section>

//       {/* SERVICES */}
//       <section className="py-28">
//         <div className="custom-container grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {services.map((service) => (
//             <ServiceCard key={service.id} service={service} />
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }

// function ServiceCard({ service }) {
//   return (
//     <div className="group rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition">
//       {/* Image */}
//       <div className="relative h-56 w-full overflow-hidden">
//         <Image
//           src={service.image}
//           alt={service.title}
//           fill
//           className="object-cover group-hover:scale-110 transition duration-700"
//         />
//       </div>

//       {/* Content */}
//       <div className="p-8">
//         <h3 className="text-xl font-semibold mb-3">{service.title}</h3>

//         <p className="text-gray-600 mb-6">{service.description}</p>

//         <Link
//           href={`/services/${service.slug}`}
//           className="text-primary font-medium"
//         >
//           View Details →
//         </Link>
//       </div>
//     </div>
//   );
// }

{
  /* CTA */
}
{
  /* <section className="relative py-32">
        <div className="custom-container">
          <div className="relative rounded-3xl overflow-hidden bg-[#0B1C2D] p-16 text-white">
            <div className="absolute inset-0 bg-gradient-to-r from-primary_light/40 to-transparent" />

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-6">
                Book a Confidential Consultation
              </h2>

              <p className="text-gray-300 mb-10 text-lg">
                Over 40 years of experience ensuring financial clarity,
                compliance, and strategic security.
              </p>

              <Link
                href="/contact"
                className="inline-block bg-white text-[#0B1C2D] px-10 py-4 rounded-2xl
                font-semibold hover:bg-primary_light hover:text-white transition-all duration-300 shadow-xl"
              >
                Schedule Now
              </Link>
            </div>
          </div>
        </div>
      </section> */
}
