"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaBalanceScale,
  FaCheckCircle,
  FaClipboardCheck,
  FaFileSignature,
  FaPhoneAlt,
  FaShieldAlt,
} from "react-icons/fa";

const trustItems = [
  { icon: FaShieldAlt, label: "Confidential Review" },
  { icon: FaBalanceScale, label: "UAE Compliance Focus" },
  { icon: FaFileSignature, label: "Clear Audit Reporting" },
];

export default function ServicesDetails({ service }) {
  const { hero = {}, sections = [], footerNote, cta = {} } = service || {};

  const totalItems = sections.reduce(
    (total, section) => total + (section.items?.length || 0),
    0,
  );

  return (
    <section className="bg-[#f6f8fb] text-gray-900">
      {/* Premium Hero Section */}
      <div className="max-w-7xl mx-auto px-4 pt-8 md:pt-12">
        <div className="relative overflow-hidden rounded-[2rem] bg-secondary shadow-[0_30px_100px_rgba(15,23,42,0.18)]">
          {service?.image && (
            <Image
              src={service.image}
              alt={hero.title || service.title || "Service image"}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1280px"
              className="object-cover"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/85 to-secondary/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.14),transparent_28%)]" />

          <div className="relative z-10 grid min-h-[520px] lg:grid-cols-[1.05fr_0.95fr] items-center gap-8 p-6 md:p-10 lg:p-14">
            <div className="max-w-3xl text-white">
              <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.25em] text-primary">
                <span className="h-px w-12 bg-primary" />
                Dubai Audit & Advisory
              </div>

              <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight">
                {hero.title}
              </h1>

              <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-white/75">
                {hero.description1}
              </p>

              {hero.description2 && (
                <p className="mt-4 max-w-2xl leading-relaxed text-white/65">
                  {hero.description2}
                </p>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                {trustItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur"
                    >
                      <Icon className="text-primary" />
                      {item.label}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Snapshot Card */}
            <aside className="rounded-[1.5rem] border border-white/15 bg-white/10 p-5 md:p-6 text-white backdrop-blur-xl shadow-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                Service Snapshot
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                  <p className="text-4xl md:text-5xl font-bold">
                    {sections.length}
                  </p>
                  <p className="mt-2 text-sm text-white/60">Core areas</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                  <p className="text-4xl md:text-5xl font-bold">{totalItems}</p>
                  <p className="mt-2 text-sm text-white/60">Audit points</p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-5">
                <p className="text-sm text-white/60">Best for</p>
                <h3 className="mt-2 text-xl font-bold">
                  Compliance, Risk Review & Financial Reporting
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  A structured advisory process designed for clarity,
                  confidentiality, and UAE-focused compliance standards.
                </p>
              </div>

              <Link
                href="/contact"
                className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-6 py-4 font-semibold text-white transition hover:bg-primary_light"
              >
                <FaPhoneAlt />
                {cta.buttonText || "Request Consultation"}
                <FaArrowRight size={14} />
              </Link>
            </aside>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          {/* Sticky Sidebar */}
          <aside className="lg:sticky lg:top-24 h-fit rounded-[1.5rem] border border-gray-200 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.07)]">
            <div className="rounded-2xl bg-secondary p-5 text-white">
              <p className="text-sm font-bold uppercase tracking-wide text-primary">
                Audit Coverage
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Explore the complete service areas included in this audit and
                advisory coverage.
              </p>
            </div>

            <div className="mt-5 space-y-2">
              {sections.map((section, index) => (
                <a
                  key={section.title}
                  href={`#section-${index}`}
                  className="group flex gap-3 rounded-xl p-3 text-sm text-gray-600 transition hover:bg-primary/10 hover:text-primary"
                >
                  <span className="font-bold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-medium group-hover:text-primary">
                    {section.title}
                  </span>
                </a>
              ))}
            </div>
          </aside>

          {/* Section Details */}
          <div className="space-y-7">
            {sections.map((section, index) => (
              <article
                id={`section-${index}`}
                key={section.title}
                className="group overflow-hidden rounded-[1.5rem] border border-gray-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(15,23,42,0.10)]"
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary">
                      <FaClipboardCheck size={24} />
                    </div>

                    <div>
                      <p className="text-sm font-bold uppercase tracking-wide text-primary">
                        Coverage {String(index + 1).padStart(2, "0")}
                      </p>

                      <h2 className="mt-2 text-2xl md:text-3xl font-bold leading-tight text-secondary">
                        {section.title}
                      </h2>

                      <p className="mt-4 max-w-3xl leading-relaxed text-gray-600">
                        {section.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 grid md:grid-cols-2 gap-4">
                    {section.items?.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-[#f8fafc] p-5 transition hover:border-primary/30 hover:bg-white hover:shadow-md"
                      >
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <FaCheckCircle size={13} />
                        </span>

                        <span className="text-[15px] leading-relaxed text-gray-700">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/40 to-transparent opacity-0 transition group-hover:opacity-100" />
              </article>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        {footerNote && (
          <div className="mt-10 rounded-[1.5rem] border border-gray-200 border-l-4 border-l-primary bg-white p-6 text-gray-600 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
            <p className="leading-relaxed">{footerNote}</p>
          </div>
        )}
      </div>

      {/* Premium CTA */}
      <div className="bg-gradient-to-br from-[#f8fafc] via-white to-primary/5 px-4 pb-14 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="overflow-hidden rounded-[2rem] border border-primary/20 bg-white/90 shadow-[0_30px_100px_rgba(15,23,42,0.14)] backdrop-blur">
            <div className="grid lg:grid-cols-[1fr_340px] items-center gap-8 p-6 md:p-10">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-wide text-primary">
                  <span className="h-px w-10 bg-primary" />
                  {cta?.eyebrow || "Speak with MAH Audit Dubai"}
                </div>

                <h2 className="mt-4 text-2xl md:text-4xl font-bold leading-tight text-secondary">
                  {cta?.title || "Need a reliable audit partner in Dubai?"}
                </h2>

                <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-gray-600">
                  {cta?.description ||
                    "Get confidential guidance from experienced auditors for compliance, risk review, and financial reporting."}
                </p>

                <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium text-gray-600">
                  {(cta?.badges?.length
                    ? cta.badges
                    : [
                        "Confidential advisory",
                        "UAE compliance focused",
                        "Fast response",
                      ]
                  ).map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-secondary p-5 md:p-6 text-white shadow-xl">
                <p className="text-sm text-white/60">
                  {cta?.cardLabel || "Ready to talk?"}
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  {cta?.cardTitle || "Book a confidential consultation"}
                </h3>

                <Link
                  href={cta?.buttonLink || "/contact"}
                  className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-6 py-4 font-semibold text-white transition hover:bg-primary_light"
                >
                  <FaPhoneAlt />
                  {cta?.buttonText || "Request Consultation"}
                  <FaArrowRight size={14} />
                </Link>

                <p className="mt-4 text-center text-xs text-white/50">
                  {cta?.note || "No obligation. 100% confidential."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
