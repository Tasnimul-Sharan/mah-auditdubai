"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Save, Trash2, ImageIcon, Search, Layers } from "lucide-react";
import { supabaseServer } from "@/lib/supabaseServer";
import { useUpload } from "@/Hooks/useUpload";
import OptimizedImage from "@/components/OptimizedImage";

export default function ServicesDashboard() {
  const { uploadFile } = useUpload();

  const [meta, setMeta] = useState({
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    meta_author: "",
    meta_url: "",
    meta_image: "",
    hero_title: "",
    hero_image: "",
    public_id: null,
  });

  const [rowId, setRowId] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);

  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

  const cardClass =
    "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-4";

  const fetchData = async () => {
    const { data } = await supabaseServer
      .from("services_page")
      .select("*")
      .single();

    if (data) {
      setMeta({
        meta_title: data.meta_title || "",
        meta_description: data.meta_description || "",
        meta_keywords: data.meta_keywords || "",
        meta_author: data.meta_author || "",
        meta_url: data.meta_url || "",
        meta_image: data.meta_image || "",
        hero_title: data.hero_title || "",
        hero_image: data.hero_image || "",
        public_id: data.public_id || null,
      });

      setRowId(data.id);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const deleteImage = async () => {
    if (!meta?.public_id || !rowId) return;

    try {
      await fetch("/api/delete-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_id: meta.public_id }),
      });

      await supabaseServer
        .from("services_page")
        .update({ hero_image: null, public_id: null })
        .eq("id", rowId);

      setPreview("");
      setFile(null);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Image delete failed");
    }
  };

  const saveData = async () => {
    try {
      setSaving(true);

      let imageUrl = meta.hero_image;
      let publicId = meta.public_id;

      if (file) {
        if (meta.public_id) {
          await fetch("/api/delete-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ public_id: meta.public_id }),
          });
        }

        const res = await uploadFile(file, "services");

        imageUrl = res.url;
        publicId = res.public_id;
      }

      const payload = {
        meta_title: meta.meta_title,
        meta_description: meta.meta_description,
        meta_keywords: meta.meta_keywords,
        meta_author: meta.meta_author,
        meta_url: meta.meta_url,
        meta_image: meta.meta_image,
        hero_title: meta.hero_title,
        hero_image: imageUrl,
        public_id: publicId,
      };

      if (rowId) {
        const { error } = await supabaseServer
          .from("services_page")
          .update(payload)
          .eq("id", rowId);

        if (error) throw error;
      } else {
        const { data, error } = await supabaseServer
          .from("services_page")
          .insert([payload])
          .select()
          .single();

        if (error) throw error;
        setRowId(data.id);
      }

      setFile(null);
      setPreview("");
      alert("Saved successfully");
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Layers className="text-primary" size={28} />
          Services Page Management
        </h1>

        <p className="text-gray-500 mt-1">
          Manage services page hero content, image and SEO metadata.
        </p>
      </div>

      <div className={cardClass}>
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <ImageIcon size={20} className="text-primary" />
          Hero Section
        </h2>

        <input
          placeholder="Hero Title"
          value={meta.hero_title || ""}
          onChange={(e) =>
            setMeta({
              ...meta,
              hero_title: e.target.value,
            })
          }
          className={inputClass}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={inputClass}
        />

        {(preview || meta.hero_image) && (
          <div className="relative w-fit rounded-2xl border bg-gray-50 p-3">
            <div className="relative h-44 w-72 overflow-hidden rounded-xl">
              <OptimizedImage
                src={preview || meta.hero_image}
                alt="Hero Preview"
                fill
                width={700}
                sizes="288px"
                className="object-cover"
                unoptimized={Boolean(preview)}
              />
            </div>

            {!preview && meta.hero_image && (
              <button
                type="button"
                onClick={deleteImage}
                className="absolute top-4 right-4 rounded-lg bg-red-500 p-2 text-white transition-all duration-500 hover:bg-red-600"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        )}
      </div>

      <div className={cardClass}>
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <Search size={20} className="text-primary" />
          SEO Meta
        </h2>

        <input
          placeholder="Meta Title"
          value={meta.meta_title || ""}
          onChange={(e) =>
            setMeta({
              ...meta,
              meta_title: e.target.value,
            })
          }
          className={inputClass}
        />

        <textarea
          placeholder="Meta Description"
          value={meta.meta_description || ""}
          onChange={(e) =>
            setMeta({
              ...meta,
              meta_description: e.target.value,
            })
          }
          rows={4}
          className={inputClass}
        />

        <textarea
          placeholder="Meta Keywords"
          value={meta.meta_keywords || ""}
          onChange={(e) =>
            setMeta({
              ...meta,
              meta_keywords: e.target.value,
            })
          }
          rows={3}
          className={inputClass}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <input
            placeholder="Meta Author"
            value={meta.meta_author || ""}
            onChange={(e) =>
              setMeta({
                ...meta,
                meta_author: e.target.value,
              })
            }
            className={inputClass}
          />

          <input
            placeholder="Meta URL"
            value={meta.meta_url || ""}
            onChange={(e) =>
              setMeta({
                ...meta,
                meta_url: e.target.value,
              })
            }
            className={inputClass}
          />
        </div>

        <input
          placeholder="Meta Image"
          value={meta.meta_image || ""}
          onChange={(e) =>
            setMeta({
              ...meta,
              meta_image: e.target.value,
            })
          }
          className={inputClass}
        />
      </div>

      <button
        type="button"
        onClick={saveData}
        disabled={saving}
        className="sticky bottom-6 z-20 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(0,0,0,0.18)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary disabled:opacity-60"
      >
        <Save size={18} />
        {saving ? "Saving..." : "Save Services Page"}
      </button>
    </div>
  );
}

ServicesDashboard.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
