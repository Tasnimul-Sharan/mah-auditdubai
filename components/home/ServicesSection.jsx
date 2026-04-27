// import Link from "next/link";
// import Image from "next/image";
// import { FaArrowRight } from "react-icons/fa";
// import SectionBadge from "../SectionBadge";
// import { FaPhoenixFramework } from "react-icons/fa6";

// export default function ServicesSection({ services }) {
//   return (
//     <div className="bg-white py-12 overflow-hidden">
//       {/* HERO */}
//       <section className="relative bg-gradient-to-b from-white to-gray-50">
//         <div className="absolute top-0 left-0 w-full h-96 bg-primary/5 blur-3xl -z-10" />

//         <div className="custom-container text-center max-w-4xl mx-auto">
//           <div className="mb-4 flex justify-center">
//             <SectionBadge icon={FaPhoenixFramework} className="mb-0">
//               Our Expertise
//             </SectionBadge>
//           </div>

//           <h1 className="text-4xl md:text-5xl font-bold leading-tight">
//             Audit & Advisory Solutions
//           </h1>

//           <p className="text-gray-600 mt-6 text-lg">
//             Strategic, compliance-driven, and precision-focused audit solutions
//             tailored for UAE and international businesses.
//           </p>
//         </div>
//       </section>

//       {/* SERVICES GRID */}
//       <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
//         <div className="custom-container mx-auto">
//           <div className="grid md:grid-cols-2 gap-8 lg:grid-cols-3">
//             {services.map((service, index) => (
//               <ServiceCard key={index} service={service} />
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// /* SERVICE CARD */

// function ServiceCard({ service }) {
//   return (
//     <Link
//       href={`/services/${service.slug}`}
//       className="block group rounded-3xl overflow-hidden border border-gray-100
//       hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white"
//     >
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
//         <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition">
//           {service.title}
//         </h3>
//         <p className="text-gray-600 mb-6 leading-relaxed">
//           {service.description}
//         </p>
//         {/* <span className="inline-flex items-center gap-3 text-sm font-semibold text-primary relative">
//           View Service Details
//           <span
//             className="flex items-center justify-center w-9 h-9 rounded-full
//     bg-primary/10
//     group-hover:bg-primary
//     transition-all duration-300 ease-out
//     group-hover:scale-110"
//           >
//             <FaArrowRight
//               className="text-primary group-hover:text-white
//       transition-all duration-300 group-hover:translate-x-1"
//             />
//           </span>
//           <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500"></span>
//         </span> */}
//         <span className="inline-flex items-center gap-2 text-sm font-semibold group-hover:text-primary relative group-hover:gap-3 transition-all duration-300">
//           View Service Details
//           <FaArrowRight className="transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
//           <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500"></span>
//         </span>
//       </div>
//     </Link>
//   );
// }

// import Link from "next/link";
// import Image from "next/image";
// import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
// import SectionBadge from "../SectionBadge";
// import { FaPhoenixFramework } from "react-icons/fa6";

// export default function ServicesSection({ services = [] }) {
//   return (
//     <section className="relative overflow-hidden bg-[#f6f8fb] py-16 md:py-24">
//       <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

//       <div className="relative custom-container mx-auto">
//         <div className="mx-auto max-w-4xl text-center">
//           <div className="mb-4 flex justify-center">
//             <SectionBadge className="mb-0">
//               Our Expertise
//             </SectionBadge>
//           </div>

//           <h1 className="text-4xl md:text-5xl font-bold leading-tight text-secondary">
//             Audit & Advisory Solutions
//           </h1>

//           <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
//             Strategic, compliance-driven, and precision-focused audit solutions
//             tailored for UAE and international businesses.
//           </p>
//         </div>

//         <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {services.map((service) => (
//             <ServiceCard
//               key={service.slug || service.title}
//               service={service}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function ServiceCard({ service }) {
//   return (
//     <Link
//       href={`/services/${service.slug}`}
//       className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_24px_70px_rgba(15,23,42,0.12)]"
//     >
//       <div className="relative h-60 w-full overflow-hidden bg-secondary">
//         <Image
//           src={service.image}
//           alt={service.title}
//           fill
//           className="object-cover transition duration-700 group-hover:scale-105"
//         />

//         <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-secondary/10 to-transparent opacity-80" />

//         {/* <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md">
//           Dubai Audit
//         </div> */}
//       </div>

//       <div className="p-6 md:p-7">
//         {/* <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
//           <FaCheckCircle />
//         </div> */}

//         <h3 className="text-xl font-bold leading-snug text-secondary transition group-hover:text-primary">
//           {service.title}
//         </h3>

//         <p className="mt-3 min-h-[78px] text-sm leading-relaxed text-gray-600">
//           {service.description}
//         </p>

//         <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
//           <span className="relative text-sm font-semibold text-secondary transition group-hover:text-primary">
//             View Service Details
//             <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
//           </span>

//           <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white transition group-hover:bg-primary">
//             <FaArrowRight className="text-sm transition group-hover:translate-x-0.5" />
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// }

import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import SectionBadge from "../SectionBadge";
import { FaPhoenixFramework } from "react-icons/fa6";

export default function ServicesSection({ services = [] }) {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      <div className="absolute inset-x-0 top-0 h-[360px] bg-[#f6f8fb]" />

      <div className="relative custom-container mx-auto">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-end">
          <div>
            <SectionBadge icon={FaPhoenixFramework} className="mb-5">
              Our Expertise
            </SectionBadge>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-secondary">
              Audit & Advisory Solutions
            </h1>
          </div>

          <p className="max-w-2xl text-lg leading-relaxed text-gray-600 lg:ml-auto lg:text-right">
            Strategic, compliance-driven, and precision-focused audit solutions
            tailored for UAE and international businesses.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.slug || service.title}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_70px_rgba(15,23,42,0.10)]"
    >
      <div className="relative h-64 w-full overflow-hidden bg-secondary">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-secondary/85 via-secondary/20 to-transparent" />

        <div className="absolute bottom-5 left-5 right-5">
          <span className="text-sm font-semibold text-primary">
            {String(index + 1).padStart(2, "0")}
          </span>

          <h3 className="mt-2 text-2xl font-bold leading-snug text-white">
            {service.title}
          </h3>
        </div>
      </div>

      <div className="p-6">
        <p className="min-h-[84px] text-sm leading-relaxed text-gray-600">
          {service.description}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
          <span className="relative text-sm font-semibold text-secondary transition group-hover:text-primary">
            View Service Details
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
          </span>

          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-secondary transition group-hover:border-primary group-hover:bg-primary group-hover:text-white">
            <FaArrowRight className="text-sm transition group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
