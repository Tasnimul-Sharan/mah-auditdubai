"use client";

import { useState } from "react";
import { supabaseServer } from "@/lib/supabaseServer";
import AdminLayout from "@/components/AdminLayout";
import { useUpload } from "@/Hooks/useUpload";

export default function CreatePage() {
  const { uploadFile } = useUpload();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    hero_image: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    meta_image: "",
    meta_url: "",
    meta_author: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const generateSlug = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "title" && { slug: generateSlug(value) }),
    }));
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async () => {
    if (!form.title) return alert("Title required");

    let imageUrl = "";
    let publicId = "";

    if (file) {
      const res = await uploadFile(file, "pages");
      imageUrl = res.url;
      publicId = res.public_id;
    }

    const { error } = await supabaseServer.from("pages").insert([
      {
        ...form,
        hero_image: imageUrl,
        public_id: publicId,
      },
    ]);

    if (error) return alert(error.message);

    alert("Page created successfully");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Create Page</h1>

      {/* HERO */}
      <div className="bg-white p-5 border rounded-xl space-y-3">
        <h5 className="font-semibold">Hero Image</h5>

        {/* <input
          placeholder="Hero Title"
          className="border p-3 w-full"
          onChange={(e) => handleChange("hero_title", e.target.value)}
        /> */}

        <input type="file" onChange={handleFileChange} />

        {preview && (
          <img
            src={preview}
            className="w-60 h-36 object-cover rounded border"
          />
        )}
      </div>

      {/* BASIC */}
      <input
        placeholder="Page Title"
        className="border p-3 w-full"
        onChange={(e) => handleChange("title", e.target.value)}
      />

      <input
        value={form.slug}
        className="border p-3 w-full bg-gray-100"
        readOnly
      />

      {/* META SEO */}
      <input
        placeholder="Meta Title"
        className="border p-3 w-full"
        onChange={(e) => handleChange("meta_title", e.target.value)}
      />

      <textarea
        placeholder="Meta Description"
        className="border p-3 w-full"
        onChange={(e) => handleChange("meta_description", e.target.value)}
      />

      <input
        placeholder="Meta Keywords"
        className="border p-3 w-full"
        onChange={(e) => handleChange("meta_keywords", e.target.value)}
      />

      <input
        placeholder="Meta Image URL"
        className="border p-3 w-full"
        onChange={(e) => handleChange("meta_image", e.target.value)}
      />

      <input
        placeholder="Meta URL"
        className="border p-3 w-full"
        onChange={(e) => handleChange("meta_url", e.target.value)}
      />

      <input
        placeholder="Meta Author"
        className="border p-3 w-full"
        onChange={(e) => handleChange("meta_author", e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-primary text-white px-6 py-3 rounded-lg"
      >
        Create Page
      </button>
    </div>
  );
}

CreatePage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;