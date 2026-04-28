"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Trash2 } from "lucide-react";
import { supabaseServer } from "@/lib/supabaseServer";
import AdminLayout from "@/components/AdminLayout";
import { useUpload } from "@/Hooks/useUpload";

export default function EditPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { uploadFile } = useUpload();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    hero_image: "",
    public_id: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    meta_image: "",
    meta_url: "",
    meta_author: "",
  });

  const [id, setId] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (slug) fetchPage();
  }, [slug]);

  const fetchPage = async () => {
    const { data, error } = await supabaseServer
      .from("pages")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      setForm(data);
      setId(data.id);
    }
  };

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

  const deleteHeroImage = async () => {
    try {
      if (form.public_id) {
        await fetch("/api/delete-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ public_id: form.public_id }),
        });
      }

      const { error } = await supabaseServer
        .from("pages")
        .update({
          hero_image: null,
          public_id: null,
        })
        .eq("id", id);

      if (error) throw error;

      setForm((prev) => ({
        ...prev,
        hero_image: "",
        public_id: "",
      }));

      setFile(null);
      setPreview("");

      alert("Image deleted");
    } catch (err) {
      console.error(err);
      alert("Image delete failed");
    }
  };

  const handleUpdate = async () => {
    if (!form.title) return alert("Title required");

    try {
      let imageUrl = form.hero_image || "";
      let publicId = form.public_id || "";

      if (file) {
        if (form.public_id) {
          await fetch("/api/delete-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ public_id: form.public_id }),
          });
        }

        const res = await uploadFile(file, "pages");
        imageUrl = res.url;
        publicId = res.public_id;
      }

      const { error } = await supabaseServer
        .from("pages")
        .update({
          title: form.title,
          slug: form.slug,
          hero_image: imageUrl,
          public_id: publicId,
          meta_title: form.meta_title,
          meta_description: form.meta_description,
          meta_keywords: form.meta_keywords,
          meta_image: form.meta_image,
          meta_url: form.meta_url,
          meta_author: form.meta_author,
        })
        .eq("id", id);

      if (error) throw error;

      alert("Page updated");
      router.push("/dashboard/pages");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  if (!id) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Edit Page</h1>

      <div className="bg-white border rounded-xl p-5 space-y-3">
        <h3 className="font-semibold">Hero Image</h3>

        <input type="file" onChange={handleFileChange} />

        {(preview || form.hero_image) && (
          <div className="relative w-fit">
            <img
              src={preview || form.hero_image}
              className="w-60 h-36 object-cover rounded border"
            />

            {form.hero_image && !preview && (
              <button
                type="button"
                onClick={deleteHeroImage}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        )}
      </div>

      <input
        value={form.title}
        onChange={(e) => handleChange("title", e.target.value)}
        className="border p-3 w-full"
        placeholder="Page Title"
      />

      <input
        value={form.slug}
        className="border p-3 w-full bg-gray-100"
        readOnly
      />

      <input
        value={form.meta_title || ""}
        onChange={(e) => handleChange("meta_title", e.target.value)}
        className="border p-3 w-full"
        placeholder="Meta Title"
      />

      <textarea
        value={form.meta_description || ""}
        onChange={(e) => handleChange("meta_description", e.target.value)}
        className="border p-3 w-full"
        placeholder="Meta Description"
      />

      <input
        value={form.meta_keywords || ""}
        onChange={(e) => handleChange("meta_keywords", e.target.value)}
        className="border p-3 w-full"
        placeholder="Meta Keywords"
      />

      <input
        value={form.meta_image || ""}
        onChange={(e) => handleChange("meta_image", e.target.value)}
        className="border p-3 w-full"
        placeholder="Meta Image"
      />

      <input
        value={form.meta_url || ""}
        onChange={(e) => handleChange("meta_url", e.target.value)}
        className="border p-3 w-full"
        placeholder="Meta URL"
      />

      <input
        value={form.meta_author || ""}
        onChange={(e) => handleChange("meta_author", e.target.value)}
        className="border p-3 w-full"
        placeholder="Meta Author"
      />

      <button
        onClick={handleUpdate}
        className="bg-primary text-white px-6 py-3 rounded-lg"
      >
        Update Page
      </button>
    </div>
  );
}

EditPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
