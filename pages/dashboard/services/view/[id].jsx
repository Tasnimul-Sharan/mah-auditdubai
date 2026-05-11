"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/AdminLayout";
import {
  FileText,
  Layers,
  CheckCircle,
  Megaphone,
  Info,
  Eye,
  ShieldCheck,
  ClipboardList,
  BadgeCheck,
  Link as LinkIcon,
} from "lucide-react";
import { supabaseServer } from "@/lib/supabaseServer";
import OptimizedImage from "@/components/OptimizedImage";

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

function getObject(value) {
  const parsed = parseJSON(value, {});

  return parsed && typeof parsed === "object" && !Array.isArray(parsed)
    ? parsed
    : {};
}

function getArray(value) {
  const parsed = parseJSON(value, []);

  return Array.isArray(parsed) ? parsed : [];
}

export default function ViewService() {
  const router = useRouter();
  const { id } = router.query;

  const [service, setService] = useState(null);

  useEffect(() => {
    if (id) fetchService();
  }, [id]);

  const fetchService = async () => {
    const { data, error } = await supabaseServer
      .from("services")
      .select("*")
      .eq("slug", id)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setService(data);
  };

  if (!service) {
    return <div className="p-10 text-center text-gray-500">Loading...</div>;
  }

  const hero = getObject(service.hero);
  const sections = getArray(service.sections);
  const cta = getObject(service.cta);
  const trustItems = getArray(hero.trust_items);
  const snapshot = getObject(hero.snapshot);

  const totalItems = sections.reduce(
    (total, section) => total + (section.items?.length || 0),
    0,
  );

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Eye className="text-primary" size={28} />
          View Service
        </h1>

        <p className="mt-1 text-gray-500">
          Preview service content as saved in the database.
        </p>
      </div>

      {/* HERO PREVIEW */}
      <div className="relative overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.08)]">
        {service.image && (
          <div className="relative h-[460px] w-full">
            <OptimizedImage
              src={service.image}
              alt={service.title || "Service Image"}
              fill
              width={1200}
              sizes="(max-width: 768px) 100vw, 1152px"
              className="object-cover"
              priority
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
          <span className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md">
            Service Preview
          </span>

          <h2 className="max-w-4xl text-3xl font-bold leading-tight text-white md:text-5xl">
            {hero?.title || service.title}
          </h2>

          {hero?.description1 && (
            <p className="mt-4 max-w-3xl leading-7 text-white/85">
              {hero.description1}
            </p>
          )}

          {hero?.description2 && (
            <p className="mt-2 max-w-3xl leading-7 text-white/70">
              {hero.description2}
            </p>
          )}

          {trustItems.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {trustItems.map((item, index) => {
                const label = typeof item === "string" ? item : item?.label;

                if (!label) return null;

                return (
                  <span
                    key={`${label}-${index}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md"
                  >
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    {label}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* OVERVIEW */}
      <div className="rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)]">
        <div className="mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold text-gray-900">Overview</h2>
        </div>

        <p className="leading-8 text-gray-600">{service.description}</p>
      </div>

      {/* SERVICE SNAPSHOT */}
      <div className="rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)]">
        <div className="mb-5 flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold text-gray-900">
            {snapshot?.label || "Service Snapshot"}
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-gray-50 p-5">
            <p className="text-4xl font-bold text-secondary">
              {sections.length}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              {snapshot?.core_area_label || "Core areas"}
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-5">
            <p className="text-4xl font-bold text-secondary">{totalItems}</p>
            <p className="mt-2 text-sm text-gray-500">
              {snapshot?.audit_points_label || "Audit points"}
            </p>
          </div>
        </div>

        {(snapshot?.best_for_label ||
          snapshot?.best_for_title ||
          snapshot?.best_for_description) && (
          <div className="mt-5 rounded-2xl border border-primary/10 bg-primary/5 p-5">
            {snapshot?.best_for_label && (
              <p className="text-sm font-semibold text-primary">
                {snapshot.best_for_label}
              </p>
            )}

            {snapshot?.best_for_title && (
              <h3 className="mt-2 text-xl font-bold text-secondary">
                {snapshot.best_for_title}
              </h3>
            )}

            {snapshot?.best_for_description && (
              <p className="mt-3 leading-7 text-gray-600">
                {snapshot.best_for_description}
              </p>
            )}
          </div>
        )}
      </div>

      {/* SECTIONS */}
      {sections.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((sec, i) => (
            <div
              key={i}
              className="group rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(0,0,0,0.1)]"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-700 group-hover:bg-primary group-hover:text-white">
                  <Layers size={20} />
                </span>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                    Section {i + 1}
                  </p>

                  <h3 className="text-lg font-bold text-gray-900">
                    {sec.title}
                  </h3>
                </div>
              </div>

              {sec.description && (
                <p className="mb-5 leading-7 text-gray-600">
                  {sec.description}
                </p>
              )}

              {Array.isArray(sec.items) && sec.items.length > 0 && (
                <ul className="space-y-3">
                  {sec.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 rounded-2xl bg-gray-50 p-3 text-sm text-gray-700"
                    >
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* CTA PREVIEW */}
      {(cta?.title || cta?.cardTitle || cta?.buttonText) && (
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-primary to-secondary p-8 text-white shadow-[0_25px_80px_rgba(0,0,0,0.16)] md:p-10">
          <div className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-white/20 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_340px] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                <Megaphone className="h-4 w-4" />
                {cta?.eyebrow || "CTA Content"}
              </div>

              {cta?.title && (
                <h2 className="text-2xl font-bold md:text-3xl">{cta.title}</h2>
              )}

              {cta?.description && (
                <p className="mt-4 max-w-2xl leading-7 text-white/85">
                  {cta.description}
                </p>
              )}

              {Array.isArray(cta?.badges) && cta.badges.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {cta.badges.map((badge, index) => (
                    <span
                      key={`${badge}-${index}`}
                      className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-md"
                    >
                      <BadgeCheck className="h-4 w-4" />
                      {badge}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl bg-secondary/80 p-6 shadow-xl backdrop-blur-md">
              <p className="text-sm text-white/60">
                {cta?.cardLabel || "Ready to talk?"}
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                {cta?.cardTitle || "Book a confidential consultation"}
              </h3>

              {cta?.buttonText && (
                <div className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 font-semibold text-primary shadow-lg">
                  {cta.buttonText}
                </div>
              )}

              {cta?.buttonLink && (
                <p className="mt-4 flex items-center justify-center gap-2 text-xs text-white/55">
                  <LinkIcon className="h-3.5 w-3.5" />
                  {cta.buttonLink}
                </p>
              )}

              {cta?.note && (
                <p className="mt-3 text-center text-xs text-white/50">
                  {cta.note}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FOOTER NOTE */}
      {service.footer_note && (
        <div className="flex items-center justify-center gap-2 rounded-2xl border border-gray-100 bg-white p-5 text-center text-sm text-gray-500 shadow-sm">
          <Info className="h-4 w-4 text-primary" />
          {service.footer_note}
        </div>
      )}
    </div>
  );
}

ViewService.getLayout = (page) => (
  <AdminLayout title="View Service">{page}</AdminLayout>
);