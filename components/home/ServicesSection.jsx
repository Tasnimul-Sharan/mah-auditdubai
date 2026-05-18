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
        <div className="mx-auto max-w-4xl text-center">
          {content?.badge && (
            <div className="mb-5 flex justify-center">
              <SectionBadge icon={FaPhoenixFramework}>
                {content.badge}
              </SectionBadge>
            </div>
          )}

          {content?.title && (
            <h2 className="text-4xl font-bold leading-tight text-secondary md:text-5xl">
              {content.title}
            </h2>
          )}

          {content?.description && (
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
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
