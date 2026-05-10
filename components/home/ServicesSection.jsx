// import SectionBadge from "../SectionBadge";
// import { FaPhoenixFramework } from "react-icons/fa6";
// import ServiceCard from "../ServiceCard";

// export default function ServicesSection({ services = [] }) {
//   return (
//     <section className="relative overflow-hidden bg-white py-16 md:py-24">
//       <div className="absolute inset-x-0 top-0 h-[360px] bg-[#f6f8fb]" />

//       <div className="relative custom-container mx-auto">
//         <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-end">
//           <div>
//             <SectionBadge icon={FaPhoenixFramework} className="mb-5">
//               Our Expertise
//             </SectionBadge>

//             <h1 className="text-4xl md:text-5xl font-bold leading-tight text-secondary">
//               Audit & Advisory Solutions
//             </h1>
//           </div>

//           <p className="max-w-2xl text-lg leading-relaxed text-gray-600 lg:ml-auto lg:text-right">
//             Strategic, compliance-driven, and precision-focused audit solutions
//             tailored for UAE and international businesses.
//           </p>
//         </div>

//         <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {services.map((service, index) => (
//             <ServiceCard
//               key={service.slug || service.title}
//               service={service}
//               index={index}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

import SectionBadge from "../SectionBadge";
import { FaPhoenixFramework } from "react-icons/fa6";
import ServiceCard from "../ServiceCard";

function getObject(value) {
  if (!value) return {};

  if (typeof value === "object" && !Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return parsed && typeof parsed === "object" && !Array.isArray(parsed)
        ? parsed
        : {};
    } catch {
      return {};
    }
  }

  return {};
}

export default function ServicesSection({
  services = [],
  sectionContent = null,
}) {
  const content = getObject(sectionContent);

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      <div className="absolute inset-x-0 top-0 h-[360px] bg-[#f6f8fb]" />

      <div className="relative custom-container mx-auto">
        <div className="grid items-end gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            {content?.badge && (
              <SectionBadge icon={FaPhoenixFramework} className="mb-5">
                {content.badge}
              </SectionBadge>
            )}

            {content?.title && (
              <h1 className="text-4xl font-bold leading-tight text-secondary md:text-5xl">
                {content.title}
              </h1>
            )}
          </div>

          {content?.description && (
            <p className="max-w-2xl text-lg leading-relaxed text-gray-600 lg:ml-auto lg:text-right">
              {content.description}
            </p>
          )}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.slug || service.title}
              service={service}
              index={index}
              buttonText={content?.button_text}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
