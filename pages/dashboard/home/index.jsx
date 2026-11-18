"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Save, ArrowRight, Home, Search, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";
import StatusModal from "@/components/StatusModal";

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
  const [saving, setSaving] = useState(false);

  const [modal, setModal] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const showModal = (type, message) => {
    setModal({
      show: true,
      type,
      message,
    });
  };

  const closeModal = () => {
    setModal({
      show: false,
      type: "success",
      message: "",
    });
  };

  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

  const cardClass =
    "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)]";

  const fetchHomeSettings = async () => {
    const { data, error } = await supabaseServer
      .from("home_page")
      .select("*")
      .single();

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      setMeta({
        meta_title: data.meta_title || "",
        meta_description: data.meta_description || "",
        meta_keywords: data.meta_keywords || "",
        meta_author: data.meta_author || "",
        meta_url: data.meta_url || "",
        meta_image: data.meta_image || "",
      });
      setRowId(data.id);
    }
  };

  useEffect(() => {
    fetchHomeSettings();
  }, []);

  const saveMeta = async () => {
    try {
      setSaving(true);

      if (rowId) {
        const { error } = await supabaseServer
          .from("home_page")
          .update(meta)
          .eq("id", rowId);

        if (error) throw error;
      } else {
        const { data, error } = await supabaseServer
          .from("home_page")
          .insert([meta])
          .select()
          .single();

        if (error) throw error;
        setRowId(data.id);
      }

      showModal("success", "Home page meta updated successfully.");
      fetchHomeSettings();
    } catch (err) {
      console.error(err);
      showModal("error", "Save failed. Please check your data and try again.");
    } finally {
      setSaving(false);
    }
  };

  const sections = [
    { name: "Landing Page", link: "/dashboard/hero-slides" },
    { name: "About Us", link: "/dashboard/about-section" },
    { name: "Services", link: "/dashboard/services" },
    { name: "Stats", link: "/dashboard/stats" },
    { name: "Why Choose Us", link: "/dashboard/why-choose" },
    { name: "Industries", link: "/dashboard/industries" },
    { name: "Clients", link: "/dashboard/clients" },
    { name: "Testimonials", link: "/dashboard/testimonials" },
    { name: "Blogs", link: "/dashboard/blogs" },
    { name: "Contact", link: "/dashboard/contact" },
  ];

  return (
    <>
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-[2rem] border border-gray-100 bg-gradient-to-br from-white via-white to-primary/5 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Home size={26} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Home Page Management
              </h1>
              <p className="mt-2 max-w-2xl text-gray-500">
                Manage homepage sections, content modules and SEO metadata from
                one dashboard.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, i) => (
            <Link key={i} href={section.link}>
              <div className="group relative h-full overflow-hidden rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_14px_40px_rgba(0,0,0,0.04)] transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(0,0,0,0.1)]">
                <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-gradient-to-br from-primary/8 via-white to-secondary/8" />

                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-700 group-hover:bg-primary group-hover:text-white">
                      <LayoutDashboard size={20} />
                    </div>

                    <h2 className="text-lg font-bold text-gray-900">
                      {section.name}
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                      Manage {section.name} content
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all duration-700 group-hover:bg-primary group-hover:text-white group-hover:translate-x-1">
                    <ArrowRight size={18} />
                  </div>
                </div>

                <div className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Edit Section
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-500 group-hover:translate-x-1"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className={`${cardClass} space-y-5`}>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
            <Search size={22} className="text-primary" />
            SEO Meta Tags
          </h2>

          <input
            placeholder="Meta Title"
            value={meta.meta_title}
            onChange={(e) => setMeta({ ...meta, meta_title: e.target.value })}
            className={inputClass}
          />

          <textarea
            placeholder="Meta Description"
            value={meta.meta_description}
            onChange={(e) =>
              setMeta({ ...meta, meta_description: e.target.value })
            }
            rows={4}
            className={inputClass}
          />

          <textarea
            placeholder="Meta Keywords"
            value={meta.meta_keywords}
            onChange={(e) =>
              setMeta({ ...meta, meta_keywords: e.target.value })
            }
            rows={3}
            className={inputClass}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <input
              placeholder="Meta Author"
              value={meta.meta_author}
              onChange={(e) =>
                setMeta({ ...meta, meta_author: e.target.value })
              }
              className={inputClass}
            />

            <input
              placeholder="Meta URL"
              value={meta.meta_url}
              onChange={(e) => setMeta({ ...meta, meta_url: e.target.value })}
              className={inputClass}
            />
          </div>

          <input
            placeholder="Meta Image"
            value={meta.meta_image}
            onChange={(e) => setMeta({ ...meta, meta_image: e.target.value })}
            className={inputClass}
          />

          <button
            type="button"
            onClick={saveMeta}
            disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(0,0,0,0.16)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary disabled:opacity-60"
          >
            <Save size={18} />
            {saving ? "Saving..." : "Save Meta"}
          </button>
        </div>
      </div>

      <StatusModal
        show={modal.show}
        type={modal.type}
        message={modal.message}
        onClose={closeModal}
      />
    </>
  );
}

HomeDashboard.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
