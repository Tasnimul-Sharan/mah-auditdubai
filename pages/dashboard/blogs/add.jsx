"use client";

import { useState } from "react";
import { supabaseServer } from "@/lib/supabaseServer";
import AdminLayout from "@/components/AdminLayout";
import {
  Save,
  Trash2,
  Newspaper,
  ImageIcon,
  FileText,
  Quote,
  ListChecks,
  Tags,
} from "lucide-react";
import StatusModal from "@/components/StatusModal";
import ConfirmModal from "@/components/ConfirmModal";
import OptimizedImage from "@/components/OptimizedImage";

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
    subImages: [],
    postTags: "",
  });

  const [selectedMainImage, setSelectedMainImage] = useState(null);
  const [selectedSubImages, setSelectedSubImages] = useState([]);
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState({
    type: null,
    index: null,
  });

  const [modal, setModal] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const [confirmModal, setConfirmModal] = useState({
    show: false,
    loading: false,
  });

  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]";

  const cardClass =
    "rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] space-y-4";

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

  const closeConfirmModal = () => {
    setConfirmModal({
      show: false,
      loading: false,
    });

    setDeleteTarget({
      type: null,
      index: null,
    });
  };

  const generateSlug = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

  const formatArray = (value) =>
    value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

  const resetForm = () => {
    setForm({
      slug: "",
      title: "",
      author: "",
      date: "",
      description: "",
      quote: "",
      image: "",
      checklist: "",
      highlights: "",
      subImages: [],
      postTags: "",
    });

    setSelectedMainImage(null);
    setSelectedSubImages([]);
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
      setForm({
        ...form,
        [name]: value,
      });
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ file: base64 }),
    });

    if (!res.ok) throw new Error("Upload failed");

    const data = await res.json();
    return data.url;
  };

  const handleMainImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedMainImage(file);

    setForm((prev) => ({
      ...prev,
      image: URL.createObjectURL(file),
    }));
  };

  const handleSubImages = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setSelectedSubImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));

    setForm((prev) => ({
      ...prev,
      subImages: previews,
    }));
  };

  const requestRemoveMainImage = () => {
    if (!form.image && !selectedMainImage) {
      showModal("error", "No main image selected.");
      return;
    }

    setDeleteTarget({
      type: "mainImage",
      index: null,
    });

    setConfirmModal({
      show: true,
      loading: false,
    });
  };

  const requestRemoveSubImage = (index) => {
    setDeleteTarget({
      type: "subImage",
      index,
    });

    setConfirmModal({
      show: true,
      loading: false,
    });
  };

  const confirmDelete = () => {
    if (deleteTarget.type === "mainImage") {
      confirmRemoveMainImage();
      return;
    }

    if (deleteTarget.type === "subImage") {
      confirmRemoveSubImage();
      return;
    }

    showModal("error", "No delete action selected.");
    closeConfirmModal();
  };

  const confirmRemoveMainImage = () => {
    setConfirmModal({
      show: true,
      loading: true,
    });

    setSelectedMainImage(null);

    setForm({
      ...form,
      image: "",
    });

    closeConfirmModal();
    showModal("success", "Main image removed successfully.");
  };

  const confirmRemoveSubImage = () => {
    if (deleteTarget.index === null) {
      showModal("error", "No sub image selected.");
      closeConfirmModal();
      return;
    }

    setConfirmModal({
      show: true,
      loading: true,
    });

    setSelectedSubImages((prev) =>
      prev.filter((_, i) => i !== deleteTarget.index),
    );

    setForm({
      ...form,
      subImages: form.subImages.filter((_, i) => i !== deleteTarget.index),
    });

    closeConfirmModal();
    showModal("success", "Sub image removed successfully.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      showModal("error", "Blog title is required.");
      return;
    }

    try {
      setSaving(true);

      let mainImageUrl = "";

      if (selectedMainImage) {
        mainImageUrl = await uploadToCloudinary(selectedMainImage);
      }

      const subImageUrls = [];

      if (selectedSubImages.length > 0) {
        for (const file of selectedSubImages) {
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

      showModal("success", "Blog added successfully.");
      resetForm();
    } catch (err) {
      console.error(err);
      showModal("error", err.message || "Error adding blog. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const getConfirmContent = () => {
    if (deleteTarget.type === "mainImage") {
      return {
        title: "Remove Main Image?",
        message: "Are you sure you want to remove this main image?",
        confirmText: "Remove Image",
      };
    }

    if (deleteTarget.type === "subImage") {
      return {
        title: "Remove Sub Image?",
        message: "Are you sure you want to remove this sub image?",
        confirmText: "Remove Image",
      };
    }

    return {
      title: "Are you sure?",
      message: "This action cannot be undone.",
      confirmText: "Confirm",
    };
  };

  const confirmContent = getConfirmContent();

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-900">
            <Newspaper className="text-primary" size={28} />
            Add Blog
          </h1>

          <p className="mt-1 text-gray-500">
            Create blog content, images, checklist, highlights and tags.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className={cardClass}>
            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
              <FileText size={20} className="text-primary" />
              Basic Information
            </h2>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Blog Title"
              className={inputClass}
            />

            <input
              name="slug"
              value={form.slug}
              readOnly
              placeholder="Auto generated slug"
              className={`${inputClass} bg-gray-50 text-gray-500`}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <input
                name="author"
                value={form.author}
                onChange={handleChange}
                placeholder="Author"
                className={inputClass}
              />

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              rows={5}
              className={inputClass}
            />
          </div>

          <div className={cardClass}>
            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
              <ImageIcon size={20} className="text-primary" />
              Main Image
            </h2>

            <input
              type="file"
              accept="image/*"
              onChange={handleMainImage}
              className={inputClass}
            />

            {form.image && (
              <div className="relative w-fit rounded-2xl border bg-gray-50 p-3">
                <div className="relative h-44 w-72 overflow-hidden rounded-xl">
                  <OptimizedImage
                    src={form.image}
                    alt={form.title || "Blog main image"}
                    fill
                    width={500}
                    sizes="288px"
                    className="object-cover"
                    unoptimized
                  />
                </div>

                <button
                  type="button"
                  onClick={requestRemoveMainImage}
                  className="absolute right-4 top-4 rounded-lg bg-red-500 p-2 text-white transition-all duration-500 hover:bg-red-600"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            )}
          </div>

          <div className={cardClass}>
            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
              <Quote size={20} className="text-primary" />
              Quote
            </h2>

            <textarea
              name="quote"
              value={form.quote}
              onChange={handleChange}
              placeholder="Quote"
              rows={4}
              className={inputClass}
            />
          </div>

          <div className={cardClass}>
            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
              <ListChecks size={20} className="text-primary" />
              Checklist & Highlights
            </h2>

            <textarea
              name="checklist"
              value={form.checklist}
              placeholder="Checklist - one item per line"
              onChange={handleChange}
              rows={5}
              className={inputClass}
            />

            <textarea
              name="highlights"
              value={form.highlights}
              placeholder="Highlights - one item per line"
              onChange={handleChange}
              rows={5}
              className={inputClass}
            />
          </div>

          <div className={cardClass}>
            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
              <ImageIcon size={20} className="text-primary" />
              Sub Images
            </h2>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleSubImages}
              className={inputClass}
            />

            {form.subImages?.length > 0 && (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {form.subImages.map((img, i) => (
                  <div
                    key={i}
                    className="relative rounded-2xl border bg-gray-50 p-2"
                  >
                    <div className="relative h-28 w-full overflow-hidden rounded-xl">
                      <OptimizedImage
                        src={img}
                        alt={`Sub image ${i + 1}`}
                        fill
                        width={400}
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => requestRemoveSubImage(i)}
                      className="absolute right-3 top-3 rounded-lg bg-red-500 p-1.5 text-white transition-all duration-500 hover:bg-red-600"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={cardClass}>
            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
              <Tags size={20} className="text-primary" />
              Tags
            </h2>

            <textarea
              name="postTags"
              value={form.postTags}
              placeholder="Tags - one tag per line"
              onChange={handleChange}
              rows={4}
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="sticky bottom-6 z-20 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(0,0,0,0.18)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary disabled:opacity-60"
          >
            <Save size={18} />
            {saving ? "Saving..." : "Add Blog"}
          </button>
        </form>
      </div>

      <ConfirmModal
        show={confirmModal.show}
        title={confirmContent.title}
        message={confirmContent.message}
        confirmText={confirmContent.confirmText}
        cancelText="Cancel"
        loading={confirmModal.loading}
        onCancel={closeConfirmModal}
        onConfirm={confirmDelete}
      />

      <StatusModal
        show={modal.show}
        type={modal.type}
        message={modal.message}
        onClose={closeModal}
      />
    </>
  );
}

AddBlogPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
