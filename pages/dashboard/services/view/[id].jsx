"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/AdminLayout";

import { FileText, Layers, CheckCircle, Megaphone, Info } from "lucide-react";

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

  if (!service)
    return <div className="p-6 text-center text-gray-500">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-12 p-6">
      {/* HERO IMAGE */}
      {service.image && (
        <div className="rounded-3xl overflow-hidden shadow-lg">
          <img src={service.image} className="w-full h-[400px] object-cover" />
        </div>
      )}

      {/* HERO TEXT */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          {service.hero?.title || service.title}
        </h1>

        <p className="text-gray-600">{service.hero?.description1}</p>

        <p className="text-gray-500 mt-2">{service.hero?.description2}</p>
      </div>

      {/* OVERVIEW */}
      <div className="bg-white p-6 rounded-2xl border shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Overview</h2>
        </div>

        <p className="text-gray-600 leading-relaxed">{service.description}</p>
      </div>

      {/* SECTIONS */}
      <div className="grid md:grid-cols-2 gap-6">
        {service.sections?.map((sec, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">{sec.title}</h3>
            </div>

            <p className="text-gray-600 mb-4">{sec.description}</p>

            <ul className="space-y-2">
              {sec.items?.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* CTA */}
      {service.cta?.title && (
        <div className="bg-gradient-to-r from-primary to-secondary text-white p-10 rounded-3xl text-center shadow-lg">
          <div className="flex justify-center mb-3">
            <Megaphone className="w-6 h-6" />
          </div>

          <h2 className="text-2xl font-bold mb-3">{service.cta.title}</h2>

          <p className="mb-6 opacity-90">{service.cta.description}</p>

          <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:scale-105 transition">
            {service.cta.buttonText}
          </button>
        </div>
      )}

      {/* FOOTER */}
      {service.footer_note && (
        <div className="text-center text-gray-500 text-sm border-t pt-6 flex items-center justify-center gap-2">
          <Info className="w-4 h-4" />
          {service.footer_note}
        </div>
      )}
    </div>
  );
}

ViewService.getLayout = (page) => (
  <AdminLayout title="View Service">{page}</AdminLayout>
);
