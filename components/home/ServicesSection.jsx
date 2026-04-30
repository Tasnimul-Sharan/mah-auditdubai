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
