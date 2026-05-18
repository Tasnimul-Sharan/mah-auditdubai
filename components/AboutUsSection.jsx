"use client";

import Link from "next/link";
import SectionBadge from "./SectionBadge";
import OptimizedImage from "./OptimizedImage";
import { FiArrowRight } from "react-icons/fi";
import { FaShieldAlt, FaChartLine, FaBalanceScale } from "react-icons/fa";

const iconMap = {
  shield: FaShieldAlt,
  chart: FaChartLine,
  balance: FaBalanceScale,
};

export default function AboutUsSection({ data }) {
  if (!data) return null;

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-x-0 top-0 h-[42%] bg-[#f6f8fb]" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-20 items-center">
          <div>
            <SectionBadge className="mb-6">{data.badge}</SectionBadge>

            <h2 className="max-w-2xl text-4xl md:text-5xl font-bold leading-tight text-secondary">
              {data.title}
              <span className="block text-primary">
                {data.highlighted_title}
              </span>
            </h2>

            <div className="mt-6 max-w-xl space-y-4 text-base md:text-lg leading-relaxed text-gray-600">
              <p>{data.description1}</p>
              <p>{data.description2}</p>
            </div>

            <div className="mt-9 grid sm:grid-cols-3 gap-3">
              {data.features?.map((item, i) => {
                const Icon = iconMap[item.icon];

                return (
                  <div
                    key={i}
                    className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {Icon && <Icon />}
                    </div>

                    <p className="mt-4 text-sm font-semibold leading-snug text-secondary">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={data.button_primary_link}
                className="group inline-flex min-h-11 items-center gap-3 rounded-lg bg-primary px-7 py-4 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(56,182,255,0.28)] transition hover:bg-secondary hover:shadow-[0_18px_40px_rgba(15,23,42,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {data.button_primary_text}
                <FiArrowRight className="text-base transition group-hover:translate-x-1" />
              </Link>

              <Link
                href={data.button_secondary_link}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-gray-200 bg-white px-7 py-4 text-sm font-semibold text-secondary transition hover:border-secondary hover:bg-secondary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {data.button_secondary_text}
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-secondary p-3 shadow-[0_30px_90px_rgba(15,23,42,0.14)]">
              <div className="relative h-[420px] md:h-[560px] overflow-hidden rounded-xl">
                <OptimizedImage
                  src={data.image}
                  alt={data.image_alt || "Audit Firm Dubai"}
                  fill
                  width={900}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-secondary/75 via-transparent to-transparent" />
              </div>

              <div className="absolute bottom-8 left-8 right-8 rounded-xl border border-white/15 bg-white/10 p-5 text-white backdrop-blur-md">
                <p className="text-sm text-white/65">{data.stats_title}</p>

                <p className="mt-2 text-3xl md:text-4xl font-bold text-primary_light">
                  {data.stats_value}
                </p>

                <p className="mt-1 text-sm text-white/75">
                  {data.stats_subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
