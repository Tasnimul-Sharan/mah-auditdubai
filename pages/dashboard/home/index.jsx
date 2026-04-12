"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Save } from "lucide-react";
import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export default function HomeDashboard() {
  const [meta, setMeta] = useState({
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    meta_author: "",
    meta_url: "",
    meta_image: "",
  });

  const [rowId, setRowId] = useState(null);

  // ================= FETCH =================
  const fetchHomeSettings = async () => {
    const { data } = await supabaseServer
      .from("home_page")
      .select("*")
      .single();

    if (data) {
      setMeta(data);
      setRowId(data.id);
    }
  };

  useEffect(() => {
    fetchHomeSettings();
  }, []);

  // ================= SAVE =================
  const saveMeta = async () => {
    try {
      if (rowId) {
        await supabaseServer.from("home_page").update(meta).eq("id", rowId);
      } else {
        const { data } = await supabaseServer
          .from("home_page")
          .insert([meta])
          .select()
          .single();

        setRowId(data.id);
      }

      alert("Meta updated successfully");
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  // ================= SECTIONS =================
  const sections = [
    { name: "Landing Page", link: "/dashboard/hero-slides" },
    { name: "About Us", link: "/dashboard/about" },
    { name: "Services", link: "/dashboard/services" },
    { name: "Stats", link: "/dashboard/stats" },
    { name: "Why Choose Us", link: "/dashboard/why-us" },
    { name: "Industries", link: "/dashboard/industries" },
    { name: "Clients", link: "/dashboard/clients" },
    { name: "Testimonials", link: "/dashboard/testimonials" },
    { name: "Blogs", link: "/dashboard/blogs" },
    { name: "Contact", link: "/dashboard/contact" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Home Page Management</h1>

      {/* ================= SECTION BOXES ================= */}
      <div className="grid md:grid-cols-3 gap-6">
        {sections.map((section, i) => (
          <div
            key={i}
            className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold mb-3">{section.name}</h2>

            <p className="text-gray-500 text-sm mb-4">
              Manage {section.name} content
            </p>

            <Link href={section.link}>
              <button className="bg-primary text-white px-4 py-2 rounded-lg">
                Edit Section
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* ================= META SETTINGS ================= */}
      <div className="bg-white p-8 rounded-2xl border shadow-sm space-y-4">
        <h2 className="text-2xl font-bold mb-4">SEO Meta Tags</h2>

        <input
          placeholder="Meta Title"
          value={meta.meta_title}
          onChange={(e) => setMeta({ ...meta, meta_title: e.target.value })}
          className="border p-3 w-full rounded"
        />

        <textarea
          placeholder="Meta Description"
          value={meta.meta_description}
          onChange={(e) =>
            setMeta({ ...meta, meta_description: e.target.value })
          }
          className="border p-3 w-full rounded"
        />

        <textarea
          placeholder="Meta Keywords"
          value={meta.meta_keywords}
          onChange={(e) => setMeta({ ...meta, meta_keywords: e.target.value })}
          className="border p-3 w-full rounded"
        />

        <input
          placeholder="Meta Author"
          value={meta.meta_author}
          onChange={(e) => setMeta({ ...meta, meta_author: e.target.value })}
          className="border p-3 w-full rounded"
        />

        <input
          placeholder="Meta URL"
          value={meta.meta_url}
          onChange={(e) => setMeta({ ...meta, meta_url: e.target.value })}
          className="border p-3 w-full rounded"
        />

        <input
          placeholder="Meta Image"
          value={meta.meta_image}
          onChange={(e) => setMeta({ ...meta, meta_image: e.target.value })}
          className="border p-3 w-full rounded"
        />

        <button
          onClick={saveMeta}
          className="bg-primary text-white px-6 py-3 rounded-lg flex gap-2"
        >
          <Save size={18} /> Save Meta
        </button>
      </div>
    </div>
  );
}

HomeDashboard.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
