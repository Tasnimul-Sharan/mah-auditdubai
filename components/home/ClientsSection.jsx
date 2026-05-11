"use client";

import { useEffect, useState } from "react";
import { FaHandshake } from "react-icons/fa";
import SectionBadge from "../SectionBadge";
import OptimizedImage from "@/components/OptimizedImage";
import { supabaseServer } from "@/lib/supabaseServer";

export default function ClientsSection() {
  const [clients, setClients] = useState([]);

  const [sectionData, setSectionData] = useState({
    badge: "Our Clients",
    title: "Trusted by Leading Organizations",
    subtitle:
      "We collaborate with companies across the UAE and international markets, delivering reliable audit, compliance, and advisory services.",
  });

  const fetchClients = async () => {
    const { data, error } = await supabaseServer
      .from("clients")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Clients fetch error:", error);
      return;
    }

    setClients(data || []);

    if (data?.length > 0) {
      setSectionData({
        badge: data[0]?.badge || "Our Clients",
        title: data[0]?.title || "Trusted by Leading Organizations",
        subtitle:
          data[0]?.subtitle ||
          "We collaborate with companies across the UAE and international markets, delivering reliable audit, compliance, and advisory services.",
      });
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-28">
      <div className="absolute -top-24 left-1/2 h-[360px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-24 right-0 h-[260px] w-[520px] rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <div className="mb-5 flex justify-center">
            <SectionBadge
              icon={FaHandshake}
              className="flex items-center gap-2"
            >
              {sectionData.badge}
            </SectionBadge>
          </div>

          <h2 className="text-3xl font-bold text-secondary md:text-5xl">
            {sectionData.title}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-gray-600">
            {sectionData.subtitle}
          </p>
        </div>

        {clients.length === 0 ? (
          <p className="text-center text-gray-500">No clients found.</p>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {clients.map((client) => (
              <div
                key={client.id}
                className="group relative rounded-3xl bg-gradient-to-b from-gray-200 via-white to-transparent p-[1px] transition-all duration-700 hover:from-primary/50 hover:via-primary/20"
              >
                <div className="relative flex h-32 items-center justify-center overflow-hidden rounded-3xl border border-white/70 bg-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-all duration-700 group-hover:shadow-[0_25px_70px_rgba(0,0,0,0.12)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-white/40 to-secondary/10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                  <OptimizedImage
                    src={client.logo_url || "/placeholder.jpg"}
                    alt={client.name || "Client Logo"}
                    width={180}
                    height={100}
                    sizes="180px"
                    className="relative z-10 h-full max-h-32 w-full object-contain opacity-80 grayscale transition-all duration-700 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                </div>

                <div className="absolute inset-0 -z-10 rounded-3xl bg-primary/10 opacity-0 blur-2xl transition duration-700 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
