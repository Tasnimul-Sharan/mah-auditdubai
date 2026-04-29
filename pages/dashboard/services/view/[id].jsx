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
} from "lucide-react";
import { supabaseServer } from "@/lib/supabaseServer";

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

    if (!error) setService(data);
  };

  if (!service) {
    return <div className="p-10 text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Eye className="text-primary" size={28} />
          View Service
        </h1>

        <p className="text-gray-500 mt-1">
          Preview service content as saved in the database.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.08)]">
        {service.image && (
          <img
            src={service.image}
            alt={service.title || "Service Image"}
            className="h-[420px] w-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
          <span className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md">
            Service Preview
          </span>

          <h2 className="max-w-4xl text-3xl font-bold leading-tight text-white md:text-5xl">
            {service.hero?.title || service.title}
          </h2>

          {service.hero?.description1 && (
            <p className="mt-4 max-w-3xl text-white/85 leading-7">
              {service.hero.description1}
            </p>
          )}

          {service.hero?.description2 && (
            <p className="mt-2 max-w-3xl text-white/70 leading-7">
              {service.hero.description2}
            </p>
          )}
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)]">
        <div className="mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold text-gray-900">Overview</h2>
        </div>

        <p className="leading-8 text-gray-600">{service.description}</p>
      </div>

      {service.sections?.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {service.sections.map((sec, i) => (
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

              <p className="mb-5 leading-7 text-gray-600">{sec.description}</p>

              <ul className="space-y-3">
                {sec.items?.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 rounded-2xl bg-gray-50 p-3 text-sm text-gray-700"
                  >
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {service.cta?.title && (
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-primary to-secondary p-10 text-center text-white shadow-[0_25px_80px_rgba(0,0,0,0.16)]">
          <div className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-white/20 blur-3xl" />

          <div className="relative">
            <div className="mb-4 flex justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">
                <Megaphone className="h-6 w-6" />
              </span>
            </div>

            <h2 className="mb-3 text-2xl font-bold md:text-3xl">
              {service.cta.title}
            </h2>

            <p className="mx-auto mb-7 max-w-2xl leading-7 text-white/85">
              {service.cta.description}
            </p>

            {service.cta.buttonText && (
              <button className="rounded-full bg-white px-7 py-3 font-semibold text-primary shadow-lg transition-all duration-500 hover:-translate-y-1">
                {service.cta.buttonText}
              </button>
            )}
          </div>
        </div>
      )}

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
