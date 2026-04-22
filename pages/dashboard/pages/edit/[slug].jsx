"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabaseServer } from "@/lib/supabaseServer";
import AdminLayout from "@/components/AdminLayout";

export default function EditPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [form, setForm] = useState({
    title: "",
    slug: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    meta_image: "",
    meta_url: "",
    meta_author: "",
  });

  const [id, setId] = useState(null);

  // ================= FETCH EXISTING =================
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

  // ================= HANDLE =================
  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "title" && { slug: generateSlug(value) }),
    }));
  };

  // ================= UPDATE =================
  const handleUpdate = async () => {
    if (!form.title) return alert("Title required");

    const { error } = await supabaseServer
      .from("pages")
      .update(form)
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Update failed");
      return;
    }

    alert("Page updated");
    router.push("/dashboard/pages");
  };

  if (!id) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Edit Page</h1>

      <input
        value={form.title}
        onChange={(e) => handleChange("title", e.target.value)}
        className="border p-3 w-full"
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
