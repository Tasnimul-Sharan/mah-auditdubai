import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import SectionBadge from "../SectionBadge";
import { FaPhoenixFramework } from "react-icons/fa6";

const services = [
  {
    title: "Forensic Audit",
    description:
      "Financial investigation and fraud detection using advanced analytical methodologies.",
    image: "/services/forensic-audit.jpg",
    slug: "forensic-audit",
  },
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
    <div className="bg-white py-12 overflow-hidden">
      {/* HERO */}
      <section className="relative bg-gradient-to-b from-white to-gray-50">
        <div className="absolute top-0 left-0 w-full h-96 bg-primary/5 blur-3xl -z-10" />

        <div className="custom-container text-center max-w-4xl mx-auto">
          <div className="mb-4 flex justify-center">
            <SectionBadge icon={FaPhoenixFramework} className="mb-0">
              Our Expertise
            </SectionBadge>
          </div>

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
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
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
        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition">
          {service.title}
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {service.description}
        </p>
        {/* <span className="inline-flex items-center gap-3 text-sm font-semibold text-primary relative">
          View Service Details
          <span
            className="flex items-center justify-center w-9 h-9 rounded-full 
    bg-primary/10
    group-hover:bg-primary
    transition-all duration-300 ease-out
    group-hover:scale-110"
          >
            <FaArrowRight
              className="text-primary group-hover:text-white 
      transition-all duration-300 group-hover:translate-x-1"
            />
          </span>
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500"></span>
        </span> */}
        <span className="inline-flex items-center gap-2 text-sm font-semibold group-hover:text-primary relative group-hover:gap-3 transition-all duration-300">
          View Service Details
          <FaArrowRight className="transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500"></span>
        </span>
      </div>
    </Link>
  );
}
