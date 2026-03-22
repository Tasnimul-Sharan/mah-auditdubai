"use client";

import { useState } from "react";
import { supabaseServer } from "@/lib/supabaseServer";
import AdminLayout from "@/components/AdminLayout";

export default function AddBlogPage() {
  const [form, setForm] = useState({
    slug: "",
    title: "",
    author: "",
    date: "",
    description: "",
    quote: "",
    image: "",
    checklist: "",
    highlights: "",
    subImages: [], // ✅ FIXED
    postTags: "",
  });

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  const formatArray = (value) => {
    return value.split("\n").filter(Boolean);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "title") {
      setForm({
        ...form,
        title: value,
        slug: generateSlug(value),
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const uploadToCloudinary = async (file) => {
    const reader = new FileReader();

    const base64 = await new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const res = await fetch("/api/upload-blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file: base64 }),
    });

    if (!res.ok) throw new Error("Upload failed");

    const data = await res.json();
    return data.url;
  };

  const [selectedMainImage, setSelectedMainImage] = useState(null);
  const [selectedSubImages, setSelectedSubImages] = useState([]);

  const handleMainImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedMainImage(file);

    const preview = URL.createObjectURL(file);

    setForm((prev) => ({
      ...prev,
      image: preview,
    }));
  };

  const handleSubImages = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setSelectedSubImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));

    setForm((prev) => ({
      ...prev,
      subImages: previews,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔥 Upload Main Image
      let mainImageUrl = "";
      if (selectedMainImage) {
        mainImageUrl = await uploadToCloudinary(selectedMainImage);
      }

      // 🔥 Upload Sub Images
      let subImageUrls = [];

      if (selectedSubImages.length > 0) {
        for (let file of selectedSubImages) {
          const url = await uploadToCloudinary(file);
          subImageUrls.push(url);
        }
      }

      const payload = {
        title: form.title,
        slug: form.slug,
        author: form.author,
        date: form.date,
        description: form.description,
        quote: form.quote,

        image: mainImageUrl,

        checklist: formatArray(form.checklist),
        highlights: formatArray(form.highlights),
        subimages: subImageUrls,
        posttags: formatArray(form.postTags),
      };

      const { error } = await supabaseServer.from("blogs").insert([payload]);

      if (error) throw error;

      alert("Blog added successfully");
    } catch (err) {
      console.error(err);
      alert("Error adding blog");
    }
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     const payload = {
  //       ...form,
  //       checklist: formatArray(form.checklist),
  //       highlights: formatArray(form.highlights),
  //       subimages: formatArray(form.subImages),
  //       posttags: formatArray(form.postTags),
  //     };

  //     const { error } = await supabaseServer.from("blogs").insert([payload]);

  //     if (error) {
  //       alert("Error adding blog");
  //     } else {
  //       alert("Blog added successfully");
  //     }
  //   };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-xl mb-4">Add Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="slug"
          value={form.slug}
          placeholder="Slug"
          readOnly
          className="border p-2 w-full bg-gray-100"
        />
        <input
          name="title"
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 w-full"
        />
        <input
          name="author"
          onChange={handleChange}
          placeholder="Author"
          className="border p-2 w-full"
        />
        <input
          type="date"
          name="date"
          onChange={handleChange}
          placeholder="Date"
          className="border p-2 w-full"
        />
        {/* Main Image */}
        <input
          type="file"
          onChange={handleMainImage}
          className="border p-2 w-full"
        />

        {/* Preview */}
        {form.image && (
          <img src={form.image} className="w-32 h-32 object-cover rounded" />
        )}

        <textarea
          name="description"
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 w-full"
        />
        <textarea
          name="quote"
          onChange={handleChange}
          placeholder="Quote"
          className="border p-2 w-full"
        />

        <textarea
          name="checklist"
          placeholder="Checklist (one per line)"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <textarea
          name="highlights"
          placeholder="Highlights (one per line)"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        {/* <textarea
          name="subImages"
          placeholder="Sub Images URLs (one per line)"
          onChange={handleChange}
          className="border p-2 w-full"
        /> */}
        <input
          type="file"
          multiple
          onChange={handleSubImages}
          className="border p-2 w-full"
        />

        {/* Preview */}
        <div className="flex gap-2 flex-wrap">
          {form.subImages?.map((img, i) => (
            <img key={i} src={img} className="w-20 h-20 object-cover rounded" />
          ))}
        </div>

        <textarea
          name="postTags"
          placeholder="Tags (one per line)"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          Add Blog
        </button>
      </form>
    </div>
  );
}

AddBlogPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
