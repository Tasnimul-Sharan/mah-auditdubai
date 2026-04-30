"use client";

import { useEffect, useState } from "react";
import {
  Pencil,
  Plus,
  MapPin,
  BarChart3,
  Contact,
  ImageIcon,
} from "lucide-react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/AdminLayout";
import { supabaseServer } from "@/lib/supabaseServer";

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

    if (!error) setData(res);

    setLoading(false);
  };

  const contactCards = Array.isArray(data?.contact_info)
    ? data.contact_info
    : data?.contact_info?.cards || [];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Contact Page</h1>
          <p className="text-gray-500 mt-1">
            Manage contact hero, stats, contact cards, map and SEO.
          </p>
        </div>

        <button
          onClick={() => router.push("/dashboard/contact/add")}
          className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-secondary transition-all duration-500"
        >
          <Plus size={18} /> {data ? "Edit Page" : "Add Page"}
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-border_color p-6 shadow-sm">
        {loading ? (
          <div className="text-center text-gray-500 py-10">
            Loading contact page...
          </div>
        ) : !data ? (
          <div className="text-center text-gray-400 py-10">
            No contact page data found
          </div>
        ) : (
          <div className="space-y-8">
            <div className="rounded-2xl border bg-gray-50 p-5 space-y-3">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <ImageIcon size={18} className="text-primary" />
                Top Page Hero
              </h2>

              {data.hero_image && (
                <img
                  src={data.hero_image}
                  alt=""
                  className="w-full max-h-64 object-cover rounded-xl"
                />
              )}

              <h3 className="text-xl font-bold">{data.hero_title}</h3>
            </div>

            <div className="rounded-2xl border bg-gray-50 p-5 space-y-2">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <Contact size={18} className="text-primary" />
                Contact Hero Section
              </h2>

              <p className="text-sm text-primary font-medium">
                {data.hero?.badge}
              </p>
              <h3 className="text-xl font-bold">{data.hero?.title}</h3>
              <p className="text-gray-600">{data.hero?.description}</p>
            </div>

            <div className="rounded-2xl border bg-gray-50 p-5">
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <BarChart3 size={18} className="text-primary" />
                Stats
              </h2>

              <div className="grid sm:grid-cols-3 gap-4">
                {(data.stats || []).map((stat, i) => (
                  <div
                    key={i}
                    className="px-5 py-4 bg-white border rounded-xl shadow-sm"
                  >
                    <div className="text-2xl font-bold text-primary">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border bg-gray-50 p-5">
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Contact size={18} className="text-primary" />
                Contact Info
              </h2>

              <div className="mb-5 bg-white border rounded-xl p-4">
                <h4 className="font-semibold">
                  {data.contact_info?.form_title}
                </h4>
                <p className="text-sm text-gray-500">
                  {data.contact_info?.form_subtitle}
                </p>
                <p className="text-primary font-medium mt-1">
                  Button: {data.contact_info?.button_text}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {contactCards.map((item, i) => (
                  <div key={i} className="p-4 bg-white border rounded-xl">
                    <p className="text-xs text-gray-400 mb-1">
                      Icon: {item.icon}
                    </p>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.text}</p>
                    <p className="text-primary font-medium">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border bg-gray-50 p-5">
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <MapPin size={18} className="text-primary" />
                Map
              </h2>

              <div className="border rounded-xl overflow-hidden h-[300px] bg-white">
                <iframe
                  src={data.map_url}
                  className="w-full h-full"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => router.push("/dashboard/contact/add")}
                className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-secondary transition-all duration-500"
              >
                <Pencil size={16} /> Edit Contact Page
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