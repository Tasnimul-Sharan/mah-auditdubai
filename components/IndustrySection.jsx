"use client";

import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle, FaIndustry } from "react-icons/fa";
import SectionBadge from "./SectionBadge";

export default function IndustrySection({
  industrySection = null,
  industryItems = [],
}) {
  const buttonText = industrySection?.button_text;
  const buttonLink = industrySection?.button_link;

  return (
    <section className="relative overflow-hidden bg-[#f8fafc] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.06),transparent_35%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        <div>
          <div className="mb-5 flex justify-start">
            <SectionBadge icon={FaIndustry}>
              {industrySection?.subtitle || "Industries We Serve"}
            </SectionBadge>
          </div>

          <h2 className="max-w-xl text-4xl font-bold leading-tight text-secondary md:text-5xl">
            {industrySection?.title ||
              "Trusted by Businesses Across Multiple Sectors"}
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
            {industrySection?.description ||
              "Our audit and advisory team works with organizations across diverse industries in Dubai and the UAE."}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {industryItems.length > 0 ? (
              industryItems.map((item) => (
                <div
                  key={item.id}
                  className="group flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
                >
                  <FaCheckCircle className="mt-1 shrink-0 text-primary transition duration-300 group-hover:scale-110" />

                  <span className="text-sm font-medium leading-6 text-slate-700">
                    {item.title}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No industry items found.</p>
            )}
          </div>

          {buttonText && buttonLink && (
            <Link
              href={buttonLink}
              className="mt-10 inline-flex rounded-xl bg-primary px-8 py-3 font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl"
            >
              {buttonText}
            </Link>
          )}
        </div>

        <div className="relative">
          <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full border border-primary/20" />
          <div className="absolute -bottom-8 -right-8 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative h-[520px] overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-[0_28px_90px_rgba(15,23,42,0.16)]">
            <Image
              src={industrySection?.image || "/images/services/audit-team.jpg"}
              alt={industrySection?.title || "Industries We Serve"}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-secondary/10 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/30 bg-white/90 p-5 shadow-xl backdrop-blur-md">
              <p className="text-lg font-bold text-secondary">
                {industrySection?.overlay_title ||
                  "Industry-Focused Audit Support"}
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {industrySection?.overlay_description ||
                  "Tailored audit, tax, accounting and advisory solutions for UAE businesses."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}