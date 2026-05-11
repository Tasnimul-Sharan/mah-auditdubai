"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Trash2,
  Save,
  ImageIcon,
  FileText,
  Search,
  LinkIcon,
} from "lucide-react";
import { supabaseServer } from "@/lib/supabaseServer";
import AdminLayout from "@/components/AdminLayout";
import { useUpload } from "@/Hooks/useUpload";
import StatusModal from "@/components/StatusModal";
import ConfirmModal from "@/components/ConfirmModal";
import OptimizedImage from "@/components/OptimizedImage";

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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [modal, setModal] = useState({
    show: false,
    type: "success",
    message: "",
    redirect: false,
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

  const showModal = (type, message, redirect = false) => {
    setModal({
      show: true,
      type,
      message,
      redirect,
    });
  };

  const closeModal = () => {
    const shouldRedirect = modal.redirect;

    setModal({
      show: false,
      type: "success",
      message: "",
      redirect: false,
    });

    if (shouldRedirect) {
      router.push("/dashboard/pages");
    }
  };

  const closeConfirmModal = () => {
    setConfirmModal({
      show: false,
      loading: false,
    });
  };

  useEffect(() => {
    if (slug) fetchPage();
  }, [slug]);

  const fetchPage = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabaseServer
        .from("pages")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setForm({
          title: data.title || "",
          slug: data.slug || "",
          hero_image: data.hero_image || "",
          public_id: data.public_id || "",
          meta_title: data.meta_title || "",
          meta_description: data.meta_description || "",
          meta_keywords: data.meta_keywords || "",
          meta_image: data.meta_image || "",
          meta_url: data.meta_url || "",
          meta_author: data.meta_author || "",
        });

        setId(data.id);
      }
    } catch (err) {
      console.error(err);
      showModal("error", "Page data fetch failed. Please try again.");
    } finally {
      setLoading(false);
    }
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

  const requestDeleteHeroImage = () => {
    if (!form.hero_image && !form.public_id && !preview) {
      showModal("error", "No image found to delete.");
      return;
    }

    setConfirmModal({
      show: true,
      loading: false,
    });
  };

  const deleteHeroImage = async () => {
    try {
      setConfirmModal({
        show: true,
        loading: true,
      });

      if (preview && file && !form.hero_image) {
        setFile(null);
        setPreview("");

        closeConfirmModal();
        showModal("success", "Selected image removed successfully.");
        return;
      }

      if (form.public_id) {
        await fetch("/api/delete-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            public_id: form.public_id,
          }),
        });
      }

      if (id) {
        const { error } = await supabaseServer
          .from("pages")
          .update({
            hero_image: null,
            public_id: null,
          })
          .eq("id", id);

        if (error) throw error;
      }

      setForm((prev) => ({
        ...prev,
        hero_image: "",
        public_id: "",
      }));

      setFile(null);
      setPreview("");

      closeConfirmModal();
      showModal("success", "Hero image deleted successfully.");
    } catch (err) {
      console.error(err);
      closeConfirmModal();
      showModal("error", "Image delete failed. Please try again.");
    }
  };

  const handleUpdate = async () => {
    if (!form.title.trim()) {
      showModal("error", "Page title is required.");
      return;
    }

    if (!id) {
      showModal("error", "Page ID not found. Please refresh and try again.");
      return;
    }

    try {
      setSaving(true);

      let imageUrl = form.hero_image || "";
      let publicId = form.public_id || "";

      if (file) {
        if (form.public_id) {
          await fetch("/api/delete-image", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              public_id: form.public_id,
            }),
          });
        }

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

      const { error } = await supabaseServer
        .from("pages")
        .update(payload)
        .eq("id", id);

      if (error) throw error;

      setFile(null);
      setPreview("");

      showModal("success", "Page updated successfully.", true);
    } catch (err) {
      console.error(err);
      showModal("error", err.message || "Update failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="p-6 text-center text-gray-500">Loading page...</p>;
  }

  if (!id) {
    return <p className="p-6 text-center text-gray-500">Page not found.</p>;
  }

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
              Edit Page
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-7 text-secondary_two/70">
              Update page hero image, basic information and SEO metadata.
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
              Upload, replace or delete the hero image for this page.
            </p>
          </div>

          <label className="group flex cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-primary/40 bg-primary/5 px-5 py-8 text-center transition-all duration-500 hover:bg-primary/10">
            <ImageIcon className="mb-3 text-primary" size={34} />

            <span className="text-sm font-bold text-soft_black">
              Upload New Hero Image
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

          {(preview || form.hero_image) && (
            <div className="relative w-fit overflow-hidden rounded-[1.5rem] border border-border_color bg-background p-2">
              <div className="relative h-52 w-96 overflow-hidden rounded-2xl">
                <OptimizedImage
                  src={preview || form.hero_image}
                  alt="Hero Preview"
                  fill
                  width={900}
                  sizes="384px"
                  className="object-cover"
                  unoptimized={Boolean(preview)}
                />
              </div>

              <button
                type="button"
                onClick={requestDeleteHeroImage}
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
              Update page title and slug.
            </p>
          </div>

          <input
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className={inputClass}
            placeholder="Page Title"
          />

          <div className="relative">
            <LinkIcon
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={form.slug}
              className={`${inputClass} bg-gray-50 pl-11 text-gray-500`}
              readOnly
              placeholder="Auto generated slug"
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
            value={form.meta_title || ""}
            onChange={(e) => handleChange("meta_title", e.target.value)}
            className={inputClass}
            placeholder="Meta Title"
          />

          <textarea
            value={form.meta_description || ""}
            onChange={(e) => handleChange("meta_description", e.target.value)}
            className={textareaClass}
            placeholder="Meta Description"
          />

          <textarea
            value={form.meta_keywords || ""}
            onChange={(e) => handleChange("meta_keywords", e.target.value)}
            className={textareaClass}
            placeholder="Meta Keywords"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <input
              value={form.meta_image || ""}
              onChange={(e) => handleChange("meta_image", e.target.value)}
              className={inputClass}
              placeholder="Meta Image URL"
            />

            <input
              value={form.meta_url || ""}
              onChange={(e) => handleChange("meta_url", e.target.value)}
              className={inputClass}
              placeholder="Meta URL"
            />
          </div>

          <input
            value={form.meta_author || ""}
            onChange={(e) => handleChange("meta_author", e.target.value)}
            className={inputClass}
            placeholder="Meta Author"
          />
        </div>

        {/* SAVE */}
        <button
          type="button"
          onClick={handleUpdate}
          disabled={saving}
          className="sticky bottom-6 z-20 flex w-full items-center justify-center gap-2 rounded-2xl bg-secondary px-6 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(15,23,42,0.22)] transition-all duration-500 hover:-translate-y-1 hover:bg-secondary_two disabled:opacity-60"
        >
          <Save size={18} />
          {saving ? "Updating..." : "Update Page"}
        </button>
      </div>

      <ConfirmModal
        show={confirmModal.show}
        title="Delete Hero Image?"
        message="Are you sure you want to delete this hero image? This action cannot be undone."
        confirmText="Delete Image"
        cancelText="Cancel"
        loading={confirmModal.loading}
        onCancel={closeConfirmModal}
        onConfirm={deleteHeroImage}
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

EditPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
