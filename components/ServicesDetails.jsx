"use client";
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
import OptimizedImage from "./OptimizedImage";

const trustIconList = [FaShieldAlt, FaBalanceScale, FaFileSignature];

function parseJSON(value, fallback) {
  if (!value) return fallback;

  if (typeof value === "object") return value;

  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  }

  return fallback;
}

function getArray(value) {
  const parsed = parseJSON(value, []);

  return Array.isArray(parsed) ? parsed : [];
}

function getObject(value) {
  const parsed = parseJSON(value, {});

  return parsed && typeof parsed === "object" && !Array.isArray(parsed)
    ? parsed
    : {};
}

export default function ServicesDetails({ service }) {
  const hero = getObject(service?.hero);
  const sections = getArray(service?.sections);
  const cta = getObject(service?.cta);

  const footerNote = service?.footerNote || service?.footer_note || "";

  const trustItems = getArray(hero?.trust_items);
  const snapshot = getObject(hero?.snapshot);

  const totalItems = sections.reduce(
    (total, section) => total + (section.items?.length || 0),
    0,
  );

  return (
    <section className="bg-[#f6f8fb] text-gray-900">
      <div className="mx-auto max-w-7xl px-4 pt-8 md:pt-12">
        <div className="relative overflow-hidden rounded-[2rem] bg-secondary shadow-[0_30px_100px_rgba(15,23,42,0.18)]">
          {service?.image && (
            <OptimizedImage
              src={service.image}
              alt={hero?.title || service?.title || "Service image"}
              fill
              width={1280}
              priority
              sizes="(max-width: 768px) 100vw, 1280px"
              className="object-cover"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/85 to-secondary/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.14),transparent_28%)]" />

          <div className="relative z-10 grid min-h-[520px] items-center gap-8 p-6 md:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:p-14">
            <div className="max-w-3xl text-white">
              <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.25em] text-primary">
                <span className="h-px w-12 bg-primary" />
                {hero?.eyebrow || "Dubai Audit & Advisory"}
              </div>

              <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
                {hero?.title || service?.title}
              </h1>

              {hero?.description1 && (
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
                  {hero.description1}
                </p>
              )}

              {hero?.description2 && (
                <p className="mt-4 max-w-2xl leading-relaxed text-white/65">
                  {hero.description2}
                </p>
              )}

              {trustItems.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {trustItems.map((item, index) => {
                    const Icon = trustIconList[index % trustIconList.length];
                    const label =
                      typeof item === "string" ? item : item?.label || "";

                    if (!label) return null;

                    return (
                      <div
                        key={`${label}-${index}`}
                        className="flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur"
                      >
                        <Icon className="text-primary" />
                        {label}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Snapshot Card */}
            <aside className="rounded-[1.5rem] border border-white/15 bg-white/10 p-5 text-white shadow-2xl backdrop-blur-xl md:p-6">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                {snapshot?.label || "Service Snapshot"}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                  <p className="text-4xl font-bold md:text-5xl">
                    {sections.length}
                  </p>

                  <p className="mt-2 text-sm text-white/60">
                    {snapshot?.core_area_label || "Core areas"}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                  <p className="text-4xl font-bold md:text-5xl">{totalItems}</p>

                  <p className="mt-2 text-sm text-white/60">
                    {snapshot?.audit_points_label || "Audit points"}
                  </p>
                </div>
              </div>

              {(snapshot?.best_for_label ||
                snapshot?.best_for_title ||
                snapshot?.best_for_description) && (
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-5">
                  {snapshot?.best_for_label && (
                    <p className="text-sm text-white/60">
                      {snapshot.best_for_label}
                    </p>
                  )}

                  {snapshot?.best_for_title && (
                    <h3 className="mt-2 text-xl font-bold">
                      {snapshot.best_for_title}
                    </h3>
                  )}

                  {snapshot?.best_for_description && (
                    <p className="mt-3 text-sm leading-relaxed text-white/60">
                      {snapshot.best_for_description}
                    </p>
                  )}
                </div>
              )}

              <Link
                href={cta?.buttonLink || "/contact"}
                className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-6 py-4 font-semibold text-white transition hover:bg-primary_light"
              >
                <FaPhoneAlt />
                {cta?.buttonText || "Request Consultation"}
                <FaArrowRight size={14} />
              </Link>
            </aside>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          {/* Sticky Sidebar */}
          <aside className="h-fit rounded-[1.5rem] border border-gray-200 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.07)] lg:sticky lg:top-24">
            <div className="rounded-2xl bg-secondary p-5 text-white">
              <p className="text-sm font-bold uppercase tracking-wide text-primary">
                {hero?.sidebar_label || "Audit Coverage"}
              </p>

              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {hero?.sidebar_description ||
                  "Explore the complete service areas included in this audit and advisory coverage."}
              </p>
            </div>

            <div className="mt-5 space-y-2">
              {sections.map((section, index) => (
                <a
                  key={`${section.title}-${index}`}
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
            {sections.map((section, index) => {
              const items = Array.isArray(section?.items) ? section.items : [];

              return (
                <article
                  id={`section-${index}`}
                  key={`${section.title}-${index}`}
                  className="group overflow-hidden rounded-[1.5rem] border border-gray-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(15,23,42,0.10)]"
                >
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary">
                        <FaClipboardCheck size={24} />
                      </div>

                      <div>
                        <p className="text-sm font-bold uppercase tracking-wide text-primary">
                          Coverage {String(index + 1).padStart(2, "0")}
                        </p>

                        <h2 className="mt-2 text-2xl font-bold leading-tight text-secondary md:text-3xl">
                          {section.title}
                        </h2>

                        {section?.description && (
                          <p className="mt-4 max-w-3xl leading-relaxed text-gray-600">
                            {section.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {items.length > 0 && (
                      <div className="mt-8 grid gap-4 md:grid-cols-2">
                        {items.map((item, itemIndex) => (
                          <div
                            key={`${item}-${itemIndex}`}
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
                    )}
                  </div>

                  <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/40 to-transparent opacity-0 transition group-hover:opacity-100" />
                </article>
              );
            })}
          </div>
        </div>

        {/* Footer Note */}
        {footerNote && (
          <div className="mt-10 rounded-[1.5rem] border border-l-4 border-gray-200 border-l-primary bg-white p-6 text-gray-600 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
            <p className="leading-relaxed">{footerNote}</p>
          </div>
        )}
      </div>

      {/* Premium CTA */}
      <div className="bg-gradient-to-br from-[#f8fafc] via-white to-primary/5 px-4 pb-14 md:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[2rem] border border-primary/20 bg-white/90 shadow-[0_30px_100px_rgba(15,23,42,0.14)] backdrop-blur">
            <div className="grid items-center gap-8 p-6 md:p-10 lg:grid-cols-[1fr_340px]">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-wide text-primary">
                  <span className="h-px w-10 bg-primary" />
                  {cta?.eyebrow || "Speak with MAH Audit Dubai"}
                </div>

                <h2 className="mt-4 text-2xl font-bold leading-tight text-secondary md:text-4xl">
                  {cta?.title || "Need a reliable audit partner in Dubai?"}
                </h2>

                <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
                  {cta?.description ||
                    "Get confidential guidance from experienced auditors for compliance, risk review, and financial reporting."}
                </p>

                <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium text-gray-600">
                  {(Array.isArray(cta?.badges) && cta.badges.length > 0
                    ? cta.badges
                    : [
                        "Confidential advisory",
                        "UAE compliance focused",
                        "Fast response",
                      ]
                  ).map((badge, index) => (
                    <span
                      key={`${badge}-${index}`}
                      className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-secondary p-5 text-white shadow-xl md:p-6">
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
