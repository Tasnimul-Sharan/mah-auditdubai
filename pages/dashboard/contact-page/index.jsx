"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Save, Trash2 } from "lucide-react";
import { supabaseServer } from "@/lib/supabaseServer";
import { useUpload } from "@/Hooks/useUpload";

export default function ContactPageDashboard() {
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

  const fetchData = async () => {
    const { data } = await supabaseServer
      .from("contact_page")
      .select("*")
      .single();

    if (data) {
      setMeta(data);
      setRowId(data.id);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const deleteImage = async () => {
    if (!meta?.public_id) return;

    await fetch("/api/delete-image", {
      method: "POST",
      body: JSON.stringify({ public_id: meta.public_id }),
    });

    await supabaseServer
      .from("contact_page")
      .update({ hero_image: null, public_id: null })
      .eq("id", rowId);

    setPreview("");
    fetchData();
  };

  const saveData = async () => {
    try {
      let imageUrl = meta.hero_image;
      let publicId = meta.public_id;

      if (file) {
        if (meta.public_id) {
          await fetch("/api/delete-image", {
            method: "POST",
            body: JSON.stringify({ public_id: meta.public_id }),
          });
        }

        const res = await uploadFile(file, "contact");
        imageUrl = res.url;
        publicId = res.public_id;
      }

      await supabaseServer
        .from("contact_page")
        .update({
          ...meta,
          hero_image: imageUrl,
          public_id: publicId,
        })
        .eq("id", rowId);

      alert("Saved successfully");
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Contact Page Management</h1>

      <div className="bg-white p-6 rounded-xl border space-y-4">
        <h2 className="text-xl font-semibold">Hero Section</h2>

        <input
          placeholder="Hero Title"
          value={meta.hero_title || ""}
          onChange={(e) => setMeta({ ...meta, hero_title: e.target.value })}
          className="border p-3 w-full rounded"
        />

        <input type="file" onChange={handleFileChange} />

        {preview ? (
          <img src={preview} className="w-48 h-32 object-cover rounded" />
        ) : meta.hero_image ? (
          <div className="relative w-fit">
            <img
              src={meta.hero_image}
              className="w-48 h-32 object-cover rounded"
            />
            <button
              onClick={deleteImage}
              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ) : null}
      </div>

      <div className="bg-white p-6 rounded-xl border space-y-4">
        <h2 className="text-xl font-semibold">SEO Meta</h2>

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
            setMeta({
              ...meta,
              meta_description: e.target.value,
            })
          }
          className="border p-3 w-full rounded"
        />

        <textarea
          placeholder="Meta Keywords"
          value={meta.meta_keywords}
          onChange={(e) =>
            setMeta({
              ...meta,
              meta_keywords: e.target.value,
            })
          }
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
          onClick={saveData}
          className="bg-primary text-white px-6 py-3 rounded flex gap-2"
        >
          <Save size={18} /> Save
        </button>
      </div>
    </div>
  );
}

ContactPageDashboard.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
