import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import OptimizedImage from "@/components/OptimizedImage";

export default function ServiceCard({ service, index, buttonText }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_70px_rgba(15,23,42,0.10)]"
    >
      <div className="relative h-64 w-full overflow-hidden bg-secondary">
        <OptimizedImage
          src={service.image || "/placeholder.jpg"}
          alt={service.title || "Service Image"}
          fill
          width={800}
          sizes="(max-width: 768px) 100vw, 33vw"
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
        {service.description && (
          <p className="min-h-[84px] text-sm leading-relaxed text-gray-600">
            {service.description}
          </p>
        )}

        {buttonText && (
          <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
            <span className="relative text-sm font-semibold text-secondary transition group-hover:text-primary">
              {buttonText}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </span>

            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-secondary transition group-hover:border-primary group-hover:bg-primary group-hover:text-white">
              <FaArrowRight className="text-sm transition group-hover:translate-x-0.5" />
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
