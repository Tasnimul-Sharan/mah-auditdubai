"use client";

import { useEffect, useState } from "react";
import {
  Pencil,
  Plus,
  MapPin,
  BarChart3,
  Contact,
  ImageIcon,
  FileText,
  Search,
  Send,
  ShieldCheck,
  AlertTriangle,
  Mail,
  KeyRound,
  Database,
  Clock,
  Link as LinkIcon,
} from "lucide-react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/AdminLayout";
import OptimizedImage from "@/components/OptimizedImage";
import { supabaseServer } from "@/lib/supabaseServer";

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

function formatDateTime(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(date);
}

function InfoRow({ label, value }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400">
        {label}
      </p>

      <p className="break-words text-sm leading-7 text-gray-700">
        {value || "—"}
      </p>
    </div>
  );
}

function SectionCard({ icon, title, children }) {
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-gray-100 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary_light to-secondary" />

      <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-gray-900">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          {icon}
        </span>
        {title}
      </h2>

      {children}
    </div>
  );
}

export default function ContactIndexPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    fetchContactPage();
  }, []);

  const fetchContactPage = async () => {
    setLoading(true);

    const { data: res, error } = await supabaseServer
      .from("contact_page")
      .select("*")
      .single();

    if (error) {
      console.error("Contact page fetch error:", error);
      setData(null);
    } else {
      setData(res || null);
    }

    setLoading(false);
  };

  const hero = getObject(data?.hero);
  const stats = getArray(data?.stats);
  const contactInfo = getObject(data?.contact_info);
  const contactCards = Array.isArray(contactInfo?.cards)
    ? contactInfo.cards
    : getArray(data?.contact_info);

  const formContent = getObject(data?.form_content);
  const formFields = getObject(formContent?.fields);

  const fieldEntries = ["name", "email", "subject", "message"].map((key) => ({
    key,
    ...getObject(formFields?.[key]),
  }));

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* HEADER */}
      <div className="relative overflow-hidden rounded-[2rem] border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-primary/10 p-7 shadow-[0_25px_80px_rgba(15,23,42,0.07)]">
        <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              <Contact size={14} />
              Contact Page
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
              Contact Page Data Preview
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500">
              View all saved contact page content, hero data, form settings,
              contact cards, map, SEO metadata and system information.
            </p>
          </div>

          <button
            onClick={() => router.push("/dashboard/contact/add")}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 font-semibold text-white shadow-[0_16px_40px_rgba(15,23,42,0.15)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary"
          >
            {data ? <Pencil size={18} /> : <Plus size={18} />}
            {data ? "Edit Page" : "Add Page"}
          </button>
        </div>

        {data && (
          <div className="relative mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
                Stats
              </p>
              <p className="mt-1 text-3xl font-extrabold text-primary">
                {stats.length}
              </p>
            </div>

            <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
                Cards
              </p>
              <p className="mt-1 text-3xl font-extrabold text-secondary">
                {contactCards.length}
              </p>
            </div>

            <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
                Form Fields
              </p>
              <p className="mt-1 text-3xl font-extrabold text-primary">
                {fieldEntries.length}
              </p>
            </div>

            <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
                SEO
              </p>
              <p className="mt-1 text-3xl font-extrabold text-secondary">
                {data.meta_title ? "ON" : "—"}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-[1.75rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)]">
        {loading ? (
          <div className="py-12 text-center text-gray-500">
            Loading contact page...
          </div>
        ) : !data ? (
          <div className="py-12 text-center text-gray-400">
            No contact page data found
          </div>
        ) : (
          <div className="space-y-8">
            {/* TOP PAGE HERO */}
            <SectionCard icon={<ImageIcon size={20} />} title="Top Page Hero">
              <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
                <div className="space-y-4">
                  <InfoRow label="Hero Title" value={data.hero_title} />
                  <InfoRow label="Hero Image URL" value={data.hero_image} />
                  <InfoRow label="Public ID" value={data.public_id} />
                </div>

                {data.hero_image && (
                  <div className="relative min-h-[260px] overflow-hidden rounded-3xl border bg-gray-50">
                    <OptimizedImage
                      src={data.hero_image}
                      alt={data.hero_title || "Contact hero image"}
                      fill
                      width={900}
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </SectionCard>

            {/* CONTACT HERO */}
            <SectionCard
              icon={<Contact size={20} />}
              title="Contact Hero Section"
            >
              <div className="grid gap-4 md:grid-cols-3">
                <InfoRow label="Badge" value={hero.badge} />
                <InfoRow label="Title" value={hero.title} />
                <InfoRow label="Description" value={hero.description} />
              </div>
            </SectionCard>

            {/* CONTACT FORM CONTENT */}
            <SectionCard icon={<Send size={20} />} title="Contact Form Content">
              <div className="grid gap-4 md:grid-cols-2">
                <InfoRow label="Form Badge" value={formContent.badge} />
                <InfoRow label="Form Title" value={formContent.title} />
                <InfoRow
                  label="Form Description"
                  value={formContent.description}
                />
                <InfoRow label="Endpoint" value={formContent.endpoint} />
                <InfoRow label="Access Key" value={formContent.access_key} />
                <InfoRow label="Submit Text" value={formContent.submit_text} />
                <InfoRow
                  label="Submitting Text"
                  value={formContent.submitting_text}
                />
              </div>
            </SectionCard>

            {/* FORM FIELDS */}
            <SectionCard icon={<Mail size={20} />} title="Form Fields">
              <div className="grid gap-4 md:grid-cols-2">
                {fieldEntries.map((field) => (
                  <div
                    key={field.key}
                    className="rounded-2xl border border-gray-100 bg-gray-50 p-5"
                  >
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-gray-600">
                        {field.key} Field
                      </h3>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          field.required
                            ? "bg-primary/10 text-primary"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {field.required ? "Required" : "Optional"}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <InfoRow label="Label" value={field.label} />
                      <InfoRow label="Placeholder" value={field.placeholder} />
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* SUCCESS / ERROR MESSAGES */}
            <SectionCard
              icon={<ShieldCheck size={20} />}
              title="Success & Error Messages"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <InfoRow
                  label="Success Title"
                  value={formContent.success_title}
                />
                <InfoRow
                  label="Success Message"
                  value={formContent.success_message}
                />
                <InfoRow label="Error Title" value={formContent.error_title} />
                <InfoRow
                  label="Error Message"
                  value={formContent.error_message}
                />
                <InfoRow
                  label="Network Error Message"
                  value={formContent.network_error_message}
                />
              </div>
            </SectionCard>

            {/* STATS */}
            <SectionCard icon={<BarChart3 size={20} />} title="Stats">
              {stats.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-3">
                  {stats.map((stat, i) => (
                    <div
                      key={`${stat.number}-${i}`}
                      className="rounded-2xl border border-gray-100 bg-gray-50 p-5 text-center"
                    >
                      <div className="text-4xl font-extrabold text-primary">
                        {stat.number || "—"}
                      </div>

                      <div className="mt-2 text-sm font-medium text-gray-500">
                        {stat.label || "—"}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No stats found.</p>
              )}
            </SectionCard>

            {/* CONTACT INFO */}
            <SectionCard icon={<Contact size={20} />} title="Contact Info">
              {contactCards.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-3">
                  {contactCards.map((item, i) => (
                    <div
                      key={`${item.title}-${i}`}
                      className="rounded-2xl border border-gray-100 bg-gray-50 p-5"
                    >
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                        Icon: {item.icon || "—"}
                      </p>

                      <h4 className="text-lg font-bold text-gray-900">
                        {item.title || "—"}
                      </h4>

                      <p className="mt-2 text-sm leading-6 text-gray-500">
                        {item.text || "—"}
                      </p>

                      <p className="mt-3 break-words font-semibold text-primary">
                        {item.value || "—"}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No contact cards found.</p>
              )}
            </SectionCard>

            {/* MAP */}
            <SectionCard icon={<MapPin size={20} />} title="Map">
              <div className="space-y-4">
                <InfoRow label="Map URL" value={data.map_url} />

                {data.map_url && (
                  <div className="h-[340px] overflow-hidden rounded-3xl border bg-gray-50">
                    <iframe
                      src={data.map_url}
                      title="MAH Audit Dubai location map"
                      className="h-full w-full"
                      style={{ border: 0 }}
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </SectionCard>

            {/* SEO META */}
            <SectionCard icon={<Search size={20} />} title="SEO Metadata">
              <div className="grid gap-4 md:grid-cols-2">
                <InfoRow label="Meta Title" value={data.meta_title} />
                <InfoRow
                  label="Meta Description"
                  value={data.meta_description}
                />
                <InfoRow label="Meta Keywords" value={data.meta_keywords} />
                <InfoRow label="Meta Author" value={data.meta_author} />
                <InfoRow label="Meta URL" value={data.meta_url} />
                <InfoRow label="Meta Image" value={data.meta_image} />
              </div>

              {/* {data.meta_image && (
                <div className="mt-5 relative h-52 w-full overflow-hidden rounded-3xl border bg-gray-50">
                  <OptimizedImage
                    src={data.meta_image}
                    alt="Meta preview"
                    fill
                    width={900}
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover"
                  />
                </div>
              )} */}
            </SectionCard>

            {/* SYSTEM INFO */}
            <SectionCard icon={<Database size={20} />} title="System Info">
              <div className="grid gap-4 md:grid-cols-2">
                <InfoRow label="ID" value={data.id} />
                <InfoRow label="Public ID" value={data.public_id} />
                <InfoRow
                  label="Created At"
                  value={formatDateTime(data.created_at)}
                />
                <InfoRow
                  label="Updated At"
                  value={formatDateTime(data.updated_at)}
                />
              </div>
            </SectionCard>

            <div className="pt-2">
              <button
                onClick={() => router.push("/dashboard/contact/add")}
                className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 font-semibold text-white shadow-[0_16px_40px_rgba(15,23,42,0.15)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary"
              >
                <Pencil size={16} />
                Edit Contact Page
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

ContactIndexPage.getLayout = function getLayout(page) {
  return <AdminLayout title="Contact Page">{page}</AdminLayout>;
};
