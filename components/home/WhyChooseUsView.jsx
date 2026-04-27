"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaCheckCircle,
  FaShieldAlt,
  FaStar,
} from "react-icons/fa";

export default function WhyChooseUsView({ data, points }) {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(11,28,45,0.08),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 md:grid-cols-2 lg:gap-20">
        {data.image && (
          <div className="relative">
            <div className="absolute -left-5 -top-5 h-28 w-28 rounded-full border border-primary/20" />
            <div className="absolute -bottom-8 -right-8 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-[0_28px_90px_rgba(15,23,42,0.18)]">
              <Image
                src={data.image}
                alt={data.title || "Why choose us"}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C2D]/75 via-[#0B1C2D]/15 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 flex items-center gap-4 rounded-2xl border border-white/30 bg-white/90 p-4 shadow-xl backdrop-blur-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FaShieldAlt className="text-xl" />
                </div>

                <div>
                  <p className="font-semibold text-[#0B1C2D]">
                    Confidential by design
                  </p>
                  <p className="mt-1 text-sm leading-5 text-slate-600">
                    Secure audit handling with clear reporting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={!data.image ? "md:col-span-2 max-w-3xl" : ""}>
          {data.subtitle && (
            <SectionBadge className="mb-5">
              {data.subtitle}
            </SectionBadge>
          )}

          {data.title && (
            <h2 className="max-w-xl text-4xl font-bold leading-tight text-[#0B1C2D] sm:text-5xl">
              {data.title}
            </h2>
          )}

          {data.description && (
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
              {data.description}
            </p>
          )}

          {points.length > 0 && (
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {points.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="group flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
                >
                  <FaCheckCircle className="mt-1 shrink-0 text-primary transition duration-300 group-hover:scale-110" />
                  <span className="text-sm leading-6 text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          )}

          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-3 rounded-xl bg-primary px-7 py-3 font-semibold text-white shadow-lg shadow-primary/20 transition duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl"
          >
            Contact Us Now
            <FaArrowRight className="text-sm" />
          </Link>
        </div>
      </div>
    </section>
  );
}
