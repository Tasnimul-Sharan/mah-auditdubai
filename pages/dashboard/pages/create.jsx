"use client";

import { useState } from "react";
import { supabaseServer } from "@/lib/supabaseServer";
import AdminLayout from "@/components/AdminLayout";
import { useUpload } from "@/Hooks/useUpload";
import {
  Save,
  ImageIcon,
  FileText,
  Search,
  Trash2,
  LinkIcon,
} from "lucide-react";
import StatusModal from "@/components/StatusModal";
import ConfirmModal from "@/components/ConfirmModal";

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
  const [saving, setSaving] = useState(false);

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
    "w-full rounded-2xl border border-border_color bg-white px-4 py-3 text-sm text-soft_black outline-none transition-all duration-500 placeholder:text-gray-400 focus:border-primary focus:shadow-[0_0_0_4px_rgba(56,182,255,0.12)]";

  const textareaClass =
    "w-full min-h-[120px] resize-none rounded-2xl border border-border_color bg-white px-4 py-3 text-sm text-soft_black outline-none transition-all duration-500 placeholder:text-gray-400 focus:border-primary focus:shadow-[0_0_0_4px_rgba(56,182,255,0.12)]";

  const cardClass =
    "relative overflow-hidden rounded-[1.5rem] border border-border_color bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] space-y-5";

  const sectionTitleClass =
    "flex items-center gap-2 text-xl font-bold text-soft_black";

  const iconBoxClass =
    "flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary";

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
  };

  const generateSlug = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "title" && {
        slug: generateSlug(value),
        meta_title: prev.meta_title || value,
      }),
    }));
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const requestRemoveImage = () => {
    if (!preview && !file) {
      showModal("error", "No image selected to remove.");
      return;
    }

    setConfirmModal({
      show: true,
      loading: false,
    });
  };

  const confirmRemoveImage = () => {
    setConfirmModal({
      show: true,
      loading: true,
    });

    setFile(null);
    setPreview("");

    closeConfirmModal();
    showModal("success", "Selected image removed successfully.");
  };

  const resetForm = () => {
    setForm({
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

    setFile(null);
    setPreview("");
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      showModal("error", "Page title is required.");
      return;
    }

    try {
      setSaving(true);

      let imageUrl = "";
      let publicId = "";

      if (file) {
        const res = await uploadFile(file, "pages");
        imageUrl = res.url;
        publicId = res.public_id;
      }

      const payload = {
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
      };

      const { error } = await supabaseServer.from("pages").insert([payload]);

      if (error) throw error;

      showModal("success", "Page created successfully.");
      resetForm();
    } catch (err) {
      console.error(err);
      showModal(
        "error",
        err.message || "Page create failed. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-6xl space-y-8">
        {/* HEADER */}
        <div className="relative overflow-hidden rounded-[2rem] border border-border_color bg-gradient-to-br from-white via-background to-primary/10 p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -left-16 bottom-0 h-44 w-44 rounded-full bg-secondary/10 blur-3xl" />

          <div className="relative">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              <FileText size={14} />
              Dynamic Page
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-soft_black md:text-4xl">
              Create Page
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-7 text-secondary_two/70">
              Create a new dynamic page with hero image and SEO metadata.
            </p>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div className={cardClass}>
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary_light to-secondary" />

          <div>
            <h2 className={sectionTitleClass}>
              <span className={iconBoxClass}>
                <ImageIcon size={18} />
              </span>
              Hero Image
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Upload the top banner image for this page.
            </p>
          </div>

          <label className="group flex cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-primary/40 bg-primary/5 px-5 py-8 text-center transition-all duration-500 hover:bg-primary/10">
            <ImageIcon className="mb-3 text-primary" size={34} />
            <span className="text-sm font-bold text-soft_black">
              Upload Hero Image
            </span>
            <span className="mt-1 text-xs text-gray-500">
              PNG, JPG, WEBP supported
            </span>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {preview && (
            <div className="relative w-fit overflow-hidden rounded-[1.5rem] border border-border_color bg-background p-2">
              <img
                src={preview}
                className="h-48 w-80 rounded-2xl object-cover"
                alt="Hero Preview"
              />

              <button
                type="button"
                onClick={requestRemoveImage}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-red-500 text-white shadow-lg shadow-red-200 transition hover:bg-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>

        {/* BASIC */}
        <div className={cardClass}>
          <div>
            <h2 className={sectionTitleClass}>
              <span className={iconBoxClass}>
                <FileText size={18} />
              </span>
              Basic Information
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Add page title and auto-generated slug.
            </p>
          </div>

          <input
            placeholder="Page Title"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className={inputClass}
          />

          <div className="relative">
            <LinkIcon
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={form.slug}
              readOnly
              placeholder="Auto generated slug"
              className={`${inputClass} bg-gray-50 pl-11 text-gray-500`}
            />
          </div>
        </div>

        {/* SEO */}
        <div className={cardClass}>
          <div>
            <h2 className={sectionTitleClass}>
              <span className={iconBoxClass}>
                <Search size={18} />
              </span>
              SEO Meta
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage search engine metadata for this page.
            </p>
          </div>

          <input
            placeholder="Meta Title"
            value={form.meta_title}
            onChange={(e) => handleChange("meta_title", e.target.value)}
            className={inputClass}
          />

          <textarea
            placeholder="Meta Description"
            value={form.meta_description}
            onChange={(e) => handleChange("meta_description", e.target.value)}
            className={textareaClass}
          />

          <textarea
            placeholder="Meta Keywords"
            value={form.meta_keywords}
            onChange={(e) => handleChange("meta_keywords", e.target.value)}
            className={textareaClass}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <input
              placeholder="Meta Image URL"
              value={form.meta_image}
              onChange={(e) => handleChange("meta_image", e.target.value)}
              className={inputClass}
            />

            <input
              placeholder="Meta URL"
              value={form.meta_url}
              onChange={(e) => handleChange("meta_url", e.target.value)}
              className={inputClass}
            />
          </div>

          <input
            placeholder="Meta Author"
            value={form.meta_author}
            onChange={(e) => handleChange("meta_author", e.target.value)}
            className={inputClass}
          />
        </div>

        {/* SAVE */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className="sticky bottom-6 z-20 flex w-full items-center justify-center gap-2 rounded-2xl bg-secondary px-6 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(15,23,42,0.22)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary_two disabled:opacity-60"
        >
          <Save size={18} />
          {saving ? "Creating..." : "Create Page"}
        </button>
      </div>

      <ConfirmModal
        show={confirmModal.show}
        title="Remove Image?"
        message="Are you sure you want to remove this selected image?"
        confirmText="Remove Image"
        cancelText="Cancel"
        loading={confirmModal.loading}
        onCancel={closeConfirmModal}
        onConfirm={confirmRemoveImage}
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

CreatePage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
