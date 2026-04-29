"use client";

import { useEffect, useState } from "react";
import { FaHandshake } from "react-icons/fa";
import SectionBadge from "../SectionBadge";
import Image from "next/image";
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
    <section className="py-28 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[360px] bg-primary/10 blur-3xl rounded-full" />
      <div className="absolute -bottom-24 right-0 w-[520px] h-[260px] bg-secondary/10 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-20">
          <div className="flex justify-center mb-5">
            <SectionBadge
              icon={FaHandshake}
              className="flex items-center gap-2"
            >
              {sectionData.badge}
            </SectionBadge>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-secondary">
            {sectionData.title}
          </h2>

          <p className="text-gray-600 mt-5 max-w-2xl mx-auto leading-relaxed">
            {sectionData.subtitle}
          </p>
        </div>

        {clients.length === 0 ? (
          <p className="text-center text-gray-500">No clients found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {clients.map((client) => (
              <div
                key={client.id}
                className="relative group rounded-3xl p-[1px]
                bg-gradient-to-b from-gray-200 via-white to-transparent
                hover:from-primary/50 hover:via-primary/20
                transition-all duration-700"
              >
                <div
                  className="relative bg-white/80 backdrop-blur-xl rounded-3xl h-32
                  flex items-center justify-center overflow-hidden
                  border border-white/70
                  shadow-[0_10px_30px_rgba(0,0,0,0.04)]
                  group-hover:shadow-[0_25px_70px_rgba(0,0,0,0.12)]
                  transition-all duration-700"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100
                    bg-gradient-to-br from-primary/10 via-white/40 to-secondary/10
                    transition-opacity duration-700"
                  />

                  <Image
                    src={client.logo_url}
                    alt="Client Logo"
                    width={180}
                    height={90}
                    className="relative z-10 max-h-20 w-full h-full object-contain opacity-80 grayscale
                    group-hover:opacity-100 group-hover:grayscale-0
                    group-hover:scale-110 transition-all duration-700"
                  />
                </div>

                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-700 blur-2xl bg-primary/10 -z-10" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
