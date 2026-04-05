"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus } from "lucide-react";
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

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Contact Page</h1>

        <button
          onClick={() => router.push("/dashboard/contact/add")}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition"
        >
          <Plus size={18} /> {data ? "Edit Page" : "Add Page"}
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border border-border_color p-6">
        {loading ? (
          <div className="text-center text-gray-500">
            Loading contact page...
          </div>
        ) : !data ? (
          <div className="text-center text-gray-400">
            No contact page data found
          </div>
        ) : (
          <div className="space-y-6">
            {/* HERO */}
            <div>
              <h2 className="font-semibold text-lg mb-2">Hero Section</h2>
              <p className="text-sm text-gray-500">{data.hero?.badge}</p>
              <h3 className="text-xl font-bold">{data.hero?.title}</h3>
              <p className="text-gray-600">{data.hero?.description}</p>
            </div>

            {/* STATS */}
            <div>
              <h2 className="font-semibold text-lg mb-2">Stats</h2>
              <div className="flex gap-4 flex-wrap">
                {data.stats?.map((stat, i) => (
                  <div key={i} className="px-4 py-2 bg-gray-100 rounded-lg">
                    <div className="font-bold">{stat.number}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CONTACT INFO */}
            <div>
              <h2 className="font-semibold text-lg mb-2">Contact Info</h2>
              <div className="space-y-3">
                {data.contact_info?.map((item, i) => (
                  <div key={i} className="p-3 border rounded-lg">
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.text}</p>
                    <p className="text-primary font-medium">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* MAP */}
            <div>
              <h2 className="font-semibold text-lg mb-2">Map</h2>
              <div className="border rounded overflow-hidden h-[300px]">
                <iframe src={data.map_url} className="w-full h-full" />
              </div>
            </div>

            {/* EDIT BUTTON */}
            <div className="pt-4">
              <button
                onClick={() => router.push("/dashboard/contact/add")}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
