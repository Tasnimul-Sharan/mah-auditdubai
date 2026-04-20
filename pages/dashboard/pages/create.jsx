"use client";

import { useState } from "react";
import { supabaseServer } from "@/lib/supabaseServer";
import AdminLayout from "@/components/AdminLayout";

export default function CreatePage() {
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

  const handleSubmit = async () => {
    if (!form.title) return alert("Title required");

    await supabaseServer.from("pages").insert([form]);

    alert("Page created successfully");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Create Page</h1>

      {/* BASIC */}
      <input
        placeholder="Page Title"
        className="border p-3 w-full"
        onChange={(e) => handleChange("title", e.target.value)}
      />

      <input
        placeholder="Slug"
        className="border p-3 w-full bg-gray-100"
        value={form.slug}
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

// import { useState } from "react";
// import { supabaseServer } from "@/lib/supabaseServer";

// export default function CreatePage() {
//   const [title, setTitle] = useState("");
//   const [slug, setSlug] = useState("");

//   const handleSubmit = async () => {
//     await supabaseServer.from("pages").insert([{ title, slug }]);

//     alert("Page created");
//   };

//   return (
//     <div>
//       <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
//       <input placeholder="Slug" onChange={(e) => setSlug(e.target.value)} />

//       <button onClick={handleSubmit}>Create</button>
//     </div>
//   );
// }
